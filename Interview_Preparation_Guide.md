# INTERVIEW PREPARATION GUIDE: NEXCALL
## Project Defense & Technical Q&A

---

## 1. The "Elevator Pitch" (Tell me about your project)
*"My project, NexCall, is a real-time video conferencing application similar to Google Meet or Zoom. It allows users to create accounts, host meetings, and join via a unique code. I built it using the **MERN stack** (MongoDB, Express, React, Node.js). The core video functionality relies on **WebRTC** for peer-to-peer streaming, and I used **Socket.io** for the signaling server to establish those connections. It features secure authentication, real-time chat, screen sharing, and a responsive glassmorphism UI."*

---

## 2. Core Concepts (The "How It Works" Questions)

### Q: What is WebRTC?
**A:** WebRTC (Web Real-Time Communication) is an open-source project that enables real-time communication of audio, video, and data in web browsers and mobile applications. It allows **Peer-to-Peer (P2P)** communication, meaning data flows directly between users rather than through the server (reducing server load and latency).

### Q: If it's P2P, why do you need a Backend (Node.js/Socket.io)?
**A:** WebRTC needs a **Signaling Mechanism** to set up the call. Two browsers don't know each other's IP address or capabilities. The backend acts as a mediator:
1.  **SDP Exchange**: Peers swap Session Description Protocols (SDP) to agree on codecs and media settings.
2.  **ICE Candidates**: Peers swap network information (IPs, Ports) to navigate firewalls.
Socket.io is used to transport these message packets instantly between clients.

### Q: What is the role of STUN and TURN servers?
**A:**
*   **STUN (Session Traversal Utilities for NAT)**: Tells the client what its Public IP is. Most connections work with just STUN.
*   **TURN (Traversal Using Relays around NAT)**: A relay server used as a fallback if P2P fails (e.g., symmetric NATs or strict corporate firewalls). It relays data, costing bandwidth.

### Q: How did you handle Authentication?
**A:** I used **React Context API** to manage the auth state on the frontend. On the backend, I used **bcrypt** to hash passwords before saving to MongoDB and **JWT (JSON Web Tokens)** to generate a session token upon login. This token is sent with requests to verify identity.

---

## 3. Technical & Code Specific Questions

### Q: Why did you choose React for this project?
**A:** React's component-based architecture makes it easy to manage the complex state of a video app (streams, chat messages, participant lists). I also utilized **Hooks** (useEffect, useRef, useState) which simplify side-effect management like attaching video streams to DOM elements.

### Q: Explain the `useEffect` and `useRef` hooks in your video component.
**A:**
*   **`useRef`**: Used to hold a reference to the `<video>` HTML element so I can directly assign the media stream to `videoRef.current.srcObject` without triggering re-renders.
*   **`useEffect`**: Used to trigger the connection logic (getting media, listening to socket events) exactly once when the component mounts.

### Q: How is State Management handled?
**A:** I used the **Context API** (`contexts/` folder) to create a global AuthContext. This avoids "prop drilling" user information down to every component. For local state like "is my mic muted", I used simple `useState`.

### Q: How does the Chat feature work securely?
**A:** Chat messages are sent via Socket.io. When User A types, the event `send-message` goes to the server, which broadcasts `receive-message` to everyone in the specific `roomId`.

---

## 4. Challenges You Faced & Solutions

### Challenge 1: Video Latency or Connection Failures
**Solution**: "Initially, my connections failed on different networks. I learned I needed a public **STUN server** (like Google's free STUN servers) in my `RTCPeerConnection` configuration to traverse NAT."

### Challenge 2: React State Updates on Unmounted Components
**Solution**: "I vetted my `useEffect` cleanup functions. I ensured that if a user leaves a meeting, I close the PeerConnection and remove socket listeners to prevent memory leaks."

### Challenge 3: handling "Ghost" Peers
**Solution**: "Sometimes a user disconnects abruptly. I implemented `socket.on('user-left')` to ensure the UI updates and removes their video frame immediately."

---

## 5. System Design / Architecture Questions

### Q: Is your database SQL or NoSQL? Why?
**A:** I chose **NoSQL (MongoDB)**. It fits perfectly with the MERN stack. User profiles and Meeting logs are unstructured documents. It allows for flexibility—if I want to add a "profilePicture" field later, I don't need to run complex migrations.

### Q: How would you scale this app for 1000 users?
**A:**
1.  **Media Server**: Pure P2P (Mesh topology) fails after 4-5 users because every user uploads to everyone else. For scaling, I would switch to an **SFU (Selective Forwarding Unit)** architecture (like Mediasoup or Jitsi) which acts as a central router.
2.  **Load Balancer**: Use Redis Adapter with Socket.io to distribute socket connections across multiple Node.js server instances.

---

## 6. Key Terms to Remember for Interview
*   **Mesh Topology**: Everyone connects to everyone (good for small groups, what you likely used).
*   **Signaling**: The "handshake" process (Socket.io).
*   **SDP**: The "business card" of the device (contains resolution, codec info).
*   **ICE**: The "path" to the device (network route).
*   **Glassmorphism**: The UI design trend (translucent, frosted glass effect).
