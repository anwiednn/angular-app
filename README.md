# Angular App 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.1.

It s a simple demo application allowing the user to manage tasks and users.

It is a Single-Page App (SPA) written in standard web technologies [HTML5](http://whatwg.org/html), [SCSS](http://sass-lang.com) and [TypeScript](http://www.typescriptlang.org). It leverages the popular [Angular](https://angular.io/) framework and [Angular Material](https://material.angular.io/) for material design components.

## Getting started developing

1. Ensure you have the following installed in your system:

    [`git`](https://git-scm.com/downloads)
    
    [`npm`](https://nodejs.org/en/download/)

2. Install [angular-cli](https://github.com/angular/angular-cli)
 - Locally
```
npm install @angular/cli@12.2.1
```

 - Globallyc
```
npm install -g @angular/cli@12.2.1
```

3. Clone the project locally into your system.
```
git clone https://github.com/anwiednn/angular-app.git
```

4. `cd` into project root directory and make sure you are on the master branch.

5. Install the dependencies.
```
npm install
```

6. To preview the app, run the following commands and navigate to `http://localhost:4200/`.
```
npm run json-server
```
```
ng serve
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


<!-- ### Docker


To locally build this Docker image from source (after `git clone` this repo), run:
```
docker build -t openmf/web-app:latest .
```
You can then run a Docker Container from the image above like this:
```
docker run -d -p 4200:80 openmf/web-app:latest
```

Access the webapp on http://localhost:4200 in your browser. -->