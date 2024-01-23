import { ChangeEvent } from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useAppDispatch } from "hooks/redux.hooks";
import { sendMessage } from "../store/chat.actions";
import { useState } from "react";
import { Message } from "aviatickets-submodule/libs/socket/types/message";

type Props = {};

export default function MessageInput({}: Props) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    const newMessage: Message = {
      text: message,
      sender: "fk3m2gmrekmgfiovwifv",
      reciever: "1",
      time: Date.now(),
    };
    dispatch(sendMessage(newMessage));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMessage(e.currentTarget.value);
  };
  const [message, setMessage] = useState("");
  return (
    <Box
      sx={{
        display: "flex",
        borderTop: "2px solid",
        borderColor: "#858585",
      }}
    >
      <InputBase
        placeholder="Message"
        sx={{
          flexBasis: "100%",
        }}
        onChange={handleChange}
      />
      <IconButton onClick={handleClick}>
        <SendIcon />
      </IconButton>
    </Box>
  );
}
