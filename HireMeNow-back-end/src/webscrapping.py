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

def extraer_info_newPagina(tecnologia, lugar):
    enlaces = []
    try:
        page = requests.get("https://co.trabajosdiarios.com/ofertas-trabajo/de-"+tecnologia+"/en-"+lugar)
        soup = BeautifulSoup(page.text, 'html.parser')

        target_div = soup.find('div', class_='text-secondary ps-1 mb-2 mt-1')
        if target_div is None:
            return None
        result_divs = target_div.find_next_siblings('div', class_='card border-0 mb-3')

        for div in result_divs:
            links = div.find_all('a')
            for link in links:
                enlaces.append(link.get('href'))
                
    except requests.exceptions.RequestException as e:
        print("Error al obtener la página:", e)
    
    return enlaces

def obtener_contenido(url, tecnologia, lugar):
    try:
        response = requests.get("https://co.trabajosdiarios.com" + url)
        response.raise_for_status()

        html = response.text
        soup = BeautifulSoup(html, 'html.parser')

        titulo_oferta = soup.find("h1", class_="text-primary pt-2 my-3 mx-2 fs-2")
        description = soup.find('div', class_='col text-align-justify text-break').text.strip()

        max_caracteres = 400
        if len(description) > max_caracteres:
            description = description[:max_caracteres] + "..."

        if titulo_oferta is not None:
            return {
                "job_title": titulo_oferta.text,
                "job_description_info": description,
                "enlace": "https://co.trabajosdiarios.com" + url,
                "tecnologia": tecnologia,
                "lugar": lugar
            }

    except requests.exceptions.RequestException as e:
        print("Error al obtener la página:", e)

def infoTrabajosDiarios(tecnologia,lugar):
    trabajo_links = extraer_info_newPagina(tecnologia, lugar)
    print(trabajo_links)
    trabajo_links = [trabajo for trabajo in trabajo_links if trabajo is not None]

    for trabajo in trabajo_links:
        if trabajo is not None:
            return obtener_contenido(trabajo, tecnologia, lugar)
    return ''



