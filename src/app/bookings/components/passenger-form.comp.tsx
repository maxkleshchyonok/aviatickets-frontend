import { Box, Typography, Grid, TextField } from "@mui/material"
import { FC } from "react"
import { Control, Controller, FieldErrors } from "react-hook-form"
import { CreateBookingFormYup } from "../validation-schemas/create-booking-form.schema"

interface PassengerFormProps {
  index: number,
  control: Control<CreateBookingFormYup, any>,
  validationErrors: FieldErrors<CreateBookingFormYup>;
}

export const PassengerForm: FC<PassengerFormProps> = ({ index, control, validationErrors }) => {
  return (
    <Box sx={{ padding: '10px' }}>
      <Typography variant='h6' sx={{ marginBottom: '10px' }}>Passenger {index + 1}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            name={`passengers.${index}.firstName`}
            control={control}
            render={({ field }) => (
              <TextField
                helperText={validationErrors.passengers?.[index]?.firstName?.message}
                label='First Name'
                fullWidth
                id={`passengers.${index}.firstName`}
                error={Boolean(validationErrors.passengers?.[index]?.firstName)}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name={`passengers.${index}.lastName`}
            control={control}
            render={({ field }) => (
              <TextField
                helperText={validationErrors.passengers?.[index]?.lastName?.message}
                label='Last Name'
                fullWidth
                error={Boolean(validationErrors.passengers?.[index]?.lastName)}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name={`passengers.${index}.passportId`}
            control={control}
            render={({ field }) => (
              <TextField
                helperText={validationErrors.passengers?.[index]?.passportId?.message}
                label='Passport Id'
                fullWidth
                error={Boolean(validationErrors?.passengers?.[index]?.passportId)}
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  )
}