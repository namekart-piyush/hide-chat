package com.example.chatAppBackend.Controller;

import com.example.chatAppBackend.Entity.Message;
import com.example.chatAppBackend.DAO.MessageRequest;
import com.example.chatAppBackend.Entity.Room;
import com.example.chatAppBackend.Repository.RoomRepository;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;

@Controller
public class ChatController {

    private RoomRepository roomRepository;

    public ChatController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

 @MessageMapping("/sendMessage/{roomId}")
 @SendTo("/topic/room/{roomId}")
 public Message sendMessage(
         @RequestBody MessageRequest request,
         @DestinationVariable String roomId){
        Room room = roomRepository.findByRoomId(roomId);
        Message message = new Message();
        message.setContent(request.getContent());
        message.setSender(request.getSender());
        message.setLocalDateTime(LocalDateTime.now());
        if(room!=null){
            room.getMessages().add(message);
            roomRepository.save(room);
        }else {
            throw new RuntimeException("No Room Found");
        }
        return message;

    }
}
