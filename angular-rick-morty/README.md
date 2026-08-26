# Angular + Rick and Morty API

Ejemplo de una interfaz Angular standalone que consume la API de episodios de Rick and Morty.

## Tecnologias aplicadas

- `HttpClient` para las peticiones HTTP.
- `provideHttpClient(withInterceptors(...))` para registrar el interceptor globalmente.
- `HttpInterceptorFn` para añadir `Accept: application/json` y centralizar errores HTTP.
- `rxResource` para exponer el estado asíncrono con Signals (`value`, `isLoading`, `error`, `reload`).
- RxJS dentro del pipeline del interceptor (`catchError`, `throwError`).
- Signals para la página y búsqueda local.
- Control flow moderno de Angular con `@if` y `@for`.

## API usada

`https://rickandmortyapi.com/api/episode`

El archivo de datos entregado muestra que la respuesta contiene `info` y `results`, y que cada episodio incluye campos como `id`, `name`, `air_date`, `episode`, `characters` y `url`.

## Ejecucion

```bash
npm install
npm start
```

Luego abre `http://localhost:4200`.
