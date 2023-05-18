
//* lo que hace este componente es que el texto o elemento que usamos como children sea mostrado en un div con la clase que nos muestre un error
//* <Mensaje><h1>{'Error en este elemento'} </h1></Mensaje>

export const Mensaje = ({children , tipo}) => {
  return (
    <div className={`alerta ${tipo}`}>{children}</div> 
  )
}
