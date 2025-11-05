# 🚀Trabajo Práctico 2: Sistema CRUD con SQLite y React Native

Este proyecto implementa un sistema CRUD (Crear, Leer, Actualizar, Eliminar) completo para la gestión de un inventario básico, ytiliza Expo y SQLite para garantizar la persistencia de los datos.

##  Características Principales

* **CRUD Completo:** Implementación de las cuatro operaciones fundamentales sobre una base de datos local.
* **Persistencia de Datos:** Los registros se almacenan en **SQLite** (`expo-sqlite`) y se mantienen al cerrar/reabrir la aplicación.
* **Navegación Stack:** Uso de React Navigation para alternar entre la vista de Listado y la vista de Formulario/Edición.
* **Estilado Moderno:** Interfaz de usuario limpia y con un diseño intuitivo (estilo "piola").

##  Tecnologías Utilizadas

* **Framework:** React Native (Expo)
* **Base de Datos Local:** `expo-sqlite`
* **Navegación:** `@react-navigation/stack`
* **Iconografía:** `@expo/vector-icons` (Ionicons)

##  Estructura del Proyecto

El proyecto se organiza en una estructura clara para separar la lógica de base de datos de los componentes de la interfaz de usuario:

TP2-CRUD-APP/ 
├── App.js # Configuración principal y Stack Navigator. 
├── Database.js # Lógica de la DB: initDatabase, createItem, getItems, updateItem, deleteItem. 
└── Screens/ 
├── ListScreen.js # Pantalla principal (READ y DELETE). 
└── FormScreen.js # Pantalla de formulario (CREATE y UPDATE).

Instrucciones de Instalación y Ejecución 

Sigue estos pasos para poner en marcha la aplicación en tu entorno de desarrollo.

### Requisitos Previos

Asegúrate de tener instalado:
1.  **Node.js** (versión recomendada: 18 o superior).
2.  **npm** o **Yarn**.
3.  **Expo Go** en tu dispositivo móvil (iOS o Android) o un emulador/simulador.

### Paso 1: Clonar el Repositorio

```bash
git clone 
cd TP2-CRUD-APP

# Instala dependencias de node_modules
npm install 

# Instala dependencias específicas de Expo
npx expo install @react-navigation/native @react-navigation/stack expo-sqlite

por ultimo 
iniciar la aplicacion 
npx expo start