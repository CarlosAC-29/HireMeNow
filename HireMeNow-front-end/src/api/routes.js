export const getJobs = async (nivel_educativo, experencia, habilidad, ubicacion) => {
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