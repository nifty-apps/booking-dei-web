import { gql } from "../__generated__/gql";

export const GET_ROOMS = gql(`
  query Rooms {
    rooms {
      _id
      number
      hotel
      type
    }
  }
`);
