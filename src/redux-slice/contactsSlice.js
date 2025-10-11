import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
const contactsSlice = createSlice({
    name:"contact app",
    initialState:{
        contacts: JSON.parse(localStorage.getItem("contacts")) ||[
            {id: nanoid() , name:"Marta" , surname:"Mostovyk" , number:"0985710403" , city:"Tatariv" , birthday:"18.02.2009", isOld:false}
        ],
        filter:"",
        filteredContacts:[]
    },
     reducers:{
        AddContact:(state , action) => {
            state.contacts.push(action.payload)
        },
        RemoveContact: (state , action) => {
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            }
        },
        ToggleContact: (state , action) => {
            const findContact = state.contacts.find(contact => contact.id === action.payload)
            if(findContact){
                findContact.isOld=!findContact.isOld
            }
        },
        EditContact: (state , action) => {
            state.contacts = state.contacts.map(contact => 
                contact.id === action.payload.id ? {...contact , name:action.payload.changes} : contact
            )
        },
        FilterContact: (state , action) => {
            state.filter = (action.payload || "").toLowerCase()
            state.filteredContacts = state.contacts.filter(contact => (contact.name || "").toLowerCase().includes(state.filter))
        }
     }
})
export const {AddContact , RemoveContact , ToggleContact , EditContact , FilterContact} = contactsSlice.actions;
export default contactsSlice.reducer;