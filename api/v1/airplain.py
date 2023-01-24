from . import *
import requests
import datetime as dt 
# import psycopg2
import json


service_key = "vQYvp5baz7MNoM/0nrMrpau/8exr3ciMrmBEo7ksRy2I2yiMqdgBp24zj+NSCSKpXNgFan4hJ771JPRK6SCHSQ==" 
today = dt.datetime.now().strftime('%Y%m%d')

@api_v1.route("/fly", methods=["GET"])
def air():

    results = []

    url = 'http://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getFlightOpratInfoList'
    
    # 출발지 코드 // 디폴트 : NAARKSS(김포)
    depid = request.args.get("depAirportId", "NAARKSS")
    # 도착지 코드 // 디폴트 : NAARKPK(김해)
    arrid = request.args.get("arrAirportId", "NAARKPK")
    # 비행사 // 디폴트 : 전체
    airline = request.args.get("airlineId", "")
    # 출발일(YYYYMMDD) // 디폴트 : 오늘
    fly_day = request.args.get("depPlandDay", today)
    # 출발 시간(HH) // 디폴트 : None
    dep_hour = request.args.get("dephour", None)

    params ={'serviceKey' : service_key, 'pageNo' : '1', 'numOfRows' : '10', '_type' : 'json', 'depAirportId' : depid, 'arrAirportId' : arrid, 'depPlandTime' : fly_day ,'airlineId' : airline }
    response = requests.get(url, params=params)
    
    contents = json.loads(response.content.decode())

    body = contents["response"]["body"]
    items = body["items"]["item"]

    # 출발 시간 입력 시 if 실행
    if dep_hour and body["totalCount"]:

        # 출발 시간이 일치하는 Item 만 Append
        for item in items:
            print(item.keys())
            this_hour = str(item["depPlandTime"])[8:10]
            
            if dep_hour == this_hour:
                results.append(item)

    # 출발 시간이 없을 경우 else 실행
    else:
        if type(items).__name__ == "list":
            results.extend(items) 
        else:
            results.append(items)
        
    return jsonify(results)


@api_v1.route("/fly/airport", methods=["GET"])
def airport():
    url = 'http://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getArprtList'
    params ={'serviceKey' : service_key, '_type' : 'json' }
    response = requests.get(url, params=params)
    return(response.content)

@api_v1.route("/fly/company", methods=["GET"])
def company():
    url = 'http://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getAirmanList'
    params ={'serviceKey' : service_key, '_type' : 'json' }
    response = requests.get(url, params=params)
    return(response.content)


# @api_v1.route("/fly/airport/loc", methods=["GET"])
# def airport_loc():
#     # conn = psycopg2.connect(host='127.0.0.1',user='postgres',password='1234',port=5432)
#     conn.autocommit = True
#     cur = conn.cursor()
#     sql = "select * from distance_test"
#     cur.execute(sql)
#     a = cur.fetchall()
#     airport_loc = {'title': 'location', 'nation': 'korea', 'airport_loc': [{'id': a[0][0], 'x': a[0][1], 'y': a[0][2], 'name':a[0][-1]},{'id': a[1][0], 'x': a[1][1], 'y': a[1][2], 'name':a[1][-1]} ]}
#     cur.close() 
#     conn.close()
#     return (json.dumps(airport_loc, indent=4))

