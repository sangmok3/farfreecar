import { TotalApi } from "./ApiInterface";
import axios, { AxiosRequestConfig } from "axios";
import { IAirplain, IAirport, IForm } from "./commonInterface";

export class ApiService implements TotalApi {
  //constructor() {}

  private static async executeRequest(
    path: string,
    config?: AxiosRequestConfig
  ): Promise<Record<string, unknown>> {
    try {
      const result = await axios(path, config);
      return result as object as Record<string, unknown>;
    } catch (err) {
      const anyResult = err as Record<string, unknown>;
      if (anyResult && anyResult.response) {
        return anyResult.response as object as Record<string, unknown>;
      }
    }

    return {};
  }

  async GetAirplane(form: IForm): Promise<IAirplain[] | undefined> {
    const url: string =
      "http://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getFlightOpratInfoList?serviceKey=rVYQ1JhwygEEy01jEYcluaNuNLgooHPLUqaIlyvpJsQmWpmzBXHAI1BeioYDRetfdX92AZoxdk9PqTeuP7A9Xg%3D%3D" +
      "&depAirportId=" +
      form.depAirportId +
      "&arrAirportId=" +
      form.arrAirportId +
      "&depPlandTime=" +
      form.depPlandTime;
    const response = await axios.get(url).then((data) => {
      const res = data.data;
      console.log("res", res);
      return res;
    });
    if (response) {
      return response.response.body.items.item as IAirplain[];
    }
    return undefined;
  }

  async GetAirportId(): Promise<IAirport[] | undefined> {
    const url: string =
      "http://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getArprtList?serviceKey=rVYQ1JhwygEEy01jEYcluaNuNLgooHPLUqaIlyvpJsQmWpmzBXHAI1BeioYDRetfdX92AZoxdk9PqTeuP7A9Xg%3D%3D";
    const response = await axios.get(url).then((data) => {
      const res = data.data;
      //console.log("res", res);
      return res;
    });

    if (response) {
      return response.response.body.items.item as IAirport[];
    }
    return undefined;
  }
}
