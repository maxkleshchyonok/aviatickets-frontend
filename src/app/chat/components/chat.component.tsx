import React, { useEffect } from 'react'
import MessageList from './messageList.component'
import MessageInput from './messageInput.component'
import ChatHeader from './chatHeader.component'
import { Paper } from '@mui/material'
import { Message } from '../../../../aviatickets-submodule/libs/socket/types/message'
import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks'
import { recieveMessage } from '../store/chat.actions'
import { chatSelector } from '../store/chat.selectors'

type Props = {
    handleClick: () => void
}

export default function Chat({handleClick}: Props) {
    const dispatch = useAppDispatch()
    const chat = useAppSelector(chatSelector)
    console.log(chat)
    useEffect(() => {
        dispatch(recieveMessage())
    }, [])
  return (
    <div style={{
        width: 'min(100%, 300px)',
        height: 'min(100%, 500px)',
        position: 'fixed',
        bottom: 0,
        right: '0',
        left: 'auto',
        display: 'flex',
        
    }}>
        <Paper sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'transparent',
            overflow: 'hidden',
            width: '100%',
            height: '100%'
        }}>
            <ChatHeader handleClick={handleClick}></ChatHeader>
            <MessageList messages={chat.messages}></MessageList>
            <MessageInput></MessageInput>
        </Paper>
        
    </div>
    
  )
}