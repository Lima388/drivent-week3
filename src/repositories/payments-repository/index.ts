import { prisma } from "@/config";
import { Payment } from "@prisma/client";

async function findByTicketId(ticketId: number) {
  const result = prisma.payment.findFirst({
    where: {
      ticketId: ticketId,
    }
  });
  return result;
}

async function addPayment(ticketId: number, lastDigits: string, issuer: string, value: number) {
  const result = prisma.payment.create({
    data: {
      ticketId: ticketId,
      cardLastDigits: lastDigits,
      cardIssuer: issuer,
      value: value
    }
  });
  return result;
}

const paymentRepository = {
  findByTicketId,
  addPayment
};

export default paymentRepository;
