# PDF Co-Viewer

The **PDF Co-Viewer** is a real-time collaborative viewer for PDF slides that allows multiple users to stay in sync with the presenter or admin. When the admin changes the page, all connected viewers automatically see the updated page. This tool is ideal for remote presentations, online classes, and collaborative study sessions.

## Features

- **Real-Time Page Synchronization**: All users in the same room view the same page as the admin or presenter.
- **Room-Based Viewing**: Users can join specific rooms to view slides together in a separate session.
- **WebSocket Integration**: Real-time updates are powered by WebSocket, allowing low-latency page sync.
- **Admin Control**: The admin has control to change pages for all viewers.

## Demo

[Link to live demo on Vercel]([https://pdf-viewer-project.vercel.app/])

## Tech Stack

- **Frontend**: React, Vercel (for hosting)
- **Backend**: Node.js, Express, Socket.IO
- **Deployment**: Vercel (Frontend), Render (Backend)

## Images
![Screenshot 2024-11-15 213921](https://github.com/user-attachments/assets/775e5130-40d3-463b-9756-502550dc58ef)
![Screenshot 2024-11-15 213932](https://github.com/user-attachments/assets/d103afb3-f5a6-4a45-8fc3-2490386ef285)
![Screenshot 2024-11-15 213955](https://github.com/user-attachments/assets/1d92e64c-51b1-4d4d-8f23-3244228d37d4)
![Screenshot 2024-11-15 214005](https://github.com/user-attachments/assets/11f12475-3d2a-47ce-a3ec-53fca127c042)
![Screenshot 2024-11-15 214024](https://github.com/user-attachments/assets/3fec1906-186c-465a-b58d-8ad81df7c8d8)
![Screenshot 2024-11-15 213948](https://github.com/user-attachments/assets/88df12c4-e12c-40ef-9607-6cf68b67954d)



## Project Structure

```plaintext
pdf-co-viewer/
├── frontend/       # Frontend code
└── backend/        # Backend code


