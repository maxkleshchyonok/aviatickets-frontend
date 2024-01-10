import { Box, Typography } from "@mui/material"
import { TicketData } from "app/ticket/components/TicketData"

export const BookingTicket = () => {
  return (
    <Box
    sx={{
      borderRadius: '20px'
    }}>
      <Typography variant='h6' sx={{
        backgroundColor: 'lightGrey',
        padding: '10px',
        borderRadius: '20px 20px 0 0'
      }}>
        Aviasales
      </Typography>
      <TicketData />
    </Box>
  )
}