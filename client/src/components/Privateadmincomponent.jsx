import { Navigate, Outlet } from "react-router-dom"
import useAdminstatus from "../hooks/useAdminstatus"

const Privateadmincomponent=()=>{

    const {isAdmin , checkauthentication} = useAdminstatus()

    if(checkauthentication){
        return(
            <h1>Checking.....</h1>
        )
    }

    return isAdmin ? <Outlet/> : <Navigate to={"/"}/>

}

export default Privateadmincomponent