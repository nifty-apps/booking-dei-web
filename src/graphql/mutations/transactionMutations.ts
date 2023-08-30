import { gql } from "../__generated__";

export const CREATE_TRANSACTION = gql(` 
   mutation CreateTransaction {
      createTransaction(
         createTransactionInput: {
           booking: "64d765008a6065d8dd91aca6", 
           contact: "64d22306cb903c900cee91e4", 
           hotel: "64d0a1d008291a484b015d0b",
           date: "2023", 
           deletedAt: "2023",
           category: INCOME, 
           subCategory: ELECTRICITY, 
           method: BANK, 
           description: "test", 
           amount: 500
        }
    ) {
         _id  
         booking
         hotel
         date
         deletedAt
         category
         subCategory
         method
         description
         amount
    }
 }
`);
