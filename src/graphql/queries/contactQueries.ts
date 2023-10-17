import { gql } from "../__generated__";

export const GET_CONTACTS = gql(`
  query Contacts($filter: ContactFilterInput!) {
    contacts(filter: $filter) {
        _id
        name
        phone
        idType
        idNo
        address
        hotel
        type
    }
 }
`);

export const GET_CONTACT = gql(`
  query Contact($id: ID!) {
    contact(id: $id) {
        _id
        name
        phone
        idType
        idNo
        address
        hotel
        type
    }
 }
`);
