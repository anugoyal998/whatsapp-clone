import React, { useState  , useRef, useEffect} from 'react'
import { createContext } from 'react'
import {io} from 'socket.io-client'
export const AccountContext = createContext()
export default function AccountProvider({children}) {
    const [account,setAccount] = useState()
    const [activeUsers, setActiveUsers] = useState([])
    const [newMsgFlag, setNewMsgFlag] = useState(false)
    const socket = useRef()
    console.log(activeUsers)
    useEffect(()=> {
        socket.current = io('ws://localhost:9000')
    },[])
    return (
        <AccountContext.Provider value={{account,setAccount, socket, activeUsers, setActiveUsers, newMsgFlag, setNewMsgFlag}} >
            {children}
        </AccountContext.Provider>
    )
}
