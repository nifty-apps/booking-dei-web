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
    "\n  mutation Login($phone: String!, $password: String!) {\n    login(phone: $phone, password: $password) {\n      access_token\n    }\n  }\n": types.LoginDocument,
    "\n  query RoomBookingsOverview {\n    roomBookingsOverview(\n        hotel: \"64d0a1d008291a484b015d0b\"\n        startDate: \"2023-07-1\"\n        endDate: \"2023-07-30\"\n    ) {\n        _id\n        number\n        type {\n            title\n            rent\n        }\n        bookings {\n            _id\n            rent\n            booking\n            discount\n            checkIn\n            checkOut\n            status\n        }\n    }\n}\n": types.RoomBookingsOverviewDocument,
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
export function gql(source: "\n  mutation Login($phone: String!, $password: String!) {\n    login(phone: $phone, password: $password) {\n      access_token\n    }\n  }\n"): (typeof documents)["\n  mutation Login($phone: String!, $password: String!) {\n    login(phone: $phone, password: $password) {\n      access_token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query RoomBookingsOverview {\n    roomBookingsOverview(\n        hotel: \"64d0a1d008291a484b015d0b\"\n        startDate: \"2023-07-1\"\n        endDate: \"2023-07-30\"\n    ) {\n        _id\n        number\n        type {\n            title\n            rent\n        }\n        bookings {\n            _id\n            rent\n            booking\n            discount\n            checkIn\n            checkOut\n            status\n        }\n    }\n}\n"): (typeof documents)["\n  query RoomBookingsOverview {\n    roomBookingsOverview(\n        hotel: \"64d0a1d008291a484b015d0b\"\n        startDate: \"2023-07-1\"\n        endDate: \"2023-07-30\"\n    ) {\n        _id\n        number\n        type {\n            title\n            rent\n        }\n        bookings {\n            _id\n            rent\n            booking\n            discount\n            checkIn\n            checkOut\n            status\n        }\n    }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;