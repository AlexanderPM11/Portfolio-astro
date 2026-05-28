# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
| `npm run test:e2e`        | Runs E2E tests using Playwright                  |

## 🧪 Pruebas End-to-End (E2E) con Playwright

Las pruebas están diseñadas para ejecutarse de manera secuencial dentro de una única ventana de navegador para mejorar la velocidad y eficiencia de las pruebas.

### Configuración del Entorno
Las pruebas utilizan `dotenv` para cargar variables. Asegúrate de tener configurado el archivo `.env` en la raíz de la carpeta `portfolio` con la URL de pruebas que deseas usar:
```env
BASE_URL=https://apolanco.com
```

### Comandos de Ejecución
* **Ejecutar pruebas en segundo plano (Headless)**:
  ```bash
  npm run test:e2e
  ```
* **Ejecutar pruebas visualmente (Headed)**:
  ```bash
  npx playwright test --headed
  ```
* **Panel de interfaz de usuario interactiva (UI Mode)**:
  ```bash
  npx playwright test --ui
  ```
* **Sobrescribir la URL al vuelo (por ejemplo, para probar en Localhost)**:
  * **Windows (PowerShell)**:
    ```powershell
    $env:BASE_URL="http://localhost:4321"; npm run test:e2e; Remove-Item Env:\BASE_URL
    ```
  * **Linux / macOS / Git Bash**:
    ```bash
    BASE_URL=http://localhost:4321 npm run test:e2e
    ```

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
