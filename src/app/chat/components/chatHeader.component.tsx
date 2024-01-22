import { Close } from "@mui/icons-material"
import { Paper, IconButton } from "@mui/material"

type Props = {
  handleClick: () => void
}

export default function ChatHeader({ handleClick }: Props) {
  return (
    <Paper square sx={{
      width: '100%',
      backgroundColor: 'lightblue',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.4em',

    }}>
      <div style={{
        margin: 0,
        flexGrow: 1
      }}>Waiting for support</div>
      <IconButton onClick={handleClick}>
        <Close></Close>
      </IconButton>
    </Paper>
  )
}