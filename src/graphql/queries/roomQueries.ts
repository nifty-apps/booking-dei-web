import { gql } from "../__generated__";

// get rooms
export const GET_ROOM_BOOKING_OVERVIEW = gql(`
  query RoomBookingsOverview {
    roomBookingsOverview(
        hotel: "64d0a1d008291a484b015d0b"
        startDate: "2023-07-1"
        endDate: "2023-07-30"
    ) {
        _id
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
    }
}
`);
