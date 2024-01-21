import { FormControl, FormControlProps, InputLabel, MenuItem, Select as MuiSelect, SelectProps as MuiSelectProps, styled } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { v4 } from 'uuid';
import { TicketSearchFilterYup } from "../validation-schemas/ticket-search-filter.schema";

type KeysWithValuesOfType<T, V> = keyof { [P in keyof T as T[P] extends V ? P : never]: P };

interface SelectProps extends MuiSelectProps<string> {
  id: string;
  labelId: string;
  label: string;
  selectValues: string[];
  selectItemIds?: string[] | number[];
  name: KeysWithValuesOfType<TicketSearchFilterYup, string>;
  control: Control<TicketSearchFilterYup, any>;
  helperText: string;
}

const StyledFormControl = styled(FormControl)<FormControlProps>(() => ({
  minWidth: 170,
  flex: '1 1 20%'
}));

const Select: FC<SelectProps> = ({ selectValues, selectItemIds = [], label, labelId, helperText, ...props }) => {
  const menuItemIds = selectItemIds.length ? selectItemIds : Array.from({ length: selectValues.length }, () => v4());

  return (
    <StyledFormControl>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller control={props.control} name={props.name} render={({ field }) => (
        <MuiSelect {...props} variant={'outlined'} {...field} >
          {
            selectValues.map((value, ind) => <MenuItem value={value} key={menuItemIds[ind]}>{value}</MenuItem>)
          }
        </MuiSelect>
      )} />
      <FormHelperText error={props.error}>{helperText}</FormHelperText>
    </StyledFormControl >
  )
}

export default Select;