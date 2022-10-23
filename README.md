## Next-ToDo-Mongo-TS
This project transforms a simple to-do app that you see everywhere into a more full-featured app that uses the following technologies or features:

 - NextJS & SWR for data fetching
 - Tailwind CSS
 - Redux Toolkit
 - MongoDB
 - TypeScript

You will need a newer version of NodeJS, I use 17.4.0 (this may not be the latest version)

### File Structure
**/components**
addTodo.tsx - This component handles adding a to-do item
editTodo.tsx - This component handles editing a to-do item

**/lib**
mongodb.ts - This sets up the connection to the MongoDB (use the commented code for JSX)
todoServices.ts - This file acts like a middleware to connect NextJS app to the MongoDB via API

**/lib/redux**
interface.ts - TypeScript types for Redux
store.ts - Redux store
todoSlice.ts - This file contains all the Redux reducers for the store

**/pages/api/todos**
A couple of times are in here to interact with MongoDB.  This is where you can find actual MongoDB commands to add, update, change, or delete the data in the database.

### Application Environment

 - Create a *.env.development* (where appropriate) to store the MongoDB connection information, you need the following keys: **MONGODB_URI** and **MONGODB_DB**

