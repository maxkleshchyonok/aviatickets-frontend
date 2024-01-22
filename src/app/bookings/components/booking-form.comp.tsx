import { Box, Button, Tab, Tabs } from "@mui/material"
import dayjs from "dayjs"
import { yupResolver } from '@hookform/resolvers/yup'
import { useFieldArray, useForm } from "react-hook-form"
import { PassengerForm } from "./passenger-form.comp"
import { useDispatch, useSelector } from "react-redux"
import { setActiveTab } from "../store/booking.slice"
import { activeTabSelector } from "../store/booking.selectors"
import { createBookingSchema } from "../validation-schemas/create-booking.schema"

export type Passenger = {
  firstName: string,
  secondName: string,
  dateOfBirth: string,
  passportNumber: string,
  country: string,
  city: string,
  number: string,
  email: string
}

export type FormValues = {
  passenger: Passenger[]
}

export const BookingForm = () => {
  const activeTab = useSelector(activeTabSelector);
  const dispatch = useDispatch();
  //get passenger amount from the store
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'all',
    resolver: yupResolver(createBookingSchema) as any,
    defaultValues: {
      passenger: Array.from(Array(1), () => ({ //pass the amount of passengers
        firstName: '',
        secondName: '',
        dateOfBirth: '',
        passportNumber: '',
        country: '',
        city: '',
        number: '',
        email: ''
      }))
    }
  })

  const { fields } = useFieldArray({
    name: 'passenger',
    control,
  })

  const minDate = dayjs().subtract(100, 'years');

  return (
    <Box component='form'
      onSubmit={handleSubmit((data: any) => {
        dispatch(setActiveTab(1))
        console.log(data)
      })}
      sx={{
        borderRadius: '20px',
        padding: '20px 0'
      }}>
      {fields.map((field, index) => (
        <PassengerForm key={field.id} index={index} control={control} errors={errors} minDate={minDate} />
      ))}
      <Button variant='contained' type='submit' sx={{ marginTop: '20px' }}>Submit</Button>
    </Box>
  )
}