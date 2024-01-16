import { FormControl, InputLabel, MenuItem, Select as MuiSelect, SelectChangeEvent, SelectProps as MuiSelectProps } from "@mui/material";
import { FC } from "react";

interface SelectProps extends MuiSelectProps<string> {
  id: string;
  labelId: string
  selectValues: string[];
  currentValue: string;
  label: string;
  onSelectChange: (event: SelectChangeEvent) => void;
}

const Select: FC<SelectProps> = ({ currentValue, selectValues, onSelectChange, label, labelId, ...props }) => {
  return (
    <FormControl sx={{ minWidth: 170, flex: '1 1 20%' }}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <MuiSelect {...props} value={currentValue} onChange={onSelectChange} variant={'outlined'}>
        {
          selectValues.map((value) => <MenuItem value={value}>{value}</MenuItem>)
        }
      </MuiSelect>
    </FormControl>
  )
}

export default Select;