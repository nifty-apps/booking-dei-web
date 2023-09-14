import { gql } from "../__generated__";

// get data
export const GET_TRANSACTIONS = gql(`
  query Transactions {
    transactions {
      _id
      contact {
        _id
        name
        phone
        idType
        idNo
        address
        hotel
        type
      }
      booking
      hotel
      date
      deletedAt
      category
      subCategory
      method
      description
      amount
    }
  }
`);
