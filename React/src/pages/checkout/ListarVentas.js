import { useCallback, useEffect, useState } from "react";
import ListarData from "../../components/tables/ListarData";
import api from "../../utils/api";
import DefaultLayout from "../../components/DefaultLayout";
import FiltrosVentas from "../../components/filtrosventas/FiltrosVentas";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import authProvider from "../../utils/AuthProvider";

function ListarVentas() {
  const [filter, setFilter] = useState("today"); // all | today | week | month
  const [sales, setSales] = useState([]);

  const columns = [
    { label: "CLIENTE: ", field: "client_name" },
    { label: "📍", field: "client_address" },
    { label: "📞", field: "client_phone" },
    { label: "Total", field: "total" },
    { label: "📅", field: "date" },
    { label: "🧑‍💼", field: "user_username" },
  ];

  const fetchSales = useCallback(async () => {
    try {
      const params = {};

      const now = new Date();
      const startOfToday = new Date(now.setHours(0, 0, 0, 0)).toISOString();
      const endOfToday = new Date(now.setHours(23, 59, 59, 999)).toISOString();

      if (filter === "today") {
        params.startDate = startOfToday;
        params.endDate = endOfToday;
      } else if (filter === "week") {
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - 7);
        params.startDate = startOfWeek.toISOString();
        params.endDate = new Date().toISOString();
      } else if (filter === "month") {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        params.startDate = startOfMonth.toISOString();
        params.endDate = new Date().toISOString();
      }

      const response = await api.listarData("sales", params);
      setSales(response.data);
      return response;
    } catch (err) {
      console.error("Error fetching sales:", err);
      return { data: [] };
    }
  }, [filter]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(
      `Reporte de Ventas Tio Locoo- Filtro: ${filter.toUpperCase()}`,
      14,
      16
    );

    const tableColumn = columns.map((col) => col.label);
    const tableRows = sales.map((sale) => [
      sale.client_name,
      sale.client_address,
      sale.total,
      sale.date,
      sale.user_username,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    const totalVentas = sales
      .reduce((sum, item) => sum + parseFloat(item.total), 0)
      .toFixed(2);

    // 🧾 Tabla de resumen de totales
    autoTable(doc, {
      head: [["", "TOTAL GENERAL"]],
      body: [["", `$ ${totalVentas}`]],
      startY: doc.lastAutoTable.finalY + 10,
      styles: {
        fontStyle: "bold",
        halign: "right",
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
      },
    });

    doc.save(`reporte_ventas_${filter}.pdf`);
  };

  return (
    <DefaultLayout title="Ventas de Tio Locoo">
      <div className="filtroVentas">
        <FiltrosVentas setFilter={setFilter} />

        {authProvider.checkRoutePermissions("admin") ? (
          <>
            <div className="mt-4">
              <button onClick={exportToPDF}>Exportar PDF</button>
            </div>
          </>
        ) : null}

        <ListarData
          title="Ventas"
          fetchFunction={fetchSales}
          columns={columns}
          searchFields={[
            "client_name",
            "user_username",
            "client_phone",
            "address",
            "total",
            "date",
          ]}
          whatIs={"Ventas"}
        />
      </div>
    </DefaultLayout>
  );
}

export default ListarVentas;
