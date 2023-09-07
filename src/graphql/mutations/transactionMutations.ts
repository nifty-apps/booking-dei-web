import { gql } from "../__generated__";

export const CREATE_TRANSACTION = gql(` 
utation CreateTransaction ($createTransactionInput: CreateTransactionInput!) {
   createTransaction (createTransactionInput:$createTransactionInput) {
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
