import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SeleccionFecha(props) {
  const {startDate, setStartDate} = props
  return (
      <DatePicker
        closeOnScroll={true}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
  );
}
export default SeleccionFecha;
