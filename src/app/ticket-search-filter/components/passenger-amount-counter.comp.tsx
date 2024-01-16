import { Stack, Typography, IconButton } from "@mui/material";
import { FC } from "react";
import MinusIcon from "@mui/icons-material/RemoveOutlined";
import PlusIcon from "@mui/icons-material/AddOutlined";
import { PassengerAmount } from "../constants/passenger-amount.constants";

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
        <IconButton aria-label="minus"
          disabled={passengerAmount === PassengerAmount.Min}
          onClick={props.onReducePassengerAmountClick}
        >
          <MinusIcon />
        </IconButton>
        <Typography>{passengerAmount}</Typography>
        <IconButton aria-label="plus"
          disabled={passengerAmount === PassengerAmount.Max}
          onClick={props.onIncreasePassengerAmountClick}
        >
          <PlusIcon />
        </IconButton>
      </Stack>
    </Stack>
  )
}

export default PassengerAmountCounter;