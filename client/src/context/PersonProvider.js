import React, { useState } from 'react'
import { createContext } from 'react'
export const PersonContext = createContext()
export default function PersonProvider({children}){
    const [person,setPerson] = useState()
    console.log(person)
    return(
        <PersonContext.Provider value={[person,setPerson]}
        >
            {children}
        </PersonContext.Provider>
    )
}