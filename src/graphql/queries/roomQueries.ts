import { gql } from "../__generated__";

// Define the GraphQL query with placeholders for variables
export const GET_ROOM_BOOKING_OVERVIEW = gql(`
  query RoomBookingsOverview(
    $hotel: ID!
    $startDate: DateTime!
    $endDate: DateTime!
  ) {
    roomBookingsOverview(
      hotel: $hotel
      startDate: $startDate
      endDate: $endDate
    ) {
      number
      type {
        title
        rent
      }
      bookings {
        _id
        rent
        booking
        discount
        checkIn
        checkOut
        status
      }
      _id
    }
  }
`);
