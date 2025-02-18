import api from '../config/AxiosHelper'

export const createRoom = async (roomData) => {
    const response = await api.post('api/rooms', roomData,{
        headers: {
            'Content-Type': 'text/plain'
        }
    })
    return response.data
}

export const joinRoom = async (roomId) => {
    const response = await api.get(`api/rooms/${roomId}`)
    return response.data
}

