import { Box } from '@chakra-ui/react'
import React , {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import {AccountContext} from '../../context/AccountProvider'
import LeftMsg from './LeftMsg'
import RightMsg from './RightMsg'
export default function ChatMessage({conversationId, showEmoji, incomingMessage}) {
    const [msg,setMsg] = useState()
    const {account, setAccount, socket, newMsgFlag} = useContext(AccountContext)
    useEffect(()=>{
        incomingMessage && conversationId?.members?.includes(incomingMessage.sender) && setMsg(prev => [...prev, incomingMessage])
    },[incomingMessage, conversationId, newMsgFlag])
    useEffect(()=> {
        const getMessage =  async () =>{
            const url = 'http://localhost:5000'
            try{
                const {data} = await axios.get(`${url}/get/message/${conversationId?._id}`)
                setMsg(data)
            }catch(err){
                console.log("error in getMessage frontend",err)
            }
        }
        getMessage()
    },[conversationId, newMsgFlag, incomingMessage])
    console.log(msg)
    return (
        <Box  backgroundImage="url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')" overflow="overlay" style={{height: "81vh"}} backgroundSize="50%" h="70vh" >
            {msg && msg.map((e,key) =>{
                if(e.senderId!==account.googleId){
                    return <LeftMsg  e={e}  />
                }else{
                    return <RightMsg e={e} />
                }
            })}
        </Box>
    )
}
