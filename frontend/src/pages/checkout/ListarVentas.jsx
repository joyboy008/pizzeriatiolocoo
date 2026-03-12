import { useCallback, useEffect, useState } from "react";
import ListarData from "../../components/tables/ListarData";
import api from "../../utils/api";
import DefaultLayout from "../../components/DefaultLayout";
import FiltrosVentas from "../../components/filtrosventas/FiltrosVentas";
import imgTioLoko from"../../assets/images/tioloko.png"

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

  const columnsPdf = [
    { label: "Cliente", field: "client_name" },
    { label: "Dirección", field: "client_address" },
    { label: "Total", field: "total" },
    { label: "Fecha y Hora", field: "date" },
    { label: "Vendedor", field: "user_username" },
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

  function corregirNombreFiltro(filter) {
    if (filter === "today") {
      return "Hoy";
    } else if (filter === "week") {
      return "Semana";
    } else if (filter === "month") {
      return "Mes";
    } else {
      return "Todas";
    }
  }

  const exportToPDF = () => {
    const doc = new jsPDF();
      const imgWidth = 15; // ~150px aprox
  const imgHeight = 15;
  const pageWidth = doc.internal.pageSize.getWidth();
    doc.text(
      `Reporte de Ventas Tio Locoo Filtro: ${corregirNombreFiltro(filter)}`,
      14,
      16
    );
    doc.addImage(
  imgTioLoko,
  "PNG", 
  pageWidth - imgWidth - 14, // margen derecho
  8,
  imgWidth,
  imgHeight
);

    const tableColumn = columnsPdf.map((col) => col.label);
    const tableRows = sales.map((sale) => [
      sale.client_name,
      sale.client_address,
      "Q."+sale.total,
      sale.date,
      sale.user_username,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 24,
    });

    const totalVentas = sales
      .reduce((sum, item) => sum + parseFloat(item.total), 0)
      .toFixed(2);

    // 🧾 Tabla de resumen de totales
    autoTable(doc, {
      head: [["", "TOTAL GENERAL"]],
      body: [["", `Q ${totalVentas}`]],
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

    doc.save(`reporte_de_ventas_tiolocoo_${filter}.pdf`);
  };

  return (
    <DefaultLayout title="Ventas de Tio Locoo">
      <div className="filtroVentas">
        <FiltrosVentas setFilter={setFilter} />

        {authProvider.checkRoutePermissions("admin") ? (
          <>
            <div className="mt-4">
              <button className="dropbtn succes" onClick={exportToPDF}>
                Exportar PDF
              </button>
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
