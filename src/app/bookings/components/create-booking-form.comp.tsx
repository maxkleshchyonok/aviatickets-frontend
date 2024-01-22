import { Button, ButtonProps, Stack, StackProps, styled } from "@mui/material"
import { yupResolver } from '@hookform/resolvers/yup'
import { useFieldArray, useForm } from "react-hook-form"
import { PassengerForm } from "./passenger-form.comp"
import { FC } from "react"
import { createBookingFormSchema, CreateBookingFormYup } from "../validation-schemas/create-booking-form.schema"

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
  const { handleSubmit, control, formState: { errors } } = useForm<CreateBookingFormYup>({
    mode: 'all',
    resolver: yupResolver(createBookingFormSchema),
    defaultValues: {
      passengers: Array.from(Array(2), () => ({ firstName: '', lastName: '', passportId: '' }))
    }
  })

  const { fields } = useFieldArray({
    name: 'passengers',
    control,
  })

  return (
    <StyledForm onSubmit={handleSubmit(onBookButtonClick)}>
      <StyledStack>
        {fields.map((field, index) => (
          <PassengerForm key={field.id} index={index} control={control} validationErrors={errors} />
        ))}
        <StyledBookButton variant='contained' type='submit'>Book</StyledBookButton>
      </StyledStack>
    </StyledForm >
  )
};

export default CreateBookingForm;