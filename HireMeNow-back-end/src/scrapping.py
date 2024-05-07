import requests
from bs4 import BeautifulSoup

########################elempleo.com################################
def extraer_urls(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')

    # Encuentra todas las etiquetas <a> dentro de las tarjetas con la clase 'result-item'
    items = soup.find_all('div', class_='result-item')

    # Lista para almacenar las URLs de las etiquetas <a>
    urls = []

    # Itera sobre cada tarjeta encontrada
    for item in items:
        # Encuentra la etiqueta <a> dentro de la tarjeta actual y obtén su atributo 'href'
        link = item.find('a', class_='text-ellipsis js-offer-title')
        if link:
            # Añade la URL al listado
            urls.append(link['href'])

    return urls

def extraer_informacion_oferta(url):
    page = requests.get('https://www.elempleo.com'+ url)
    soup = BeautifulSoup(page.text, 'html.parser')

    # Encuentra la etiqueta <span> con la clase 'js-jobOffer-title'
    job_title = soup.find('span', class_='js-jobOffer-title').text.strip()
    job_description_span = soup.find('div', class_='description-block').find('span')
    job_description_info = job_description_span.text.strip() if job_description_span else None

    # Verifica si el título del trabajo contiene ciertas palabras clave
    palabras_clave = ['desarrollador', 'programador', 'Desarrollador', 'Programador']
    if not any(palabra in job_title.lower() for palabra in palabras_clave):
        # Si no se encuentra ninguna de las palabras clave en el título, no imprimas la información
        return None

    return {"job_title" : job_title, "job_description_info" : job_description_info}

## El empleo
tecnologia = "java"
nivel = "junior"
lugar = "cali"
urls = extraer_urls('https://www.elempleo.com/co/ofertas-empleo/?&trabajo='+tecnologia)
urls2 = extraer_urls('https://www.elempleo.com/co/ofertas-empleo/?&trabajo='+ tecnologia +'%20'+nivel)
urls3 = extraer_urls('https://www.elempleo.com/co/ofertas-empleo/?&trabajo='+ tecnologia +'%20'+nivel+'%20'+lugar)
## computrabajo
urls4 = extraer_urls('https://co.computrabajo.com/trabajo-de-junior-en-cali')
urls5 = extraer_urls('https://co.computrabajo.com/trabajo-de-java-en-cali')
## Indeed
urls6 = extraer_urls('https://co.indeed.com/jobs?q='+ tecnologia +'&l='+lugar)
print(urls)
for url in urls2:
    informacion = extraer_informacion_oferta(url)
    # if informacion:
    #     # print(informacion)

##############################computrabajo.com################################
import requests
from bs4 import BeautifulSoup

# URL of the Computrabajo page you want to scrape
url = "https://www.computrabajo.com/"

# Send a GET request to the URL
response = requests.get(url)

# Parse the HTML content of the page
soup = BeautifulSoup(response.content, "html.parser")

# Find all job listings on the page
job_listings = soup.find_all("div", class_="bRS bClick")

# Iterate over each job listing and extract title and description
for job in job_listings:
    title = job.find("h2", class_="js-o-link").text.strip()
    description = job.find("div", class_="dO").text.strip()

    print("Title:", title)
    print("Description:", description)
    print()

##############################indeed.com################################
import requests
from bs4 import BeautifulSoup

# URL of the Indeed page you want to scrape
url = "https://www.indeed.com/q-remote-python-jobs.html"

# Send a GET request to the URL
response = requests.get(url)

# Parse the HTML content of the page
soup = BeautifulSoup(response.content, "html.parser")

# Find all job listings on the page
job_listings = soup.find_all("div", class_="jobsearch-SerpJobCard")

# Iterate over each job listing and extract title and description
for job in job_listings:
    title = job.find("h2", class_="title").text.strip()
    description = job.find("div", class_="summary").text.strip()

    print("Title:", title)
    print("Description:", description)
    print()