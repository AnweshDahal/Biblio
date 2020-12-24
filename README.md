![Biblio](https://socialify.git.ci/AnweshDahal/Biblio/image?description=1&font=Inter&language=1&logo=https%3A%2F%2Fraw.githubusercontent.com%2FAnweshDahal%2FBiblio%2Fmaster%2Fsrc%2Fassets%2Flogo.png&owner=1&theme=Light)

![latest](https://img.shields.io/badge/latest-1.0.0-blue)
![language](https://img.shields.io/badge/language-javascript-ffd700)
![devDependencies](https://img.shields.io/badge/devDependencies-electron-green)
![license](https://img.shields.io/badge/license-MIT-orange)

## Introduction
Biblio allows you to generate citation and bibliography for your school reports. This program follows guidelines from Angila Ruskin University's [**Havard System of Reference**](https://library.aru.ac.uk/referencing/harvard.htm), and Purdue University's Online Writing Lab: [**Purdue OWL**](https://owl.purdue.edu/owl/purdue_owl.html) for proper referencing format.

## Installation
*You can downlad the source code and build the program your self or download a pre-built version [**here**](#)*

### Manual Build
1. Download the source code from this repository.
2. Paste it in a directory of your choice
3. Run ```npm install``` to install required modules.
4. You can start editing the program from here, or build the program for your system by following [**these**](https://www.christianengvall.se/electron-packager-tutorial/) instructions.

## Project Detail
### Project Layout
* __node_modules__
* __src__
  * __assets__
    * _images_
    * _loading.svg_
    * _logo.svg_
  * __scripts__
    * _main.js_
  * __style__
    * _\_button.scss_
    * _\_container.scss_
    * _\_fonts.scss_
    * _\_gradients.scss_
    * _\_scrollbar.scss_
    * _\_variables.scss_
    * _style.css_
    * _style.scss_
  * _main.html_
  * _splashScreen.html_
* _.gitignore_
* _LICENSE_
* _package-lock.json_
* _package.json_
* _README_

### Current Features
**Referencing Style**
- [x] Havard Angila Referencing Style
- [ ] APA Referencing Style
- [ ] MLA Referencing Style

**Reference Source**
- [x] Book
- [x] Journal Article
- [x] Website

**Other Features**
- [x] Save
- [x] Generate