import { gql } from "../__generated__";

export const GET_ROOMS_BY_FLOOR = gql(`
  query RoomsByFloor($hotel: ID!, $startDate: DateTime!, $endDate: DateTime!) {
    roomsByFloor(hotel: $hotel, startDate: $startDate, endDate: $endDate) {
       floor
        rooms {
            _id
            number
            type {
                title
                rent
            }
            roombookings {
                _id
                checkIn
                checkOut
                rent
                discount
                booking
                status
                bookingCustomer
            }
            floor
            position
        }
     }
  }
`);

export const GET_ROOMS = gql(`
query Rooms($findByFilter: RoomFilterInput!) {
  rooms(findByFilter: $findByFilter) {
  _id
  floor
  hotel
  number
  position
  type  
  }
}
`);

export const GET_ROOM_TYPES = gql(`
query RoomTypes($findByFilter: RoomTypeFilterInput!) {
  roomTypes(findByFilter: $findByFilter) {
    _id
    hotel
    rent
    title
  }
}
`);

export const GET_ROOM_TYPE = gql(`
query RoomType($roomTypeId: ID!) {
  roomType(id: $roomTypeId) {
  _id
  hotel
  rent
  title
    
  }
}
`);
