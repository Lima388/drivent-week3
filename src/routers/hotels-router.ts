import { Router } from "express";
import { getHotels, getRooms } from "@/controllers";
import { authenticateToken, hotelTicketVerification } from "@/middlewares";

const hotelsRouter = Router();

hotelsRouter.all("/*", authenticateToken, hotelTicketVerification);
hotelsRouter.get("/", getHotels);
hotelsRouter.get("/:hotelId", getRooms);

export { hotelsRouter };
