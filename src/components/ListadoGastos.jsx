import { Gasto } from "./Gasto";

//* si existe un filtro, y tiene algo lo mostramos con el titulo gastos , si no tiene nada dice no hay gastos
//* si no existe un filtro , mostramos los gastos , si en gastos no hay nada mostramos no hay gastos aun
export const ListadoGastos = ({ gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados }) => {
    return (
        <div className="listado-gastos contenedor">

            <>    {/* existen gastos? */}
                {
                    filtro ? (<>
                        <h2>{gastosFiltrados.length ? ("Gastos") : ("No hay gastos en esta categoria.")}</h2>
                        {gastosFiltrados.map(gasto => (<Gasto key={gasto.id} gasto={gasto} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto} />))}
                    </>) : (
                        <>
                            <h2>{gastos.length ? ("Gastos") : ("No hay gastos aun.")}</h2>
                            {gastos.map(gasto => (<Gasto key={gasto.id} gasto={gasto} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto} />))}
                        </>
                    )
                }
            </>
        </div>
    );
};
