import { gql } from "../__generated__";

// create contact
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

// update contact
export const UPDATE_CONTACT = gql(`
mutation UpdateContact($updateContactInput: UpdateContactInput!) {
    updateContact(updateContactInput:$updateContactInput){
      _id
      name	
      phone
      idType
      idNo
  }
}


`);
