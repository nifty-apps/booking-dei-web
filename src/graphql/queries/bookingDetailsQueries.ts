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

// booking: 64f716687c888e446173da5e
// booking: 650032c696f895a82a57a521

// hotel : 64d0a1d008291a484b015d0b
