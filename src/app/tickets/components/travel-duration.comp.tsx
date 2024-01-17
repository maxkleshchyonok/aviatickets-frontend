import { Chip, Divider, Typography, styled, DividerProps, ChipProps, TypographyProps } from "@mui/material";
import { FC } from "react";

interface TravelDurationProps {
  stopNumber: number;
  travelTime: number;
}

const StyledTravelDuration = styled('div')((props) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyItems: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  rowGap: '10px',
  width: '100%'
}));

const StyledDivider = styled(Divider)<DividerProps>((props) => ({
  width: '100%',
}));

const StyledChip = styled(Chip)<ChipProps>((props) => ({
  fontSize: '1.1rem',
}));

const StyledStopNumber = styled(Typography)<TypographyProps>((props) => ({
  fontSize: '0.9rem',
}));

const TravelDuration: FC<TravelDurationProps> = ({ stopNumber, travelTime }) => {
  const travelDate = new Date(travelTime);
  const stopNumberText = stopNumber ? `stop amount ${stopNumber}` : "without stops";

  return (
    <StyledTravelDuration>
      <StyledDivider variant='fullWidth'>
        <StyledChip label={travelDate.getHours() + ':' + travelDate.getMinutes()} />
      </StyledDivider>
      <StyledStopNumber variant='caption' color='grey'>{stopNumberText}</StyledStopNumber>
    </StyledTravelDuration>
  );
}

export default TravelDuration;