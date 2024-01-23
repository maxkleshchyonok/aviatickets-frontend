import { Box, Typography, Grid, TextField, StackProps, Stack, styled, TypographyProps } from "@mui/material"
import { FC } from "react"
import { Control, Controller, FieldErrors } from "react-hook-form"
import { CreateBookingFormYup } from "../validation-schemas/create-booking-form.schema"

interface PassengerFormProps {
  index: number,
  control: Control<CreateBookingFormYup, any>,
  validationErrors: FieldErrors<CreateBookingFormYup>;
}

const StyledContainer = styled(Stack)<StackProps>(() => ({
  padding: '10px'
}));

const StyledPassengerNumber = styled(Typography)<TypographyProps>(() => ({
  marginBottom: '10px',
  fontSize: '20px'
}));

const StyledPassengerFormContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  rowGap: '32px',
  columnGap: '20px',

  '@media(max-width: 700px)': {
    flexWrap: 'wrap'
  },
}));

export const PassengerForm: FC<PassengerFormProps> = ({ index, control, validationErrors }) => {
  return (
    <StyledContainer>
      <StyledPassengerNumber>Passenger {index + 1}</StyledPassengerNumber>
      <StyledPassengerFormContainer>
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
      </StyledPassengerFormContainer>
    </StyledContainer>
  )
}