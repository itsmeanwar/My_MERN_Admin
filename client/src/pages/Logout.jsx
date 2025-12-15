import React, { useEffect, useRef } from 'react'
import useAuth from "../Store/UseAuth";
import { toast, Bounce } from "react-toastify";
import{Navigate} from 'react-router-dom'
const Logout = () => {
  const ref = useRef(false)
  const {removeToken} = useAuth()
  useEffect(()=>{
    if(!ref.current){
 toast.info("Logout Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          style: {
            fontSize: "13px",
          },
        });
    }
    removeToken()
    ref.current = true
 
  },[removeToken])
     return <Navigate to={'/login'} />
}

export default Logout