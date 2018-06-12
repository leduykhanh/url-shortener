# url-shortener
## URL shortener - Java

* front end
  - npm i
  - npm run build:dll
  - npm start
  - Visit http://localhost:3000

* backend
  - mvn clean spring-boot:run
  - example of get users info:
    - POST http://localhost:8080/geturl {"shortened":"http://localhost:3000/6Lj6Bi","token":"7fd6096c72269c886a6e"}
