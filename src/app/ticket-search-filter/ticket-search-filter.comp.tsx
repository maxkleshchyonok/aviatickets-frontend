import { Button, SelectChangeEvent, Stack } from "@mui/material";
import { Cities } from "enums/cities.enum";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { FC } from "react";
import Select from "./components/select/select.comp";
import { specifyArrivalTime, specifyDepartureTime, specifyDestinationCity, specifyOriginCity } from "./store/ticket-search-filter.actions";
import { tickerSearchFilterSelector } from "./store/ticket-search-filter.selectors";
import { DatePicker } from "@mui/x-date-pickers";

const TickerSearchFilter: FC = () => {
  const dispatch = useAppDispatch();

  const handleOriginCityChange = (event: SelectChangeEvent) => {
    dispatch(specifyOriginCity(event.target.value));
  };

  const handleDestinationCityChange = (event: SelectChangeEvent) => {
    dispatch(specifyDestinationCity(event.target.value));
  };

  const handleDepartureDateChange = (value: Date | null) => {
    dispatch(specifyDepartureTime(value));
  }

  const handleArrivalDateChange = (value: Date | null) => {
    dispatch(specifyArrivalTime(value));
  }

  const { originCity, destinationCity, departureTime, arrivalTime } = useAppSelector(tickerSearchFilterSelector);
  const cities = Object.values(Cities);

  return (
    <div className="ticket-search-filter">
      <Stack flexDirection={"row"} sx={{ marginLeft: 1, marginRight: 1, flexWrap: 'wrap' }}>
        <Select labelId="origin-city-label" id="origin-city-select" label="Origin city" onSelectChange={handleOriginCityChange} selectValues={cities} currentValue={originCity} />
        <Select labelId="destination-city-label" id="destination-city-select" label="Destination city" onSelectChange={handleDestinationCityChange} selectValues={cities} currentValue={destinationCity} />
        <DatePicker sx={{ minWidth: 170, flexGrow: 1 }} label="Departure date" value={departureTime} disablePast={true} onChange={handleDepartureDateChange} />
        <DatePicker sx={{ minWidth: 170, flexGrow: 1 }} label="Arrival date" value={arrivalTime} disablePast={true} onChange={handleArrivalDateChange} />
        <Button variant="contained" sx={{ flexGrow: 1, borderRadius: 0, minWidth: 200 }}>Search</Button>
      </Stack >
    </div>
  );
}

export default TickerSearchFilter;