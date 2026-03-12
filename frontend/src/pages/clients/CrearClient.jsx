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
    nit: "cf",
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nitFinal = cliente.nit.trim() === "" ? "cf" : cliente.nit;

    const clienteConEmail = {
      ...cliente,
      nit: nitFinal.toLowerCase(),
      email: "ejemplo@tiolocoo.com",
    };

    try {
      await api.crearData("clientes", clienteConEmail);

      await Swal.fire({
        title: "Cliente creado con éxito!",
        icon: "success",
        confirmButtonText: "Ok",
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
