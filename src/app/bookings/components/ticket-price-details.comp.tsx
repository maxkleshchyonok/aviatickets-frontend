import { Box, Divider, Typography } from "@mui/material"
import { TicketDto } from "app/tickets/types/ticket.dto";
import { FC } from "react";

interface TicketPriceDetailsProps {
  ticket: TicketDto;
}

const TicketPriceDetails: FC<TicketPriceDetailsProps> = ({ ticket }) => {
  //get passengers amount from the store to get total price
  return (
    <Box style={{ gridArea: 'ticketSummary', }}>
      <Typography variant='h6' sx={{
        // backgroundColor: 'lightGrey',
        padding: '10px',
        borderRadius: '20px 20px 0 0'
      }}>Fare Summary</Typography>
      <Divider />
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px'
      }}>
        <Typography variant='body1'>Ticket</Typography>
        <Typography variant='body1'>Price</Typography>
      </Box>
      <Box sx={{
        backgroundColor: 'lightGrey',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: '0 0 20px 20px'
      }}>
        <Typography variant='h6'>Total</Typography>
        <Typography variant='h6'>Total Price</Typography>
      </Box>
    </Box>
  )
};

export default TicketPriceDetails;