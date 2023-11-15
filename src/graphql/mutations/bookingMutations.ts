import { gql } from "../__generated__";

// create booking
export const CREATE_BOOKING = gql(`
mutation CreateBooking($createBookingInput: CreateBookingInput!) {
    createBooking(createBookingInput: $createBookingInput){
        _id
        customer
        hotel
        paymentStatus
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


// update Room 
export const UPDATE_ROOM = gql(`
  mutation UpdateRoom($updateRoomInput: UpdateRoomInput!) {
    updateRoom(updateRoomInput: $updateRoomInput) {
      _id
      number
      floor
      position
      type
      hotel
      detactivatedAt
    }
  }
`);

//create Room type
export const CREATE_ROOM_TYPE = gql(`
  mutation CreateRoomType($createRoomTypeInput: CreateRoomTypeInput!) {
    createRoomType(createRoomTypeInput: $createRoomTypeInput) {
      _id
      title
      rent
      hotel
    }
  }
`);
// create room
export const CREATE_ROOM = gql(`
  mutation CreateRoom($createRoomInput: CreateRoomInput!) {
    createRoom(createRoomInput: $createRoomInput) {
      _id
      number
      floor
      position
      type
      hotel
      detactivatedAt
    }
  }
`);