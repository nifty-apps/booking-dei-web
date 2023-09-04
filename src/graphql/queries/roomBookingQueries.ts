import { gql } from "../__generated__";

export const GET_ROOM_BOOKING = gql(`
 query RoomBookings($roomBookingFilter: RoomBookingFilter!) {
    roomBookings(roomBookingFilter: $roomBookingFilter) {
        _id
        checkIn
        checkOut
        rent
        discount
        extraBed
        extraBreakfast
        room
        booking
        hotel
        status
    }
}
`);

