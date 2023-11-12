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

// transaction filter
export const GET_TRANSACTION_BY_FILTER = gql(`
    query Transaction($transactionFilter: TransactionFilter!){
        transactionByFilter(transactionFilter: $transactionFilter){
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

// transactionsByDateRange
export const GET_TRANSACTIONS_BY_DATE_RANGE = gql(`
  query TransactionsByDateRange( 
    $hotelId: ID!,
     $startDate: DateTime!,
      $endDate: DateTime!
) {
    transactionsByDateRange(
      hotel: $hotelId,
      startDate: $startDate,
      endDate: $endDate
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



