
# ApuestaTotal - challenge

En este repositorio se utiliza el stack de React + TypeScript + Vite para desarrollar el reto frontend de la empresa Apuestatotal.
Herramientas que se utilizaron:
- Microfrontends
- Tailwind
- Zustand para el manejo de estado y la persistencia.
- axios para obtener los datos de la API.
- react-router-dom para la navegación

Puedes acceder al link desplegado en:
 https://challenge-apuesta-total.vercel.app/



## Explicación de la App

1. En la primera vista, la aplicación le pedirá que se ingrese el nombre de usuario 
2. En la segunda vista, se muestra un listado de los pokemones, puede seleccionar un pokemon para ver los detalles, lo que le redigira al microfrontend de Detalles,
3. Tambien tiene la opción de hacer click en  el boton "Historial", lo que le redigira al microfontend con el historial de todas las busquedas.


## Estructura del repositorio

This repository has the following  organization:

    ├── src                     # React - app
        ├── components
            ├── CardButton              # Component
            ├── IconTheme               # Component
            ├── Loading                 # Component
            ├── SearchModal             # Component
            ├── SearchPokemon           # Component
            ├── Toast                   # Component
        ├── Page
            ├── Login                   # Page to input user name
            ├── Pokemons                 # Page to register user information
            ├── History (microfrontend)  # Page show search history
            ├── Details (microfrontend)  # Page show pokemon details
        ├── hooks
            ├── useThemes                # Manage dark/ light theme
        ├── router
            ├── AppRouter               # navigate
        ├── store
            ├── pokemonStore            # to save data about pokemon selected
            ├── themeStore              # to save data about theme  type
            ├── userStore             # to save data about user name
        ├── interfaces
            ├── pokemon                  
            ├── theme                  
        ├── services
            ├── pokemonServices         #  API services 
            
    └── README.md                   # README

## Run

En caso de querer clonar el repositorio y probar localmente, haz lo siguiente:

1. Clone el repositorio.
2. Ejecutar:

```bash
npm install
```

3.  completar las variables de entorno `env.template` con los datos de los otros 2 microfrontend
```
VITE_DETAILS_URL=
VITE_HISTORY_URL=
```
4. Ejecutar

```bash
npm run dev
```

## Contacto
* Linkedin: [carlos yaco](https://www.linkedin.com/in/carlos-yaco-tincusi/)
* website: [web](https://yacodev.com)

##  Licencia
Este proyecto esta bajo la licencia [MIT](/LICENCE).


## vista

![vista ](https://github.com/yacodev/test/blob/1c56988130d4a2fd777d107ec6f7a355de9c5f66/src/assets/login.png)

![vista ](https://github.com/yacodev/test/blob/1c56988130d4a2fd777d107ec6f7a355de9c5f66/src/assets/pokemons.png)