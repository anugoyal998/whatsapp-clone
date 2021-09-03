import React, { useRef, useState, useEffect } from 'react'
import {useContext} from 'react'
import {PersonContext} from '../../context/PersonProvider'
import { Text,Box, Flex , Image, Spacer} from '@chakra-ui/react'
import { AccountContext } from '../../context/AccountProvider'
import Peer from 'simple-peer'
import { m } from 'framer-motion'
export default function ChatHeader() {
    const [person, setPerson] = useContext(PersonContext)
    const {activeUsers, socket} = useContext(AccountContext)

    //videocall
    const [me,setMe] = useState("")
    const [stream,setStream] = useState()
    const [receivingCall,setReceivingCall] = useState(false)
    const [caller,setCaller] = useState("")
    const [callerSignal,setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [idToCall,setIdToCall] = useState("")
    const [callEnded, setCallEnded] = useState(false)
    const [name,setName] = useState("")
    const [calling,setCalling] = useState(false)

    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    useEffect(()=> {
        if(!calling){
            return;
        }
        navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream) => {
            setStream(stream)
            if(myVideo && myVideo.current)
            myVideo.current.srcObject = stream
        })

        socket.current.on("me", (id)=> {
            setMe(id)
        })

        socket.current.on("callUser", (data)=> {
            setReceivingCall(true)
            setCaller(data.from)
            setName(data.name)
            setCallerSignal(data.signal)
        })
    },[calling])

    const callUser = (id)=> {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        })

        peer.on("signal", (data)=> {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name
            })
        })

        peer.on("stream", (stream)=> {
            userVideo.current.srcObject = stream
        })

        socket.current.on("callAccepted", (signal)=> {
            setCallAccepted(true)
            peer.signal(signal)
        })

        connectionRef.current = peer
    }

    const answerCall = ()=> {
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        })

        peer.on("signal", (data)=> {
            socket.current.on("answerCall", {signal: data, to: caller})
        })

        peer.on("stream", (stream)=> {
            userVideo.current.srcObject = stream
        })

        peer.signal(callerSignal)
        connectionRef.current = peer
    }

    const leaveCall = ()=> {
        setCallEnded(true)
        connectionRef.current.destroy()
    }
    //videocall

    if(!calling){
    return (
        <Flex bg="#ededed" p=".5rem">
        <Flex alignItems="center"   >
        {person && person.imageUrl?<Image mx=".5rem"  borderRadius="50%" w="40px" src={person.imageUrl}  alt={person.name}/>: ""}
        <Flex direction="column" alignItems="start" >
        {person && person.name?<Text  mx=".5rem">{person.name}</Text>:""}
        <Text mx=".5rem" opacity=".7" >
            {activeUsers?.find(user => user.userid === person.googleId)? 'Online': 'Offline'}
        </Text>
        </Flex>
        </Flex>
        <Spacer/>
        <Flex alignItems="center" mr=".5rem" >
        <Box mx=".5rem" fontSize="1.2rem" cursor="pointer" onClick={() => setCalling(prev=> true)} ><i class="fas fa-video"></i></Box>
        <Box mx=".5rem" fontSize="1.2rem" ><i class="fas fa-ellipsis-v"></i></Box>
        </Flex>
        </Flex>
    )}
    else{
        return(
            <>
            <h1>anubhav</h1>
            <div className="video">
            {!stream && <video playsInline muted ref={myVideo} autoplay style={{width: "300px", height: "300px"}} />}
        </div>
        <div className="video">
            {callAccepted && !callEnded?
            <video playsInline ref={userVideo} autoplay style={{width: "300px"}}  />
            : null
            }
        </div>
        </>    
    )}
}
