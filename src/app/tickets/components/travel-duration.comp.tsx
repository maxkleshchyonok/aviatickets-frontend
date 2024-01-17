import { Chip, Divider, styled, Typography } from "@mui/material";
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

const TravelDuration: FC<TravelDurationProps> = ({ stopNumber, travelTime }) => {
  const travelDate = new Date(travelTime);
  const stopNumberText = stopNumber ? `stop amount ${stopNumber}` : "without stops";

  return (
    <StyledTravelDuration>
      <Divider variant='fullWidth' sx={{ width: '100%' }}>
        <Chip label={travelDate.getHours() + ':' + travelDate.getMinutes()} />
      </Divider>
      <Typography variant='caption' color='grey'>{stopNumberText}</Typography>
    </StyledTravelDuration>
  );
}

export default TravelDuration;