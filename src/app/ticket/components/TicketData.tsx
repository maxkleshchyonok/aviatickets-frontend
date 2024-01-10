import { Box, Chip, Divider, Grid, Typography } from "@mui/material"

export const TicketData = () => {
  return (
    <Grid container spacing={2} sx={{padding: '20px'}}>
      <Grid item xs={4}>
        <Box textAlign='center'>
          <Typography variant='body2' component='h3'>Depart</Typography>
          <Typography variant='h5'>20:15</Typography>
          <Typography variant='h5'>4 October 2024</Typography>
          <Typography variant='body2'>Airport</Typography>
        </Box>
      </Grid>
      <Grid item xs={4} sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
        <Box textAlign='center'>
          <Divider variant='fullWidth'>
            <Chip label='12h 30m'/>
          </Divider>
          <Typography variant='caption' color='grey'>2 stop</Typography>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box textAlign='center'>
          <Typography variant='body2' component='h3'>Arrive</Typography>
          <Typography variant='h5'>20:15</Typography>
          <Typography variant='h5'>5 October 2024</Typography>
          <Typography variant='body2'>Airport</Typography>
        </Box>
      </Grid>
    </Grid>
  )
}