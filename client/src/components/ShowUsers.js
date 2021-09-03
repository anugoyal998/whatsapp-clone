import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { AccountContext } from '../context/AccountProvider'
import {PersonContext} from '../context/PersonProvider'
import {ConversationIdContext} from '../context/ConversationIdProvider'
export default function ShowUsers({text}) {
    const url=  'http://localhost:5000'
    const [users,setUsers] = useState([])
    const {account,socket, setActiveUsers} = useContext(AccountContext)
    const [person,setPerson] = useContext(PersonContext)
    const [conversationId,setConversationId] = useContext(ConversationIdContext)
    useEffect(async () =>{
        const rsp = await axios.get(`${url}/get-all-users`); 
        const data = rsp.data.filter(user => user.name.toLowerCase().includes(text.toLowerCase()))
        setUsers(data)
    },[text])
    useEffect(()=> {
        socket.current.emit('addUser', account.googleId)
        socket.current.on('getUsers', users => {
            setActiveUsers(users)
        })
    },[])
    const handleClick = async (e) =>{
        const url = 'http://localhost:5000'
        try {
            await axios.post(`${url}/conversation/add`, {sId: account.googleId, rId: e.googleId})  
        } catch (error) {
            console.log("error in addig conversation frontend", error)
        }
        setPerson(e)
        try{
            const {data} = await axios.post(`${url}/get-conversation-id`, {
                sId: account.googleId,
                rId: e.googleId
            })
            setConversationId(data)
        }catch(error){
            console.log("error in getting conversation id frontend", error)
        }
        // console.log("anubhav")
    }
    return (
        <Box overlay="overlay">
            {
                users && users.map((e,key)=> {
                    if(account && account.googleId !== e.googleId){
                    return (
                        <Flex  cursor="pointer" align="center" my=".5rem" borderBottomWidth="1px" onClick={()=> handleClick(e)} >
                            {e && e.imageUrl?<Image  mb=".5rem"  mx=".5rem" borderRadius="50%" w="50px"  src={e.imageUrl} alt={e.name} />:""}
                            {e && e.name?<Text mx=".5rem"  >{e.name}</Text>:""}
                        </Flex>
                    )
                    }
                })
            }
        </Box>
    )
}
