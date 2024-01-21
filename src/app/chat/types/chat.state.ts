import { Socket } from "socket.io"
import { Message } from "../../../../aviatickets-submodule/libs/socket/types/message"

export type ChatState = {
    messages: Message[]
    connected: boolean
    user: string
}