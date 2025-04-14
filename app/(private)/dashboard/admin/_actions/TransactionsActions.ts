"use server"
import { handleAPIcall } from "@/functions/custom";

 export async function fetchTransactions() {
   try {
     const { data: response, error } = await handleAPIcall(
       null,
       null,
       "admin/transactions",
       "GET"
     );
     if (error) {
       console.log(error);
     }
     if (response) {
       return response.data;
     }
   } catch (error) {
     console.log(error);
   }
 }