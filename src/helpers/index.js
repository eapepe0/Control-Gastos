//* genero un id random

export const generarId = () => {
    const random = Math.random().toString(36)
    const fecha = Date.now().toString(36)
    return random + fecha
}

//* muestro la fecha "18 de mayo de 2023"
export const formatearFecha = fecha =>{
    const fechaNueva = new Date(fecha);
    const opciones = {
        year : 'numeric',
        month : 'long',
        day : '2-digit',
    }
    return fechaNueva.toLocaleDateString('es-Es',opciones)

}