import React, { createContext, useContext, useState } from 'react'

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
    const [room, setRoom] = useState(null)
    const [user, setUser] = useState(null)

    const value = {
        room,
        setRoom,
        user,
        setUser
    }

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChatContext = () => {
    const context = useContext(ChatContext)
    if (!context) {
        throw new Error('useChatContext must be used within a ChatProvider')
    }
    return context
}