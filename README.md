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

## Project Structure

```plaintext
pdf-co-viewer/
├── frontend/       # Frontend code
└── backend/        # Backend code
