import { prisma } from "@/config";
import { Ticket, TicketStatus } from "@prisma/client";

async function findManyTypes() {
  const result = prisma.ticketType.findMany();
  return result;
}

async function findById(id: number) {
  const result = prisma.ticket.findUnique({
    where: {
      id: id,
    },
    include: {
      TicketType: true
    }
  });
  return result;
}

async function findFirstByEnrollmentId(enrollmentId: number) {
  const result = prisma.ticket.findFirst({
    where: {
      enrollmentId: enrollmentId,
    },
    include: {
      TicketType: true,
    }
  });
  return result;
}

async function createTicket(ticket: NewTicket) {
  const result = prisma.ticket.create({
    data: ticket,
    include: {
      TicketType: true,
    }
  });
  return result;
}

async function setPaidStatus(ticketId: number) {
  const result = prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    }
  });
  return result;
}

export type NewTicket = Omit<Ticket, "id" | "Payment" | "ticketType" | "createdAt" | "updatedAt">;

const ticketsRepository = {
  findManyTypes,
  findFirstByEnrollmentId,
  createTicket,
  findById,
  setPaidStatus
};

export default ticketsRepository;
