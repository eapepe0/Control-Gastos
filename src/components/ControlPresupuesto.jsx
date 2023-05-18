import { useEffect, useState } from "react"
import {CircularProgressbar , buildStyles } from 'react-circular-progressbar'

import 'react-circular-progressbar/dist/styles.css'

export const ControlPresupuesto = ({ presupuesto , gastos , setGastos , setPresupuesto , setIsValidPresupuesto }) => {

    const [ disponible , setDisponible ] = useState(0) //* disponible que tenemos para gastar
    const [ gastado , setGastado ] = useState(0) //* lo que llevamos gastando
    const [porcentaje, setPorcentaje] = useState(0) //* aca calcularemos el porcentaje de lo gastado

    //* effect encargado de calcular el disponible y lo gastado => cada vez que gastos es modificado
    useEffect(()=>{
        const totalGastado = gastos.reduce((total , gasto) => gasto.cantidad + total , 0 ) //* calculamos el total gastado , con un reduce , va sumando todos los gastos
        const totalDisponible = presupuesto - totalGastado //* calculamos el disponible que tenemos para gastar , 

        //* calcular el porcentaje gastado
        const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2);
           
        setDisponible(totalDisponible) //* lo actualizamos a disponible
        setGastado(totalGastado) //* lo actualizamos a gastado

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje) //* hacemos que el porcentaje mostrado por el grafico tenga un delay de 1seg para poder apreciarlo
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[gastos])

    const formatearCantidad = ( cantidad ) =>{ //* formatea para mostrar no muta, como si fuera moneda
        return cantidad.toLocaleString('en-US',{
            style: 'currency',
            currency : "USD"
        })
    }

    const handleResetApp = () =>{ //* funcion encargada de reiniciar todo
        const resultado = confirm('¿Deseas reiniciar el presupuesto y gastos?'); //* preguntamos si es si devuelve true

        if (resultado){
            setGastos([]); //* reinicia todo el gasto , el presupuesto y si el presupuesto valido el cual es un flag para que se vean los demas componentes
            setPresupuesto(0);
            setIsValidPresupuesto(false)
        }
    }
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
           <CircularProgressbar  
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#DC2626' :'#3b82f6', //* porcentaje , si es mayor que 100 muestra un color , de caso contrario otro
                    trailColor: '#f5f5f5',//* fondo
                    textColor : porcentaje > 100 ? '#DC2626' :'#3b82f6', //* color del texto , si es mayor que 100 muestra un color , de caso contrario otro
                })}
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
                />
        </div>
        <div className="contenido-presupuesto">
            <button className="reset-app" onClick={handleResetApp}>Resetear App</button>
            <p>
                <span>Presupuesto : </span> {formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible <  0 ?  'negativo' : ''}`}>
                <span>Disponible : </span> {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado : </span> {formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}
