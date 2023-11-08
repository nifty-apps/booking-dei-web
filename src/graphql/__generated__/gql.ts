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
    "\nmutation UpdateContact($updateContactInput: UpdateContactInput!) {\n    updateContact(updateContactInput:$updateContactInput){\n      _id\n      name\t\n      phone\n      idType\n      idNo\n      address\n      type\n      detactivatedAt\n  }\n}\n\n\n": types.UpdateContactDocument,
    "\n  mutation CreateRoomType($createRoomTypeInput: CreateRoomTypeInput!) {\n    createRoomType(createRoomTypeInput: $createRoomTypeInput) {\n      _id\n      title\n      rent\n      hotel\n    }\n  }\n": types.CreateRoomTypeDocument,
    "\n  mutation CreateRoom($createRoomInput: CreateRoomInput!) {\n    createRoom(createRoomInput: $createRoomInput) {\n      _id\n      number\n      floor\n      position\n      type\n      hotel\n      detactivatedAt\n    }\n  }\n": types.CreateRoomDocument,
    "\nmutation Login($phone: String!, $password: String!) {\n    login(phone: $phone, password: $password) {\n      access_token\n      user {\n        _id\n        name\n        email\n        phone\n        hotels\n        type\n      }\n    }\n  }\n\n": types.LoginDocument,
    " \nmutation CreateTransaction (\n  $createTransactionInput: CreateTransactionInput!\n) {\n   createTransaction (\n    createTransactionInput:$createTransactionInput\n  ) {\n          _id\n          booking\n          hotel\n          date\n          deletedAt\n          category\n          subCategory\n          method\n          description\n          amount\n      contact {\n             _id\n            name\n            phone\n            idType\n            idNo\n            address\n            hotel\n            type\n       }\n  }\n}\n": types.CreateTransactionDocument,
    "\n    mutation UpdateTransaction($updateTransactionInput: UpdateTransactionInput!) {\n    updateTransaction (\n      updateTransactionInput: $updateTransactionInput\n      ) {\n      _id\n      category\n      date\n      subCategory\n      method\n      description\n      amount\n       contact {\n        _id\n        name\n    }\n    }\n}\n": types.UpdateTransactionDocument,
    "\n  mutation RemoveTransaction($id: ID!) {\n    removeTransaction(id:$id) {\n        _id\n    }\n}\n\n": types.RemoveTransactionDocument,
    "\n query Booking($id:ID!) {\n      booking(id: $id) {\n        _id\n        customer\n        hotel\n        paymentStatus\n     }\n }\n\n": types.BookingDocument,
    "\n query Contact($id:ID!) {\n    contact(id: $id) {\n        _id\n        name\n        phone\n        idType\n        idNo\n        address\n        hotel\n        type\n    }\n}\n": types.ContactDocument,
    "\nquery Room($id:ID!) {\n    room(id:$id) {\n        _id\n        number\n        floor\n        position\n        type\n        hotel\n    }\n}\n\n": types.RoomDocument,
    "\n  query Bookings($bookingFilter: BookingFilter) {\n    bookings(bookingFilter: $bookingFilter) {\n      _id\n      customer\n      paymentStatus\n      number\n      hotel\n    }\n  }\n": types.BookingsDocument,
    "\n  query Contacts($filter: ContactFilterInput!) {\n    contacts(filter: $filter) {\n        _id\n        name\n        phone\n        idType\n        idNo\n        address\n        hotel\n        type\n        detactivatedAt\n    }\n }\n": types.ContactsDocument,
    "\n  query RoomBookingFinancials(\n    $hotel: ID!,\n    $startDate: DateTime!,\n    $endDate: DateTime!\n  ) {\n    roomBookingFinancials(\n      hotel: $hotel, \n      startDate: $startDate,\n      endDate: $endDate\n    ) {\n      _id\n      number\n      type {\n        title\n        rent\n      }\n      floor\n      position\n      roombookings {\n        checkIn\n        checkOut\n        rent\n        discount\n        booking\n        status\n        bookingCustomer\n        bookingPayment\n        bookingRent\n        bookingDue\n        _id\n      }\n    }\n  }\n\n": types.RoomBookingFinancialsDocument,
    "\n query RoomBookings($roomBookingFilter: RoomBookingFilter!) {\n    roomBookings(roomBookingFilter: $roomBookingFilter) {\n    _id\n    checkIn\n    checkOut\n    rent\n    discount\n    extraBed\n    extraBreakfast\n    booking\n    hotel\n    status\n    room {\n      _id\n      number\n      type {\n        _id\n        title\n       }\n     }\n    }\n}\n": types.RoomBookingsDocument,
    "\n  query RoomsByFloor($hotel: ID!, $startDate: DateTime!, $endDate: DateTime!) {\n    roomsByFloor(hotel: $hotel, startDate: $startDate, endDate: $endDate) {\n       floor\n        rooms {\n            _id\n            number\n            type {\n                title\n                rent\n            }\n            roombookings {\n                _id\n                checkIn\n                checkOut\n                rent\n                discount\n                booking\n                status\n                bookingCustomer\n            }\n            floor\n            position\n        }\n     }\n  }\n": types.RoomsByFloorDocument,
    "\n  query RoomTypes($findByFilter: RoomTypeFilterInput!) {\n    roomTypes(findByFilter: $findByFilter) {\n      _id\n      title\n      rent\n      hotel\n    }\n  }\n": types.RoomTypesDocument,
    "\n  query Rooms($findByFilter: RoomFilterInput!) {\n    rooms(findByFilter: $findByFilter) {\n      _id\n      number\n      floor\n      position\n      type\n      hotel\n      detactivatedAt\n    }\n  }\n": types.RoomsDocument,
    "\n  query Transactions {\n    transactions {\n      _id\n      contact {\n        _id\n        name\n        phone\n        idType\n        idNo\n        address\n        hotel\n        type\n      }\n      booking\n      hotel\n      date\n      deletedAt\n      category\n      subCategory\n      method\n      description\n      amount\n    }\n  }\n": types.TransactionsDocument,
    "\n    query Transaction($transactionFilter: TransactionFilter!){\n        transactionByFilter(transactionFilter: $transactionFilter){\n            _id\n            contact {\n            _id\n            name\n            phone\n            idType\n            idNo\n            address\n            hotel \n            type \n        \n        }\n            booking\n            hotel\n            date\n            deletedAt\n            category\n            subCategory\n            method\n            description\n            amount\n        }\n    }\n": types.TransactionDocument,
    "\n  query TransactionsByDateRange( \n    $hotelId: ID!,\n     $startDate: DateTime!,\n      $endDate: DateTime!\n) {\n    transactionsByDateRange(\n      hotel: $hotelId,\n      startDate: $startDate,\n      endDate: $endDate\n    ) {\n      _id\n      booking\n      hotel\n      date\n      deletedAt\n      category\n      subCategory\n      method\n      description\n      amount\n      contact {\n        _id\n        name\n        phone\n        idType\n        idNo\n        address\n        hotel\n        type\n      }\n    }\n  }\n": types.TransactionsByDateRangeDocument,
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
export function gql(source: "\nmutation UpdateContact($updateContactInput: UpdateContactInput!) {\n    updateContact(updateContactInput:$updateContactInput){\n      _id\n      name\t\n      phone\n      idType\n      idNo\n      address\n      type\n      detactivatedAt\n  }\n}\n\n\n"): (typeof documents)["\nmutation UpdateContact($updateContactInput: UpdateContactInput!) {\n    updateContact(updateContactInput:$updateContactInput){\n      _id\n      name\t\n      phone\n      idType\n      idNo\n      address\n      type\n      detactivatedAt\n  }\n}\n\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateRoomType($createRoomTypeInput: CreateRoomTypeInput!) {\n    createRoomType(createRoomTypeInput: $createRoomTypeInput) {\n      _id\n      title\n      rent\n      hotel\n    }\n  }\n"): (typeof documents)["\n  mutation CreateRoomType($createRoomTypeInput: CreateRoomTypeInput!) {\n    createRoomType(createRoomTypeInput: $createRoomTypeInput) {\n      _id\n      title\n      rent\n      hotel\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateRoom($createRoomInput: CreateRoomInput!) {\n    createRoom(createRoomInput: $createRoomInput) {\n      _id\n      number\n      floor\n      position\n      type\n      hotel\n      detactivatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateRoom($createRoomInput: CreateRoomInput!) {\n    createRoom(createRoomInput: $createRoomInput) {\n      _id\n      number\n      floor\n      position\n      type\n      hotel\n      detactivatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation Login($phone: String!, $password: String!) {\n    login(phone: $phone, password: $password) {\n      access_token\n      user {\n        _id\n        name\n        email\n        phone\n        hotels\n        type\n      }\n    }\n  }\n\n"): (typeof documents)["\nmutation Login($phone: String!, $password: String!) {\n    login(phone: $phone, password: $password) {\n      access_token\n      user {\n        _id\n        name\n        email\n        phone\n        hotels\n        type\n      }\n    }\n  }\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: " \nmutation CreateTransaction (\n  $createTransactionInput: CreateTransactionInput!\n) {\n   createTransaction (\n    createTransactionInput:$createTransactionInput\n  ) {\n          _id\n          booking\n          hotel\n          date\n          deletedAt\n          category\n          subCategory\n          method\n          description\n          amount\n      contact {\n             _id\n            name\n            phone\n            idType\n            idNo\n            address\n            hotel\n            type\n       }\n  }\n}\n"): (typeof documents)[" \nmutation CreateTransaction (\n  $createTransactionInput: CreateTransactionInput!\n) {\n   createTransaction (\n    createTransactionInput:$createTransactionInput\n  ) {\n          _id\n          booking\n          hotel\n          date\n          deletedAt\n          category\n          subCategory\n          method\n          description\n          amount\n      contact {\n             _id\n            name\n            phone\n            idType\n            idNo\n            address\n            hotel\n            type\n       }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateTransaction($updateTransactionInput: UpdateTransactionInput!) {\n    updateTransaction (\n      updateTransactionInput: $updateTransactionInput\n      ) {\n      _id\n      category\n      date\n      subCategory\n      method\n      description\n      amount\n       contact {\n        _id\n        name\n    }\n    }\n}\n"): (typeof documents)["\n    mutation UpdateTransaction($updateTransactionInput: UpdateTransactionInput!) {\n    updateTransaction (\n      updateTransactionInput: $updateTransactionInput\n      ) {\n      _id\n      category\n      date\n      subCategory\n      method\n      description\n      amount\n       contact {\n        _id\n        name\n    }\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveTransaction($id: ID!) {\n    removeTransaction(id:$id) {\n        _id\n    }\n}\n\n"): (typeof documents)["\n  mutation RemoveTransaction($id: ID!) {\n    removeTransaction(id:$id) {\n        _id\n    }\n}\n\n"];
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
export function gql(source: "\n  query Bookings($bookingFilter: BookingFilter) {\n    bookings(bookingFilter: $bookingFilter) {\n      _id\n      customer\n      paymentStatus\n      number\n      hotel\n    }\n  }\n"): (typeof documents)["\n  query Bookings($bookingFilter: BookingFilter) {\n    bookings(bookingFilter: $bookingFilter) {\n      _id\n      customer\n      paymentStatus\n      number\n      hotel\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Contacts($filter: ContactFilterInput!) {\n    contacts(filter: $filter) {\n        _id\n        name\n        phone\n        idType\n        idNo\n        address\n        hotel\n        type\n        detactivatedAt\n    }\n }\n"): (typeof documents)["\n  query Contacts($filter: ContactFilterInput!) {\n    contacts(filter: $filter) {\n        _id\n        name\n        phone\n        idType\n        idNo\n        address\n        hotel\n        type\n        detactivatedAt\n    }\n }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query RoomBookingFinancials(\n    $hotel: ID!,\n    $startDate: DateTime!,\n    $endDate: DateTime!\n  ) {\n    roomBookingFinancials(\n      hotel: $hotel, \n      startDate: $startDate,\n      endDate: $endDate\n    ) {\n      _id\n      number\n      type {\n        title\n        rent\n      }\n      floor\n      position\n      roombookings {\n        checkIn\n        checkOut\n        rent\n        discount\n        booking\n        status\n        bookingCustomer\n        bookingPayment\n        bookingRent\n        bookingDue\n        _id\n      }\n    }\n  }\n\n"): (typeof documents)["\n  query RoomBookingFinancials(\n    $hotel: ID!,\n    $startDate: DateTime!,\n    $endDate: DateTime!\n  ) {\n    roomBookingFinancials(\n      hotel: $hotel, \n      startDate: $startDate,\n      endDate: $endDate\n    ) {\n      _id\n      number\n      type {\n        title\n        rent\n      }\n      floor\n      position\n      roombookings {\n        checkIn\n        checkOut\n        rent\n        discount\n        booking\n        status\n        bookingCustomer\n        bookingPayment\n        bookingRent\n        bookingDue\n        _id\n      }\n    }\n  }\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n query RoomBookings($roomBookingFilter: RoomBookingFilter!) {\n    roomBookings(roomBookingFilter: $roomBookingFilter) {\n    _id\n    checkIn\n    checkOut\n    rent\n    discount\n    extraBed\n    extraBreakfast\n    booking\n    hotel\n    status\n    room {\n      _id\n      number\n      type {\n        _id\n        title\n       }\n     }\n    }\n}\n"): (typeof documents)["\n query RoomBookings($roomBookingFilter: RoomBookingFilter!) {\n    roomBookings(roomBookingFilter: $roomBookingFilter) {\n    _id\n    checkIn\n    checkOut\n    rent\n    discount\n    extraBed\n    extraBreakfast\n    booking\n    hotel\n    status\n    room {\n      _id\n      number\n      type {\n        _id\n        title\n       }\n     }\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query RoomsByFloor($hotel: ID!, $startDate: DateTime!, $endDate: DateTime!) {\n    roomsByFloor(hotel: $hotel, startDate: $startDate, endDate: $endDate) {\n       floor\n        rooms {\n            _id\n            number\n            type {\n                title\n                rent\n            }\n            roombookings {\n                _id\n                checkIn\n                checkOut\n                rent\n                discount\n                booking\n                status\n                bookingCustomer\n            }\n            floor\n            position\n        }\n     }\n  }\n"): (typeof documents)["\n  query RoomsByFloor($hotel: ID!, $startDate: DateTime!, $endDate: DateTime!) {\n    roomsByFloor(hotel: $hotel, startDate: $startDate, endDate: $endDate) {\n       floor\n        rooms {\n            _id\n            number\n            type {\n                title\n                rent\n            }\n            roombookings {\n                _id\n                checkIn\n                checkOut\n                rent\n                discount\n                booking\n                status\n                bookingCustomer\n            }\n            floor\n            position\n        }\n     }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query RoomTypes($findByFilter: RoomTypeFilterInput!) {\n    roomTypes(findByFilter: $findByFilter) {\n      _id\n      title\n      rent\n      hotel\n    }\n  }\n"): (typeof documents)["\n  query RoomTypes($findByFilter: RoomTypeFilterInput!) {\n    roomTypes(findByFilter: $findByFilter) {\n      _id\n      title\n      rent\n      hotel\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Rooms($findByFilter: RoomFilterInput!) {\n    rooms(findByFilter: $findByFilter) {\n      _id\n      number\n      floor\n      position\n      type\n      hotel\n      detactivatedAt\n    }\n  }\n"): (typeof documents)["\n  query Rooms($findByFilter: RoomFilterInput!) {\n    rooms(findByFilter: $findByFilter) {\n      _id\n      number\n      floor\n      position\n      type\n      hotel\n      detactivatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Transactions {\n    transactions {\n      _id\n      contact {\n        _id\n        name\n        phone\n        idType\n        idNo\n        address\n        hotel\n        type\n      }\n      booking\n      hotel\n      date\n      deletedAt\n      category\n      subCategory\n      method\n      description\n      amount\n    }\n  }\n"): (typeof documents)["\n  query Transactions {\n    transactions {\n      _id\n      contact {\n        _id\n        name\n        phone\n        idType\n        idNo\n        address\n        hotel\n        type\n      }\n      booking\n      hotel\n      date\n      deletedAt\n      category\n      subCategory\n      method\n      description\n      amount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query Transaction($transactionFilter: TransactionFilter!){\n        transactionByFilter(transactionFilter: $transactionFilter){\n            _id\n            contact {\n            _id\n            name\n            phone\n            idType\n            idNo\n            address\n            hotel \n            type \n        \n        }\n            booking\n            hotel\n            date\n            deletedAt\n            category\n            subCategory\n            method\n            description\n            amount\n        }\n    }\n"): (typeof documents)["\n    query Transaction($transactionFilter: TransactionFilter!){\n        transactionByFilter(transactionFilter: $transactionFilter){\n            _id\n            contact {\n            _id\n            name\n            phone\n            idType\n            idNo\n            address\n            hotel \n            type \n        \n        }\n            booking\n            hotel\n            date\n            deletedAt\n            category\n            subCategory\n            method\n            description\n            amount\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query TransactionsByDateRange( \n    $hotelId: ID!,\n     $startDate: DateTime!,\n      $endDate: DateTime!\n) {\n    transactionsByDateRange(\n      hotel: $hotelId,\n      startDate: $startDate,\n      endDate: $endDate\n    ) {\n      _id\n      booking\n      hotel\n      date\n      deletedAt\n      category\n      subCategory\n      method\n      description\n      amount\n      contact {\n        _id\n        name\n        phone\n        idType\n        idNo\n        address\n        hotel\n        type\n      }\n    }\n  }\n"): (typeof documents)["\n  query TransactionsByDateRange( \n    $hotelId: ID!,\n     $startDate: DateTime!,\n      $endDate: DateTime!\n) {\n    transactionsByDateRange(\n      hotel: $hotelId,\n      startDate: $startDate,\n      endDate: $endDate\n    ) {\n      _id\n      booking\n      hotel\n      date\n      deletedAt\n      category\n      subCategory\n      method\n      description\n      amount\n      contact {\n        _id\n        name\n        phone\n        idType\n        idNo\n        address\n        hotel\n        type\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;