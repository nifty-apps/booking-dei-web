import { gql } from "../__generated__";

// create hotel
export const CREATE_HOTEL = gql(`
mutation CreateHotel($createHotelInput: CreateHotelInput!) {
    createHotel(createHotelInput: $createHotelInput) {
      name
      _id
    }
  }
`);