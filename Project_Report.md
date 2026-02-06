# PROJECT REPORT ON NEXCALL
## Advanced Video Meeting Application

---

## 1. Title Page
**Project Title**: NexCall  
**Domain**: Web Application / Real-time Communication  
**Technology Stack**: MERN (MongoDB, Express, React, Node.js), WebRTC, Socket.io  
**Submitted By**: [Your Name]  
**Institution**: [Your College/University Name]  

---

## 2. Certificate
(This section is reserved for the institutional certificate validating the completion of the project.)

---

## 3. Acknowledgement
(Express gratitude to mentors, faculty, and anyone who helped during the project.)

---

## 4. Abstract
In the post-pandemic era, remote communication has become essential. **NexCall** is a modern, high-performance video conferencing application designed to facilitate seamless virtual meetings. Built using the MERN stack and WebRTC, it offers high-definition video/audio calling, real-time chat, and screen sharing capabilities. The application features a secure authentication system, a glassmorphism-inspired user interface for a premium experience, and robust backend handling for low-latency communication. This report details the development lifecycle, system architecture, and implementation of NexCall.

---

## 5. Table of Contents
1. Introduction
2. Problem Statement
3. Objectives
4. System Analysis
5. Feasibility Study
6. System Design
7. Technology Stack
8. Implementation Details
9. Testing
10. Conclusion & Future Scope
11. Bibliography/References

---

## 6. Introduction
NexCall serves as a platform for users to host and join video meetings instantly. Unlike traditional software that requires heavy installations, NexCall runs directly in the browser. It leverages **WebRTC (Web Real-Time Communication)** for peer-to-peer media streaming, ensuring privacy and speed, while a **Node.js/Socket.io** signaling server manages the connection logic.

---

## 7. Problem Statement
Existing video conferencing solutions are often bloated, expensive, or privacy-intrusive. Many require mandatory software downloads. There is a need for a lightweight, browser-based solution that does not compromise on quality or features, accessible to anyone with an internet connection.

---

## 8. Objectives
*   To develop a web-based video calling application.
*   To implement secure user authentication and meeting history tracking.
*   To enable real-time features like Chat and Screen Sharing.
*   To ensure a responsive, modern UI that works across devices.
*   To learn and implement WebRTC protocol for peer-to-peer data transfer.

---

## 9. System Analysis

### 9.1 Existing System
*   **Zoom/Teams**: Feature-rich but heavy, often require apps.
*   **Google Meet**: Web-based but proprietary.
*   **Legacy VoIP**: High latency, requires plugins.

### 9.2 Proposed System (NexCall)
*   **Lightweight**: No downloads required.
*   **Secure**: JWT Authentication.
*   **Modern**: Glassmorphism UI using React & Framer Motion.
*   **Real-Time**: Low latency using WebRTC.

---

## 10. Feasibility Study

### 10.1 Technical Feasibility
The project uses standard web technologies (JavaScript/Node.js). The development team is familiar with React and Express. WebRTC is supported by all modern browsers. Thus, the project is technically feasible.

### 10.2 Operational Feasibility
The UI is designed to be intuitive (Clean Dashboard, simple "Join" buttons). No special training is needed for users.

### 10.3 Economic Feasibility
The stack is Open Source (MIT engines). Hosting can be done on free tiers (Vercel/Render). Development costs are minimal (Time & Effort).

---

## 11. System Design

### 11.1 System Architecture
The application follows a **Client-Server Architecture** but utilizes **Peer-to-Peer (P2P)** for media.

1.  **Client (Frontend)**: React Application. Handles UI, captures Media Stream (Camera/Mic), and renders incoming streams.
2.  **Signaling Server (Backend)**: Node.js + Socket.io. Helps peers "find" each other by exchanging metadata (SDP, ICE candidates). It does **not** process video; it only sets up the call.
3.  **Database**: MongoDB. Stores user profiles and meeting history.
4.  **STUN/TURN Servers**: Used to bypass NAT/Firewalls to establish P2P connections.

### 11.2 Data Flow Diagram (DFD) - Level 0
*   User -> Login -> Server -> Auth Token
*   User -> Join Meeting -> Server -> Socket Connection -> Other Peers
*   User A -> Video Stream -> User B (Directly via WebRTC)

### 11.3 Database Design (Schema)

**User Schema**:
```json
{
  "name": "String",
  "username": "String (Unique)",
  "password": "String (Hashed)",
  "token": "String"
}
```

**Meeting Schema**:
```json
{
  "user_id": "ObjectId",
  "meetingCode": "String",
  "date": "Date",
  "duration": "String"
}
```

---

## 12. Technology Stack

### Frontend
*   **React.js**: Component-based UI library.
*   **Material UI (MUI)**: For pre-built accessible components.
*   **Framer Motion**: For smooth animations.
*   **Socket.io-client**: For real-time event communication.

### Backend
*   **Node.js**: Runtime environment.
*   **Express.js**: Web framework for API routes.
*   **Socket.io**: Library for WebSocket communication (Signaling).
*   **Mongoose**: ODM for MongoDB.

### Core Protocols
*   **WebRTC**:
    *   **RTCPeerConnection**: Manages full lifecyle of the connection.
    *   **RTCSessionDescription (SDP)**: Describes capability (codec, resolution).
    *   **ICE Candidates**: Network possibilities (IP:Port) to connect.

---

## 13. Implementation Details

### 13.1 Authentication Module
Users register and login. Passwords are hashed using `bcrypt` before storing. On login, a JSON Web Token (JWT) is issued for session management.

### 13.2 Video Meeting Module
When a user joins a room:
1.  **GetUserMedia**: Browser prompts for Camera/Mic access.
2.  **Join Event**: Socket event sent to server with `roomId`.
3.  **Signaling**:
    *   Existing user sends an **Offer**.
    *   New user receives Offer, sets Remote Description, and sends **Answer**.
    *   Both exchange **ICE Candidates** to find a network path.
4.  **Stream**: Once connected, `<video>` tags are attached to the streams.

### 13.3 Chat & Screen Share
*   **Chat**: Simple socket events (`send-message`, `receive-message`) broadcasted to the room.
*   **Screen Share**: Uses `navigator.mediaDevices.getDisplayMedia()`. The video track of the local stream is replaced with the screen track.

---

## 14. Testing

### 14.1 Unit Testing
*   Tested API endpoints (Login, Register) using Postman.
*   Verified Component rendering in React.

### 14.2 Integration Testing
*   Verified Video flow: User A connects -> User B sees User A.
*   Verified Audio: Latency checks.
*   Verified Signaling: Checked console logs for Offer/Answer exchange.

### 14.3 Cross-Browser Testing
*   Tested on Chrome (Desktop/Mobile), Firefox, and Edge.

---

## 15. Screenshots
*(Include screenshots of Landing Page, Login Screen, Dashboard, Video Meeting Room in Grid View, Chat Window)*

---

## 16. Conclusion & Future Scope
**Conclusion**: NexCall successfully demonstrates the power of modern web technologies to create complex real-time applications. It provides a robust alternative to native apps.

**Future Scope**:
*   Record Meetings.
*   Whiteboard integration.
*   End-to-End Encryption (E2EE) for chats.
*   AI-based noise cancellation.

---

## 17. References
1.  React Documentation: https://reactjs.org/
2.  WebRTC.org: https://webrtc.org/
3.  Socket.io Docs: https://socket.io/docs/
4.  MDN Web Docs: https://developer.mozilla.org/
