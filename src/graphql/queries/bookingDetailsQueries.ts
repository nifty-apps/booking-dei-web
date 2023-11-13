import { gql } from "../__generated__";

export const GET_BOOKING = gql(`
 query Booking($id:ID!) {
      booking(id: $id) {
        _id
        customer
        hotel
        paymentStatus
     }
 }

`);

export const GET_CONTACT = gql(`
 query Contact($id:ID!) {
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

export const GET_ROOM_INFO = gql(`
query Room($id:ID!) {
    room(id:$id) {
        _id
        number
        floor
        position
        type
        hotel
    }
}

`);

export const GET_BOOKING_GUEST = gql(`
   query Bookings($bookingFilter: BookingFilter) {
    bookings(bookingFilter: $bookingFilter) {
        _id
        number
        customer
        hotel
        paymentStatus
    }
}
`);
// export const GET_VENDORS_LIST = gql(`
// query Vendorslist($transactionFilter: TransactionFilter!) {
//     transactionByFilter(transactionFilter: $transactionFilter) {    
//       subCategory
//       user
//       amount   
//       hotel 
//     }
//   }
// `);
