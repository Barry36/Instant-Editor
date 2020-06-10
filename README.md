# Real-time editor
This project was developed and deployed by Barry. This project was developed using Angular 9 with Firebase @version - 8.4.2 
## project Description
This project enables Google Sign-in and allows user to write post using Medium Editor (https://github.com/yabwe/medium-editor), and the changes will be updated automatically to the real-time Firebase database without clicking any buttons. When the user logs back in, retrieve their last written and auto-saved document and show it in the editor ready for editing.
### LaTex Support: 
The application also allows the user to enter LaTeX equations into the editor inside 2 enclosing $ symbols (e.g. $1+1=2$) and once the user is done typing them out, render the actual equation.

### Security Enhancement:
The security enhancement (such as CSRF, XSS, SQL injection) was not implemented given this is a prototype application with minimal security risk.

# SimpleApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
