import { gql } from "@apollo/client";

// get rooms
export const GET_ROOMS = gql(`
  query Hotels {
    rooms {
      _id
      number
      hotel
      type {
        title
        rent
      }
    }
  }
`);

// get roomBookings
export const RoomBookings = gql(`
    query RoomBookings {
        roomBookings(
            roomBookingFilter: {hotelId: "64d0a1d008291a484b015d0b", startDate: "2023-07-16", endDate: "2023-07-17"}
        ) {
              status
          }
    }
`);