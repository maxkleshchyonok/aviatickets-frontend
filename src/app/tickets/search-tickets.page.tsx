import Layout from "components/layout.comp";
import { FC } from "react";
import SearchTicketsContent from "./components/search-tickets-content.comp";

const SearchTicketsPage: FC = () => {
  return (
    <Layout>
      <SearchTicketsContent />
    </Layout>
  );
}

export default SearchTicketsPage;