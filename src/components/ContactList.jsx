import { RemoveContact , ToggleContact , EditContact } from "../redux-slice/contactsSlice";
import styled from "styled-components";
import { useDispatch } from "react-redux";
const ListContainer = styled.ul`
width:1000px;
display:flex;
gap:20px;
height:auto;
margin:auto;
margin-top:20px;
flex-wrap:wrap;
`
const ListItem = styled.li`
list-style:none;
background-color:blue;
border-radius:15px;
width:600px;
height:auto;
flex-direction:column;
margin:auto;
padding:15px;
display: flex;
align-items: center;
gap:20px;
`
const ButtonDelete = styled.button`
width:140px;
height:30px;
border:none;
border-radius:15px;
background-color:red;
`
const Text = styled.p`
margin:0;
`
export const ContactsList = ({contacts}) => {
    const dispatch = useDispatch()
    return (
        <ListContainer>
            {contacts.map((elem) => (
             <ListItem key={elem.id} style={{textDecoration : elem.isOld ? "line-through" : "none"}}>
                <label>
                    isOld:
                <input type="checkbox"   checked={elem.isOld}   onChange={() => dispatch(ToggleContact(elem.id))} />    
                </label>
                <Text>Name:{elem.name}</Text>
                <Text>Surname : {elem.surname}</Text>
                <Text>Number : {elem.number}</Text>
                <Text>City: {elem.city}</Text>
                <Text>Birthday:{elem.birthday}</Text>
                <label>
                    Edit:
                <input type="text"  value={elem.name} onChange={(e) => dispatch(EditContact({id:elem.id ,changes:e.target.value}))}/>
                </label>
                <ButtonDelete onClick={() => dispatch(RemoveContact(elem.id))}>Delete</ButtonDelete>
             </ListItem>
            ))}
        </ListContainer>
    )
}