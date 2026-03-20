import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


const useAdminstatus =()=>{

    const {user} = useSelector(state=> state.auth)

    const [isAdmin , setisAdmin] = useState(false)

        const [checkauthentication , setcheckauthentication] = useState(true)

    
       useEffect(()=>{

         user?.isAdmin ? setisAdmin(true) : setisAdmin(false)
        setcheckauthentication(false)

       },[user])

    

       return { isAdmin , checkauthentication }
}

export default useAdminstatus