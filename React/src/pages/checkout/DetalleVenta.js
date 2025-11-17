import { useEffect, useState } from "react";
import DefaulLayout from "../../components/DefaultLayout";
import { useLoaderData } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import FormularioVenta from "../../components/FormularioVenta";

function DetalleVenta() {
  const data = useLoaderData();
  const [ventaData, setVentaData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setVentaData(data);
      setLoading(false);
    }
  }, [data]);

  return (
    <DefaulLayout title="Ventas" size="slider-small">
      {loading ? (
        <Spinner animation="grow" variant="info" />
      ) : (
        <FormularioVenta title={"Detalle de Venta"} data={ventaData} />
      )}
      <br />
    </DefaulLayout>
  );
}

export default DetalleVenta;
