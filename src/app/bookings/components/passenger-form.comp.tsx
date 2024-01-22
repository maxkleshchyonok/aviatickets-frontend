import { Box, Typography, Grid, TextField } from "@mui/material"
import { FC } from "react"
import { Control, Controller } from "react-hook-form"

interface PassengerFormProps {
  index: number,
  control: Control<any, any>,
  errors: any,
}

export const PassengerForm: FC<PassengerFormProps> = ({ index, control, errors }) => {
  return (
    <Box sx={{ padding: '10px' }}>
      <Typography variant='h6' sx={{ marginBottom: '10px' }}>Passenger {index + 1}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            name={`passenger.${index}.firstName`}
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                helperText={errors?.passenger?.[index]?.firstName ? `${errors?.passenger?.[index]?.firstName?.message}` : ''}
                label='First Name'
                fullWidth
                id={`passenger.${index}.firstName`}
                error={!!errors?.passenger?.[index]?.firstName}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name={`passenger.${index}.lastName`}
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                helperText={errors?.passenger?.[index]?.lastName ? `${errors?.passenger?.[index]?.lastName?.message}` : ''}
                label='Last Name'
                fullWidth
                error={!!errors?.passenger?.[index]?.lastName}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name={`passenger.${index}.passportId`}
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                helperText={errors?.passenger?.[index]?.passportId ? `${errors?.passenger?.[index]?.passportId?.message}` : ''}
                label='Passport Id'
                fullWidth
                error={!!errors?.passenger?.[index]?.passportId}
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  )
}