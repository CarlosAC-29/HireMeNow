import requests
from bs4 import BeautifulSoup
from urllib.parse import quote_plus

def extraer_informacion_empleo(tecnologia, nivel, lugar):
    tecnologia = tecnologia.lower()
    def extraer_informacion_oferta(url):
        page = requests.get('https://www.elempleo.com'+ url)
        soup = BeautifulSoup(page.text, 'html.parser')

        job_title = soup.find('span', class_='js-jobOffer-title').text.strip()
        job_description_span = soup.find('div', class_='description-block').find('span')
        job_description_info = job_description_span.text.strip() if job_description_span else None

        palabras_clave = ['desarrollador', 'programador']
        if not any(palabra in job_title.lower() for palabra in palabras_clave):
            return None

        return {"job_title": job_title, "job_description_info": job_description_info, "enlace": 'https://www.elempleo.com' + url, "nivel" : nivel, "tecnologia": tecnologia, "lugar": lugar}

    # Codificar los parámetros de la URL
    tecnologia_encoded = quote_plus(tecnologia)
    nivel_encoded = quote_plus(nivel)
    lugar_encoded = quote_plus(lugar)

    # Formar la URL con los parámetros codificados
    url = f'https://www.elempleo.com/co/ofertas-empleo/?&trabajo={tecnologia_encoded}-{nivel_encoded}-{lugar_encoded}'

    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')

    items = soup.find_all('div', class_='result-item')

    lista_ofertas = []
    for item in items:
        link = item.find('a', class_='text-ellipsis js-offer-title')
        if link:
            oferta = extraer_informacion_oferta(link['href'])
            if oferta:
                lista_ofertas.append(oferta)

    return lista_ofertas
