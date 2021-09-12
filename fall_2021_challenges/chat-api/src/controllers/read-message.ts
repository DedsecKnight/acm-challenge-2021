import { Request, Response } from "express";
import { Message } from "../entity/Message";

const findMessages = async (chatId: string) => {
    return Message.find({
        where: {
            chatId,
        },
    });
};

const findMessagesBySender = (chatId: string, sender: string) => {
    return Message.find({
        where: {
            sender,
            chatId,
        },
    });
};

export const readMessageController = async (req: Request, res: Response) => {
    const { sender, chat_id } = req.body;
    if (!sender) {
        const messages = await findMessages(chat_id);
        return res.send(messages);
    } else {
        const message = await findMessagesBySender(chat_id, sender);
        return res.send(message);
    }
};
