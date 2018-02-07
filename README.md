Background graphics asset to be used on sassy mathy portfolio page

## Usage
```bash
npm i git://github.com/jon-grangien/portfolio-bg.git
```

```js
import bg from 'xyz-portfolio-bg'  

const options = {
  height: 600, // or windowHeight etc
}

someDomElement.appendChild(bg(options))  
```

## Develop
```bash
yarn
```   

Run dev server
```bash
yarn start
# localhost:8080/webpack-dev-server/bundle
```   

## Build dist
```bash
yarn build
```
