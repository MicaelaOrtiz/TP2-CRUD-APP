 Trabajo Práctico 3 – Desarrollo de Aplicaciones Móviles

 desarrollada en **React Native con Expo**, que implementa:

- Sistema de **autenticación** y **gestión de usuarios** usando **SQLite**.
- Roles de usuario:  
  - **Administrador:** puede gestionar usuarios (CRUD completo).  
  -  **Usuario estándar:** puede visualizar información proveniente de la **API de The Movie DB (TMDb)**.
- Persistencia de sesión mediante **AsyncStorage**.
- Consumo de API externa (TMDb) mostrando información de películas con un diseño estilizado y fondos con gradiente.



## Tecnologías y Librerías Utilizadas

- **React Native (Expo SDK 54)**  
- **expo-sqlite** → Base de datos local  
- **@react-navigation/native** y **@react-navigation/stack** → Navegación  
- **@react-native-async-storage/async-storage** → Manejo de sesión  
- **expo-crypto** → Hash de contraseñas (SHA-256)  
- **react-native-dotenv** → Variables de entorno (.env)  
- **The Movie DB API** → Datos de películas  
- **expo-linear-gradient** → Estilos con degradados (pantallas TP1)


