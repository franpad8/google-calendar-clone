import React, { useState } from "react";
import { SelectedMonthContext } from "./selectedMonthContext";
import { addMonths, subMonths } from "date-fns";

function SelectedMonthProvider({children}: {children: React.ReactElement}) {
  const [selectedMonth, setSelectedMonth] = useState<Date>(() => new Date())

  const incrementMonth = () => setSelectedMonth(month => addMonths(month, 1))
  const decrementMonth = () => setSelectedMonth(month => subMonths(month, 1))
  const goToCurrentMonth = () => setSelectedMonth(new Date())

  const value = {
    selectedMonth,
    incrementMonth,
    decrementMonth,
    goToCurrentMonth
  }

  return <><SelectedMonthContext.Provider value={value}>{children}</SelectedMonthContext.Provider></>

}

export default SelectedMonthProvider