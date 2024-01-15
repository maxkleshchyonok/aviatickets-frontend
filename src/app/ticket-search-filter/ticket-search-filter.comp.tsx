import { Button, SelectChangeEvent, Stack } from "@mui/material";
import { Cities } from "enums/cities.enum";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { FC } from "react";
import Select from "./components/select/select.comp";
import { specifyArrivalTime, specifyDepartureTime, specifyDestinationCity, specifyOriginCity } from "./store/ticket-search-filter.actions";
import { tickerSearchFilterSelector } from "./store/ticket-search-filter.selectors";
import { DatePicker } from "@mui/x-date-pickers";

interface TickerSearchFilterProps {
  onSearchButtonClick: () => void;
}

const TickerSearchFilter: FC<TickerSearchFilterProps> = ({ onSearchButtonClick, ...props }) => {
  const dispatch = useAppDispatch();

  const handleOriginCityChange = (event: SelectChangeEvent) => {
    dispatch(specifyOriginCity(event.target.value));
  };

  const handleDestinationCityChange = (event: SelectChangeEvent) => {
    dispatch(specifyDestinationCity(event.target.value));
  };

  const handleDepartureDateChange = (value: Date | null) => {
    const date = value ? new Date(value).valueOf() : null;
    dispatch(specifyDepartureTime(date));
  }

  const handleArrivalDateChange = (value: Date | null) => {
    const date = value ? new Date(value).valueOf() : null;
    dispatch(specifyArrivalTime(date));
  }

  const { originCity, destinationCity, departureTime, arrivalTime } = useAppSelector(tickerSearchFilterSelector);
  const cities = Object.values(Cities);

  const departureDate = departureTime ? new Date(departureTime) : null;
  const arrivalDate = arrivalTime ? new Date(arrivalTime) : null;

  return (
    <div className="ticket-search-filter">
      <form className="ticket-search-filter__form form">
        <Stack flexDirection={"row"} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
          <Select labelId="origin-city-label" id="origin-city-select" label="Origin city" onSelectChange={handleOriginCityChange} selectValues={cities} currentValue={originCity} />
          <Select labelId="destination-city-label" id="destination-city-select" label="Destination city" onSelectChange={handleDestinationCityChange} selectValues={cities} currentValue={destinationCity} />
          <DatePicker sx={{ minWidth: 170, flexGrow: 1 }} label="Departure date" value={departureDate} disablePast={true} onChange={handleDepartureDateChange} />
          <DatePicker sx={{ minWidth: 170, flexGrow: 1 }} label="Arrival date" value={arrivalDate} disablePast={true} onChange={handleArrivalDateChange} />
          <Button variant="contained" sx={{ flexGrow: 1, borderRadius: 0, minWidth: 200 }} onClick={onSearchButtonClick}>Search</Button>
        </Stack >
      </form>
    </div>
  );
}

export default TickerSearchFilter;