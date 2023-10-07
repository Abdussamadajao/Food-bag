import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("64808b53c2158e9b19a0");

export const account = new Account(client);
export const db = new Databases(client);

export const storage = new Storage(client);
export default client;
