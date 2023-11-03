import { gql } from "../__generated__";

// create booking
export const CREATE_BOOKING = gql(`
mutation CreateBooking($createBookingInput: CreateBookingInput!) {
    createBooking(createBookingInput: $createBookingInput){
        _id
        customer
        hotel
        paymentStatus
        guests{
          name
          phone
        }
  }
}
`);

// update booking

export const UPDATE_ROOM_BOOKING = gql(`
 mutation UpdateRoomBooking(
    $updateRoomBookingInput: UpdateRoomBookingInput!
  ) {
    updateRoomBooking(updateRoomBookingInput: $updateRoomBookingInput) {
      _id
      room
      checkIn
      checkOut
      rent
      discount
      extraBed
      extraBreakfast
      booking
      hotel
      status
    }
  }

`);

export const UPDATE_BOOKING = gql(`
mutation UpdateBooking($updateBookingInput: UpdateBookingInput!) {
    updateBooking(updateBookingInput: $updateBookingInput){
        _id
        customer
        hotel
        paymentStatus
        number
  }
}
`);

// delete booking
export const REMOVE_ROOM_BOOKING = gql(`
mutation RemoveRoomBooking($id:ID!) {
    removeRoomBooking(id: $id) {
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
        room
    }
}

`);

// bookingId: 6544b236a6251434b00f0440
