import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: 0
}

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload
    }
  }
})

export const { setActiveTab } = bookingSlice.actions