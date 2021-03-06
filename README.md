# Angular App 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.1.

It s a simple demo application allowing the user to manage tasks and users.

It is a Single-Page App (SPA) written in standard web technologies [HTML5](http://whatwg.org/html), [SCSS](http://sass-lang.com) and [TypeScript](http://www.typescriptlang.org). It leverages the popular [Angular](https://angular.io/) framework and [Angular Material](https://material.angular.io/) for material design components and [JSON Server (Fake API)](https://www.npmjs.com/package/json-server)

## Getting app running (using `ng serve`)

1. Ensure you have the following installed in your system:

    [`git`](https://git-scm.com/downloads)

    [`npm`](https://nodejs.org/en/download/)

2. Install [angular-cli](https://github.com/angular/angular-cli)

    Locally
    ```
    npm install @angular/cli@12.2.1
    ```

    Globally
    ```
    npm install -g @angular/cli@12.2.1
    ```

3. Clone the project locally
    ```
    git clone https://github.com/anwiednn/angular-app.git
    ```

4. `cd` into project directory and make sure you are on the main branch
    ```
    cd angular-app/angular-app
    ```

5. Install the dependencies
    ```
    npm install
    ```

6. To preview the app, run the following commands and navigate to `http://localhost:4200/`

    JSON Server (Fake API) will run on `http://localhost:3000/`
    ```
    npm run json-server
    ```

    In new terminal window and same directory as above `angular-app/angular-app`
    ```
    ng serve
    ```
    
## Getting app running (using `Docker Image`)

1. Ensure you have the following installed in your system:

    [`Docker`](https://www.docker.com/get-started)

    [`Docker Docs (Install)`](https://docs.docker.com/engine/install/)

2. Pull the docker image from 
    ```
    docker pull anwiednn/angular-app:latest
    ```

3. Run docker image
    ```
    docker run --name angular-app --rm -p 8080:80 anwiednn/angular-app
    ```

4. Access the webapp on `http://localhost:8080` in your browser
    ```
    http://localhost:8080
    ```

    This application served was build using `ng build`. This is a production version of the application.

5. Usage of JSON-Server (Fake API)

    The fake API only provides limited CRUD abilities and reduces application performances due latency of fake API used.

    Please see [`current limitations here`](https://my-json-server.typicode.com/#limits)

    Please see [`fake API used here`](https://my-json-server.typicode.com/anwiednn/angular-app-db)

## Getting started developing

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

##### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
