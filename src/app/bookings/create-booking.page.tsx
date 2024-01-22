import Header from "components/header.comp";
import Layout from "components/layout.comp"
import CreateBookingContent from "./components/create-booking-content.comp"

const CreateBookingPage = () => {
  return (
    <>
      <Header />
      <Layout>
        <CreateBookingContent />
      </Layout >
    </>
  )
}

export default CreateBookingPage;