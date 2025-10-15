import { configureStore } from "@reduxjs/toolkit";
import { persistReducer , persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"
import contactsSlice from "./contactsSlice";
const persistConfig = {
    key:"root",
    storage,
    whitelist:["contacts"]
}
const persistedReducer = persistReducer(persistConfig , contactsSlice)
export const store = configureStore({
    reducer:{
    contacts:persistedReducer
    }
})
export const persistor = persistStore(store)