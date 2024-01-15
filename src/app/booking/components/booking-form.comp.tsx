import { Box, Button, Grid, TextField } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from "react-hook-form"
import { schemaCreateBooking } from "../booking-schemas.yup"

export const BookingForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<any>({
    mode: 'all',
    resolver: yupResolver(schemaCreateBooking)
  })

  const minDate = dayjs().subtract(100, 'years');

  return (
    <Box component='form'
      onSubmit={handleSubmit((data: any) => {
        console.log(data)
      })}
      sx={{
        borderRadius: '20px',
        padding: '20px'
      }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                helperText={errors.firstName ? `${errors.firstName.message}` : ''}
                label='First Name'
                fullWidth
                id="firstName"
                error={!!errors.firstName}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="secondName"
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                helperText={errors.secondName ? `${errors.secondName.message}` : ''}
                label='Second Name'
                fullWidth
                id="secondName"
                error={!!errors.secondName}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='dateOfBirth'
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
                    error: !!errors.dateOfBirth
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
            name="passportNumber"
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                helperText={errors.passportNumber ? `${errors.passportNumber.message}` : ''}
                label='Passport Number'
                fullWidth
                id="passportNumber"
                error={!!errors.passportNumber}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="country"
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                helperText={errors.country ? `${errors.country.message}` : ''}
                label='Country'
                fullWidth
                id="country"
                error={!!errors.country}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="city"
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                helperText={errors.city ? `${errors.city.message}` : ''}
                label='City'
                fullWidth
                id="city"
                error={!!errors.city}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="number"
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                helperText={errors.number ? `${errors.number.message}` : ''}
                label='Contact Number'
                fullWidth
                type='number'
                id="number"
                error={!!errors.number}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="email"
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                helperText={errors.email ? `${errors.email.message}` : ''}
                label='Email'
                fullWidth
                id="email"
                error={!!errors.email}
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
      <Button variant='contained' type='submit' sx={{ marginTop: '20px' }}>Submit</Button>
    </Box>
  )
}