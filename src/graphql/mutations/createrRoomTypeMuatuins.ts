import { gql } from "../__generated__";

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
