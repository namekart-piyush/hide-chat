import React, { useState, useRef, useEffect } from 'react';
import { IoExitOutline } from 'react-icons/io5';
import { IoAttach } from 'react-icons/io5';
import './ChatPage.css';
import { useChatContext } from '../context/ChatContext';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useNavigate } from 'react-router';

const baseUrl = 'http://localhost:8080';

const ChatPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);
  const [messageSource, setMessageSource] = useState('websocket');
  const [processedMessageIds, setProcessedMessageIds] = useState(new Set());
  const lastMessageRef = useRef(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const { room, user } = useChatContext();

  const addMessage = (newMessage) => {
    const messageId = `${newMessage.sender}-${newMessage.content}-${newMessage.localDateTime}`;
    
    if (!processedMessageIds.has(messageId) && 
        (!lastMessageRef.current || 
         lastMessageRef.current.content !== newMessage.content ||
         lastMessageRef.current.sender !== newMessage.sender ||
         Math.abs(new Date(lastMessageRef.current.localDateTime) - new Date(newMessage.localDateTime)) > 1000)) {
      
      setProcessedMessageIds(prev => new Set([...prev, messageId]));
      setMessages(prev => [...prev, newMessage]);
      lastMessageRef.current = newMessage;
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setMessage(`Attached: ${file.name}`);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() && !selectedFile) return;

    try {
      const messageRequest = {
        content: message,
        sender: user.id,
        roomId: room.id,
        localDateTime: new Date().toISOString()
      };

      if (isWebSocketConnected && stompClient?.connected) {
        if (messageSource !== 'websocket') {
          setMessageSource('websocket');
        }
        stompClient.send(
          `/app/sendMessage/${room.id}`, 
          {},
          JSON.stringify(messageRequest)
        );
      } else {
        setMessageSource('direct');
        addMessage(messageRequest);
      }

      setMessage('');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  const handleLeave = () => {
    if (stompClient && stompClient.connected) {
      stompClient.disconnect();
    }
    setMessages([]);
    setMessage('');
    navigate('/');
  };

  useEffect(() => {
    if (!room?.id || !user?.id) return;

    let client = null;

    const fetchMessages = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/rooms/${room.id}/messages`);
        const data = await response.json();
        const initialMessageIds = new Set(
          data.map(msg => `${msg.sender}-${msg.content}-${msg.localDateTime}`)
        );
        setProcessedMessageIds(initialMessageIds);
        setMessages(data);
        if (data.length > 0) {
          lastMessageRef.current = data[data.length - 1];
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    const setupWebSocket = () => {
      const sock = new SockJS(`${baseUrl}/chat`);
      client = Stomp.over(sock);

      client.debug = null;

      client.connect({}, () => {
        setIsWebSocketConnected(true);
        setMessageSource('websocket');
        
        client.subscribe(`/topic/room/${room.id}`, (message) => {
          if (messageSource === 'websocket') {
            const newMessage = JSON.parse(message.body);
            addMessage(newMessage);
          }
        });

        setStompClient(client);
      }, (error) => {
        console.error('WebSocket connection error:', error);
        setIsWebSocketConnected(false);
        setMessageSource('direct');
      });
    };

    fetchMessages();
    setupWebSocket();

    return () => {
      if (client && isWebSocketConnected) {
        client.disconnect();
        setIsWebSocketConnected(false);
      }
    };
  }, [room?.id, user?.id]);

  useEffect(() => {
    if (!isWebSocketConnected) {
      setMessageSource('direct');
    }
  }, [isWebSocketConnected]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2 className='text-white'>Chat Room #{room?.id || 'Loading...'}</h2>
        <button className="leave-button" onClick={handleLeave}>
          <IoExitOutline size={24} />
        </button>
      </div>

      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === user.id ? 'sent' : 'received'}`}
          >
            <div className="message-header">
              <span className="username">
                {msg.sender === user.id ? 'You' : `User ${msg.sender.slice(-4)}`}
              </span>
              <span className="timestamp">
                {new Date(msg.localDateTime).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
            <div className="message-content">
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="message-input-container" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="file-input"
          id="file-input"
          hidden
        />
        <button 
          type="button" 
          className="attach-button"
          onClick={() => fileInputRef.current?.click()}
        >
          <IoAttach size={20} />
        </button>
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
