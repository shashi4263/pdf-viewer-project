import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

// Initialize the socket connection
const socket = io("http://localhost:4000");

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PDFViewer = ({ isAdmin }) => {
  const [pdf, setPdf] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [roomId, setRoomId] = useState("");
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const loadedPdf = await pdfjsLib.getDocument("/sample.pdf").promise;
        setPdf(loadedPdf);
        goToPage(1); // Render the first page immediately after loading
      } catch (error) {
        console.error("Error loading PDF:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!pdf) loadPdf();

    // Listener for the page sync event
    socket.on("sync-page", (newPage) => {
      if (!isAdmin && newPage !== page) {
        goToPage(newPage);
      }
    });

    // Join the room
    if (roomId) {
      socket.emit("join-room", roomId);
    }

    return () => {
      socket.off("sync-page");
    };
  }, [pdf, isAdmin, roomId, page]);

  const renderPage = async (pageNum) => {
    if (!pdf) return;
    try {
      const pdfPage = await pdf.getPage(pageNum);
      const viewport = pdfPage.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await pdfPage.render({ canvasContext: context, viewport }).promise;
    } catch (error) {
      console.error("Error rendering page:", error);
    }
  };

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= pdf.numPages) {
      setPage(newPage);
      renderPage(newPage); // Render the specified page
    }
  };

  const handleNextPage = () => {
    if (isAdmin && page < pdf.numPages) {
      const newPage = page + 1;
      setPage(newPage);
      socket.emit("change-page", { roomId, page: newPage });
      renderPage(newPage);
    }
  };

  const handlePreviousPage = () => {
    if (isAdmin && page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      socket.emit("change-page", { roomId, page: newPage });
      renderPage(newPage);
    }
  };

  const handleCreateRoom = () => {
    const newRoomId = prompt("Enter a Room ID to create:");
    if (newRoomId) {
      setRoomId(newRoomId);
      socket.emit("create-room", newRoomId);
      goToPage(1); // Ensure the first page is rendered on room creation
    }
  };

  const handleJoinRoom = () => {
    const joinRoomId = prompt("Enter Room ID to join:");
    if (joinRoomId) {
      setRoomId(joinRoomId);
    }
  };

  return (
    <div className="pdf-viewer flex flex-col items-center">
      {!roomId && (
        <div className="mb-4 space-x-4">
          <button
            onClick={handleCreateRoom}
            className="btn bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create Room
          </button>
          <button
            onClick={handleJoinRoom}
            className="btn bg-green-500 text-white px-4 py-2 rounded"
          >
            Join Room
          </button>
        </div>
      )}

      {loading ? (
        <div className="loader">Loading PDF...</div>
      ) : (
        <>
          <canvas
            ref={canvasRef}
            style={{
              border: "1px solid #000",
              width: "100%",
              height: "100%",
              maxWidth: "700px",
              maxHeight: "80vh",
            }}
            className="border shadow-lg rounded-md mb-4"
          />
          <div className="flex justify-center mt-4 space-x-4">
            {isAdmin && (
              <>
                <button
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                  className="btn bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={page === pdf.numPages}
                  className="btn bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Next
                </button>
              </>
            )}
            {!isAdmin && (
              <div className="text-center text-gray-600">
                <p>Viewer Mode: Page {page}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PDFViewer;
