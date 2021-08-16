## **1. Az alkalmazás célja**

Az alkalmazás célja, hogy a felhasználók valamint az adminisztrátor által felvitt receptek adatait nyilvántartsa és kezelje.

## **2. Az alkalmazás telepítése**

- A célgépre le kell klónozni az adott GitHub repository tartalmát.
 `git clone https://github.com/czetoj/recipeDB.git`

- Ha csak használni szeretnéd az alkalmazást, akkor a /server mappában telepítsd az alkalmazás függőségeit az `npm i` paranccsal.
- Ha tovább is szeretnéd fejleszteni, akkor a /frontend mappában is telepítened kell a függőségeket az `npm i` paranccsal és szükség esetén az Angular keretrendszert az `npm i -g @angular/cli` paranccsal.
- Fejlesztés esetén build-elned is kell az `ng build --prod` paranccsal és a /frontend/dist/recipedb mappa tartalmával felül kell írnod a /server/public mappa tartalmát.

## **3. Az alkalmazás konfigurálása**

Egyedi konfigurálásra nincs szükség.


## **4. Az alkalmazás indítása**

Az alkalmazás a /server mappából indítható az `npm start` parancssal vagy Docker konténerből is.

A Docker container indítása és inicializálása:

- El kell indítani a Docker Desktop alkalmazást.
- A /server mappába belépve a terminálban ki kell adni a `docker-compose:up` parancsot. (Ha szükséges, a /frontend mappából az `npm start` paranccsal is indítható a frontend)
- Ha regisztrálsz az alkalmazásban, akkor felhasználói jogosultságot kapsz, ha admin jogosultságot szeretnél, akkor keress.


## **5. A végpontok dokumentációja**

[Swagger](https://)

- Az alábbi URL-t kell beírni a böngészőbe: https://localhost:3000/api-docs

## **Linkek:**  

- [A User Story (adminisztrátori szerepkör) itt érhető el.](https://github.com/czetoj/recipeDB/blob/main/README.md)

- [A fejlesztői dokumentáció itt érhető el.](https://github.com/czetoj/recipeDB/blob/main/DEVELOPER_DOCUMENTATION.md)
