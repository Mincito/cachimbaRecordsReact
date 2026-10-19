# Cachimba Records — documento de cobertura de testing (plantilla)

> **ESTADO: PENDIENTE DE EJECUCIÓN Y MEDICIÓN.** No es un informe final.

## Objetivo
Verificar funciones y comportamiento de componentes React de la tienda online con Jasmine + Karma.

## Entorno de ejecución
- Fecha: ______
- Computador / SO: ______
- Versión Node.js: ______
- Versión Chrome: ______
- Comando de pruebas: `npm test`
- Resultado ejecución: ___ / 12 pruebas satisfactorias.

## Pruebas implementadas
| N° | Caso | Tipo | Resultado real |
|---:|---|---|---|
| 1 | Agregar vinilo al carrito | Lógica | Pendiente |
| 2 | Incrementar cantidad sin duplicar producto | Lógica | Pendiente |
| 3 | Cambiar cantidad | Lógica | Pendiente |
| 4 | Calcular total | Lógica | Pendiente |
| 5 | Eliminar producto | Lógica | Pendiente |
| 6 | Buscar sin distinguir tildes/mayúsculas | Lógica | Pendiente |
| 7 | Rechazar contacto inválido | Validación | Pendiente |
| 8 | Aceptar contacto válido | Validación | Pendiente |
| 9 | Detectar contraseñas distintas | Validación | Pendiente |
| 10 | Renderizar `ProductCard` (título/precio) | DOM/props | Pendiente |
| 11 | Botón agregar: spy `onAdd` | Evento/mock | Pendiente |
| 12 | Botón eliminar: spy `onRemove` | Evento/mock | Pendiente |

## Cobertura medida (completar con instrumento real)

| Métrica | Porcentaje |
|---|---|
| Statements / Sentencias | **Sin medir** |
| Branches / Ramas | **Sin medir** |
| Functions / Funciones | **Sin medir** |
| Lines / Líneas | **Sin medir** |

**Alcance a instrumentar:** `src/components`, `src/utils` y, posteriormente, `src/context` y `src/pages`.
Exclusiones justificadas: dependencias de `node_modules`, archivos de configuración y entradas (`main.jsx`).

**Evidencias a adjuntar:** captura del resultado Karma, reporte HTML con cobertura por archivo,
explicación de líneas/ramas sin cubrir, plan de mejora.

**Nota:** Un test que pasa no implica cobertura total; son métricas distintas.
