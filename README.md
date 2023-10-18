# Administrador de contenido

## Backend

Este es el repositorio del proyecto backend de nuestra aplicación. Antes de comenzar a utilizarlo, asegúrate de seguir estos pasos para configurar correctamente el entorno.

## Configuración de la Base de Datos

### Instalar Dependencias

Asegúrate de tener Node.js y npm instalados en tu sistema. Luego, ejecuta `npm install` para instalar todas las dependencias necesarias.

### Configurar la Base de Datos

Abre el archivo `config/config.json` y configura las credenciales de tu base de datos en el entorno de desarrollo.

```json
{
  "development": {
    "username": "tu_usuario",
    "password": "tu_contraseña",
    "database": "nombre_de_tu_base_de_datos",
    "host": "localhost",
    "dialect": "mysql"
  }
  // ...
}
```

### Migraciones de la Base de Datos

Ejecuta npx sequelize-cli db:migrate para aplicar las migraciones y crear las tablas en la base de datos.

### Ejecutar el Proyecto

Una vez que hayas configurado la base de datos , puedes ejecutar el proyecto utilizando el siguiente comando:

```
npm run start
```

### Datos Iniciales

Para poblar la base de datos con datos iniciales, ejecuta `npx sequelize-cli db:seed:all`.

¡Listo! Ahora el proyecto backend está en funcionamiento y listo para ser utilizado.
