import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllTicketsQueryDto } from "../types/get-all-tickets-query.dto";
import { TicketsDto } from "../types/tickets.dto";
import repository from "repository";

export const getAllTickets = createAsyncThunk<TicketsDto, { query: Partial<GetAllTicketsQueryDto> }>(
  "GET/all-tickets",
  async ({ query = {} }, { rejectWithValue }) => {
    try {
      const response = await repository.get(`tickets`, {
        params: {
          ...query,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
