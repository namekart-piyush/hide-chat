package com.example.chatAppBackend.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "message")
@Getter
@Setter
@NoArgsConstructor
public class Message {
    private String sender;
    private String content;
    private LocalDateTime localDateTime;

    public Message(String sender,String content){
        this.sender = sender;
        this.content = content;
        this.localDateTime = LocalDateTime.now();
    }

}
