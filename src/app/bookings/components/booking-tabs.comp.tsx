import { Tab, Tabs } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";
import { activeTabSelector } from "../store/booking.selectors";

export const BookingTabs: FC = () => {
  const activeTab = useSelector(activeTabSelector)

  return (
    <Tabs value={activeTab} >
      <Tab label='Passenger Info' />
      <Tab label='Payment Info' />
    </Tabs>
  )
}