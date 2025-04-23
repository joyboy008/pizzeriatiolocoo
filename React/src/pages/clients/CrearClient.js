import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../../components/DefaultLayout";
import FormularioClient from "../../components/FormularioClient";
import api from "../../utils/api";
import Swal from "sweetalert2";

const CrearClient = () => {
  const navigate = useNavigate();

  const [cliente, setCliente] = useState({
    name: "",
    nit: "",
    phone: "",
    address: "",
    email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCliente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const clienteConEmail = {
      ...cliente,
      email: "ejemplo@tiolocoo.com", // Email fijo
    };

    try {
      api.crearData("clientes", clienteConEmail).then(() => {
        return Swal.fire({
          title: "Cliente creado con éxito!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      });
      navigate("/checkout");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DefaultLayout title="Clientes de Tio Locoo">
      <FormularioClient
        data={cliente}
        title="Registrar nuevo cliente"
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
    </DefaultLayout>
  );
};

export default CrearClient;
