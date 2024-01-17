import { Stack, styled } from '@mui/material';
import { StackProps } from '@mui/system';
import TickerSearchFilter from 'app/ticket-search-filter/ticket-search-filter.comp'
import Layout from 'components/layout.comp';

const StyledMain = styled('div')((props) => ({
  height: '99vh',
}));

const StyledFlex = styled(Stack)<StackProps>((props) => ({
  display: 'flex',
  height: '100%',
  justifyContent: 'center'
}));

export const Main = () => {
  return (
    <Layout>
      <StyledMain>
        <StyledFlex>
          <TickerSearchFilter onSearchButtonClick={() => console.log('ef')} />
        </StyledFlex>
      </StyledMain>
    </Layout>
  )
}