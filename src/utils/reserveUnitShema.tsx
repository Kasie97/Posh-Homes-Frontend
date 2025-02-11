import * as Yup from "yup";

export const reserveUnitSchema = Yup.object().shape({
  customerName: Yup.string().required("Name is required"),
  customerEmail: Yup.string()
    .email("Invalid email address")
    .required("customerEmail is required"),
    customerPhone: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .required("Phone number is required"),
  // price: Yup.string().required("unitPrice is required"),
  // location: Yup.string().required("Location is required"),
  checkInDate: Yup.string().required("Check-in date is required"),
  checkOutDate: Yup.string().required("Check-out date is required"),
});

export const editReserveUnitSchema = Yup.object().shape({
  customerName: Yup.string(),
  customerEmail: Yup.string().email("Invalid email address"),
  customerPhone: Yup.string().matches(/^\+?[0-9]+$/, "Invalid phone number"),
  // unitPrice: Yup.string().required("unitPrice is required"),
  // location: Yup.string(),
  checkInDate: Yup.string(),
  checkOutDate: Yup.string(),
});
