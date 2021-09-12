import { Request, Response } from "express";
import { Message } from "../entity/Message";

export const sendMessageController = async (req: Request, res: Response) => {
    const { chat_id, sender, message } = req.body;
    const messageObj = Message.create({
        chatId: chat_id,
        sender,
        content: message,
    });
    await messageObj.save();
    res.status(201).send(messageObj);
};
