import { gql } from "../__generated__";

export const GET_BOOKING = gql(`
 query Booking($id:ID!) {
      booking(id: $id) {
        _id
        customer
        hotel
        paymentStatus
        number
        guests{
          name
          phone
        }
     }
 }

`);

export const GET_BOOKINGS = gql(`
  query Bookings {
    bookings {
        _id
        number
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

// booking logs
export const GET_BOOKING_LOGS = gql(`
query BookingLogs($filter: BookingLogFilter!) {
  bookingLogs (filter:$filter){
    _id
    booking
    user
    type
    createdAt
    updatedAt
  }
}
`);
