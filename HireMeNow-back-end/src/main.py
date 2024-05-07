from flask import Flask, request, jsonify
from gemini import extraer_informacion_perfil
from flask_cors import CORS



app = Flask(__name__)
CORS(app)

def before_first_request():
    print("¡El servidor está arriba! :D")

@app.route("/")
def index():
    return "¡Bienvenido a la API de HireMeNow!"


@app.route("/getjobs", methods=['POST'])
def get_jobs():
    # Verificar si la solicitud es de tipo POST
    if request.method == 'POST':
        # Verificar si el cuerpo de la solicitud contiene los campos necesarios
        required_fields = ['nivel_educativo', 'experiencia', 'habilidades', 'ubicacion']
        if not all(field in request.json for field in required_fields):
            return jsonify({"error": "Faltan campos en el cuerpo de la solicitud", "success": False}), 400

        # Obtener los datos del cuerpo de la solicitud
        data = request.json
        nivel_educativo = data.get('nivel_educativo')
        experiencia = data.get('experiencia')
        tecnologias = data.get('habilidades')
        ubicacion = data.get('ubicacion')

        # Validar tipos de datos
        if not isinstance(nivel_educativo, str) or not isinstance(experiencia, str) or not isinstance(tecnologias, list) or not isinstance(ubicacion, str):
            return jsonify({"error": "Los tipos de datos en el cuerpo de la solicitud son incorrectos", "success": False}), 400

        # Evaluar el perfil del candidato
        try:
            # Obtener todas las ofertas de trabajo para el perfil dado
            ofertas = extraer_informacion_perfil(tecnologias, nivel_educativo, experiencia, ubicacion)
            return jsonify({"ofertas": ofertas, "success": True})
        except Exception as e:
            return jsonify({"error": f"Error al evaluar el perfil del candidato: {str(e)}", "success": False}), 500
    else:
        # Si la solicitud no es de tipo POST, devolver un mensaje de error
        return jsonify({"error": "Este endpoint solo acepta solicitudes POST", "success": False}), 405



if __name__ == "__main__":
    app.run(debug=True, port=5000)
