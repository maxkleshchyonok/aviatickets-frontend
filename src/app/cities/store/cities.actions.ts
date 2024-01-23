import { createAsyncThunk } from "@reduxjs/toolkit";
import { CitiesDto } from "app/cities/types/cities.dto";
import repository from "repository";

export const getAllCities = createAsyncThunk<CitiesDto>("GET/all-cities", async (_, { rejectWithValue }) => {
  try {
    const response = await repository.get("cities");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});
