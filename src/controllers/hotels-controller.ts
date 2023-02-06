import { AuthenticatedRequest } from "@/middlewares";
import hotelService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const hotels = await hotelService.getHotels();
    return res.status(httpStatus.OK).send(hotels);
  } catch(error) {
    return res.status(error).send([]);
  }
}

export async function getRooms(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;
  if(!hotelId || isNaN(parseInt(hotelId))) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
  try{
    const rooms = await hotelService.getHotelWithRooms(parseInt(hotelId));
    return res.status(httpStatus.OK).send(rooms);
  } catch(error) {
    return res.status(httpStatus.NOT_FOUND).send([]);
  }
}
