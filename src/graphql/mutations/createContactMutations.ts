import { gql } from "../__generated__";

export const CREATE_CONTACT = gql(`
   mutation CreateContact ($createContactInput: CreateContactInput!) {
       createContact (createContactInput: $createContactInput) {
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
