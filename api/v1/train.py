from . import *



# 공공데이터포털 서비스 키(김재민)
service_key = "W2q0NTof7Ama12/NTDD//+o/JkDiJPKnjikCiwV0XCY1u4KnRGJCApzfHXehm5tRxgp2VyyoumI2Hyn0T3aMQQ=="

# 공공데이터포털 TAGO 열차정보
api_train_url = "http://apis.data.go.kr/1613000/TrainInfoService/"


@api_v1.route("/train/city", methods=["GET"])
def train_get_city():
    '''
    # Function : Get city code list by TAGO TRAIN API
    # return: City
    '''

    # 도시 코드 리스트
    theme = "getCtyCodeList"
    url = os.path.join(api_train_url, theme)

    params ={"serviceKey" : service_key,
             "_type" : "json" }

    response = requests.get(url, params=params)
    results = json.loads(response.content.decode())

    return jsonify(results)

@api_v1.route("/train/vhcle")
def train_get_vhcle_knd_list():
    '''
    # Function : Get Vehicle code list by TAGO TRAIN API
    # return: City
    '''

    # 이용 수단 종류 리스트
    theme = "getVhcleKndList"
    url = os.path.join(api_train_url, theme)

    params ={"serviceKey" : service_key,
             "_type" : "json" }

    response = requests.get(url, params=params)
    results = json.loads(response.content.decode())

    return jsonify(results)


@api_v1.route("/train/station")
def train_get_city_station_list():
    '''
    # Function : Get Station code list by TAGO TRAIN API
    # return: City
    '''

    # 지역별 기차역 리스트
    theme = "getCtyAcctoTrainSttnList"
    url = os.path.join(api_train_url, theme)

    # 도시코드 입력이 되지 않았을 경우 11(서울) 디폴트
    city_code = request.args.get("cityCode", 22)

    params ={"serviceKey" : service_key,
             "pageNo" : "1",
             "numOfRows" : "10",
             "_type" : "json",
             "cityCode" : city_code
             }
    response = requests.get(url, params=params)
    results = json.loads(response.content.decode())

    return jsonify(results)

# @api_v1.route("/train/traffic")
# def train_get_traffic_list():
#     '''
#     # Function : Get Traffic list by TAGO TRAIN API
#     # return: City
#     '''

#     # 	열차(KTX)의 출발역, 도착역 정보 조회
#     theme = "getStrtpntAlocFndTrainInfo"
#     url = os.path.join(api_train_url, theme)

#     # 출발지 코드 // NAT010000(서울)
#     dep_place_id = request.args.get("depPlaceId", "NAT010000")
#     # 도착지 코드 // NAT011668(대전)
#     arr_place_id = request.args.get("arrPlaceId", "NAT014445")
#     # 출발일(YYYYMMDD)
#     dep_pland_time = request.args.get("depPlandTime", "20220323")
#     # 차량 종류 코드
#     train_grade_code = request.args.get("trainGradeCode", "00")

#     params ={"serviceKey" : service_key,
#              "pageNo" : "1",
#              "numOfRows" : "10",
#              "_type" : "json",
#              "depPlaceId" : dep_place_id,
#              "arrPlaceId" : arr_place_id,
#              "depPlandTime" : dep_pland_time,
#              "trainGradeCode" : train_grade_code
#              }
#     response = requests.get(url, params=params)
#     results = json.loads(response.content.decode())

#     return jsonify(results)


@api_v1.route("/train/traffic/hour", methods=["GET"])
def train_get_traffic_hour_list():
    '''
    # Function : 열차의 출발지, 도착지, 출발 시간, 도착 시간, 금액 등의 정보를 확인할 수 있는 API
    # return: 열차 트레픽 정보
    # ex: http://localhost:5000/api/v1/train/traffic/hour?depPlaceId=NAT014445&arrPlaceId=NAT010000&depPlandDay=20220401&depPlandHour=13&trainGradeCode=00
    '''
    # 반환 값
    results = []

    # 현재 시간
    now_str = datetime.now().strftime('%Y%m%d')

    # 	열차(KTX)의 출발역, 도착역 정보 조회
    theme = "getStrtpntAlocFndTrainInfo"
    url = os.path.join(api_train_url, theme)

    # 출발지 코드 // 디폴트 : NAT010000(서울역)
    dep_place_id = request.args.get("depPlaceId", "NAT010000")
    # 도착지 코드 // 디폴트 : NAT014445(부산역)
    arr_place_id = request.args.get("arrPlaceId", "NAT014445")
    # 출발일(YYYYMMDD) // 디폴트 : 오늘
    dep_pland_day = request.args.get("depPlandDay", now_str)
    # 출발 시간(HH) // 디폴트 : None
    dep_pland_hour = request.args.get("depPlandHour", None)
    # 차량 종류 코드 //  디폴트 : 00(KTX)
    train_grade_code = request.args.get("trainGradeCode", "00")

    # API Params 
    params ={"serviceKey" : service_key,
             "pageNo" : "1",
             "numOfRows" : "100",
             "_type" : "json",
             "depPlaceId" : dep_place_id,
             "arrPlaceId" : arr_place_id,
             "depPlandTime" : dep_pland_day,
             "trainGradeCode" : train_grade_code
             }
            
    # API Request
    response = requests.get(url, params=params)
    contents = json.loads(response.content.decode())

    body = contents["response"]["body"]
    items = body["items"]["item"]

    # 출발 시간 입력 시 if 실행
    if dep_pland_hour and body["totalCount"]:

        # 출발 시간이 일치하는 Item 만 Append
        for item in body["items"]["item"]:
            this_hour = str(item["depplandtime"])[8:10]
            
            if dep_pland_hour == this_hour:
                results.append(item)
                
    # 출발 시간이 없을 경우 else 실행
    else:
        if type(items).__name__ == "list":
            results.extend(items) 
        else:
            results.append(items)

    return jsonify(results)