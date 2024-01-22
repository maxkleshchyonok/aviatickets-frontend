import { Button, ButtonProps, Stack, StackProps, styled } from "@mui/material"
import { FC } from "react"

interface PaymentTabContentProps {
  onPuyButtonClick: () => void;
}

const StyledStack = styled(Stack)<StackProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '20vh'
}));

const StyledPayButton = styled(Button)<ButtonProps>(() => ({
  minWidth: '150px',
  fontSize: '1rem'
}));

const PaymentTabContent: FC<PaymentTabContentProps> = ({ onPuyButtonClick }) => {
  return (
    <div className="payment-tab-content">
      <StyledStack>
        <StyledPayButton variant='contained' onClick={onPuyButtonClick}>Pay</StyledPayButton>
      </StyledStack>
    </div >
  )
};

export default PaymentTabContent;