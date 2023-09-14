/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nmutation CreateBooking($createBookingInput: CreateBookingInput!) {\n    createBooking(createBookingInput: $createBookingInput){\n        _id\n        customer\n        hotel\n        paymentStatus\n  }\n}\n": types.CreateBookingDocument,
    "\n mutation UpdateRoomBooking(\n    $updateRoomBookingInput: UpdateRoomBookingInput!\n  ) {\n    updateRoomBooking(updateRoomBookingInput: $updateRoomBookingInput) {\n      _id\n      room\n      checkIn\n      checkOut\n      rent\n      discount\n      extraBed\n      extraBreakfast\n      booking\n      hotel\n      status\n    }\n  }\n\n": types.UpdateRoomBookingDocument,
    "\nmutation UpdateBooking($updateBookingInput: UpdateBookingInput!) {\n    updateBooking(updateBookingInput: $updateBookingInput){\n        _id\n        customer\n        hotel\n        paymentStatus\n  }\n}\n": types.UpdateBookingDocument,
    "\nmutation RemoveRoomBooking($id:ID!) {\n    removeRoomBooking(id: $id) {\n        _id\n        checkIn\n        checkOut\n        rent\n        discount\n        extraBed\n        extraBreakfast\n        booking\n        hotel\n        status\n        room\n    }\n}\n\n": types.RemoveRoomBookingDocument,
    "\n   mutation CreateContact ($createContactInput: CreateContactInput!) {\n       createContact (createContactInput: $createContactInput) {\n            _id\n            name\n            phone\n            idType\n            idNo\n            address\n            hotel\n            type\n      }\n  \n}\n\n": types.CreateContactDocument,
    "\nmutation Login($phone: String!, $password: String!) {\n    login(phone: $phone, password: $password) {\n      access_token\n      user {\n        _id\n        name\n        email\n        phone\n        hotels\n        type\n      }\n    }\n  }\n\n": types.LoginDocument,
    "\n query Booking($id:ID!) {\n      booking(id: $id) {\n        _id\n        customer\n        hotel\n        paymentStatus\n     }\n }\n\n": types.BookingDocument,
    "\n query Contact($id:ID!) {\n    contact(id: $id) {\n        _id\n        name\n        phone\n        idType\n        idNo\n        address\n        hotel\n        type\n    }\n}\n": types.ContactDocument,
    "\nquery Room($id:ID!) {\n    room(id:$id) {\n        _id\n        number\n        floor\n        position\n        type\n        hotel\n    }\n}\n\n": types.RoomDocument,
    "\n  query Contacts($filter: ContactFilterInput!) {\n    contacts(filter: $filter) {\n        _id\n        name\n        phone\n        idType\n        idNo\n        address\n        hotel\n        type\n    }\n }\n": types.ContactsDocument,
    "\n query RoomBookings($roomBookingFilter: RoomBookingFilter!) {\n    roomBookings(roomBookingFilter: $roomBookingFilter) {\n    _id\n    checkIn\n    checkOut\n    rent\n    discount\n    extraBed\n    extraBreakfast\n    booking\n    hotel\n    status\n    room {\n      _id\n      number\n      type {\n        _id\n        title\n       }\n     }\n    }\n}\n": types.RoomBookingsDocument,
    "\n query RoomsByFloor($hotel: ID!, $startDate: DateTime!, $endDate: DateTime!) {\n    roomsByFloor(hotel: $hotel, startDate: $startDate, endDate: $endDate) {\n        floor\n        rooms {\n            _id\n            number\n            floor\n            position\n            type {\n                title\n                rent\n            }\n         \n            roombookings {\n                _id\n                checkIn\n                checkOut\n                rent\n                discount\n                booking\n                status\n                bookingPayment\n                bookingRent\n                bookingDue\n            }\n     }\n  }\n}\n": types.RoomsByFloorDocument,
    "\n  query Transactions {\n    transactions {\n      _id\n      contact {\n        _id\n        name\n        phone\n        idType\n        idNo\n        address\n        hotel\n        type\n      }\n      booking\n      hotel\n      date\n      deletedAt\n      category\n      subCategory\n      method\n      description\n      amount\n    }\n  }\n": types.TransactionsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateBooking($createBookingInput: CreateBookingInput!) {\n    createBooking(createBookingInput: $createBookingInput){\n        _id\n        customer\n        hotel\n        paymentStatus\n  }\n}\n"): (typeof documents)["\nmutation CreateBooking($createBookingInput: CreateBookingInput!) {\n    createBooking(createBookingInput: $createBookingInput){\n        _id\n        customer\n        hotel\n        paymentStatus\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n mutation UpdateRoomBooking(\n    $updateRoomBookingInput: UpdateRoomBookingInput!\n  ) {\n    updateRoomBooking(updateRoomBookingInput: $updateRoomBookingInput) {\n      _id\n      room\n      checkIn\n      checkOut\n      rent\n      discount\n      extraBed\n      extraBreakfast\n      booking\n      hotel\n      status\n    }\n  }\n\n"): (typeof documents)["\n mutation UpdateRoomBooking(\n    $updateRoomBookingInput: UpdateRoomBookingInput!\n  ) {\n    updateRoomBooking(updateRoomBookingInput: $updateRoomBookingInput) {\n      _id\n      room\n      checkIn\n      checkOut\n      rent\n      discount\n      extraBed\n      extraBreakfast\n      booking\n      hotel\n      status\n    }\n  }\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateBooking($updateBookingInput: UpdateBookingInput!) {\n    updateBooking(updateBookingInput: $updateBookingInput){\n        _id\n        customer\n        hotel\n        paymentStatus\n  }\n}\n"): (typeof documents)["\nmutation UpdateBooking($updateBookingInput: UpdateBookingInput!) {\n    updateBooking(updateBookingInput: $updateBookingInput){\n        _id\n        customer\n        hotel\n        paymentStatus\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation RemoveRoomBooking($id:ID!) {\n    removeRoomBooking(id: $id) {\n        _id\n        checkIn\n        checkOut\n        rent\n        discount\n        extraBed\n        extraBreakfast\n        booking\n        hotel\n        status\n        room\n    }\n}\n\n"): (typeof documents)["\nmutation RemoveRoomBooking($id:ID!) {\n    removeRoomBooking(id: $id) {\n        _id\n        checkIn\n        checkOut\n        rent\n        discount\n        extraBed\n        extraBreakfast\n        booking\n        hotel\n        status\n        room\n    }\n}\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n   mutation CreateContact ($createContactInput: CreateContactInput!) {\n       createContact (createContactInput: $createContactInput) {\n            _id\n            name\n            phone\n            idType\n            idNo\n            address\n            hotel\n            type\n      }\n  \n}\n\n"): (typeof documents)["\n   mutation CreateContact ($createContactInput: CreateContactInput!) {\n       createContact (createContactInput: $createContactInput) {\n            _id\n            name\n            phone\n            idType\n            idNo\n            address\n            hotel\n            type\n      }\n  \n}\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation Login($phone: String!, $password: String!) {\n    login(phone: $phone, password: $password) {\n      access_token\n      user {\n        _id\n        name\n        email\n        phone\n        hotels\n        type\n      }\n    }\n  }\n\n"): (typeof documents)["\nmutation Login($phone: String!, $password: String!) {\n    login(phone: $phone, password: $password) {\n      access_token\n      user {\n        _id\n        name\n        email\n        phone\n        hotels\n        type\n      }\n    }\n  }\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n query Booking($id:ID!) {\n      booking(id: $id) {\n        _id\n        customer\n        hotel\n        paymentStatus\n     }\n }\n\n"): (typeof documents)["\n query Booking($id:ID!) {\n      booking(id: $id) {\n        _id\n        customer\n        hotel\n        paymentStatus\n     }\n }\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n query Contact($id:ID!) {\n    contact(id: $id) {\n        _id\n        name\n        phone\n        idType\n        idNo\n        address\n        hotel\n        type\n    }\n}\n"): (typeof documents)["\n query Contact($id:ID!) {\n    contact(id: $id) {\n        _id\n        name\n        phone\n        idType\n        idNo\n        address\n        hotel\n        type\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Room($id:ID!) {\n    room(id:$id) {\n        _id\n        number\n        floor\n        position\n        type\n        hotel\n    }\n}\n\n"): (typeof documents)["\nquery Room($id:ID!) {\n    room(id:$id) {\n        _id\n        number\n        floor\n        position\n        type\n        hotel\n    }\n}\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Contacts($filter: ContactFilterInput!) {\n    contacts(filter: $filter) {\n        _id\n        name\n        phone\n        idType\n        idNo\n        address\n        hotel\n        type\n    }\n }\n"): (typeof documents)["\n  query Contacts($filter: ContactFilterInput!) {\n    contacts(filter: $filter) {\n        _id\n        name\n        phone\n        idType\n        idNo\n        address\n        hotel\n        type\n    }\n }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n query RoomBookings($roomBookingFilter: RoomBookingFilter!) {\n    roomBookings(roomBookingFilter: $roomBookingFilter) {\n    _id\n    checkIn\n    checkOut\n    rent\n    discount\n    extraBed\n    extraBreakfast\n    booking\n    hotel\n    status\n    room {\n      _id\n      number\n      type {\n        _id\n        title\n       }\n     }\n    }\n}\n"): (typeof documents)["\n query RoomBookings($roomBookingFilter: RoomBookingFilter!) {\n    roomBookings(roomBookingFilter: $roomBookingFilter) {\n    _id\n    checkIn\n    checkOut\n    rent\n    discount\n    extraBed\n    extraBreakfast\n    booking\n    hotel\n    status\n    room {\n      _id\n      number\n      type {\n        _id\n        title\n       }\n     }\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n query RoomsByFloor($hotel: ID!, $startDate: DateTime!, $endDate: DateTime!) {\n    roomsByFloor(hotel: $hotel, startDate: $startDate, endDate: $endDate) {\n        floor\n        rooms {\n            _id\n            number\n            floor\n            position\n            type {\n                title\n                rent\n            }\n         \n            roombookings {\n                _id\n                checkIn\n                checkOut\n                rent\n                discount\n                booking\n                status\n                bookingPayment\n                bookingRent\n                bookingDue\n            }\n     }\n  }\n}\n"): (typeof documents)["\n query RoomsByFloor($hotel: ID!, $startDate: DateTime!, $endDate: DateTime!) {\n    roomsByFloor(hotel: $hotel, startDate: $startDate, endDate: $endDate) {\n        floor\n        rooms {\n            _id\n            number\n            floor\n            position\n            type {\n                title\n                rent\n            }\n         \n            roombookings {\n                _id\n                checkIn\n                checkOut\n                rent\n                discount\n                booking\n                status\n                bookingPayment\n                bookingRent\n                bookingDue\n            }\n     }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Transactions {\n    transactions {\n      _id\n      contact {\n        _id\n        name\n        phone\n        idType\n        idNo\n        address\n        hotel\n        type\n      }\n      booking\n      hotel\n      date\n      deletedAt\n      category\n      subCategory\n      method\n      description\n      amount\n    }\n  }\n"): (typeof documents)["\n  query Transactions {\n    transactions {\n      _id\n      contact {\n        _id\n        name\n        phone\n        idType\n        idNo\n        address\n        hotel\n        type\n      }\n      booking\n      hotel\n      date\n      deletedAt\n      category\n      subCategory\n      method\n      description\n      amount\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;