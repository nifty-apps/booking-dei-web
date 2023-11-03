import { gql } from "../__generated__";

export const GET_BOOKING = gql(`
 query Booking($id:ID!) {
      booking(id: $id) {
        _id
        customer
        hotel
        paymentStatus
     }
 }

`);

export const GET_CONTACT = gql(`
 query Contact($id:ID!) {
    contact(id: $id) {
        _id
        name
        phone
        idType
        idNo
        address
        hotel
        type
    }
}
`);

export const GET_ROOM_INFO = gql(`
query Room($id:ID!) {
    room(id:$id) {
        _id
        number
        floor
        position
        type
        hotel
    }
}

`);



export const GET_BOOKINGS = gql(`
  query Bookings($bookingFilter: BookingFilter) {
    bookings(bookingFilter: $bookingFilter) {
      _id
      customer
      paymentStatus
      number
      hotel
    }
  }
`);
