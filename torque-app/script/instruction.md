# Módulo de Optimización: Caja de Cambios (PID 2101)

Este módulo aborda el problema del lag en el refresco de datos de la transmisión (TCM) del Infiniti Q50. Actualmente, al leer múltiples parámetros del PID `2101`, Torque Pro realiza una petición ISO-TP completa por cada sensor, elevando el tiempo de refresco a 2-3 segundos.

**Solución:** Utilizar un **CoreScript** de Torque para realizar una única petición física del bloque de 208 bytes y repartir los datos en sensores virtuales.

---

## 🛠️ Script de Diagnóstico: `q50_diag_test.ts`

Este script es la Fase 1. Su objetivo es capturar la cadena Hexadecimal cruda (Raw HEX) y verificar que recibimos el bloque multilínea completo.

## 📂 Instalación
Conecta el móvil al PC o usa un explorador de archivos con acceso a la memoria interna.

    - Localiza la carpeta de Torque (suele estar en .torque/scripts/).

        Nota: Si la carpeta .torque está oculta, activa "Mostrar archivos ocultos".

    - Copia el archivo q50_diag_test.ts en esa carpeta.

    - Reinicia Torque Pro.

## 📊 Cómo realizar las pruebas
Activar Script: Ve a Ajustes de Torque > Scripts y asegúrate de que el script aparezca y esté activo.

    - Dashboard: Añade dos indicadores de tipo "Display Digital" en tu panel:

    - Q50 Debug Length

    - Q50 Script Status

Verificar Log: - Ve a la pantalla principal de Torque (Realtime Information).

    - Pulsa el icono de la rueda dentada -> "Log View".

    - Busca las entradas que empiecen por Q50_RAW:.

    - Copia esa cadena hex para el siguiente paso de análisis de offsets.

## 📈 Próximos Pasos (Fase 2)
Una vez confirmada la recepción del bloque (Length > 400 caracteres aprox.), mapearemos los bytes del Excel de Jacobo:

    - AT Temp: Localizar byte T (Offset aproximado 40-42).

    - Gear: Localizar byte CR (Offset aproximado 190-192).

    - Conversión: Implementar las fórmulas T-55 y los LOOKUP directamente en Java dentro del script.