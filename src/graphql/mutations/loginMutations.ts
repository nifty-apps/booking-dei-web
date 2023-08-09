import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($phone: String!, $password: String!) {
    login(phone: $phone, password: $password) {
      access_token
    }
  }
`;
