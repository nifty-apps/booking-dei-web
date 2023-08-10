import { gql } from "@apollo/client";

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
