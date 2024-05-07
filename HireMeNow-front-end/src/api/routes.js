export const getJobs = async (nivel_educativo, experencia, habilidad, ubicacion) => {
    // Convertir todas las variables a minúsculas
    nivel_educativo = nivel_educativo.toLowerCase();
    experencia = experencia.toLowerCase();
    ubicacion = ubicacion.toLowerCase();

    ubicacion = ubicacion.replace(/\s+/g, '-');

    const data = {
        nivel_educativo: nivel_educativo,
        experiencia: experencia,
        habilidades: habilidad,
        ubicacion: ubicacion
    }
    console.log(data)
    const response = await fetch('http://localhost:5000/getjobs', {
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