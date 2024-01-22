import { Box, Button, ButtonProps, Stack, StackProps, styled } from "@mui/material"
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

const StyledForm = styled('form')(() => ({
  borderRadius: '20px',
  padding: '20px 0'
}));

const StyledStack = styled(Stack)<StackProps>(() => ({
  flexDirection: 'column',
  rowGap: '20px',
}));

const StyledBookButton = styled(Button)<ButtonProps>(() => ({
  fontSize: '1rem',
  alignSelf: 'center'
}));

const CreateBookingForm: FC<CreateBookingFormProps> = ({ onBookButtonClick }) => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'all',
    resolver: yupResolver(createBookingSchema) as any,
    defaultValues: {
      passenger: Array.from(Array(2), () => ({
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
    <StyledForm onSubmit={handleSubmit(onBookButtonClick)}>
      <StyledStack>
        {fields.map((field, index) => (
          <PassengerForm key={field.id} index={index} control={control} errors={errors} />
        ))}
        <StyledBookButton variant='contained' type='submit'>Book</StyledBookButton>
      </StyledStack>
    </StyledForm >
  )
};

export default CreateBookingForm;