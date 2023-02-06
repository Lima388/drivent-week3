import { TicketStatus } from "@prisma/client";
import { prisma } from "@/config";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "./authentication-middleware";

export async function hotelTicketVerification(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try{
    const { userId } = req;

    const enrollment = await prisma.enrollment.findFirst({
      where: { userId },
      include: {
        Address: true,
      },
    });

    if (!enrollment) throw(httpStatus.NOT_FOUND);

    const ticket = await prisma.ticket.findFirst({
      where: {
        enrollmentId: enrollment.id,
      },
      include: {
        TicketType: true,
      }
    });

    if (!ticket) throw(httpStatus.NOT_FOUND);

    if(
      ticket.status !== TicketStatus.PAID ||
      !ticket.TicketType.includesHotel ||
      ticket.TicketType.isRemote
    ) throw(httpStatus.PAYMENT_REQUIRED);
    
    return next();
  } catch (error) {
    return generateResponse(res, error);
  }
}

function generateResponse(res: Response, error: number) {
  res.status(error).send([]);
}
