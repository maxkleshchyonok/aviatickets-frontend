import { Box, Typography, Grid, TextField } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { FC } from "react"
import { Controller } from "react-hook-form"

interface IPassengerForm {
  index: number,
  control: any,
  errors: any,
  minDate: any
}

export const PassengerForm: FC<IPassengerForm> = ({ index, control, errors, minDate }) => {
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
            name={`passenger.${index}.secondName`}
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                helperText={errors?.passenger?.[index]?.secondName ? `${errors?.passenger?.[index]?.secondName?.message}` : ''}
                label='Second Name'
                fullWidth
                error={!!errors?.passenger?.[index]?.secondName}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name={`passenger.${index}.dateOfBirth`}
            control={control}
            render={({ field }) => (
              <DatePicker
                label='Date Of Birth'
                minDate={minDate}
                onChange={(date: any) => field.onChange(date.$d)}
                disableFuture
                slotProps={{
                  textField: {
                    required: true,
                    error: !!errors?.passenger?.[index]?.dateOfBirth
                  }
                }}
                sx={{
                  width: '100%'
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name={`passenger.${index}.passportNumber`}
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                helperText={errors?.passenger?.[index]?.passportNumber ? `${errors?.passenger?.[index]?.passportNumber?.message}` : ''}
                label='Passport Number'
                fullWidth
                error={!!errors?.passenger?.[index]?.passportNumber}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name={`passenger.${index}.country`}
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                helperText={errors?.passenger?.[index]?.country ? `${errors?.passenger?.[index]?.country?.message}` : ''}
                label='Country'
                fullWidth
                error={!!errors?.passenger?.[index]?.country}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name={`passenger.${index}.city`}
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                helperText={errors?.passenger?.[index]?.city ? `${errors?.passenger?.[index]?.city?.message}` : ''}
                label='City'
                fullWidth
                error={!!errors?.passenger?.[index]?.city}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name={`passenger.${index}.number`}
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                helperText={errors?.passenger?.[index]?.number ? `${errors?.passenger?.[index]?.number?.message}` : ''}
                label='Contact Number'
                fullWidth
                type='number'
                error={!!errors?.passenger?.[index]?.number}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name={`passenger.${index}.email`}
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                helperText={errors?.passenger?.[index]?.email ? `${errors?.passenger?.[index]?.email?.message}` : ''}
                label='Email'
                fullWidth
                error={!!errors?.passenger?.[index]?.email}
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  )
}