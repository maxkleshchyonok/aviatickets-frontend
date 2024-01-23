import Message from "components/message.comp";

const TicketListError = () => {
  return (
    <Message
      title="Failed to get tickets"
      text="Please try again later"
    />
  )
};

export default TicketListError;