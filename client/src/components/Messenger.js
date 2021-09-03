import React from 'react'
import {useContext} from 'react'
import { AccountContext } from '../context/AccountProvider'
import Chatbox from './Chat/Chatbox'
import Landing from './Landing'

export default function Messenger() {
    const {account,setAccount} = useContext(AccountContext)
    console.log(account)
    return (
        <div>
            {
                !account?<Landing/>:""
            }
            {
                account?<Chatbox/>:""
            }
        </div>
    )
}
