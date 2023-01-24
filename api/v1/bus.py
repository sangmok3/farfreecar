from . import *


# 공공데이터포털 TAGO 서비스 키(김재민)
service_key = "W2q0NTof7Ama12/NTDD//+o/JkDiJPKnjikCiwV0XCY1u4KnRGJCApzfHXehm5tRxgp2VyyoumI2Hyn0T3aMQQ=="

# 공공데이터포털 TAGO 고속버스정보
api_bus_url = "http://apis.data.go.kr/1613000/ExpBusInfoService/"


@api_v1.route("/bus/traffic/hour", methods=["GET"])
def bus_get_traffic_hour_list():
    '''
    # Function : 고속의 출발지, 도착지, 출발 시간, 도착 시간, 금액 등의 정보를 확인할 수 있는 API
    # return: 고속버스 트레픽 정보
    # ex: http://localhost:5000/api/v1/bus/traffic/hour?depTerminalId=NAEK700&arrTerminalId=NAEK010&depPlandDay=20220401&depPlandHour=10&busGradeId=1
    '''
    # 반환 값
    results = []

    # 현재 시간
    now_str = datetime.now().strftime('%Y%m%d')

    # 고속버스의 트레픽 정보 조회
    theme = "getStrtpntAlocFndExpbusInfo"
    url = os.path.join(api_bus_url, theme)

    # 출발지 코드 // 디폴트 : NAEK010(서울경부)
    dep_terminal_id = request.args.get("depTerminalId", "NAEK010")
    # 도착지 코드 // 디폴트 : NAEK700(부산)
    arr_terminal_id = request.args.get("arrTerminalId", "NAEK700")
    # 출발일(YYYYMMDD) // 디폴트 : 오늘
    dep_pland_day = request.args.get("depPlandDay", now_str)
    # 출발 시간(HH) // 디폴트 : None
    dep_pland_hour = request.args.get("depPlandHour", None)
    # 버스 등급 코드 //  디폴트 : 1(우등)
    bus_grade_code = request.args.get("busGradeId", "1")

    # API Params 
    params ={"serviceKey" : service_key,
             "pageNo" : "1",
             "numOfRows" : "100",
             "_type" : "json",
             "depTerminalId" : dep_terminal_id,
             "arrTerminalId" : arr_terminal_id,
             "depPlandTime" : dep_pland_day,
             "busGradeId" : bus_grade_code
             }

    # API Request
    response = requests.get(url, params=params)
    contents = json.loads(response.content.decode())

    body = contents["response"]["body"]
    items = body["items"]["item"]

    # 출발 시간 입력 시 if 실행
    if dep_pland_hour and body["totalCount"]:

        # 출발 시간이 일치하는 Item 만 Append
        for item in items:
            print(item.keys())
            this_hour = str(item["depPlandTime"])[8:10]
            
            if dep_pland_hour == this_hour:
                results.append(item)

    # 출발 시간이 없을 경우 else 실행
    else:
        if type(items).__name__ == "list":
            results.extend(items) 
        else:
            results.append(items)
        
    return jsonify(results)