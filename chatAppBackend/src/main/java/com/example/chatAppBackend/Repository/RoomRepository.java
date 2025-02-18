package com.example.chatAppBackend.Repository;

import com.example.chatAppBackend.Entity.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomRepository extends MongoRepository<Room,String> {
    Room findByRoomId(String roomId);
}
