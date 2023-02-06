import dayjs from "dayjs";
import faker from "@faker-js/faker";
import { Hotel, Room } from "@prisma/client";
import { prisma } from "@/config";

export async function createHotel(params: Partial<Hotel> = {}): Promise<Hotel> {
  return await prisma.hotel.create({
    data: {
      name: params.name || faker.lorem.sentence(),
      image: params.image || faker.image.imageUrl(),
    },
  });
}

export async function createRooms(params: Partial<Room> = {}): Promise<Room> {
  return await prisma.room.create({
    data: {
      name: params.name || faker.lorem.sentence(),
      capacity: faker.datatype.number({ min: 100000000000000, max: 999999999999999 }),
      hotelId: params.hotelId,
    },
  });
}
