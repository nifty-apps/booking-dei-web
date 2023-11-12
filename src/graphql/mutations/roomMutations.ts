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

export const CREATE_ROOM_TYPE =
  gql(`mutation Mutation($createRoomTypeInput: CreateRoomTypeInput!) {
    createRoomType(createRoomTypeInput: $createRoomTypeInput) {
      _id
      hotel
      rent
      title
    }
  }`);

export const UPDATE_ROOM =
  gql(`mutation UpdateRoom($updateRoomInput: UpdateRoomInput!) {
    updateRoom(updateRoomInput: $updateRoomInput) {
    _id
    detactivatedAt
    floor
    floor
    hotel
    number
    position
    type
    }
  }`);
