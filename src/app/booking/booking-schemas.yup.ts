import * as yup from "yup";
import { Passenger } from "./components/booking-form.comp";

export const schemaCreateBooking = yup
  .object()
  .shape({
    passenger: yup.array().of(
      yup.object<Passenger>().shape({
        city: yup.string().max(50, "50 symbols max").required("City is required"),
        country: yup.string().max(50, "50 symbols max").required("Country is required"),
        dateOfBirth: yup.date().required("Date of birth is required"),
        email: yup.string().email("Must be an email").required("Email is required"),
        firstName: yup.string().max(50, "50 symbols max").required("First name is required"),
        number: yup.string().max(50, "50 symbols max").required("Number is required"),
        passportNumber: yup.string().max(50, "50 symbols max").required("Passport number is required"),
        secondName: yup.string().max(50, "50 symbols max").required("Second name is required"),
      })
    ),
  })
  .required();
