import { gql } from "../__generated__";

export const GET_ROOMS_BY_FLOOR = gql(`
  query RoomsByFloor($hotel: ID!, $startDate: DateTime!, $endDate: DateTime!) {
    roomsByFloor(hotel: $hotel, startDate: $startDate, endDate: $endDate) {
      floor
      rooms {
        _id
        number
        floor
        position
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
      }
    }
  }
`);
