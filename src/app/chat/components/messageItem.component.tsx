import React from 'react'
import { Message } from '../../../../aviatickets-submodule/libs/socket/types/message'
import { Paper } from '@mui/material'

type Props = {
    message: Message
}

export default function MessageItem({message}: Props) {
  return (
    <Paper sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'lightblue',
        justifyContent: 'space-between'
        }}>
        <span>
        {message.sender}
        </span>
        <span>
        {message.text}
        </span>
        <span>
        {new Date(message.time).toUTCString()}
        </span>  
    </Paper>
  )
}