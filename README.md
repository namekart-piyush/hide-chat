# ChatApp

ChatApp is a **real-time messaging application** built using **Spring Boot, Kafka, RabbitMQ, Redis, and MongoDB**. It ensures **scalability, fault tolerance, and high availability** for chat applications.



## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## **🚀 Project Overview**

ChatApp is a **scalable real-time chat application** designed for **high-speed messaging** and **fault tolerance** using Kafka, RabbitMQ, Redis, and MongoDB. It ensures **real-time message delivery** with WebSockets and **asynchronous processing** with Kafka.

---

## **🔥 Features**

✅ **Real-Time Chat** – WebSocket-based messaging\
✅ **Kafka Integration** – Scalable and event-driven architecture\
✅ **RabbitMQ Support** – Reliable messaging queue for instant delivery\
✅ **Redis Caching** – Fast retrieval of recent messages\
✅ **MongoDB Storage** – Persistent storage for chat history\
✅ **Scalability** – Supports millions of users\
✅ **Fault-Tolerant** – Kafka ensures message durability

---

## **⚙️ Architecture**

The chat system follows a **distributed architecture**:

1. **WebSockets**: Handles real-time chat between users.
2. **Kafka (Message Broker)**: Ensures high scalability and event-driven message processing.
3. **RabbitMQ (Instant Delivery)**: Push-based messaging for quick delivery.
4. **Redis (Caching Layer)**: Stores recent messages for quick access.
5. **MongoDB (Database)**: Stores persistent chat history.
6. **Spring Boot (Backend API)**: Manages user sessions, rooms, and WebSocket communication.

---

## **📦 Installation**

Follow these steps to **set up ChatApp locally**:

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/piyush257/chatapp.git
cd chatapp
```

### **2️⃣ Install Dependencies**

```bash
mvn install
```

### **3️⃣ Configure Environment**

Create an `application.properties` file inside `src/main/resources`:

```properties
server.port=8080

# MongoDB Configuration
spring.data.mongodb.uri=mongodb://localhost:27017/chatapp

# Redis Configuration
spring.data.redis.host=localhost
spring.data.redis.port=6379

# Kafka Configuration
spring.kafka.bootstrap-servers=localhost:9092

# RabbitMQ Configuration
spring.rabbitmq.host=localhost
spring.rabbitmq.port=5672
spring.rabbitmq.username=guest
spring.rabbitmq.password=guest
```

### **4️⃣ Start Required Services**

```bash
docker-compose up -d
```

This will start:

- **MongoDB**
- **Kafka**
- **RabbitMQ**
- **Redis**

### **5️⃣ Start the Application**

```bash
mvn spring-boot:run
```

---

## **💡 Usage**

### **📌 WebSocket API**

The **WebSocket endpoint** for sending messages:

```
ws://localhost:8080/chat
```

Send a message in **JSON format**:

```json
{
  "roomId": "12345",
  "sender": "Alice",
  "content": "Hello, World!"
}
```

### **📌 REST API Endpoints**

#### **🔹 Get Chat History**

```http
GET /api/messages/{roomId}
```

#### **🔹 Send a Text Message**

```http
POST /api/messages/send
Content-Type: application/json
```

```json
{
  "roomId": "12345",
  "sender": "Bob",
  "content": "Hey Alice!"
}
```

#### **🔹 Send a File Message**

```http
POST /api/messages/send-file
Content-Type: multipart/form-data
```

**Form Data:**

- `roomId = 12345`
- `sender = Bob`
- `file = [your file]`

---

## **🛠 Technologies Used**

| **Component**      | **Technology**      |
| ------------------ | ------------------- |
| **Backend**        | Spring Boot         |
| **Message Broker** | Kafka, RabbitMQ     |
| **Database**       | MongoDB             |
| **Cache**          | Redis               |
| **WebSockets**     | STOMP WebSockets    |
| **Frontend**       | React (optional)    |
| **Monitoring**     | Prometheus, Grafana |

---

## **🌍 Contributing**

We welcome contributions! Follow these steps:

1. **Fork the repository**
2. **Create a new branch**:
   ```bash
   git checkout -b feature-yourfeature
   ```
3. **Commit your changes**:
   ```bash
   git commit -am 'Add some feature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature-yourfeature
   ```
5. **Submit a Pull Request (PR)**

---

## **📜 License**

This project is licensed under the **MIT License**.

---

## **📞 Contact**

- **Author**: Piyush Singh
- **GitHub**: [Piyush257](https://github.com/piyush257)
- **LinkedIn**: [Piyush Singh](https://www.linkedin.com/in/piyush-singh908)
- **Email**: [piyush257@example.com](mailto\:piyush257@example.com)

---

## **🎯 Future Enhancements**

- ✅ **Add WebRTC for voice/video chat**
- ✅ **Store files in AWS S3**
- ✅ **Integrate Firebase Authentication**
- ✅ **Mobile App Support with Flutter/React Native**

---

## **✅ Summary**

🚀 **ChatApp** is a **highly scalable, real-time chat application** built using **Kafka, RabbitMQ, Redis, and MongoDB**. It is designed for **instant messaging, fault tolerance, and event-driven architecture**.

---

Would you like me to \*\*generate a \*\***`docker-compose.yml`** for deploying all services together? 🚀

