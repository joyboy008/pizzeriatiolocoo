import { useState } from "react";
import "../filtrosventas/FiltrosVentas.css";

function FiltrosVentas({ setFilter }) {
  const [selected, setSelected] = useState("today");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    setFilter(value);
  };

  return (
    <div className="radio-input">
      <label className="label">
        <input
          type="radio"
          name="ventas-filter"
          value="all"
          checked={selected === "all"}
          onChange={handleChange}
        />
        <span className="text">Todas</span>
      </label>
      <label className="label">
        <input
          type="radio"
          name="ventas-filter"
          value="today"
          checked={selected === "today"}
          onChange={handleChange}
        />
        <span className="text">Hoy</span>
      </label>
      <label className="label">
        <input
          type="radio"
          name="ventas-filter"
          value="week"
          checked={selected === "week"}
          onChange={handleChange}
        />
        <span className="text">7 días</span>
      </label>
      <label className="label">
        <input
          type="radio"
          name="ventas-filter"
          value="month"
          checked={selected === "month"}
          onChange={handleChange}
        />
        <span className="text">Este mes</span>
      </label>
    </div>
  );
}

export default FiltrosVentas;
