# chatroom

## Features
 - Use react.js
 - Use webpack
 - Use node.js
 - Use docker

## Install
```bash
git clone <reop>
```

## Commands
 - Before development
```
npm install
```

 - Development
```
npm start
```
 - Build to package will create `build` directory
```
npm run build
```
 - Production
```
npm install -g serve
```
 - Start 
```
serve -s build
```
 
 ## Docker

  - Build image
```
sh docker-build-frontend.sh
```

  - Run image
```
docker-compose up -d
```