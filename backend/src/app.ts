import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

interface DriverLocation {
  latitude: number;
  longitude: number;
}

interface DriverData {
  id: string;
  position: DriverLocation;
}

const drivers: { [key: string]: DriverLocation } = {};

io.on("connection", (socket: Socket) => {
  console.log("A user connected:", socket.id);
  // Listen for location updates from drivers
  socket.on("updateLocation", (data: DriverData) => {
    console.log("Updated data received from the driver: ", data);

    const { id, position } = data;

    if (!id || !position) {
      console.error("Invalid data received:", data);
      return;
    }

    drivers[id] = position;

    console.log("Driver location stored:", { id, position });

    // Broadcast the updated location to all users
    io.emit("driverLocationUpdate", { id, position });
  });

  socket.on("user-connected", () => {
    // we know it is a user and not a drvier
    socket.emit("driverLocations", drivers);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete drivers[socket.id];
  });
});

// Use dynamic port for Railway or default to 3001
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on http://localhost:${PORT}`);
});
