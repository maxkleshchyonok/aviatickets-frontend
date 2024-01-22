import * as yup from "yup";
import { Passenger } from "../components/create-booking-form.comp";

export const createBookingSchema = yup
  .object()
  .shape({
    passenger: yup.array().of(
      yup.object<Passenger>().shape({
        firstName: yup.string().max(50, "50 symbols max").required("First name is required"),
        passportId: yup.string().max(50, "50 symbols max").required("Passport number is required"),
        lastName: yup.string().max(50, "50 symbols max").required("Last name is required"),
      })
    ),
  })
  .required();
