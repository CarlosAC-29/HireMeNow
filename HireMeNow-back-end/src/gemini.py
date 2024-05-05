import google.generativeai as genai
from dotenv import load_dotenv
import os
import json

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)


def evaluarPerfil(nivelEducacion, experiencia, tecnologias, ubicacion):
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 0,
        "max_output_tokens": 8192,
    }

    safety_settings = [
        {
            "category": "HARM_CATEGORY_HARASSMENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            "category": "HARM_CATEGORY_HATE_SPEECH",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
    ]

    model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                                  generation_config=generation_config,
                                  safety_settings=safety_settings)

    convo = model.start_chat(history=[])

    convo.send_message(
        f"Eres un evaluador de perfiles de tecnología. A partir de la siguiente información, ¿a qué tipo de cargos debería aplicar con los siguientes datos: Nivel educativo: {nivelEducacion}, Experiencia: {experiencia}, Tecnologías: {tecnologias}, Ubicación: {ubicacion}? Es importante que la respuesta venga en un formato JSON con el campo 'nivel', el cual será 'junior', 'mid' o 'senior', el campo 'tecnologias' con las tecnologías que debería manejar y el campo 'respuesta' donde expliques por qué debería aplicar a esos cargos"
    )
    respuesta = convo.last.text

    # Remover las etiquetas "```json"
    respuesta_sin_etiquetas = respuesta.replace("```json", "").replace("```", "")

    # Convertir la respuesta en un objeto JSON
    respuesta_json = json.loads(respuesta_sin_etiquetas)

    return respuesta_json




