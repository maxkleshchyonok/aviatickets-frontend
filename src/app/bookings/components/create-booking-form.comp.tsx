import { Box, Button } from "@mui/material"
import { yupResolver } from '@hookform/resolvers/yup'
import { useFieldArray, useForm } from "react-hook-form"
import { PassengerForm } from "./passenger-form.comp"
import { createBookingSchema } from "../validation-schemas/create-booking.schema"
import { FC } from "react"

export type Passenger = {
  firstName: string,
  lastName: string,
  passportId: string,
}

export type FormValues = {
  passenger: Passenger[]
}

interface CreateBookingFormProps {
  onBookButtonClick: () => void;
}

const CreateBookingForm: FC<CreateBookingFormProps> = ({ onBookButtonClick }) => {
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
        lastName: '',
        passportId: '',
      }))
    }
  })

  const { fields } = useFieldArray({
    name: 'passenger',
    control,
  })

  return (
    <Box component='form'
      onSubmit={handleSubmit(onBookButtonClick)}
      sx={{
        borderRadius: '20px',
        padding: '20px 0'
      }}>
      {fields.map((field, index) => (
        <PassengerForm key={field.id} index={index} control={control} errors={errors} />
      ))}
      <Button variant='contained' type='submit' sx={{ marginTop: '20px' }}>Submit</Button>
    </Box>
  )
};

export default CreateBookingForm;