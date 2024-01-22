import { Paper } from '@mui/material'
import { Message } from 'aviatickets-submodule/libs/socket/types/message'
import MessageItem from './messageItem.component'

type Props = {
  messages: Message[]
}

export default function MessageList({ messages }: Props) {
  console.log(messages)
  return (
    <Paper square sx={{
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      flexGrow: '10',
      padding: '10px',
      gap: '10px',
      overflowY: "scroll"
    }}>
      {messages.map((message) => {
        return <MessageItem message={message}></MessageItem>
      })}
    </Paper>
  )
}