import { Server } from "socket.io";
import Location, { ILocation } from "./models/Location";

const socketHandler = (io: Server): void => {
  io.on("connection", (socket) => {
    console.log("A device connected");

    socket.on("updateLocation", async (location: ILocation) => {
      console.log("Location received:", location);

      // Save to MongoDB
      const newLocation = new Location(location);
      await newLocation.save();

      // Broadcast location to all connected clients
      io.emit("locationUpdate", location);
    });

    socket.on("disconnect", () => {
      console.log("A device disconnected");
    });
  });
};

export default socketHandler;
