import { useState } from 'react';

import { Mensaje } from './Mensaje';

export const NuevoPresupuesto = ({ setPresupuesto , presupuesto , setIsValidPresupuesto }) => {
    const [error, setError] = useState("") //* estado que maneja el error 

    
    //* funcion encargada cuando apretamos submit de Añadir
    const onSubmit = (e) =>{
        e.preventDefault();
        setPresupuesto( Number(presupuesto)) //* convertimos la string presupuesto a numero

        if (!presupuesto || presupuesto < 0) //* si existe  o es  menor a 0
        {
            setError("Presupuesto no valido") //* si el presupuesto no es correcto mandamos el mensaje a error
            return;
        }
        setError(""); //* volvemos el mensaje a vacio
        setIsValidPresupuesto(true) //*  ponemos en valido asi podemos ver el componente <ControlPresupuesto/> en Header 
        
    }



  return (
    <>
  
     <div className="contenedor-presupuesto contenedor sombra">
        <form onSubmit={onSubmit} className="formulario">
            <div className="campo">
                <label htmlFor="">Definir Presupuesto</label>
                <input type="number" name="" id="" 
                    className="nuevo-presupuesto" 
                    placeholder="Añade tu presupuesto" 
                    value= {presupuesto}
                    onChange = {(e) => setPresupuesto(e.target.value)}
                />
            </div>
            <input type="submit" value="Añadir" />
            {error && <Mensaje tipo="error">{error}</Mensaje>} {/* si error existe mostramos el componente Mensaje */}
        </form>
        
     </div>
     </>
  )
}
