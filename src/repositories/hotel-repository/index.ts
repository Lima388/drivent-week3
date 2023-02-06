import { prisma } from "@/config";

async function findAll() {
  return prisma.hotel.findMany();
}

async function findFirst(hotelId: number) {
  return prisma.hotel.findFirst({
    where: { id: hotelId },
    include: {
      Rooms: true
    }
  });
}

const hotelRepository = {
  findAll,
  findFirst
};

export default hotelRepository;
