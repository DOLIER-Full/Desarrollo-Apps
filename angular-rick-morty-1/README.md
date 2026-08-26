# Angular + Rick & Morty API

Proyecto Angular standalone para consumir la API de Rick and Morty usando:

- `HttpClient`
- `rxResource`
- Signals
- RxJS
- Interceptor con `provideHttpClient(withInterceptors(...))`
- Paginación y búsqueda
- Actualización automática cada 60 segundos
- Modal de detalle con imagen y acciones de reproducción/búsqueda

## Ejecutar

```bash
npm install
npm start
```

Abrir: `http://localhost:4200`

## Importante

La API de episodios entrega metadatos, no archivos de video. Por eso el botón de reproducción abre una búsqueda del episodio en YouTube para encontrar una fuente disponible, sin inventar una URL de video oficial.
