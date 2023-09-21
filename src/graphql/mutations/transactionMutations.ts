import { gql } from "../__generated__";

export const CREATE_TRANSACTION = gql(` 
mutation CreateTransaction (
  $createTransactionInput: CreateTransactionInput!
) {
   createTransaction (
    createTransactionInput:$createTransactionInput
  ) {
          _id
          booking
          hotel
          date
          deletedAt
          category
          subCategory
          method
          description
          amount
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
  }
}
`);

// remove transaction
export const REMOVE_TRANSACTION = gql(`
  mutation RemoveTransaction($id: ID!) {
    removeTransaction(id:$id) {
        _id
    }
}

`);
