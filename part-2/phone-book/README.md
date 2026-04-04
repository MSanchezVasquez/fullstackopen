# Phone Book

Frontend de React para una agenda telefónica con backend local usando `json-server`.

## Descripción

Este proyecto permite gestionar una lista de personas y sus números de teléfono. Incluye:

- Visualización de la lista completa de contactos.
- Creación de nuevos contactos.
- Filtrado de contactos por nombre.
- Manejo de alertas y mensajes básicos.

## Configuración

Instala las dependencias con:

```bash
npm install
```

## Comandos

- Iniciar el servidor de datos local:
  ```bash
  npm run server
  ```
- Iniciar la aplicación React:
  ```bash
  npm run dev
  ```
- Ver la aplicación en producción previa:
  ```bash
  npm run preview
  ```

## Uso

1. Ejecuta `npm install`.
2. Abre una terminal y lanza `npm run server`.
3. En otra terminal, ejecuta `npm run dev`.
4. Abre la URL que indique Vite en el navegador.
5. Añade nuevos contactos, filtra por nombre y revisa los datos en `db.json`.

## Nota

El backend local usa `json-server` y expone los datos en `http://localhost:3001/persons`.
