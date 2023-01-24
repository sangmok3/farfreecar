import { ApiService } from "./ApiService";
import { IAirplain, IAirport, IForm } from "./commonInterface";

export interface TotalApi {
  GetAirportId(): Promise<IAirport[] | undefined>;
  GetAirplane(form: IForm): Promise<IAirplain[] | undefined>;
  //GetTrain(): Promise<string | undefined>;
  //GetBus(): Promise<string | undefined>;
}

export const NewInterface = (): TotalApi => {
  return new ApiService();
};
