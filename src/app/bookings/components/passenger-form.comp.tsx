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
            name={`passengers.${index}.firstName`}
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                helperText={errors?.passengers?.[index]?.firstName ? `${errors?.passengers?.[index]?.firstName?.message}` : ''}
                label='First Name'
                fullWidth
                id={`passengers.${index}.firstName`}
                error={!!errors?.passengers?.[index]?.firstName}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name={`passengers.${index}.lastName`}
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                helperText={errors?.passengers?.[index]?.lastName ? `${errors?.passengers?.[index]?.lastName?.message}` : ''}
                label='Last Name'
                fullWidth
                error={!!errors?.passengers?.[index]?.lastName}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name={`passengers.${index}.passportId`}
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                helperText={errors?.passengers?.[index]?.passportId ? `${errors?.passengers?.[index]?.passportId?.message}` : ''}
                label='Passport Id'
                fullWidth
                error={!!errors?.passengers?.[index]?.passportId}
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  )
}