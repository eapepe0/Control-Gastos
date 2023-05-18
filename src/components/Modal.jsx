import { useEffect, useState } from "react";
import CerrarBtn from "../img/cerrar.svg";
import { Mensaje } from "./Mensaje";



export const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar , setGastoEditar }) => {

  const [nombre, setNombre] = useState(""); //* aca guardamos el nombre
  const [cantidad, setCantidad] = useState(""); //* aca la cantidad del gasto
  const [categoria, setCategoria] = useState(""); //* aca guardamos la categoria del gasto
  const [mensaje, setMensaje] = useState(""); //* aca guardamos si hay algun error
  const [isEdit , setIsEdit] = useState(false) //* aca guardamos si estamos en el modo edit
  const [fecha , setFecha] = useState('')
  const [id , setId] = useState('')

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      console.log("Gasto Editar tiene algo");
      setIsEdit(true)
      
      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
      setGastoEditar({})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gastoEditar])
  
  const ocultarModal = () => { //* funcion que se encarga de ocultar el modal
    setAnimarModal(false); //* cambiamos el estado modal que esta en App a falso , esto hace que se haga una animacion en el modal cambiando la clase animal u ocultar

    setTimeout(() => {
      setModal(false);  //*  y cerramos el modal
    }, 300); //* esperamos 300ms

  };

  const handleSubmit = (e) => {
    e.preventDefault(); //* no enviamos el formulario a ningun lado

    if ([nombre, cantidad, categoria].includes("")) { //* si los campos estan vacios
      setMensaje("Todos los campos son obligarios") //* ponemos el mensaje en mensaje
      return //* y salimos
    }
    setTimeout(() => {
      setMensaje(""); //* volvemos el mensaje a vacio  
    }, 3000); //* esperamos 3 seg y sacamos el mensaje

    guardarGasto({ nombre, cantidad, categoria , id , fecha}) //* mandamos el objeto a la funcion guardar gasto
    setNombre("");
    setCantidad(""); //* reseteamos los campos 
    setCategoria("");
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarBtn} alt="Cerrar" onClick={ocultarModal} />
      </div>
      <form
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
        onSubmit={handleSubmit}
      >
        <legend>{isEdit ? "Editar Gasto" : "Nuevo Gasto" }</legend>
        {mensaje && (<Mensaje tipo="error"> {mensaje}</Mensaje>)}
        <div className="campo">
          <label htmlFor="nombre">Nombre gasto</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Añade el nombre del gasto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            name="cantidad"
            id="cantidad"
            placeholder="Añade la cantidad del gasto"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select
            name=""
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
          <input type="submit" value={isEdit ? 'Guardar Cambios' : 'Añadir Gasto'} />
        </div>

      </form>
    </div>
  );
};
