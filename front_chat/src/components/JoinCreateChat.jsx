import React, { useState } from "react"
import { createRoom, joinRoom } from "../services/RoomService"
import { useChatContext } from "../context/ChatContext"
import { useNavigate } from "react-router"

const JoinCreateChat = () => {
    const [formData, setFormData] = useState({
        name: '',
        chatId: ''
    })
    const [isJoining, setIsJoining] = useState(true)
    const { setRoom, setUser } = useChatContext()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Validate name
        if (!formData.name.trim()) {
            alert('Please enter your name')
            return
        }

        if (isJoining) {
            // Validate chat ID for joining
            if (!formData.chatId.trim()) {
                alert('Please enter a chat room ID')
                return
            }
            
            try {
                const room = await joinRoom(formData.chatId)
                console.log('Room joined:', room)
                // Update context with room and user information
                setRoom({
                    id: formData.chatId,
                    // add any other room properties you need
                })
                setUser({
                    id: Date.now().toString(),
                    name: formData.name
                })
                navigate(`/chat`)
            } catch (error) {
                console.error('Error joining room:', error)
                alert('Failed to join room. Please try again.')
            }
        } else {
            // For creating, chatId is optional
            if (formData.chatId.trim() && !/^[a-zA-Z0-9-_]+$/.test(formData.chatId)) {
                alert('Room ID can only contain letters, numbers, hyphens, and underscores')
                return
            }
            
            try {
                const roomId = formData.chatId.trim() || Math.random().toString(36).substring(2, 8)
                const room = await createRoom(roomId)
                console.log('Room created:', room)
                // Update context with room and user information
                setRoom({
                    id: roomId,
                    // add any other room properties you need
                })
                setUser({
                    id: Date.now().toString(), // You might want to get this from your backend
                    name: formData.name
                })
                // You might want to redirect to the chat room here
                navigate(`/chat`)
            } catch (error) {
                console.error('Error creating room:', error)
                alert('Failed to create room. Please try again.')
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="p-8 bg-gray-800 rounded-lg shadow-xl w-96 backdrop-blur-sm border border-gray-700">
                <h1 className="text-3xl font-bold text-center mb-6 text-white">
                    {isJoining ? 'Join Chat Room' : 'Create Chat Room'}
                </h1>
                
                <div className="flex justify-center mb-6 space-x-4">
                    <button
                        onClick={() => setIsJoining(true)}
                        className={`px-4 py-2 rounded-md transition duration-200 ${
                            isJoining 
                                ? 'bg-purple-600 text-white' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        Join Room
                    </button>
                    <button
                        onClick={() => setIsJoining(false)}
                        className={`px-4 py-2 rounded-md transition duration-200 ${
                            !isJoining 
                                ? 'bg-purple-600 text-white' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        Create Room
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none text-white placeholder-gray-400"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="chatId" className="block text-sm font-medium text-gray-300">
                            {isJoining ? 'Chat Room ID' : 'Create Room ID (Optional)'}
                        </label>
                        <input
                            type="text"
                            id="chatId"
                            value={formData.chatId}
                            onChange={(e) => setFormData({...formData, chatId: e.target.value})}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none text-white placeholder-gray-400"
                            placeholder={isJoining ? "Enter chat room ID" : "Leave blank for random ID"}
                            required={isJoining}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition duration-200 transform hover:scale-105"
                    >
                        {isJoining ? 'Join Chat' : 'Create Chat'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default JoinCreateChat