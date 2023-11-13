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
  /** Customer who made the booking */
  customer: Scalars['ID']['output'];
  /** Guests for the booking */
  guests?: Maybe<Array<Guest>>;
  /** Hotel where the booking were generated */
  hotel: Scalars['ID']['output'];
  /** Booking number */
  number?: Maybe<Scalars['Int']['output']>;
  /** Payment status of the booking */
  paymentStatus: PaymentStatus;
};

export type BookingFilter = {
  /** Unique identifier for the booking */
  _id?: InputMaybe<Scalars['ID']['input']>;
  /** Customer who made the booking */
  customer?: InputMaybe<Scalars['ID']['input']>;
  /** Guests for the booking */
  guests?: InputMaybe<Array<GuestInput>>;
  hotel: Scalars['ID']['input'];
  /** Booking number */
  number?: InputMaybe<Scalars['Int']['input']>;
  /** Payment status of the booking */
  paymentStatus?: InputMaybe<PaymentStatus>;
};

export type BookingLog = {
  __typename?: 'BookingLog';
  /** Unique identifier for the log */
  _id: Scalars['ID']['output'];
  /** Unique identifier for the booking */
  booking: Scalars['ID']['output'];
  /** Log message creation date */
  createdAt: Scalars['DateTime']['output'];
  /** Payment status of the booking */
  type: LogType;
  /** Log message update date */
  updatedAt: Scalars['DateTime']['output'];
  /** User who made the action */
  user: Scalars['ID']['output'];
};

export type BookingLogFilter = {
  /** Unique identifier for the log */
  _id?: InputMaybe<Scalars['ID']['input']>;
  /** Unique identifier for the booking */
  booking?: InputMaybe<Scalars['ID']['input']>;
  /** Log message creation date */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Payment status of the booking */
  type?: InputMaybe<LogType>;
  /** Log message update date */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** User who made the action */
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type Contact = {
  __typename?: 'Contact';
  /** Example field (placeholder) */
  _id: Scalars['ID']['output'];
  /** Address of the contact */
  address?: Maybe<Scalars['String']['output']>;
  /** Date of deactivation */
  detactivatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Hotel where the contact visited */
  hotel: Scalars['ID']['output'];
  /** ID number of the contact */
  idNo?: Maybe<Scalars['String']['output']>;
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
  /** Date of deactivation */
  detactivatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  hotel: Scalars['ID']['input'];
  /** ID number of the contact */
  idNo?: InputMaybe<Scalars['String']['input']>;
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
  /** Guests for the booking */
  guests?: InputMaybe<Array<GuestInput>>;
  /** Hotel where the booking were generated */
  hotel: Scalars['ID']['input'];
  /** Booking number */
  number?: InputMaybe<Scalars['Int']['input']>;
  /** Payment status of the booking */
  paymentStatus: PaymentStatus;
  /** Room bookings of the booking */
  roomBookings: Array<RoomBookingInput>;
};

export type CreateContactInput = {
  /** Address of the contact */
  address?: InputMaybe<Scalars['String']['input']>;
  /** Date of deactivation */
  detactivatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Hotel where the contact visited */
  hotel: Scalars['ID']['input'];
  /** ID number of the contact */
  idNo?: InputMaybe<Scalars['String']['input']>;
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
  rent?: InputMaybe<Scalars['Float']['input']>;
  /** Room where the booking were generated */
  room: Scalars['ID']['input'];
  /** Room booking status of the booking */
  status: RoomBookingStatus;
};

export type CreateRoomInput = {
  /** Date of deactivation */
  detactivatedAt?: InputMaybe<Scalars['DateTime']['input']>;
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

export type CreateRoomTypeInput = {
  /** Hotel where the room is located */
  hotel: Scalars['ID']['input'];
  /** Rent of the room type */
  rent: Scalars['Float']['input'];
  /** Title of the room type */
  title: Scalars['String']['input'];
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
  /** Date of deactivation */
  detactivatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Email of the user */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Hotels of the user */
  hotels: Array<Scalars['ID']['input']>;
  /** Name of the user */
  name: Scalars['String']['input'];
  /** Password of the user */
  password: Scalars['String']['input'];
  /** Phone number of the user */
  phone: Scalars['String']['input'];
  /** Type of the user */
  type: UserType;
};

export type Guest = {
  __typename?: 'Guest';
  /** Name of the guest */
  name: Scalars['String']['output'];
  /** Phone number of the guest */
  phone?: Maybe<Scalars['String']['output']>;
};

export type GuestInput = {
  /** Name of the guest */
  name: Scalars['String']['input'];
  /** Phone number of the guest */
  phone?: InputMaybe<Scalars['String']['input']>;
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

/** Log type for a booking */
export enum LogType {
  Booked = 'BOOKED',
  Updated = 'UPDATED'
}

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
  createRoomBooking: RoomBooking;
  createRoomType: RoomType;
  createTransaction: Transaction;
  /** Create user */
  createUser: User;
  login: LoginResponseDto;
  removeBooking: Booking;
  removeHotel: Hotel;
  removeRoomBooking: RoomBooking;
  removeTransaction: Transaction;
  signup: SignUpResponseDto;
  softDeleteTransaction: Transaction;
  updateBooking: Booking;
  updateContact: Contact;
  updateHotel: Hotel;
  updateRoom: Room;
  updateRoomBooking: RoomBooking;
  updateRoomType: RoomType;
  /** Update transaction */
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


export type MutationCreateRoomBookingArgs = {
  createRoomBookingInput: CreateRoomBookingInput;
};


export type MutationCreateRoomTypeArgs = {
  createRoomTypeInput: CreateRoomTypeInput;
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


export type MutationRemoveHotelArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveRoomBookingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSignupArgs = {
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
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


export type MutationUpdateRoomTypeArgs = {
  updateRoomTypeInput: UpdateRoomTypeInput;
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
  bookingLogs: Array<BookingLog>;
  bookings: Array<Booking>;
  contact: Contact;
  contacts: Array<Contact>;
  hotel: Hotel;
  hotels: Array<Hotel>;
  room: Room;
  roomBookingFinancials: Array<RoomBookingsOverview>;
  roomBookings: Array<RoomBookingResponse>;
  roomType: RoomType;
  roomTypes: Array<RoomType>;
  rooms: Array<Room>;
  roomsByFloor: Array<RoomsByFloorResponse>;
  transaction: Transaction;
  transactionByFilter: Array<Transaction>;
  transactions: Array<Transaction>;
  transactionsByDateRange: Array<Transaction>;
  user: User;
  users: Array<User>;
};


export type QueryBookingArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBookingLogsArgs = {
  filter: BookingLogFilter;
};


export type QueryBookingsArgs = {
  bookingFilter?: InputMaybe<BookingFilter>;
};


export type QueryContactArgs = {
  id: Scalars['ID']['input'];
};


export type QueryContactsArgs = {
  filter: ContactFilterInput;
};


export type QueryHotelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRoomArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRoomBookingFinancialsArgs = {
  endDate: Scalars['DateTime']['input'];
  hotel: Scalars['ID']['input'];
  startDate: Scalars['DateTime']['input'];
};


export type QueryRoomBookingsArgs = {
  roomBookingFilter: RoomBookingFilter;
};


export type QueryRoomTypeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRoomTypesArgs = {
  findByFilter: RoomTypeFilterInput;
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
  hotel: Scalars['ID']['input'];
  includeDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  startDate: Scalars['DateTime']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  filter: UserFilterInput;
};

export type Room = {
  __typename?: 'Room';
  /** Unique identifier of the room */
  _id: Scalars['ID']['output'];
  /** Date of deactivation */
  detactivatedAt?: Maybe<Scalars['DateTime']['output']>;
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
  rent?: Maybe<Scalars['Float']['output']>;
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
  bookingCustomer?: Maybe<Scalars['String']['output']>;
  bookingDue?: Maybe<Scalars['Float']['output']>;
  bookingPayment?: Maybe<Scalars['Float']['output']>;
  bookingRent?: Maybe<Scalars['Float']['output']>;
  /** Check-in date of the Room booking */
  checkIn: Scalars['DateTime']['output'];
  /** Check-out date of the Room booking */
  checkOut: Scalars['DateTime']['output'];
  /** Discount for the booking */
  discount?: Maybe<Scalars['Float']['output']>;
  paymentStatus?: Maybe<Scalars['String']['output']>;
  /** Room rent for the booking */
  rent?: Maybe<Scalars['Float']['output']>;
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
  rent?: InputMaybe<Scalars['Float']['input']>;
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
  /** Type of the room */
  room: RoomResponse;
  /** Room booking status of the booking */
  status?: Maybe<RoomBookingStatus>;
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
  floor: Scalars['String']['output'];
  number: Scalars['String']['output'];
  position: Scalars['String']['output'];
  roombookings: Array<RoomBookingDetails>;
  type: RoomTypeDetails;
};

export type RoomFilterInput = {
  /** Unique identifier of the room */
  _id?: InputMaybe<Scalars['ID']['input']>;
  /** Date of deactivation */
  detactivatedAt?: InputMaybe<Scalars['DateTime']['input']>;
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

export type RoomTypeFilterInput = {
  /** Unique identifier of the room */
  _id?: InputMaybe<Scalars['ID']['input']>;
  hotel: Scalars['ID']['input'];
  /** Rent of the room type */
  rent?: InputMaybe<Scalars['Float']['input']>;
  /** Title of the room type */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type RoomTypeResponse = {
  __typename?: 'RoomTypeResponse';
  /** Unique identifier of the room */
  _id: Scalars['ID']['output'];
  /** Rent of the room type */
  rent: Scalars['Float']['output'];
  /** Title of the room type */
  title: Scalars['String']['output'];
};

/** Response for rooms by floor with bookings */
export type RoomsByFloorResponse = {
  __typename?: 'RoomsByFloorResponse';
  floor: Scalars['String']['output'];
  rooms: Array<RoomBookingsOverview>;
};

export type SignUpResponseDto = {
  __typename?: 'SignUpResponseDto';
  /** Date of deactivation */
  detactivatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Email of the user */
  email?: Maybe<Scalars['String']['output']>;
  /** Name of the user */
  name: Scalars['String']['output'];
  /** Password of the user */
  password: Scalars['String']['output'];
  /** Phone number of the user */
  phone: Scalars['String']['output'];
  /** Type of the user */
  type: UserType;
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
  /** Who created the transaction */
  user: Scalars['ID']['output'];
};

export type TransactionFilter = {
  /** Unique identifier for the transaction */
  _id?: InputMaybe<Scalars['ID']['input']>;
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
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** Hotel where the transaction were made */
  hotel?: InputMaybe<Scalars['ID']['input']>;
  /** Method of the transaction */
  method?: InputMaybe<TransactionMethod>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** Sub Category of the transaction */
  subCategory?: InputMaybe<TransactionSubCategory>;
  /** Who created the transaction */
  user?: InputMaybe<Scalars['ID']['input']>;
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
  /** Guests for the booking */
  guests?: InputMaybe<Array<GuestInput>>;
  /** Hotel where the booking were generated */
  hotel?: InputMaybe<Scalars['ID']['input']>;
  /** Booking number */
  number?: InputMaybe<Scalars['Int']['input']>;
  /** Payment status of the booking */
  paymentStatus?: InputMaybe<PaymentStatus>;
};

export type UpdateContactInput = {
  _id: Scalars['ID']['input'];
  /** Address of the contact */
  address?: InputMaybe<Scalars['String']['input']>;
  /** Date of deactivation */
  detactivatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Hotel where the contact visited */
  hotel?: InputMaybe<Scalars['ID']['input']>;
  /** ID number of the contact */
  idNo?: InputMaybe<Scalars['String']['input']>;
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
  _id: Scalars['ID']['input'];
  /** Address of the hotel */
  address?: InputMaybe<Scalars['String']['input']>;
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
  /** Date of deactivation */
  detactivatedAt?: InputMaybe<Scalars['DateTime']['input']>;
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

export type UpdateRoomTypeInput = {
  _id: Scalars['ID']['input'];
  /** Hotel where the room is located */
  hotel?: InputMaybe<Scalars['ID']['input']>;
  /** Rent of the room type */
  rent?: InputMaybe<Scalars['Float']['input']>;
  /** Title of the room type */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTransactionInput = {
  /** Unique identifier for the transaction */
  _id?: InputMaybe<Scalars['ID']['input']>;
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
  /** Who created the transaction */
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateUserInput = {
  _id: Scalars['ID']['input'];
  /** Date of deactivation */
  detactivatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Email of the user */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Hotels of the user */
  hotels?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Name of the user */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Password of the user */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Phone number of the user */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** Type of the user */
  type?: InputMaybe<UserType>;
};

export type User = {
  __typename?: 'User';
  /** Unique identifier of the user */
  _id: Scalars['ID']['output'];
  /** Date of deactivation */
  detactivatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Email of the user */
  email?: Maybe<Scalars['String']['output']>;
  /** Hotels of the user */
  hotels: Array<Scalars['ID']['output']>;
  /** Name of the user */
  name: Scalars['String']['output'];
  /** Password of the user */
  password: Scalars['String']['output'];
  /** Phone number of the user */
  phone: Scalars['String']['output'];
  /** Type of the user */
  type: UserType;
};

export type UserFilterInput = {
  /** Unique identifier of the user */
  _id?: InputMaybe<Scalars['ID']['input']>;
  /** Date of deactivation */
  detactivatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Email of the user */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Hotels of the user */
  hotels?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Name of the user */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Password of the user */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Phone number of the user */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** Type of the user */
  type?: InputMaybe<UserType>;
};

/** Type of the user */
export enum UserType {
  Admin = 'ADMIN',
  Staff = 'STAFF'
}
