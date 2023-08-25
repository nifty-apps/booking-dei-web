import { gql } from "../__generated__";

export const CREATE_BOOKING = gql(`
mutation CreateBooking($createBookingInput: CreateBookingInput!) {
    createBooking(createBookingInput: $createBookingInput){
        _id
        contact
        hotel
        paymentStatus
  }
}
`);
