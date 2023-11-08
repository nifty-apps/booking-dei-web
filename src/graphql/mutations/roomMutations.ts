import { gql } from "../__generated__";

export const CREATE_ROOM =
  gql(`mutation CreateRoom($createRoomInput: CreateRoomInput!) {
    createRoom(createRoomInput: $createRoomInput) {
        floor
        hotel
        number
        position
        detactivatedAt
        type  
    }
  }`);
