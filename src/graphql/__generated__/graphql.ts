/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Booking = {
  __typename?: 'Booking';
  /** Unique identifier for the booking */
  _id: Scalars['ID']['output'];
  /** Customer who made the booking */
  customer: Scalars['ID']['output'];
  /** Hotel where the booking were generated */
  hotel: Scalars['ID']['output'];
  /** Payment status of the booking */
  paymentStatus: PaymentStatus;
};

export type Contact = {
  __typename?: 'Contact';
  /** Example field (placeholder) */
  _id: Scalars['ID']['output'];
  /** Address of the contact */
  address?: Maybe<Scalars['String']['output']>;
  /** Hotel where the contact visited */
  hotel: Scalars['ID']['output'];
  /** ID number of the contact */
  idNo?: Maybe<Scalars['Float']['output']>;
  /** ID type of the contact */
  idType?: Maybe<ContactIdTypes>;
  /** Name of the contact */
  name: Scalars['String']['output'];
  /** Phone number of the contact */
  phone: Scalars['String']['output'];
  /** Type of the contact */
  type: ContactTypes;
};

export type ContactFilterInput = {
  /** Example field (placeholder) */
  _id?: InputMaybe<Scalars['ID']['input']>;
  /** Address of the contact */
  address?: InputMaybe<Scalars['String']['input']>;
  hotel: Scalars['ID']['input'];
  /** ID number of the contact */
  idNo?: InputMaybe<Scalars['Float']['input']>;
  /** ID type of the contact */
  idType?: InputMaybe<ContactIdTypes>;
  /** Name of the contact */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Phone number of the contact */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** Type of the contact */
  type?: InputMaybe<ContactTypes>;
};

/** The type of the contact ID */
export enum ContactIdTypes {
  DrivingLicense = 'DRIVING_LICENSE',
  Nid = 'NID',
  Passport = 'PASSPORT'
}

/** The type of the contact */
export enum ContactTypes {
  Customer = 'CUSTOMER',
  Employee = 'EMPLOYEE',
  Vendor = 'VENDOR'
}

export type CreateBookingInput = {
  /** Customer who made the booking */
  customer: Scalars['ID']['input'];
  /** Hotel where the booking were generated */
  hotel: Scalars['ID']['input'];
  /** Payment status of the booking */
  paymentStatus: PaymentStatus;
  /** Room bookings of the booking */
  roomBookings: Array<RoomBookingInput>;
};

export type CreateContactInput = {
  /** Address of the contact */
  address?: InputMaybe<Scalars['String']['input']>;
  /** Hotel where the contact visited */
  hotel: Scalars['ID']['input'];
  /** ID number of the contact */
  idNo?: InputMaybe<Scalars['Float']['input']>;
  /** ID type of the contact */
  idType?: InputMaybe<ContactIdTypes>;
  /** Name of the contact */
  name: Scalars['String']['input'];
  /** Phone number of the contact */
  phone: Scalars['String']['input'];
  /** Type of the contact */
  type: ContactTypes;
};

export type CreateHotelInput = {
  /** Address of the hotel */
  address?: InputMaybe<Scalars['String']['input']>;
  /** Name of the hotel */
  name: Scalars['String']['input'];
};

export type CreateRoomBookingInput = {
  /** Unique identifier for the booking */
  booking: Scalars['ID']['input'];
  /** Check-in date of the Room booking */
  checkIn: Scalars['DateTime']['input'];
  /** Check-out date of the Room booking */
  checkOut: Scalars['DateTime']['input'];
  /** Discount for the booking */
  discount?: InputMaybe<Scalars['Float']['input']>;
  /** Extra bed for the booking */
  extraBed: Scalars['Boolean']['input'];
  /** Extra breakfast for the booking */
  extraBreakfast: Scalars['Boolean']['input'];
  /** Hotel where the booking were generated */
  hotel: Scalars['ID']['input'];
  /** Room rent for the booking */
  rent: Scalars['Float']['input'];
  /** Room where the booking were generated */
  room: Scalars['ID']['input'];
  /** Room booking status of the booking */
  status: RoomBookingStatus;
};

export type CreateRoomInput = {
  /** Floor where the room is located */
  floor: Scalars['String']['input'];
  /** Hotel where the room is located */
  hotel: Scalars['ID']['input'];
  /** Number or name of the room */
  number: Scalars['String']['input'];
  /** Position of the room */
  position: Scalars['String']['input'];
  /** Type of the room */
  type: Scalars['ID']['input'];
};

export type CreateTransactionInput = {
  /** Amount of the transaction */
  amount: Scalars['Float']['input'];
  /** Unique identifier for the booking */
  booking?: InputMaybe<Scalars['ID']['input']>;
  /** Type of the transaction */
  category?: InputMaybe<TransactionType>;
  /** Contact who made the booking */
  contact: Scalars['ID']['input'];
  /** Date of the transaction */
  date: Scalars['DateTime']['input'];
  /** Is the transaction deleted */
  deletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Description of the transaction */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Hotel where the transaction were made */
  hotel: Scalars['ID']['input'];
  /** Method of the transaction */
  method: TransactionMethod;
  /** Sub Category of the transaction */
  subCategory?: InputMaybe<TransactionSubCategory>;
};

export type CreateUserInput = {
  /** Email of the user */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Name of the user */
  name: Scalars['String']['input'];
  /** Password of the user */
  password: Scalars['String']['input'];
  /** Phone number of the user */
  phone: Scalars['String']['input'];
};

export type Hotel = {
  __typename?: 'Hotel';
  /** Unique identifier of the hotel */
  _id: Scalars['ID']['output'];
  /** Address of the hotel */
  address?: Maybe<Scalars['String']['output']>;
  /** Name of the hotel */
  name: Scalars['String']['output'];
};

export type LoginResponseDto = {
  __typename?: 'LoginResponseDto';
  access_token: Scalars['String']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBooking: Booking;
  /** Create contact */
  createContact: Contact;
  createHotel: Hotel;
  createRoom: Room;
  /** Create room booking */
  createRoomBooking: RoomBooking;
  /** Create transaction */
  createTransaction: Transaction;
  /** Create user */
  createUser: User;
  login: LoginResponseDto;
  /** Delete booking by ID */
  removeBooking: Booking;
  /** Delete contact by ID */
  removeContact: Contact;
  removeHotel: Hotel;
  removeRoom: Room;
  /** Delete room booking by ID */
  removeRoomBooking: RoomBooking;
  /** Delete transaction by ID */
  removeTransaction: Transaction;
  /** Delete user by ID */
  removeUser: User;
  /** Soft delete transaction by ID */
  softDeleteTransaction: Transaction;
  updateBooking: Booking;
  /** Update contact */
  updateContact: Contact;
  updateHotel: Hotel;
  updateRoom: Room;
  /** Update room booking by ID */
  updateRoomBooking: RoomBooking;
  /** Update transaction */
  updateTransaction: Transaction;
  /** Update user */
  updateUser: User;
};


export type MutationCreateBookingArgs = {
  createBookingInput: CreateBookingInput;
};


export type MutationCreateContactArgs = {
  createContactInput: CreateContactInput;
};


export type MutationCreateHotelArgs = {
  createHotelInput: CreateHotelInput;
};


export type MutationCreateRoomArgs = {
  createRoomInput: CreateRoomInput;
};


export type MutationCreateRoomBookingArgs = {
  createRoomBookingInput: CreateRoomBookingInput;
};


export type MutationCreateTransactionArgs = {
  createTransactionInput: CreateTransactionInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};


export type MutationRemoveBookingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveContactArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveHotelArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveRoomArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveRoomBookingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSoftDeleteTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateBookingArgs = {
  updateBookingInput: UpdateBookingInput;
};


export type MutationUpdateContactArgs = {
  updateContactInput: UpdateContactInput;
};


export type MutationUpdateHotelArgs = {
  updateHotelInput: UpdateHotelInput;
};


export type MutationUpdateRoomArgs = {
  updateRoomInput: UpdateRoomInput;
};


export type MutationUpdateRoomBookingArgs = {
  updateRoomBookingInput: UpdateRoomBookingInput;
};


export type MutationUpdateTransactionArgs = {
  id: Scalars['ID']['input'];
  updateTransactionInput: UpdateTransactionInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  updateUserInput: UpdateUserInput;
};

/** Payment status for a booking */
export enum PaymentStatus {
  Paid = 'PAID',
  PartialPaid = 'PARTIAL_PAID',
  Unpaid = 'UNPAID'
}

export type Query = {
  __typename?: 'Query';
  /** Find all active transactions */
  activeTransactions: Array<Transaction>;
  booking: Booking;
  bookings: Array<Booking>;
  /** Find contact by ID */
  contact: Contact;
  contacts: Array<Contact>;
  hotel: Hotel;
  hotels: Array<Hotel>;
  room: Room;
  roomBooking: RoomBookingResponse;
  roomBookings: Array<RoomBooking>;
  roomType: RoomType;
  rooms: Array<Room>;
  roomsByFloor: Array<RoomsByFloorResponse>;
  /** Find transaction by ID */
  transaction: Transaction;
  /** Find Transactions by filter(s) */
  transactionByFilter: Array<Transaction>;
  /** Find all transactions */
  transactions: Array<Transaction>;
  /** Find transactions by date range */
  transactionsByDateRange: Array<Transaction>;
  /** Get user by ID */
  user: User;
  /** Get all users */
  users: Array<User>;
};


export type QueryBookingArgs = {
  id: Scalars['ID']['input'];
};


export type QueryContactArgs = {
  id: Scalars['ID']['input'];
};


export type QueryContactsArgs = {
  filter: ContactFilterInput;
};


export type QueryHotelArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRoomArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRoomBookingArgs = {
  roomBookingFilter: RoomBookingFilter;
};


export type QueryRoomBookingsArgs = {
  roomBookingFilter: RoomBookingFilter;
};


export type QueryRoomTypeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRoomsArgs = {
  findByFilter: RoomFilterInput;
};


export type QueryRoomsByFloorArgs = {
  endDate: Scalars['DateTime']['input'];
  hotel: Scalars['ID']['input'];
  startDate: Scalars['DateTime']['input'];
};


export type QueryTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTransactionByFilterArgs = {
  transactionFilter: TransactionFilter;
};


export type QueryTransactionsByDateRangeArgs = {
  endDate: Scalars['DateTime']['input'];
  hotelId: Scalars['ID']['input'];
  includeDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  startDate: Scalars['DateTime']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type Room = {
  __typename?: 'Room';
  /** Unique identifier of the room */
  _id: Scalars['ID']['output'];
  /** Floor where the room is located */
  floor: Scalars['String']['output'];
  /** Hotel where the room is located */
  hotel: Scalars['ID']['output'];
  /** Number or name of the room */
  number: Scalars['String']['output'];
  /** Position of the room */
  position: Scalars['String']['output'];
  /** Type of the room */
  type: Scalars['ID']['output'];
};

export type RoomBooking = {
  __typename?: 'RoomBooking';
  /** Unique identifier for the room booking */
  _id: Scalars['ID']['output'];
  /** Unique identifier for the booking */
  booking: Scalars['ID']['output'];
  /** Check-in date of the Room booking */
  checkIn: Scalars['DateTime']['output'];
  /** Check-out date of the Room booking */
  checkOut: Scalars['DateTime']['output'];
  /** Discount for the booking */
  discount?: Maybe<Scalars['Float']['output']>;
  /** Extra bed for the booking */
  extraBed: Scalars['Boolean']['output'];
  /** Extra breakfast for the booking */
  extraBreakfast: Scalars['Boolean']['output'];
  /** Hotel where the booking were generated */
  hotel: Scalars['ID']['output'];
  /** Room rent for the booking */
  rent: Scalars['Float']['output'];
  /** Room where the booking were generated */
  room: Scalars['ID']['output'];
  /** Room booking status of the booking */
  status: RoomBookingStatus;
};

export type RoomBookingDetails = {
  __typename?: 'RoomBookingDetails';
  /** Unique identifier for the room booking */
  _id: Scalars['ID']['output'];
  /** Unique identifier for the booking */
  booking: Scalars['ID']['output'];
  /** Check-in date of the Room booking */
  checkIn: Scalars['DateTime']['output'];
  /** Check-out date of the Room booking */
  checkOut: Scalars['DateTime']['output'];
  /** Discount for the booking */
  discount?: Maybe<Scalars['Float']['output']>;
  /** Room rent for the booking */
  rent: Scalars['Float']['output'];
  /** Room booking status of the booking */
  status: RoomBookingStatus;
};

export type RoomBookingFilter = {
  /** Unique identifier for the room booking */
  _id?: InputMaybe<Scalars['ID']['input']>;
  /** Unique identifier for the booking */
  booking?: InputMaybe<Scalars['ID']['input']>;
  /** Check-in date of the Room booking */
  checkIn?: InputMaybe<Scalars['DateTime']['input']>;
  /** Check-out date of the Room booking */
  checkOut?: InputMaybe<Scalars['DateTime']['input']>;
  /** Discount for the booking */
  discount?: InputMaybe<Scalars['Float']['input']>;
  /** Extra bed for the booking */
  extraBed?: InputMaybe<Scalars['Boolean']['input']>;
  /** Extra breakfast for the booking */
  extraBreakfast?: InputMaybe<Scalars['Boolean']['input']>;
  hotel: Scalars['ID']['input'];
  /** Room rent for the booking */
  rent?: InputMaybe<Scalars['Float']['input']>;
  /** Room where the booking were generated */
  room?: InputMaybe<Scalars['ID']['input']>;
  /** Room booking status of the booking */
  status?: InputMaybe<RoomBookingStatus>;
};

export type RoomBookingInput = {
  /** Check-in date of the Room booking */
  checkIn: Scalars['DateTime']['input'];
  /** Check-out date of the Room booking */
  checkOut: Scalars['DateTime']['input'];
  /** Discount for the booking */
  discount?: InputMaybe<Scalars['Float']['input']>;
  /** Extra bed for the booking */
  extraBed: Scalars['Boolean']['input'];
  /** Extra breakfast for the booking */
  extraBreakfast: Scalars['Boolean']['input'];
  /** Room rent for the booking */
  rent: Scalars['Float']['input'];
  /** Room where the booking were generated */
  room: Scalars['ID']['input'];
  /** Room booking status of the booking */
  status: RoomBookingStatus;
};

export type RoomBookingResponse = {
  __typename?: 'RoomBookingResponse';
  /** Unique identifier for the room booking */
  _id: Scalars['ID']['output'];
  /** Unique identifier for the booking */
  booking?: Maybe<Scalars['ID']['output']>;
  /** Check-in date of the Room booking */
  checkIn?: Maybe<Scalars['DateTime']['output']>;
  /** Check-out date of the Room booking */
  checkOut?: Maybe<Scalars['DateTime']['output']>;
  /** Discount for the booking */
  discount?: Maybe<Scalars['Float']['output']>;
  /** Extra bed for the booking */
  extraBed?: Maybe<Scalars['Boolean']['output']>;
  /** Extra breakfast for the booking */
  extraBreakfast?: Maybe<Scalars['Boolean']['output']>;
  /** Hotel where the booking were generated */
  hotel?: Maybe<Scalars['ID']['output']>;
  /** Room rent for the booking */
  rent?: Maybe<Scalars['Float']['output']>;
  /** Room where the booking were generated */
  room?: Maybe<Scalars['ID']['output']>;
  /** Room booking status of the booking */
  status?: Maybe<RoomBookingStatus>;
  /** Type of the room */
  type: RoomResponse;
};

/** Room booking status for a booking */
export enum RoomBookingStatus {
  Booked = 'BOOKED',
  Cancelled = 'CANCELLED',
  Checkedin = 'CHECKEDIN',
  Checkedout = 'CHECKEDOUT'
}

export type RoomBookingsOverview = {
  __typename?: 'RoomBookingsOverview';
  _id: Scalars['ID']['output'];
  bookings: Array<RoomBookingDetails>;
  floor: Scalars['String']['output'];
  number: Scalars['String']['output'];
  position: Scalars['String']['output'];
  type: RoomTypeDetails;
};

export type RoomFilterInput = {
  /** Unique identifier of the room */
  _id?: InputMaybe<Scalars['ID']['input']>;
  /** Floor where the room is located */
  floor?: InputMaybe<Scalars['String']['input']>;
  hotel: Scalars['ID']['input'];
  /** Number or name of the room */
  number?: InputMaybe<Scalars['String']['input']>;
  /** Position of the room */
  position?: InputMaybe<Scalars['String']['input']>;
  /** Type of the room */
  type?: InputMaybe<Scalars['ID']['input']>;
};

export type RoomResponse = {
  __typename?: 'RoomResponse';
  /** Unique identifier of the room */
  _id: Scalars['ID']['output'];
  /** Number or name of the room */
  number: Scalars['String']['output'];
  /** Type of the room */
  type: RoomTypeResponse;
};

export type RoomType = {
  __typename?: 'RoomType';
  /** Unique identifier of the room */
  _id: Scalars['ID']['output'];
  /** Hotel where the room is located */
  hotel: Scalars['ID']['output'];
  /** Rent of the room type */
  rent: Scalars['Float']['output'];
  /** Title of the room type */
  title: Scalars['String']['output'];
};

export type RoomTypeDetails = {
  __typename?: 'RoomTypeDetails';
  /** Rent of the room type */
  rent: Scalars['Float']['output'];
  /** Title of the room type */
  title: Scalars['String']['output'];
};

export type RoomTypeResponse = {
  __typename?: 'RoomTypeResponse';
  /** Unique identifier of the room */
  _id: Scalars['ID']['output'];
  /** Title of the room type */
  title: Scalars['String']['output'];
};

/** Response for rooms by floor with bookings */
export type RoomsByFloorResponse = {
  __typename?: 'RoomsByFloorResponse';
  floor: Scalars['String']['output'];
  rooms: Array<RoomBookingsOverview>;
};

export type Transaction = {
  __typename?: 'Transaction';
  /** Unique identifier for the transaction */
  _id: Scalars['ID']['output'];
  /** Amount of the transaction */
  amount: Scalars['Float']['output'];
  /** Unique identifier for the booking */
  booking?: Maybe<Scalars['ID']['output']>;
  /** Type of the transaction */
  category?: Maybe<TransactionType>;
  contact: Contact;
  /** Date of the transaction */
  date: Scalars['DateTime']['output'];
  /** Is the transaction deleted */
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Description of the transaction */
  description?: Maybe<Scalars['String']['output']>;
  /** Hotel where the transaction were made */
  hotel: Scalars['ID']['output'];
  /** Method of the transaction */
  method: TransactionMethod;
  /** Sub Category of the transaction */
  subCategory?: Maybe<TransactionSubCategory>;
};

export type TransactionFilter = {
  bookingId?: InputMaybe<Scalars['ID']['input']>;
  category?: InputMaybe<TransactionType>;
  contactId?: InputMaybe<Scalars['ID']['input']>;
  deletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  hotelId?: InputMaybe<Scalars['ID']['input']>;
  method?: InputMaybe<TransactionMethod>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  subCategory?: InputMaybe<TransactionSubCategory>;
};

/** Method of the transaction */
export enum TransactionMethod {
  Bank = 'BANK',
  Bkash = 'BKASH',
  Cash = 'CASH'
}

/** Sub Category of the transaction */
export enum TransactionSubCategory {
  Electricity = 'ELECTRICITY',
  Otherexpense = 'OTHEREXPENSE',
  Rent = 'RENT',
  Roomrent = 'ROOMRENT',
  Salary = 'SALARY',
  Water = 'WATER'
}

/** Type of the transaction */
export enum TransactionType {
  Expense = 'EXPENSE',
  Income = 'INCOME'
}

export type UpdateBookingInput = {
  /** Unique identifier for the booking */
  _id?: InputMaybe<Scalars['ID']['input']>;
  /** Customer who made the booking */
  customer?: InputMaybe<Scalars['ID']['input']>;
  /** Hotel where the booking were generated */
  hotel?: InputMaybe<Scalars['ID']['input']>;
  /** Payment status of the booking */
  paymentStatus?: InputMaybe<PaymentStatus>;
};

export type UpdateContactInput = {
  _id: Scalars['ID']['input'];
  /** Address of the contact */
  address?: InputMaybe<Scalars['String']['input']>;
  /** Hotel where the contact visited */
  hotel?: InputMaybe<Scalars['ID']['input']>;
  /** ID number of the contact */
  idNo?: InputMaybe<Scalars['Float']['input']>;
  /** ID type of the contact */
  idType?: InputMaybe<ContactIdTypes>;
  /** Name of the contact */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Phone number of the contact */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** Type of the contact */
  type?: InputMaybe<ContactTypes>;
};

export type UpdateHotelInput = {
  /** Address of the hotel */
  address?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  /** Name of the hotel */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRoomBookingInput = {
  /** Unique identifier for the room booking */
  _id?: InputMaybe<Scalars['ID']['input']>;
  /** Unique identifier for the booking */
  booking?: InputMaybe<Scalars['ID']['input']>;
  /** Check-in date of the Room booking */
  checkIn?: InputMaybe<Scalars['DateTime']['input']>;
  /** Check-out date of the Room booking */
  checkOut?: InputMaybe<Scalars['DateTime']['input']>;
  /** Discount for the booking */
  discount?: InputMaybe<Scalars['Float']['input']>;
  /** Extra bed for the booking */
  extraBed?: InputMaybe<Scalars['Boolean']['input']>;
  /** Extra breakfast for the booking */
  extraBreakfast?: InputMaybe<Scalars['Boolean']['input']>;
  /** Hotel where the booking were generated */
  hotel?: InputMaybe<Scalars['ID']['input']>;
  /** Room rent for the booking */
  rent?: InputMaybe<Scalars['Float']['input']>;
  /** Room where the booking were generated */
  room?: InputMaybe<Scalars['ID']['input']>;
  /** Room booking status of the booking */
  status?: InputMaybe<RoomBookingStatus>;
};

export type UpdateRoomInput = {
  _id: Scalars['ID']['input'];
  /** Floor where the room is located */
  floor?: InputMaybe<Scalars['String']['input']>;
  /** Hotel where the room is located */
  hotel?: InputMaybe<Scalars['ID']['input']>;
  /** Number or name of the room */
  number?: InputMaybe<Scalars['String']['input']>;
  /** Position of the room */
  position?: InputMaybe<Scalars['String']['input']>;
  /** Type of the room */
  type?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateTransactionInput = {
  _id: Scalars['ID']['input'];
  /** Amount of the transaction */
  amount?: InputMaybe<Scalars['Float']['input']>;
  /** Unique identifier for the booking */
  booking?: InputMaybe<Scalars['ID']['input']>;
  /** Type of the transaction */
  category?: InputMaybe<TransactionType>;
  /** Contact who made the booking */
  contact?: InputMaybe<Scalars['ID']['input']>;
  /** Date of the transaction */
  date?: InputMaybe<Scalars['DateTime']['input']>;
  /** Is the transaction deleted */
  deletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Description of the transaction */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Hotel where the transaction were made */
  hotel?: InputMaybe<Scalars['ID']['input']>;
  /** Method of the transaction */
  method?: InputMaybe<TransactionMethod>;
  /** Sub Category of the transaction */
  subCategory?: InputMaybe<TransactionSubCategory>;
};

export type UpdateUserInput = {
  /** Email of the user */
  email?: InputMaybe<Scalars['String']['input']>;
  /** User ID */
  id: Scalars['ID']['input'];
  /** Name of the user */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Password of the user */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Phone number of the user */
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  /** Unique identifier of the user */
  _id: Scalars['ID']['output'];
  /** Email of the user */
  email?: Maybe<Scalars['String']['output']>;
  /** Hotels of the user */
  hotels: Array<Scalars['ID']['output']>;
  /** Name of the user */
  name: Scalars['String']['output'];
  /** Phone number of the user */
  phone: Scalars['String']['output'];
  /** Type of the user */
  type: UserType;
};

/** Type of the user */
export enum UserType {
  Admin = 'ADMIN',
  Staff = 'STAFF'
}

export type CreateBookingMutationVariables = Exact<{
  createBookingInput: CreateBookingInput;
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: { __typename?: 'Booking', _id: string, customer: string, hotel: string, paymentStatus: PaymentStatus } };

export type CreateContactMutationVariables = Exact<{
  createContactInput: CreateContactInput;
}>;


export type CreateContactMutation = { __typename?: 'Mutation', createContact: { __typename?: 'Contact', _id: string, name: string, phone: string, idType?: ContactIdTypes | null, idNo?: number | null, address?: string | null, hotel: string, type: ContactTypes } };

export type LoginMutationVariables = Exact<{
  phone: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponseDto', access_token: string, user: { __typename?: 'User', _id: string, name: string, email?: string | null, phone: string, hotels: Array<string>, type: UserType } } };

export type BookingQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type BookingQuery = { __typename?: 'Query', booking: { __typename?: 'Booking', _id: string, customer: string, hotel: string, paymentStatus: PaymentStatus } };

export type ContactQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ContactQuery = { __typename?: 'Query', contact: { __typename?: 'Contact', _id: string, name: string, phone: string, idType?: ContactIdTypes | null, idNo?: number | null, address?: string | null, hotel: string, type: ContactTypes } };

export type RoomQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RoomQuery = { __typename?: 'Query', room: { __typename?: 'Room', _id: string, number: string, floor: string, position: string, type: string, hotel: string } };

export type ContactsQueryVariables = Exact<{
  filter: ContactFilterInput;
}>;


export type ContactsQuery = { __typename?: 'Query', contacts: Array<{ __typename?: 'Contact', _id: string, name: string, phone: string, idType?: ContactIdTypes | null, idNo?: number | null, address?: string | null, hotel: string, type: ContactTypes }> };

export type RoomBookingsQueryVariables = Exact<{
  roomBookingFilter: RoomBookingFilter;
}>;


export type RoomBookingsQuery = { __typename?: 'Query', roomBookings: Array<{ __typename?: 'RoomBooking', _id: string, checkIn: any, checkOut: any, rent: number, discount?: number | null, extraBed: boolean, extraBreakfast: boolean, room: string, booking: string, hotel: string, status: RoomBookingStatus }> };

export type RoomsByFloorQueryVariables = Exact<{
  hotel: Scalars['ID']['input'];
  startDate: Scalars['DateTime']['input'];
  endDate: Scalars['DateTime']['input'];
}>;


export type RoomsByFloorQuery = { __typename?: 'Query', roomsByFloor: Array<{ __typename?: 'RoomsByFloorResponse', floor: string, rooms: Array<{ __typename?: 'RoomBookingsOverview', _id: string, number: string, floor: string, position: string, type: { __typename?: 'RoomTypeDetails', title: string, rent: number }, bookings: Array<{ __typename?: 'RoomBookingDetails', _id: string, rent: number, booking: string, discount?: number | null, checkIn: any, checkOut: any, status: RoomBookingStatus }> }> }> };


export const CreateBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createBookingInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBookingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createBookingInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createBookingInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"customer"}},{"kind":"Field","name":{"kind":"Name","value":"hotel"}},{"kind":"Field","name":{"kind":"Name","value":"paymentStatus"}}]}}]}}]} as unknown as DocumentNode<CreateBookingMutation, CreateBookingMutationVariables>;
export const CreateContactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateContact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createContactInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateContactInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createContactInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createContactInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"idType"}},{"kind":"Field","name":{"kind":"Name","value":"idNo"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"hotel"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<CreateContactMutation, CreateContactMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"hotels"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const BookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Booking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"booking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"customer"}},{"kind":"Field","name":{"kind":"Name","value":"hotel"}},{"kind":"Field","name":{"kind":"Name","value":"paymentStatus"}}]}}]}}]} as unknown as DocumentNode<BookingQuery, BookingQueryVariables>;
export const ContactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Contact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"idType"}},{"kind":"Field","name":{"kind":"Name","value":"idNo"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"hotel"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<ContactQuery, ContactQueryVariables>;
export const RoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Room"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"floor"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"hotel"}}]}}]}}]} as unknown as DocumentNode<RoomQuery, RoomQueryVariables>;
export const ContactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Contacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContactFilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"idType"}},{"kind":"Field","name":{"kind":"Name","value":"idNo"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"hotel"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<ContactsQuery, ContactsQueryVariables>;
export const RoomBookingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RoomBookings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomBookingFilter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RoomBookingFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomBookings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomBookingFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomBookingFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"checkIn"}},{"kind":"Field","name":{"kind":"Name","value":"checkOut"}},{"kind":"Field","name":{"kind":"Name","value":"rent"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}},{"kind":"Field","name":{"kind":"Name","value":"extraBed"}},{"kind":"Field","name":{"kind":"Name","value":"extraBreakfast"}},{"kind":"Field","name":{"kind":"Name","value":"room"}},{"kind":"Field","name":{"kind":"Name","value":"booking"}},{"kind":"Field","name":{"kind":"Name","value":"hotel"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<RoomBookingsQuery, RoomBookingsQueryVariables>;
export const RoomsByFloorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RoomsByFloor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hotel"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomsByFloor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hotel"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hotel"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"floor"}},{"kind":"Field","name":{"kind":"Name","value":"rooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"floor"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"rent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bookings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"rent"}},{"kind":"Field","name":{"kind":"Name","value":"booking"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}},{"kind":"Field","name":{"kind":"Name","value":"checkIn"}},{"kind":"Field","name":{"kind":"Name","value":"checkOut"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RoomsByFloorQuery, RoomsByFloorQueryVariables>;