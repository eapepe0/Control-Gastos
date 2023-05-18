import { useState, useEffect } from "react";
import { Header, Filtros , Modal , ListadoGastos} from "./components/index";
import { generarId } from "./helpers";

import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  //* aca guardaremos el presupuesto disponible al ser un estado que se usara en casi todos los componentes

  const [presupuesto, setPresupuesto] = useState( 
        Number( localStorage.getItem('presupuesto') ?? 0 )
     ); //* buscamos el valor inicial en el localStorage si no existe es 0 (se convierte de string a numero)


  //* conviene definirlo en el componente de mas alto orden (HOC)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false); //* aca guardamos si pusimos un presupuesto o no
  const [modal, setModal] = useState(false); //* con este estado manejamos si mostramos el modal o no
  const [animarModal, setAnimarModal] = useState(false); //* en este estado manejamos el modal (si le ponemos una animacion o no)

  
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : [] );
  //* iniciamos si encontramos 'gastos' en LS lo convertimos a array sino como un array vacio

  const [gastoEditar, setGastoEditar] = useState({}); //* estado que guarda el gasto que estamos editando
  const [filtro, setFiltro] = useState('') //* aca guardamos el filtro que se va a aplicar ej casa , comida , ocio
  const [gastosFiltrados, setGastosFiltrados] = useState([]) //* aca guardamos el filtro que se va a aplicar

  //* en este useEffect , manejamos si pusimos algo en gastoEditar
  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) { //* si existe un objeto?
      handleNuevoGasto(); //* esta funcion muestra el modal que tiene el form para ingresar un nuevo gasto
    }
  }, [gastoEditar]);

  //* cada ves que cambia el presupuesto que definimos al comienzo
  useEffect(() => {
     localStorage.setItem('presupuesto', presupuesto ?? 0) //* lo ponemos llamado , presupuesto , el estado presupuesto y si no existe un 0
  }, [presupuesto])

  //* carga el presupuesto del LS a la app
  useEffect(() => {
    const presupuestoLocalStorage = Number(localStorage.getItem('presupuesto') ?? 0 );
    if(presupuestoLocalStorage > 0){ //* si es presupuesto de LS existe significa que ya fue definido por el usuario en otra sesion
      setIsValidPresupuesto(true) //* ponemos el isValidPresupuesto en true , lo cual nos lleva a mostrarnos la otra pantalla
    }
  }, []) //* se ejecuta una sola vez
  
  //* guarda los gastos de la app al LS cada vez q cambian los gastos
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []) 
  }, [gastos])
  
  //* filtros
  useEffect(() => {
    if(filtro){ //* si filtro no esta vacio
      const gastosFiltrados = gastos.filter(elemento => elemento.categoria === filtro) //*  filtramos
      setGastosFiltrados(gastosFiltrados) //* ponemos los gastros ya filtrados en su estado
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[filtro]) //* cada vez que cambia el filtro


  const guardarGasto = (gasto) => {
    if(gasto.id){ //* con el gasto.id al generarlo mas abajo diferenciamos si el gasto esta siendo editado (el gasto ya viene con ID)
      const gastosActualizados = gastos.map(el => el.id === gasto.id ? gasto : el)
      //*  iteramos sobre los gastos si el id del elemento mapeado es igual al gasto del id (el editado) => devuelve el gasto editado o el elemento sin tocar (el)
      setGastos(gastosActualizados)
    } else{ //* <== es un gasto nuevo
      gasto.id = generarId(); //* generamos un ID
      gasto.fecha = Date.now(); //* generamos una fecha
      setGastos([...gastos, gasto]); //*  agregamos el gasto al array de gastos
    }
    setAnimarModal(false); 
    setTimeout(() => { //* cerramos el modal
      setModal(false);
    }, 300);
  };


  const eliminarGasto = (id) =>{
    const gastosActualizados = gastos.filter( elemento => elemento.id !== id) //* filtra el id del elemento que tiene que ser distinto al id borrado 
    //* (en otras palabras te devuelve todo el array excepto lo que queres borrar)
    setGastos(gastosActualizados) //* esos gastos lo
  }

  //* esta funcion se llama cuando se quiere mostrar el modal
  const handleNuevoGasto = () => {
    setModal(true); //*  cambia la clase del div modal
    setTimeout(() => {
      setAnimarModal(true);
    }, 300);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      {/* si existe el modal , agregar la clase fijar */}
      <Header
        gastos={gastos}
        isValidPresupuesto={isValidPresupuesto}
        presupuesto={presupuesto}
        setGastos={setGastos}
        setIsValidPresupuesto={setIsValidPresupuesto}
        setPresupuesto={setPresupuesto}
      />
      {/* si el presupuesto es valido mostramos los componentes <Filtros> y <ListadoGastos/> */}
      {isValidPresupuesto && (
        <div>
          <main>
            <Filtros filtro={ filtro } setFiltro={ setFiltro }/>
            <ListadoGastos gastos={gastos} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto} gastosFiltrados={gastosFiltrados} filtro={filtro}/>
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icon gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </div>
      )}
      {/* si se abre el modal , se muestra el componente <Modal/> */}
      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
