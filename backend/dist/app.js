"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
app.use((0, cors_1.default)());
//how to add this
app.get("/", (req, res) => {
    res.send("WebSocket server is running");
});
const drivers = {};
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    // Listen for location updates from drivers
    socket.on("updateLocation", (data) => {
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
        // we know it is a user and not a drvier so we just send the stored drivers to them
        socket.emit("driverLocations", drivers);
    });
    // Handle disconnection
    socket.on("disconnect", () => {
        io.emit("driverCheck", socket.id); // Upon disconnection, we emit to check if the client which left is a driver or not. If it is, we stop it from displaying on users' map.
        delete drivers[socket.id];
    });
});
// Use dynamic port for Railway or default to 3001
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Socket.IO server running on http://localhost:${PORT}`);
});
