import { gql } from "../__generated__";

// login mutation 
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

// registration mutation 
export const CREATE_USER = gql(`
mutation Signup($phone: String!, $name: String!, $password: String!) {
  signup(phone: $phone, name: $name, password: $password) {
    name
    password
    phone
  }
}
`);

// update user mutation 
export const UPDATE_USER = gql(`
mutation UpdateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    name
    hotels
  }
}
`);