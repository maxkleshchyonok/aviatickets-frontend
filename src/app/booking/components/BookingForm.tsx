import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Input, Radio, RadioGroup, TextField } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"

export const BookingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<any>()
  const [date, setDate] = useState('');
  
  return (
    <Box component='form'
      onSubmit={handleSubmit((data: any) => {
        data.dateOfBirth = date
        console.log(data)})}
      sx={{
        borderRadius: '20px',
        padding: '20px'
      }}>
      {/* <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Select Title</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          row
          aria-required
        >
          <FormControlLabel value="mr" control={<Radio />} label="Mr" />
          <FormControlLabel value="ms" control={<Radio />} label="Ms" />
          <FormControlLabel value="mrs" control={<Radio />} label="Mrs" />
        </RadioGroup>
      </FormControl> */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField 
          label='First Name'
          fullWidth 
          {...register('firstName', { required: 'First name is required' })}
          helperText={errors.firstName?.message as ReactNode}
          error={!!errors.firstName?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
          label='Second Name' 
          fullWidth 
          {...register('secondName', { required: 'Second name is required' })}
          helperText={errors.secondName?.message as ReactNode}
          error={!!errors.secondName?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker 
          label='Date Of Birth'
          value={date}
          onChange={(newDate) => setDate(String(newDate))}
          disableFuture
          sx={{
            width: '100%'
          }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
          label='Passport Number' 
          fullWidth 
          {...register('passportNumber', { required: 'Passport number is required' })}
          helperText={errors.passportNumber?.message as ReactNode}
          error={!!errors.passportNumber?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
          label='Country' 
          fullWidth 
          {...register('country', { required: 'Country is required' })}
          helperText={errors.country?.message as ReactNode}
          error={!!errors.country?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
          label='City' 
          fullWidth 
          {...register('city', { required: 'City is required' })}
          helperText={errors.city?.message as ReactNode}
          error={!!errors.city?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
          type='number' 
          label='Contact Number' 
          fullWidth 
          {...register('contactNumber', { required: 'Contact number is required' })}
          helperText={errors.contactNumber?.message as ReactNode}
          error={!!errors.contactNumber?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
          label='Email' 
          type='email' 
          fullWidth
          {...register('email', 
          { required: 'Email is required', 
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Must be an email'
            }
          })}
          helperText={errors.email?.message as ReactNode}
          error={!!errors.email?.message}
          />
        </Grid>
      </Grid>
      <Button variant='contained' type='submit' sx={{marginTop: '20px'}}>Submit</Button>
    </Box>
  )
}