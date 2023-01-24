export interface ResponseObject<T> {
  response: {
    header: { resultCode: string; resultMsg: string };
    body: {
      items: {
        item: T[];
      };
    };
  };
}
export interface IAirplain {
  airlineNm: string;
  arrPlandTime: string;
  depPlandTime: string;
  vihicleId: string;
  economyCharge?: string;
}

export interface IForm {
  depAirportId: string;
  arrAirportId: string;
  depPlandTime: string;
}

export interface IAirport {
  airportId: string;
  airportNm: string;
}
