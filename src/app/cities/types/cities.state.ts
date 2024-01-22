import { BaseState } from "types/base-state.type";
import { CitiesDto } from "../../cities/types/cities.dto";

export interface CitiesState extends BaseState {
  cities: CitiesDto | null;
  isPending: {
    cities: boolean;
  };
  errors: {
    cities: string | null;
  };
}
