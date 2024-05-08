
const local = 'http://localhost:8080'
const production = 'https://hiremenow-oceo.onrender.com'

export const getJobs = async (nivel_educativo, experencia, habilidad, ubicacion) => {
    // Convertir todas las variables a minúsculas
    nivel_educativo = nivel_educativo.toLowerCase();
    experencia = experencia.toLowerCase();
    ubicacion = ubicacion.toLowerCase();


    const data = {
        nivel_educativo: nivel_educativo,
        experiencia: experencia,
        habilidades: habilidad,
        ubicacion: ubicacion
    }
    console.log(data)
    const response = await fetch(`${production}/getjobs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    console.log(response)
    
    if(!response.ok){
        return false
    }
    return response.json()
}