import { gql } from "../__generated__";

export const LOGIN_USER = gql(`
mutation Login($phone: String!, $password: String!) {
    login(phone: $phone, password: $password) {
      access_token
      user {
        _id
        name
        email
        phone
        hotels
        type
      }
    }
  }

`);
