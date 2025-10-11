import { nanoid } from "nanoid"
import { AddContact, FilterContact } from "../redux-slice/contactsSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { ContactsList } from "./ContactList"
import styled from "styled-components";
function randomColor(){
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r} , ${g} , ${b})`;
}
const Form = styled.form`
 width:1000px;
 height:auto;
 background-color: ${randomColor};
 border-radius:25px;
 border:0.5cm solid ${randomColor};
 display:flex;
 flex-direction:column;
 gap:20px;
 padding-bottom:20px;
 padding-top:20px;
 align-items:center;
 margin:auto;
`
const Input = styled.input`
    width:236px;
    height:30px;
    padding-left:20px;
    background-color:${randomColor};
    border-radius:10px;
    border:none;
`
const ButtonAdd = styled.button`
    border-radius:12px;
    background-color:${randomColor};
    font-family: "Playwrite DE Grund Guides", cursive;
    color:white;
    width:100px;
    height:40px;
    border:none;
`
const InputFilter = styled.input`
    width:200px;
    height:30px;
    background-color:${randomColor};
    border-radius:10px;
    border:none;
    padding-left:20px;
`
const Title = styled.h1`
 font-family: "Playwrite DE SAS", cursive;
 font-size:38px;
 color:white;
`
export const ContactForm = () => {
    const contacts = useSelector(state => state.contacts.contacts)
    const filter = useSelector(state => state.contacts.filter)
    const dispatch = useDispatch()
    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts))
    }, [contacts])
    const filteredContacts = contacts.filter(contact => (contact.name || "").toLowerCase().includes(filter.toLowerCase()))
    return (
        <>
            <Form onSubmit={(e) => {
                e.preventDefault()
                const name = e.target.elements.name.value
                const surname = e.target.elements.surname.value
                const number = e.target.elements.number.value
                const city = e.target.elements.city.value
                const birthday = e.target.elements.birthday.value
                dispatch(AddContact({ id: nanoid(), name, surname, number, city, birthday }))
            }}>
                <Title>Contact Book</Title>
                <label>
                    Filter:
                    <InputFilter type="text" name="filter" placeholder="Filter" onChange={(e) => dispatch(FilterContact(e.target.value))} />
                </label>
                <label>
                    Name:
                    <Input type="text" name="name" placeholder="Name" />
                </label>
                <label>
                    Surname:
                    <Input type="text" name="surname" placeholder="Surname" />
                </label>
                <label>
                    Number:
                    <Input type="text" name="number" placeholder="Number" />
                </label>
                <label>
                    City:
                    <Input type="text" name="city" placeholder="City" />
                </label>
                <label>
                    Birthday:
                    <Input type="text" name="birthday" placeholder="Birthday" />
                </label>
                <ButtonAdd>Add</ButtonAdd>
            </Form>
            <ContactsList contacts={filteredContacts} />
        </>
    )
}