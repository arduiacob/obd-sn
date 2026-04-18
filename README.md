# Proyecto: Control CAN Bus - Infiniti Q50 Híbrido (2019)

Repositorio dedicado a la ingeniería inversa del bus CAN para la automatización de funciones de confort en un Infiniti Q50 Híbrido mediante el adaptador **OBDLink LX**.

---

## 📋 Resumen del Contexto
- **Vehículo:** Infiniti Q50 Híbrido 2019 (Plataforma V37).
- **Hardware:** OBDLink LX (Bluetooth) con soporte de comandos ST.
- **Software:** Python 3.x / Termux en Android 16.
- **Objetivos:** 
    1. Cierre automático de espejos al detectar evento de bloqueo.
    2. Control del ventilador (HVAC) según temperatura de motor (<60°C) y modo de conducción (ECO).

---

## 🛠️ Configuración del Hardware (OBDLink LX)
Para interactuar con el bus de datos, se utilizan los siguientes comandos de inicialización en el terminal serial:

| Comando | Función |
| :--- | :--- |
| `AT Z` | Reinicia el adaptador |
| `AT SP 6` | Fija protocolo ISO 15765-4 CAN (11bit/500k) |
| `AT H1` | Activa Headers (ver IDs de los módulos) |
| `AT CAF 0` | Desactiva auto-formateo (Modo RAW) |
| `AT AL` | Permite mensajes de datos largos |

---

## 🔍 Script de Sniffing con Marcadores
Este script de Python permite monitorizar el tráfico (`STMA`) y marcar eventos manualmente para localizar los IDs de los espejos y el climatizador.

---

## 🚀 Hoja de Ruta (Roadmap)
    1. Sniffing: Identificar tramas de espejos (sospechosos: 60D, 285).

    2. Inyección: Probar comando STPX con las tramas capturadas.

    3. Automatización: - Leer PID 0105 (Temp Motor).

        Detectar estado del Modo ECO.

        Lógica: IF Temp < 60 AND Modo == ECO THEN Fan Speed 1.

    4. Portabilidad: Implementar el script final en Termux para ejecución persistente en Android 16.