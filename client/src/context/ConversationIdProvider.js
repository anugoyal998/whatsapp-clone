import {createContext, useState} from 'react'

export const ConversationIdContext = createContext()

export default function ConversationIdProvider({children}){
    const [conversationId,setConversationId] = useState()
    return(
        <ConversationIdContext.Provider value={[conversationId,setConversationId]} >{children}</ConversationIdContext.Provider>
    )
}