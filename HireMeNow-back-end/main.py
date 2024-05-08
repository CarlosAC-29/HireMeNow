from flask import Flask, request, jsonify
from gemini import extraer_informacion_perfil
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "¡Bienvenido a la API de HireMeNow!"

@app.route("/getjobs", methods=['POST'])
def get_jobs():
    if request.method == 'POST':
        required_fields = ['nivel_educativo', 'experiencia', 'habilidades', 'ubicacion']
        if not all(field in request.json for field in required_fields):
            return jsonify({"error": "Faltan campos en el cuerpo de la solicitud", "success": False}), 400

        data = request.json
        nivel_educativo = data.get('nivel_educativo')
        experiencia = data.get('experiencia')
        tecnologias = data.get('habilidades')
        ubicacion = data.get('ubicacion')

        if not isinstance(nivel_educativo, str) or not isinstance(experiencia, str) or not isinstance(tecnologias, list) or not isinstance(ubicacion, str):
            return jsonify({"error": "Los tipos de datos en el cuerpo de la solicitud son incorrectos", "success": False}), 400

        try:
            ofertas = extraer_informacion_perfil(tecnologias, nivel_educativo, experiencia, ubicacion)
            print(ofertas)
            return jsonify({"ofertas": ofertas, "success": True})
        except Exception as e:
            return jsonify({"error": f"Error al evaluar el perfil del candidato: {str(e)}", "success": False}), 500
    else:
        return jsonify({"error": "Este endpoint solo acepta solicitudes POST", "success": False}), 405

if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=8080)
