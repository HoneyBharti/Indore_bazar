import { Navigate, Outlet } from "react-router-dom"
import useAuthstatus from "../hooks/useAuthstatus"

const Privatecomponent=()=>{

    const {isauthenticated , checkauthentication} = useAuthstatus()

    if(checkauthentication){
        return(
            <h1>Checking.....</h1>
        )
    }

    return isauthenticated ? <Outlet/> : <Navigate to={"/login"}/>

}

export default Privatecomponent