import { Box, Button, Container } from "@mui/material"
import { FC } from "react"

export const BookingPaymentForm: FC = () => {
  return (
    <Box
      component='form'
      onSubmit={(e) => {
        e.preventDefault()
        console.log('Order Paid')
      }}
    >
      <Container
        maxWidth='md'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh'
        }}
      >
        <Button
          variant='contained'
          type='submit'
        >
          Make a purchase
        </Button>
      </Container>
    </Box>
  )
}