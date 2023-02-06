import { notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository";
import httpStatus from "http-status";

async function getHotels() {
  const hotels = await hotelRepository.findAll();
  if(hotels.length===0) throw(httpStatus.NOT_FOUND);
  return hotels;
}

async function getHotelWithRooms(hotelId: number) {
  const hotel = await hotelRepository.findFirst(hotelId);

  if (!hotel) {
    throw notFoundError();
  }

  return hotel;
}

const hotelService = {
  getHotels,
  getHotelWithRooms
};

export default hotelService;
