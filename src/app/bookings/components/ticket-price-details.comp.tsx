import { Box, Divider, Stack, StackProps, styled, Typography, TypographyProps } from "@mui/material"
import { tickerSearchFilterSelector } from "app/ticket-search-filter/store/ticket-search-filter.selectors";
import { TicketDto } from "app/tickets/types/ticket.dto";
import { useAppSelector } from "hooks/redux.hooks";
import { FC } from "react";
import TicketPriceDetailsListItem from "./ticket-price-details-list-item.comp";
import TicketPriceDetailsList from "./ticket-price-details-list.comp";

interface TicketPriceDetailsProps {
  ticket: TicketDto;
}

const StyledContainer = styled(Stack)<StackProps>(() => ({
  gridArea: 'ticketSummary',
  flexDirection: 'column'
}));

const StyledTitle = styled(Typography)<TypographyProps>(() => ({
  padding: '10px',
  borderRadius: '20px 20px 0 0',
  fontWeight: 600
}));

const TicketPriceDetails: FC<TicketPriceDetailsProps> = ({ ticket }) => {
  const { filter } = useAppSelector(tickerSearchFilterSelector);

  return (
    <StyledContainer >
      <StyledTitle variant='h6'>Ticket price details</StyledTitle>
      <Divider />
      <TicketPriceDetailsList>
        <TicketPriceDetailsListItem label="Ticket price" value={`${ticket.price}$`} />
        <TicketPriceDetailsListItem label="Passenger amount" value={filter.passengerAmount} />
      </TicketPriceDetailsList>
      <Box sx={{
        backgroundColor: 'lightGrey',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: '0 0 20px 20px'
      }}>
        <Typography variant='h6'>Total</Typography>
        <Typography variant='h6'>Total Price</Typography>
      </Box>
    </StyledContainer>
  )
};

export default TicketPriceDetails;