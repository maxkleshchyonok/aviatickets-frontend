import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { PassengerAmount } from "../constants/passenger-amount.constants";
import MinusIconButton from "components/minus-icon-button.comp";
import PlusIconButton from "components/plus-icon-buttom.comp";

interface PassengerAmountCounterProps {
  onReducePassengerAmountClick: () => void;
  onIncreasePassengerAmountClick: () => void;
  passengerAmount: number;
}

const PassengerAmountCounter: FC<PassengerAmountCounterProps> = ({ passengerAmount, ...props }) => {
  return (
    <Stack justifyContent={'center'} alignItems={'center'} flexDirection={'row'} sx={{ p: '6px', border: '1px solid lightgray', borderRadius: '4px', columnGap: '8px', flexGrow: 1 }}>
      <Typography>
        Passenger amount
      </Typography>
      <Stack flexDirection={'row'} columnGap="15px" justifyContent="flex-end" alignItems="center">
        <MinusIconButton disabled={passengerAmount === PassengerAmount.Min} onClick={props.onReducePassengerAmountClick} />
        <Typography>{passengerAmount}</Typography>
        <PlusIconButton disabled={passengerAmount === PassengerAmount.Max} onClick={props.onIncreasePassengerAmountClick} />
      </Stack>
    </Stack >
  )
}

export default PassengerAmountCounter;