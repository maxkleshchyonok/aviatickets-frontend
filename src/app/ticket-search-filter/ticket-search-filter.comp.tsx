import { Button, SelectChangeEvent, Stack } from "@mui/material";
import { Cities } from "enums/cities.enum";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { FC } from "react";
import Select from "./components/select.comp";
import { specifyArrivalTime, specifyDepartureTime, specifyDestinationCity, specifyOriginCity, specifyPassengerAmount } from "./store/ticket-search-filter.actions";
import { tickerSearchFilterSelector } from "./store/ticket-search-filter.selectors";
import { DatePicker } from "@mui/x-date-pickers";
import PassengerAmountCounter from "./components/passenger-amount-counter.comp";
import { PassengerAmount } from "./constants/passenger-amount.constants";
import dayjs from 'dayjs';

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

  const handleDepartureDateChange = (value: dayjs.Dayjs | null) => {
    const dateString = value ? value.toDate().toDateString() : "";
    dispatch(specifyDepartureTime(dateString));
  }

  const handleArrivalDateChange = (value: dayjs.Dayjs | null) => {
    const dateString = value ? value.toDate().toDateString() : "";
    dispatch(specifyArrivalTime(dateString));
  }

  const handleReducePassengerAmount = () => {
    const changedAmount = passengerAmount - 1;
    if (changedAmount >= PassengerAmount.Min) {
      dispatch(specifyPassengerAmount(changedAmount))
    }
  }

  const handleIncreasePassengerAmount = () => {
    const changedAmount = passengerAmount + 1;
    if (changedAmount <= PassengerAmount.Max) {
      dispatch(specifyPassengerAmount(changedAmount))
    }
  }

  const { originCity, destinationCity, departureTime, arrivalTime, passengerAmount } = useAppSelector(tickerSearchFilterSelector);
  const cities = Object.values(Cities);

  const departureDate = departureTime ? dayjs(departureTime) : null;
  const arrivalDate = arrivalTime ? dayjs(arrivalTime) : null;

  return (
    <div className="ticket-search-filter">
      <form className="ticket-search-filter__form form">
        <Stack flexDirection={"row"} sx={{ flexWrap: 'wrap', rowGap: 1, justifyContent: 'end' }}>
          <Select labelId="origin-city-label" id="origin-city-select" label="Origin city" onSelectChange={handleOriginCityChange} selectValues={cities} currentValue={originCity} />
          <Select labelId="destination-city-label" id="destination-city-select" label="Destination city" onSelectChange={handleDestinationCityChange} selectValues={cities} currentValue={destinationCity} />
          <DatePicker sx={{ minWidth: 170, flexGrow: 1 }} label="Departure date" value={departureDate} disablePast={true} onChange={handleDepartureDateChange} />
          <DatePicker sx={{ minWidth: 170, flexGrow: 1 }} label="Arrival date" value={arrivalDate} disablePast={true} onChange={handleArrivalDateChange} />
          <PassengerAmountCounter passengerAmount={passengerAmount} onReducePassengerAmountClick={handleReducePassengerAmount} onIncreasePassengerAmountClick={handleIncreasePassengerAmount} />
          <Button variant="contained" sx={{ flexGrow: 1, borderRadius: 0, minWidth: 150, maxWidth: 300, fontSize: '1.1rem' }} onClick={onSearchButtonClick}>Search</Button>
        </Stack >
      </form>
    </div >
  );
}

export default TickerSearchFilter;