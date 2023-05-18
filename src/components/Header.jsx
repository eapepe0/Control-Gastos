import { ControlPresupuesto } from "./ControlPresupuesto";
import { NuevoPresupuesto } from "./NuevoPresupuesto";
export const Header = ({
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto,
  gastos,
  setGastos,
}) => {
  //* si el presupuesto es valido (true) mostramos los datos en <ControlPresupuesto/> , puede ser true por que esta puesto por el LS
  //* si el presupuesto no es valido (false) mostramos <NuevoPresupuesto /> , para poder ingresar un presupuesto para poder trabajar con la app
  return (
    <header>
      <h1>Planificador de Gastos</h1>

      {isValidPresupuesto ? (
        <ControlPresupuesto
          presupuesto={presupuesto}
          gastos={gastos}
          setGastos={setGastos}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      ) : (
        <NuevoPresupuesto
          setPresupuesto={setPresupuesto}
          presupuesto={presupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
          isValidPresupuesto={isValidPresupuesto}
        />
      )}
    </header>
  );
};
