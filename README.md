![Node.js CI](https://github.com/bertolero/polymer3-trainning-2/workflows/Node.js%20CI/badge.svg?branch=add-electron)

# Dev-Starter-Kit
 *Disclaimer* 

Base code extracted from https://github.com/codingphasedotcom/Dev-Starter-Kit

How to run the app.

## Steps

**Download or Pull This Repo**
	Top of this page you can see where it says clone or download

 **Install Node**
	https://nodejs.org/en/

**Download Atom (OPTIONAL)**
	https://atom.io/

 **Install all the node packages** 
In the root of this project run on your terminal (if you want you can do this with yarn but thats optional)
We updated to version 4.0 of gulp so you should have no problems
```bash
    npm install
```

**Make sure your version of gulp is 4.0**
```bash
    gulp -v    
```

**Make sure webpack is installed**
```bash
  webpack -v
```

**Start the web app dev server**
```bash
  npm run watch:app
```

**Start the electron app dev**
```bash
  npm run watch:electron
```

**Build web app files for production**
```bash
  npm run build:app
```

**Build electron app files for production**
```bash
  npm run build:electron
```


## Instructions to run starter kit on any backend
Coming Soon

# EACCESS ERROR FIX
```diff
- how to fix the EACCESS ERROR
- lets say for example you trying to install webpack
- sudo npm install webpack@4.25.1 -g
- and get an error
- Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/webpack/node_modules/fsevents/build'
- then try again to install it but with this at the end "--unsafe-perm=true --allow-root"
- for example
- sudo npm install webpack@4.25.1 -g --unsafe-perm=true --allow-root
```
or 

npm install har-validator@latest --save-dev

