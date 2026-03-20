import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


const useAuthstatus =()=>{

    const {user} = useSelector(state=> state.auth)


    const [isAuthenticated , setisAuthenticated] = useState(false)

        const [checkauthentication , setcheckauthentication] = useState(true)

    
       useEffect(()=>{

         user ? setisAuthenticated(true) : setisAuthenticated(false)
        setcheckauthentication(false)

       },[user])

       return { isAuthenticated , checkauthentication }
}

export default useAuthstatus