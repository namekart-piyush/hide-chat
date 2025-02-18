package com.example.chatAppBackend.Controller;

import com.example.chatAppBackend.Entity.Message;
import com.example.chatAppBackend.Entity.Room;
import com.example.chatAppBackend.Repository.RoomRepository;
import com.example.chatAppBackend.config.AppConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin(AppConfig.frontend)
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;
    //create room
    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody String roomId) {
         if(roomRepository.findByRoomId(roomId)!=null){
             return ResponseEntity.badRequest().body("Room already exists");
         }
         Room room = new Room();
         room.setRoomId(roomId);
         roomRepository.save(room);
         return ResponseEntity.ok().body(room);

    }

    //get room and join

    @GetMapping("/{roomId}")
    public ResponseEntity<?> joinRoom(@PathVariable String roomId) {
        Room room = roomRepository.findByRoomId(roomId);
        if(room==null){
            return ResponseEntity.badRequest().body("Room does not exists");
        }
     return ResponseEntity.ok(room);

    }

    //get messages of room
    @GetMapping("/{roomId}/messages")
    public ResponseEntity<?> getMessages(@PathVariable String roomId,
                                         @RequestParam(value = "page",defaultValue = "0",required = false) int page,
                                         @RequestParam(value = "size",defaultValue = "20",required = false) int size) {
        Room room = roomRepository.findByRoomId(roomId);
        if(room==null){
            return ResponseEntity.badRequest().body("Room does not exists");
        }

        //paginate kardenge baad mai
        List<Message> messages = room.getMessages();
        return ResponseEntity.ok(messages);

    }
}
