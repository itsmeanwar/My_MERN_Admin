import { useContext } from "react"
import { AuthCreator } from "./Creator"

const useAuth = () =>{
    return useContext(AuthCreator)
}

export default useAuth