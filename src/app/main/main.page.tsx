import TickerSearchFilter from 'app/ticket-search-filter/ticket-search-filter.comp'
import React from 'react'

export const Main = () => {
  return (
    <>
      <TickerSearchFilter onSearchButtonClick={() => console.log('ef')} />
    </>
  )
}