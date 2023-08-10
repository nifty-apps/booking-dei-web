/* eslint-disable */
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
  /** Contact who made the booking */
  contact: Scalars['ID']['output'];
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
  /** Name of the contact */
  name: Scalars['String']['output'];
  /** NID of the contact */
  nid?: Maybe<Scalars['Float']['output']>;
  /** Phone number of the contact */
  phone: Scalars['String']['output'];
  /** Type of the contact */
  type: ContactTypes;
};

/** The type of the contact */
export enum ContactTypes {
  Customer = 'CUSTOMER',
  Employee = 'EMPLOYEE',
  Vendor = 'VENDOR'
}

export type CreateBookingInput = {
  /** Contact who made the booking */
  contact: Scalars['ID']['input'];
  /** Hotel where the booking were generated */
  hotel: Scalars['ID']['input'];
  /** Payment status of the customer */
  paymentStatus: PaymentStatus;
  /** Room bookings of the booking */
  roomBookings: Array<CreateRoomBookingInput>;
};

export type CreateContactInput = {
  /** Address of the contact */
  address?: InputMaybe<Scalars['String']['input']>;
  /** Hotel where the contact visited */
  hotel: Scalars['ID']['input'];
  /** Name of the contact */
  name: Scalars['String']['input'];
  /** NID of the contact */
  nid?: InputMaybe<Scalars['Float']['input']>;
  /** Phone Number of the contact */
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
  /** Check-in date of the Room booking */
  checkIn: Scalars['DateTime']['input'];
  /** Check-out date of the Room booking */
  checkOut: Scalars['DateTime']['input'];
  /** Discount for the booking */
  discount: Scalars['Float']['input'];
  /** Room rent for the booking */
  rent: Scalars['Float']['input'];
  /** Room where the booking were generated */
  room: Scalars['ID']['input'];
  /** Room booking status of the Room booking */
  status: RoomBookingStatus;
};

export type CreateRoomInput = {
  /** Hotel where the room is located */
  hotel: Scalars['ID']['input'];
  /** Number or name of the room */
  number: Scalars['String']['input'];
  /** Type of the room */
  type: Scalars['ID']['input'];
};

export type CreateTransactionInput = {
  /** Amount of the transaction */
  amount: Scalars['Float']['input'];
  /** Contact who made the booking */
  contact: Scalars['ID']['input'];
  /** Source of the transaction */
  source: TransactionSource;
  /** Type of the transaction */
  type: TransactionType;
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
  createContact: Contact;
  createHotel: Hotel;
  createRoom: Room;
  createTransaction: Transaction;
  createUser: User;
  login: LoginResponseDto;
  removeBooking: Booking;
  removeContact: Contact;
  removeHotel: Hotel;
  removeRoom: Room;
  removeTransaction: Transaction;
  removeUser: User;
  updateBooking: Booking;
  updateContact: Contact;
  updateHotel: Hotel;
  updateRoom: Room;
  updateTransaction: Transaction;
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
  id: Scalars['Int']['input'];
};


export type MutationRemoveContactArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveHotelArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveRoomArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTransactionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int']['input'];
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


export type MutationUpdateTransactionArgs = {
  updateTransactionInput: UpdateTransactionInput;
};


export type MutationUpdateUserArgs = {
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
  booking: Booking;
  bookings: Array<Booking>;
  contact: Contact;
  hotel: Hotel;
  hotels: Array<Hotel>;
  room: Room;
  rooms: Array<Room>;
  transaction: Transaction;
  transactions: Array<Transaction>;
  user: User;
  users: Array<User>;
};


export type QueryBookingArgs = {
  id: Scalars['Int']['input'];
};


export type QueryContactArgs = {
  id: Scalars['Int']['input'];
};


export type QueryHotelArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRoomArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTransactionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  phone: Scalars['String']['input'];
};

export type Room = {
  __typename?: 'Room';
  /** Unique identifier of the room */
  _id: Scalars['ID']['output'];
  /** Hotel where the room is located */
  hotel: Scalars['ID']['output'];
  /** Number or name of the room */
  number: Scalars['String']['output'];
  type: RoomType;
};

/** Room booking status for a booking */
export enum RoomBookingStatus {
  Booked = 'BOOKED',
  Cancelled = 'CANCELLED',
  Checkedin = 'CHECKEDIN',
  Checkedout = 'CHECKEDOUT'
}

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

export type Transaction = {
  __typename?: 'Transaction';
  /** Unique identifier for the transaction */
  _id: Scalars['ID']['output'];
  /** Amount of the transaction */
  amount: Scalars['Float']['output'];
  /** Unique identifier for the booking */
  booking?: Maybe<Scalars['ID']['output']>;
  /** Contact who made the booking */
  contact: Scalars['ID']['output'];
  /** Hotel where the transaction were made */
  hotel: Scalars['ID']['output'];
  /** Source of the transaction */
  source: TransactionSource;
  /** Type of the transaction */
  type: TransactionType;
};

/** Source of the transaction */
export enum TransactionSource {
  Bank = 'BANK',
  Bkash = 'BKASH',
  Cash = 'CASH'
}

/** Type of the transaction */
export enum TransactionType {
  Electricity = 'ELECTRICITY',
  Income = 'INCOME',
  Otherexpense = 'OTHEREXPENSE',
  Rent = 'RENT',
  Salary = 'SALARY',
  Water = 'WATER'
}

export type UpdateBookingInput = {
  /** Contact who made the booking */
  contact?: InputMaybe<Scalars['ID']['input']>;
  /** Hotel where the booking were generated */
  hotel?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['Int']['input'];
  /** Payment status of the customer */
  paymentStatus?: InputMaybe<PaymentStatus>;
  /** Room bookings of the booking */
  roomBookings?: InputMaybe<Array<CreateRoomBookingInput>>;
};

export type UpdateContactInput = {
  /** Address of the contact */
  address?: InputMaybe<Scalars['String']['input']>;
  /** Hotel where the contact visited */
  hotel?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['Int']['input'];
  /** Name of the contact */
  name?: InputMaybe<Scalars['String']['input']>;
  /** NID of the contact */
  nid?: InputMaybe<Scalars['Float']['input']>;
  /** Phone Number of the contact */
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

export type UpdateRoomInput = {
  /** Hotel where the room is located */
  hotel?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['Int']['input'];
  /** Number or name of the room */
  number?: InputMaybe<Scalars['String']['input']>;
  /** Type of the room */
  type?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateTransactionInput = {
  /** Amount of the transaction */
  amount?: InputMaybe<Scalars['Float']['input']>;
  /** Contact who made the booking */
  contact?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['Int']['input'];
  /** Source of the transaction */
  source?: InputMaybe<TransactionSource>;
  /** Type of the transaction */
  type?: InputMaybe<TransactionType>;
};

export type UpdateUserInput = {
  /** Email of the user */
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
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
  /** Name of the user */
  name: Scalars['String']['output'];
  /** Password of the user */
  password: Scalars['String']['output'];
  /** Phone number of the user */
  phone: Scalars['String']['output'];
};
