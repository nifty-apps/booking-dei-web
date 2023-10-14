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

// filtering contacts with search tags
export const GET_CONTACTS_BY_FILTER = gql(`
  query ContactsByFilter($contactFilter: ContactFilterInput!) {
    contactsByFilter(filter: $contactFilter) {
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

