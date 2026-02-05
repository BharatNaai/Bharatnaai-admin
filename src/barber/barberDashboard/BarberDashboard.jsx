import { useContext } from "react"
import { UserContext } from "../../context/UserContext";

export const BarberDashboard =()=>{
    const {myName,myAge} = useContext(UserContext);

    return <h1> Hello  Barber Name is {myName} and Barber Age is {myAge} </h1>

}