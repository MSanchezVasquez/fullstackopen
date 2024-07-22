# **Full Stack Open**

Este repositorio está hecho para agregar las soluciones a los diferentes retos impuestos por el Bootcamp Full Stack Open

## **Contenido**

- [**Full Stack Open 2022**](#full-stack-open-2022)
  - [**Contenido**](#contenido)
  - [**Temas**](#temas)
    - [**Part 0: Fundamentos de las aplicaciones web**](#part-0-fundamentos-de-las-aplicaciones-web)
      - [0.4: Nueva nota](#04-nueva-nota)
      - [0.5: Aplicación de una sola página](#05-aplicación-de-una-sola-página)
      - [0.6: Nueva nota spa](#06-nueva-nota-spa)
    - [**Part 1A: Introducción a react**](#part-1a-introducción-a-react)
      - [1.1: información del curso, paso 1](#11-información-del-curso-paso-1)
      - [1.2: información del curso, paso 2](#12-información-del-curso-paso-2)
    - [**Part 1B: JavaScript**](#part-1b-javascript)
      - [1.3: información del curso, paso 3](#13-información-del-curso-paso-3)
      - [1.4: información del curso paso 4](#14-información-del-curso-paso-4)
      - [1.5: información del curso paso 5](#15-información-del-curso-paso-5)
    - [**Part 1C: Estado del componente, controladores de eventos**](#part-1c-estado-del-componente-controladores-de-eventos)
      - [1.6: unicafe, paso 1](#16-unicafe-paso-1)
      - [1.7: unicafe, paso 2](#17-unicafe-paso-2)
      - [1.8: unicafe, paso 3](#18-unicafe-paso-3)
      - [1.9: unicafe, paso 4](#19-unicafe-paso-4)
      - [1.10: unicafe, paso 5](#110-unicafe-paso-5)
      - [1.11: unicafe, paso 6](#111-unicafe-paso-6)
    - [**Part 1D: Un estado más complejo, depurando aplicaciones React**](#part-1d-un-estado-más-complejo-depurando-aplicaciones-react)
      - [1.12: anécdotes, paso 1](#112-anécdotes-paso-1)
      - [1.13: anécdotes, paso 2](#113-anécdotes-paso-2)
      - [1.14: anécdotes, paso 3](#114-anécdotes-paso-3)
    - [**Part 2A: Renderizando una colección, módulos**](#part-2a-renderizando-una-colección-módulos)
      - [2.1 al 2.5: Información del curso paso 6, 7, 8 y 9](#21-al-25-información-del-curso-paso-6-7-8-y-9)
    - [**Part 2B: Formularios**](#part-2b-formularios)
      - [2.6 al 2.10: La guía telefónica paso 1, 2, 3 y 4](#26-al-210-la-guía-telefónica-paso-1-2-3-y-4)
    - [**Part 2C: Obteniendo datos del servidor**](#part-2c-obteniendo-datos-del-servidor)
      - [2.11: La guía telefónica paso 5](#211-la-guía-telefónica-paso-5)
      - [2.12 al 2.24: Datos para países paso 1, 2 y 3](#212-al-224-datos-para-países-paso-1-2-y-3)
    - [**Part 2D: Alterando datos en el servidor**](#part-2d-alterando-datos-en-el-servidor)
      - [2.15 al 2.18: La guía telefónica 6, 7, 8, 9 y 10](#215-al-218-la-guía-telefónica-6-7-8-9-y-10)
    - [**Part 2E: Agregar estilos a la aplicación React**](#part-2e-agregar-estilos-a-la-aplicación-react)
      - [2.15 al 2.18: La guía telefónica 11 y 12](#215-al-218-la-guía-telefónica-11-y-12)
    - [**Part 3**](#part-3)
    - [**Part 4**](#part-4)
    - [**Part 5**](#part-5)
    - [**Part 6**](#part-6)
    - [**Part 7**](#part-7)
    - [**Part 8**](#part-8)
    - [**Part 9**](#part-9)
    - [**Part 10**](#part-10)
    - [**Part 11**](#part-11)
    - [**Part 12**](#part-12)
  - [**Contacto**](#contacto)
  - [**Licencia**](#licencia)

## **Temas**

### **Part 0: Fundamentos de las aplicaciones web**

#### 0.4: Nueva nota

Crear un diagrama similar que describa la situación en la que el usuario crea una nueva nota en la página [https://studies.cs.helsinki.fi/exampleapp/notes](https://studies.cs.helsinki.fi/exampleapp/notes) escribiendo algo en el campo de texto y haciendo clic en el botón submit.

- usuario rellena el input y se enviá la información mediante un botón llamado "save".
- el navegador envía una solicitud post con la información del formulario a la dirección "exampleapp/new_note".
- el servidor guarda la información recibida.
- el evento submit recarga el navegador realizando una nueva petición al servidor, cargado los archivos notes, main.css y main.js.

```json
note over browser:
client add new note: "Hi every one"
end note
browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note

note over server:
server save a new note
end note

note over browser:
the POST method reloads browser, generating a new server call
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js

note over browser:
browser starts executing js-code
that requests JSON data from server
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note
```

![respuesta 0.4](./part-0/new-note.png)

#### 0.5: Aplicación de una sola página

Cree un diagrama que describa la situación en la que el usuario accede a la versión de aplicación de una sola página de la aplicación de notas en [https://studies.cs.helsinki.fi/exampleapp/spa](https://studies.cs.helsinki.fi/exampleapp/spa).

- al realizar una petición el navegador carga el archivo spa y quien tiene la estructura html.
- dentro de la estructura html se encuentra la petición main.css y spa.js.
- dentro del código de spa.js se encuentra una petición a "https://studies.cs.helsinki.fi/exampleapp/data.json", retornando el archivo data.json
- el navegador renderiza los datos en el html.

```json
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->browser: spa.js

note over browser:
browser starts executing js-code
that requests JSON data from server
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{" content":"make american great again!","date":"2022-05-10T14:31:13.201Z"}...]

note over browser:
browser executes the event handler
that renders notes to display
end note
```

![respuesta 0.5](./part-0/spa.png)

#### 0.6: Nueva nota spa

Cree un diagrama que represente la situación en la que el usuario crea una nueva nota utilizando la versión de una sola página de la aplicación.

- usuario rellena el input y se enviá la información mediante un botón llamado "save".
- el navegador renderiza la nueva nota sin recargarse, esta es una propiedad que tiene las spa.
- el navegador enviá una solicitud post con la información del formulario a la dirección "exampleapp/new_note_spa".
- el servidor guarda la información recibida.
- el servidor retorna un mensaje de repuesta "note created".

```json
note over browser:
spa.js add a new note in notes array, then added to the <ul> node
end note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/spa
server-->browser: {"message":"note created"}
```

![respuesta 0.6](./part-0/spa-new-note.png)

### **Part 1A: Introducción a react**

#### 1.1: información del curso, paso 1

![1.1](./recursos/1.1.png)

#### 1.2: información del curso, paso 2

![1.2](./recursos/1.2.png)

### **Part 1B: JavaScript**

#### 1.3: información del curso, paso 3

![1.3](./recursos/1.3.png)

#### 1.4: información del curso paso 4

![1.4](./recursos/1.4.png)

#### 1.5: información del curso paso 5

![1.5](./recursos/1.5.png)

### **Part 1C: Estado del componente, controladores de eventos**

#### 1.6: unicafe, paso 1

![1.6](./recursos/1.6.png)

#### 1.7: unicafe, paso 2

![1.7](./recursos/1.7.png)

#### 1.8: unicafe, paso 3

![1.8](./recursos/1.8.png)

#### 1.9: unicafe, paso 4

![1.9](./recursos/1.9.png)

#### 1.10: unicafe, paso 5

![1.10](./recursos/1.10.png)

#### 1.11: unicafe, paso 6

![1.11](./recursos/1.11.png)

### **Part 1D: Un estado más complejo, depurando aplicaciones React**

#### 1.12: anécdotes, paso 1

![1.12](./recursos/1.12.png)

#### 1.13: anécdotes, paso 2

![1.13](./recursos/1.13.png)

#### 1.14: anécdotes, paso 3

![1.14](./recursos/1.14.png)

### **Part 2A: Renderizando una colección, módulos**

#### 2.1 al 2.5: Información del curso paso 6, 7, 8 y 9

![2.1 al 2.5](./recursos/2a-app.png)
![2.1 al 2.5](./recursos/2a-course.png)
![2.1 al 2.5](./recursos/2a-index.png)

### **Part 2B: Formularios**

#### 2.6 al 2.10: La guía telefónica paso 1, 2, 3 y 4

![2.6 al 2.10](./recursos/2b-app.png)
![2.6 al 2.10](./recursos/2b-filter.png)
![2.6 al 2.10](./recursos/2b-personForm.png)
![2.6 al 2.10](./recursos/2b-persons.png)

### **Part 2C: Obteniendo datos del servidor**

#### 2.11: La guía telefónica paso 5

![2.11](./recursos/2c-11-app.png)
![2.11](./recursos/2c-11-filter.png)
![2.11](./recursos/2c-11-personForm.png)
![2.11](./recursos/2c-11-persons.png)

#### 2.12 al 2.24: Datos para países paso 1, 2 y 3

![2.12 al 2.14](./recursos/2c-app.png)
![2.12 al 2.14](./recursos/2c-countrie.png)
![2.12 al 2.14](./recursos/2c-countries.png)
![2.12 al 2.14](./recursos/2c-search.png)
![2.12 al 2.14](./recursos/2c-weather.png)

### **Part 2D: Alterando datos en el servidor**

#### 2.15 al 2.18: La guía telefónica 6, 7, 8, 9 y 10

![2.15 al 2.18](./recursos/2d-app.png)
![2.15 al 2.18](./recursos/2d-personForm.png)
![2.15 al 2.18](./recursos/2d-persons.png)
![2.15 al 2.18](./recursos/2d-services-persons.png)

### **Part 2E: Agregar estilos a la aplicación React**

#### 2.15 al 2.18: La guía telefónica 11 y 12

![2.19 al 2.20](./recursos/2e-app.png)
![2.19 al 2.20](./recursos/2e-index-css.png)
![2.19 al 2.20](./recursos/2e-index-js.png)
![2.19 al 2.20](./recursos/2e-notification.png)

### **Part 3** 

### **Part 4**

### **Part 5**

### **Part 6**

### **Part 7**

### **Part 8**

### **Part 9**

### **Part 10**

### **Part 11**

### **Part 12**

## **Contacto**

## **Licencia**
