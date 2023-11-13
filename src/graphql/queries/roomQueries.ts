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
export const GET_ROOM_TYPES = gql(`
  query RoomTypes($findByFilter: RoomTypeFilterInput!) {
    roomTypes(findByFilter: $findByFilter) {
      _id
      title
      rent
      hotel
    }
  }
`);


export const GET_ROOMS = gql(`
  query Rooms($findByFilter: RoomFilterInput!) {
    rooms(findByFilter: $findByFilter) {
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
