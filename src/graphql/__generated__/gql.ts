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
    "\nmutation CreateBooking($createBookingInput: CreateBookingInput!) {\n    createBooking(createBookingInput: $createBookingInput){\n        _id\n        contact\n        hotel\n        paymentStatus\n  }\n}\n": types.CreateBookingDocument,
    "\nmutation Login($phone: String!, $password: String!) {\n    login(phone: $phone, password: $password) {\n      access_token\n      user {\n        _id\n        name\n        email\n        phone\n        hotels\n        type\n      }\n    }\n  }\n\n": types.LoginDocument,
    " \n   mutation CreateTransaction {\n      createTransaction(\n         createTransactionInput: {\n           booking: \"64d765008a6065d8dd91aca6\", \n           contact: \"64d22306cb903c900cee91e4\", \n           hotel: \"64d0a1d008291a484b015d0b\",\n           date: \"2023\", \n           deletedAt: \"2023\",\n           category: INCOME, \n           subCategory: ELECTRICITY, \n           method: BANK, \n           description: \"test\", \n           amount: 500\n        }\n    ) {\n         _id  \n         booking\n         hotel\n         date\n         deletedAt\n         category\n         subCategory\n         method\n         description\n         amount\n    }\n }\n": types.CreateTransactionDocument,
    "\n  query Contacts($filter: ContactFilterInput!) {\n    contacts(filter: $filter) {\n        _id\n        name\n        phone\n        idType\n        idNo\n        address\n        hotel\n        type\n    }\n }\n": types.ContactsDocument,
    "\n  query RoomsByFloor($hotel: ID!, $startDate: DateTime!, $endDate: DateTime!) {\n    roomsByFloor(hotel: $hotel, startDate: $startDate, endDate: $endDate) {\n      floor\n      rooms {\n        _id\n        number\n        floor\n        position\n        type {\n          title\n          rent\n        }\n        bookings {\n          _id\n          rent\n          booking\n          discount\n          checkIn\n          checkOut\n          status\n        }\n      }\n    }\n  }\n": types.RoomsByFloorDocument,
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
export function gql(source: "\nmutation CreateBooking($createBookingInput: CreateBookingInput!) {\n    createBooking(createBookingInput: $createBookingInput){\n        _id\n        contact\n        hotel\n        paymentStatus\n  }\n}\n"): (typeof documents)["\nmutation CreateBooking($createBookingInput: CreateBookingInput!) {\n    createBooking(createBookingInput: $createBookingInput){\n        _id\n        contact\n        hotel\n        paymentStatus\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation Login($phone: String!, $password: String!) {\n    login(phone: $phone, password: $password) {\n      access_token\n      user {\n        _id\n        name\n        email\n        phone\n        hotels\n        type\n      }\n    }\n  }\n\n"): (typeof documents)["\nmutation Login($phone: String!, $password: String!) {\n    login(phone: $phone, password: $password) {\n      access_token\n      user {\n        _id\n        name\n        email\n        phone\n        hotels\n        type\n      }\n    }\n  }\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: " \n   mutation CreateTransaction {\n      createTransaction(\n         createTransactionInput: {\n           booking: \"64d765008a6065d8dd91aca6\", \n           contact: \"64d22306cb903c900cee91e4\", \n           hotel: \"64d0a1d008291a484b015d0b\",\n           date: \"2023\", \n           deletedAt: \"2023\",\n           category: INCOME, \n           subCategory: ELECTRICITY, \n           method: BANK, \n           description: \"test\", \n           amount: 500\n        }\n    ) {\n         _id  \n         booking\n         hotel\n         date\n         deletedAt\n         category\n         subCategory\n         method\n         description\n         amount\n    }\n }\n"): (typeof documents)[" \n   mutation CreateTransaction {\n      createTransaction(\n         createTransactionInput: {\n           booking: \"64d765008a6065d8dd91aca6\", \n           contact: \"64d22306cb903c900cee91e4\", \n           hotel: \"64d0a1d008291a484b015d0b\",\n           date: \"2023\", \n           deletedAt: \"2023\",\n           category: INCOME, \n           subCategory: ELECTRICITY, \n           method: BANK, \n           description: \"test\", \n           amount: 500\n        }\n    ) {\n         _id  \n         booking\n         hotel\n         date\n         deletedAt\n         category\n         subCategory\n         method\n         description\n         amount\n    }\n }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Contacts($filter: ContactFilterInput!) {\n    contacts(filter: $filter) {\n        _id\n        name\n        phone\n        idType\n        idNo\n        address\n        hotel\n        type\n    }\n }\n"): (typeof documents)["\n  query Contacts($filter: ContactFilterInput!) {\n    contacts(filter: $filter) {\n        _id\n        name\n        phone\n        idType\n        idNo\n        address\n        hotel\n        type\n    }\n }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query RoomsByFloor($hotel: ID!, $startDate: DateTime!, $endDate: DateTime!) {\n    roomsByFloor(hotel: $hotel, startDate: $startDate, endDate: $endDate) {\n      floor\n      rooms {\n        _id\n        number\n        floor\n        position\n        type {\n          title\n          rent\n        }\n        bookings {\n          _id\n          rent\n          booking\n          discount\n          checkIn\n          checkOut\n          status\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query RoomsByFloor($hotel: ID!, $startDate: DateTime!, $endDate: DateTime!) {\n    roomsByFloor(hotel: $hotel, startDate: $startDate, endDate: $endDate) {\n      floor\n      rooms {\n        _id\n        number\n        floor\n        position\n        type {\n          title\n          rent\n        }\n        bookings {\n          _id\n          rent\n          booking\n          discount\n          checkIn\n          checkOut\n          status\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;