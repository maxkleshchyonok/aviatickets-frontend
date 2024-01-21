import { Button, Stack } from "@mui/material";
import { BaseSyntheticEvent, FC } from "react";
import Select from "./components/select.comp";
import { TicketSearchFilterYup } from "./validation-schemas/ticket-search-filter.schema";
import { Control, FieldErrors, FieldValues, } from "react-hook-form";
import { CitiesDto } from "app/cities/types/cities.dto";
import DatePicker from "./components/date-picker.comp";

interface TickerSearchFilterProps {
  cities: CitiesDto;
  onSearchButtonClick: (data: FieldValues, event?: BaseSyntheticEvent<object, any, any> | undefined) => unknown;
  control: Control<TicketSearchFilterYup, any>;
  validationErrors: FieldErrors<TicketSearchFilterYup>;
}

const TickerSearchFilter: FC<TickerSearchFilterProps> = ({ onSearchButtonClick, cities, control, validationErrors, ...props }) => {
  const originCityHelperText = validationErrors.originCity ? `${validationErrors.originCity.message}` : '';
  const destinationCityHelperText = validationErrors.destinationCity ? `${validationErrors.destinationCity.message}` : '';
  const departureTimeHelperText = validationErrors.departureTime ? `${validationErrors.departureTime.message}` : '';
  const arrivalTimeHelperText = validationErrors.arrivalTime ? `${validationErrors.arrivalTime.message}` : '';

  return (
    <div className="ticket-search-filter">
      <form className="ticket-search-filter__form form" onSubmit={onSearchButtonClick}>
        <Stack flexDirection={"row"} sx={{ flexWrap: 'wrap', rowGap: 1, justifyContent: 'end' }}>
          <Select
            name="originCity"
            error={Boolean(validationErrors.originCity)}
            control={control}
            labelId="origin-city-label"
            id="origin-city-select"
            label="Origin city"
            selectValues={cities}
            helperText={originCityHelperText}
          />
          <Select
            name="destinationCity"
            error={Boolean(validationErrors.destinationCity)}
            control={control}
            labelId="destination-city-label"
            id="destination-city-select"
            label="Destination city"
            selectValues={cities}
            helperText={destinationCityHelperText}
          />
          <DatePicker
            name="departureTime"
            control={control}
            label="Departure date"
            error={Boolean(validationErrors.departureTime)}
            helperText={departureTimeHelperText}
          />
          <DatePicker
            name="arrivalTime"
            control={control}
            label="Arrival date"
            error={Boolean(validationErrors.arrivalTime)}
            helperText={arrivalTimeHelperText}
          />
          <Button variant="contained" sx={{ flexGrow: 1, borderRadius: 0, minWidth: 150, maxWidth: 300, fontSize: '1.1rem' }} onClick={onSearchButtonClick}>Search</Button>
        </Stack >
      </form>
    </div >
  );
}

export default TickerSearchFilter;