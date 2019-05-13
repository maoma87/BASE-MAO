# BASE-MAO

Mao's own boilerplate to work with VUE, PUG and SASS 

## Structure

* STATIC
	* PUG
	* SASS
		* Bourbon 
		* Bootstrap
	* BABEL
		* JavaScript
___

* VUE v2.6.10
	* Template
		* HTML
		* PUG
	* Script
		* JavaScript
	* Style
		* CSS
		* SASS
___

### Prerequisites

1. [Node.js](https://nodejs.org/es/) 
2. [Yarn](https://yarnpkg.com/en/docs/install#windows-stable)
3. Gulp-cli - ``yarn global add gulp-cli``
___

### Installing

```
$ yarn install
```
___

### First Step

```
$ gulp first
```
This creates the folder structure
___

### Start working

```
$ gulp
```
This will setup the LocalHost server [http://localhost:3000/](http://localhost:3000/)
___

## Other gulp tasks

``gulp vue`` : compile vue app in development mode

``gulp vueFinal`` : compile vue in production mode

``gulp pug`` : compile the pug files in the source folder in development mode

``gulp pugFinal`` : compile the pug files in the source folder in production mode

``gulp cssInline`` : Puts the css inline in the public html

``gulp sass`` : compile the sass files in the sourece/css folder in development mode

``gulp sassFinal`` : compile the sass files in the sourece/css folder in production mode

``gulp compress`` : compile the js files in source/js with babel into the public/js folder

``gulp concat`` : concatenate the files in the source/_includes/js folder into scripts.js in public/js 

``gulp json`` : copy the json files form source/json to public/json

___
## Linting

```
$ npm run lint
```
Lint every .js and .vue file inside source

___

## Formating

The formating is done by vsCode and the extention [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) on save

___ 

## Author

**Mao Santaella**

[GitHub](https://github.com/maoma87) - [Portfolio](https://mauriciosantaella.ninja)