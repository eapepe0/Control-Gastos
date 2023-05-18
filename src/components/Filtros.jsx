export const Filtros = ({ filtro , setFiltro }) => {
    //*  basicamente este componente sirve para elegir una categoria de filtros y ponerla en el estado filtro
  return (
    <div className='filtros sombra contenedor'>
        <form action="">
            <div className="campo">
                <label htmlFor="">Filtrar Gastos</label> 
                <select name="" id="" value = { filtro } onChange = { event  => setFiltro( event.target.value ) }>
                    <option value="">-- Todos --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
        </form>
    </div>
  )
}
