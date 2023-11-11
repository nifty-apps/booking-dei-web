import { gql } from "../__generated__";

export const GET_ROOM_BOOKING_FINANCIALS = gql(`
  query RoomBookingFinancials(
    $hotel: ID!,
    $startDate: DateTime!,
    $endDate: DateTime!
  ) {
    roomBookingFinancials(
      hotel: $hotel, 
      startDate: $startDate,
      endDate: $endDate
    ) {
      _id
      number
      type {
        title
        rent
      }
      floor
      position
      roombookings {
        checkIn
        checkOut
        rent
        discount
        booking
        status
        bookingCustomer
        bookingPayment
        bookingRent
        bookingDue
        _id
      }
    }
  }

`);
export const GET_ROOM_BOOKINGS = gql(`
query RoomBookings($roomBookingFilter: RoomBookingFilter!) {
  roomBookings(roomBookingFilter: $roomBookingFilter) {
    _id
    checkIn
    checkOut
    rent
    discount
    extraBed
    extraBreakfast
    booking
    hotel
    status
    room {
      _id
      number
    }
  }
}
`);