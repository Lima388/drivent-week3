import { PaymentInfo } from "@/services";
import Joi from "joi";

export const paymentInfoSchema = Joi.object<PaymentInfo>({
  ticketId: Joi.number().required(),
  cardData: {
    issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.date().required(),
    cvv: Joi.number().required()
  }
});
