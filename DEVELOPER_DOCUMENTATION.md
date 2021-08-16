## **recipeDB - Recept admin**
---

## Az alkalmazás leírása

**Célja:**

Az alkalmazás célja, hogy a felhasználók valamint az adminisztrátor által felvitt receptek adatait nyilvántartsa és kezelje.

**Technikai követelmények, előírások:**
- Az alkalmazás Angular-alapú, model-service-component architektúra jellemzi
- A dizájnért a Bootstrap, a Font Awesome és a Material Design felel
- Az adatbázis NoSQL alapú MongoDB clusteren fut
- NodeJS API: saját API szolgálja ki a frontendet
- Minden API útvonalhoz egy unit teszt kapcsolódik
- Az API-hoz Swagger alapú dokumentáció tartozik
- A felület bizonyos oldalai csak belépés után érhetők el (JWT autentikáció) 
- Adminisztrátori szerepkört leíró User Story a README.md-ben
- Markdown dokumentáció a documentation.md-ben
- Az alkalmazás dockerizálva van, konténerből futtatható 

**Megjelenése:**


- Teljesen reszponzív, mobile-first szemléletű.


---

## **Főbb részei:**

Alapvetően két fő részből áll az alkalmazás:

- A bárki által látogatható receptes felület.
- A bejelentkezéshez kötött adminisztrációs felület.

## _**1. Főoldal**_

A főoldalon felső és oldalsó navigáció is van footerrel és az SPA Angular komponensek középre töltődnek be.

## _**2. Navigáció**_

Az oldalsó menüben az alsó menüpontok csak user vagy admin jogosultsággal érhetők el.

## _**3. Receptek adatbázis**_
---

**Osztály neve:** recipe   
**Osztály helye:** model/recipe

**Service neve:** recipe  
**Osztály helye:** service/recipe

**Komponens neve:** recipe  
**Komponens helye:** page/recipe

 

Az egyes recepthez tartozó adatok a következők:

- id (azonosító)
- name (név)
- category (kategória)
- time_need (időigény - milyen gyorsan készíthető el az étel)
- difficulty (milyen nehéz elkészíteni az ételt)
- price (mennyire pénztárcabarát)
- time_pre (előkészület - az előkészületi idő)
- time_cooking (főzési/sütési idő)
- degree (sütési hőfok)
- index (a recept a főoldalon szerepel)
- calory (kalória érték)
- description (az elkészítés lépései)
- ingredients (hozzávalók)
- ingredients_quantity (a hozzávalók mennyiségei)
- img (kép URL)
- story (kedvcsináló a recepthez)
- portion (hány adagos a recept)

---

A sok adat miatt az admin oldalon megjelenő táblázat csak a receptek fontosabb adatait tartalmazza, valamennyi adat egyszerre a receptek űrlapon fog megjelenni.

**Create:**

> _A Új recept gombra kattintva egy űrlap segítségével 
> új recept adatai vehetők fel és menthetők az adatbázisban._

- Az Új recept gombra való kattintással egy új oldal nyílik meg, ahol egy új recept adatait lehet input mezők segítségével bevinni.
- A Mentés gombra kattintva a program az adatbázisba menti a megadott adatokat.
- A Vissza gombra kattintva az összes recept listázó oldalra navigál vissza az alkalmazás.

---

**Update:**

> _Az Update ikonnal ellátott gombra kattintva egy űrlap segítségével
> a recept adatai szerkeszthetők és menthetők az adatbázisban._

- Az Update gombra való kattintással a recept egyedi adatait tartalmazó aloldal nyílik meg, ahol a választott recept adatait lehet szerkeszthető mezők segítségével módosítani.
- A Mentés gombra kattintva a program az adatbázisba menti a módosított adatokat.
- A Vissza gombra kattintva az összes receptt listázó oldalra navigál vissza az alkalmazás.

---

**Delete:**

> _A Delete ikonnal ellátott gombra kattintva 
> egy recept törölhető az adatbázisból._

- A Delete gombra való kattintással az alkalmazás törli a recept entitását az adatbázisból.
- Az adatbázisból való törlést követően az alkalmazás frissíti a listaoldalt, ahol a már törölt recept nem lesz látható.

---

**Listázás:**

> _Egy legördülő menü segítségével kategóriák szerint listázhatóak a receptek._

- A Search gombra való kattintással az alkalmazás kikeresi a választott kategóriának megfelelő entitásokat az adatbázisból, és listázza azokat.

---

**Szabadszavas keresés:**

> _Egy szabadszavas input mező segítségével bármilyen kulcsszóra lehet keresni az adatbázisban a választott kategórián belül._

- A Search gombra való kattintással az alkalmazás kikeresi a kulcsszónak megfelelő entitásokat az adatbázisnak a legördülő menüben választott kategóriájából, és listázza azokat.

---

**Rendezés:**

> _A lista oszlopainak fejlécére való kattintással növekvő és csökkenő sorrendbe rendezhetőek a szám típusú adatok, illetve abc-sorrendbe, valamint fordított abc-sorrendbe rendezhetőek a szöveges adatok._

- A fejlécen található lefelé mutató nyíl ikonra kattintva az alkalmazás sorba rendezi a választott adatok szerint az entitásokat.
- A fejlécen található felfelé mutató nyíl ikonra kattintva az alkalmazás fordított sorba rendezi a választott adatok szerint az entitásokat.

---
## _**4. Alapanyagok adatbázis**_
---


**Osztály neve:** ingredient

**Osztály helye:** model/ingredient  

**Service neve:** ingredient   
**Osztály helye:** service/ingredient  

**Komponens neve:** ingredient    
**Komponens helye:** page/ingredient  

Az aloldal megjeleníti az összes alapanyag adatait lista formátumban.  

Ezek az adatok a következők:
- id (azonosító)
- name (név)
- unit (mennyiségi egység)
- calory (kalória érték)

---

**Create:**

> _A Új recept gombra kattintva egy űrlap segítségével 
> új recept adatai vehetők fel és menthetők az adatbázisban._

- Az Új alapanyag gombra való kattintással egy új oldal nyílik meg, ahol egy új alapanyag adatait lehet input mezők segítségével bevinni.
- A Mentés gombra kattintva a program az adatbázisba menti a megadott adatokat.
- A Vissza gombra kattintva az összes alapanyag listázó oldalra navigál vissza az alkalmazás.

---

**Update:**

> _Az Update ikonnal ellátott gombra kattintva egy űrlap segítségével
> az alapanyagok adatai szerkeszthetők és menthetők az adatbázisban._

- Az Update gombra való kattintással az alapanyag egyedi adatait tartalmazó aloldal nyílik meg, ahol a választott alapanyag adatait lehet szerkeszthető mezők segítségével módosítani.
- A Mentés gombra kattintva a program az adatbázisba menti a módosított adatokat.
- A Vissza gombra kattintva az összes alapanyag listázó oldalra navigál vissza az alkalmazás.

---

**Delete:**

> _A Delete ikonnal ellátott gombra kattintva 
> egy alapanyag törölhető az adatbázisból._

- A Delete gombra való kattintással az alkalmazás törli az alapanyagot az adatbázisból.
- Az adatbázisból való törlést követően az alkalmazás frissíti a listaoldalt, ahol a már törölt alapanyag nem lesz látható.

---

**Listázás:**

>
- A Search gombra való kattintással az alkalmazás kikeresi a megfelelő alapanyagokat az adatbázisból és listázza azokat.

---

**Szabadszavas keresés:**

> _Egy szabadszavas input mező segítségével bármilyen kulcsszóra lehet keresni az adatbázisban a választott kategórián belül._

- A Search gombra való kattintással az alkalmazás kikeresi a kulcsszónak megfelelő entitásokat az adatbázisnak a legördülő menüben választott kategóriájából, és listázza azokat.

---

**Rendezés:**

> _A lista oszlopainak fejlécére való kattintással növekvő és csökkenő sorrendbe rendezhetőek a szám típusú adatok, illetve abc-sorrendbe, valamint fordított abc-sorrendbe rendezhetőek a szöveges adatok._

- A fejlécen található lefelé mutató nyíl ikonra kattintva az alkalmazás sorba rendezi a választott adatok szerint az entitásokat.
- A fejlécen található felfelé mutató nyíl ikonra kattintva az alkalmazás fordított sorba rendezi a választott adatok szerint az entitásokat.

---
---

## _**5. Felhasználók adatbázis**_
---
---

> _Az alkalmazás a felhasználók aloldalra navigálva megjeleníti a felhasználók adatbázisban tárolt adatait._

**Osztály neve:** user  
**Osztály helye:** model/user

**Service neve:** user  
**Osztály helye:** service/user 

**Komponens neve:** user    
**Komponens helye:** page/user 

Az aloldal megjeleníti az összes felhasználó adatait lista formátumban.  

Ezek az adatok a következők:
- id (azonosító)
- name (név)
- nickname (felhasználónév)
- email (e-mail)
- password (jelszó)
- countOfRecipes (hány receptet vitt fel)
- start (mikor csatlakozott az oldalhoz)

**Create:**

> _A Új felhasználó gombra kattintva egy űrlap segítségével 
> új felhasználó adatai vehetők fel és menthetők a készítői adatbázisban._

- A Új felhasználó gombra való kattintással egy új oldal nyílik meg, ahol egy új felhasználó adatait lehet input mezők segítségével bevinni.
- A Mentés gombra kattintva a program az adatbázisba menti a megadott adatokat.
- A Vissza gombra kattintva az összes felhasználót listázó oldalra navigál vissza az alkalmazás.

---

**Update:**

> _Az Update ikonnal ellátott gombra kattintva egy űrlap segítségével
> a felhasználó adatai szerkeszthetők és menthetők az adatbázisban._

- Az Update gombra való kattintással a felhasználó egyedi adatait tartalmazó aloldal nyílik meg, ahol a felhasználó adatait lehet szerkeszthető mezők segítségével módosítani.
- A Mentés gombra kattintva a program az adatbázisba menti a módosított adatokat.
- A Vissza gombra kattintva az összes felhasználót listázó oldalra navigál vissza az alkalmazás.

---

**Delete:**

> _A Delete ikonnal ellátott gombra kattintva 
> egy felhasználó törölhető az adatbázisból._

- A Delete gombra való kattintással az alkalmazás törli a felhasználót az adatbázisból.
- Az adatbázisból való törlést követően az alkalmazás frissíti a listaoldalt, ahol a már törölt felhasználó nem lesz látható.

---

## _**6. Napi menü adatbázis**_
---

---



**Osztály neve:** menu  
**Osztály helye:** model/menu  

**Service neve:** menu  
**Osztály helye:** service/menu  

**Komponens neve:** menu   
**Komponens helye:** page/menu  

Az aloldal megjeleníti az összes menü adatait lista formátumban.  

Ezek az adatok a következők:
- id (azonosító)
- name (név)
- soup (leves)
- main (főétel)
- salad (saláta)
- dessert (desszert)
- week (érvényesség hete)

---

**Create:**

> _Az Új Menü gombra kattintva egy űrlap segítségével 
> új menü adatai vehetők fel és menthetők a készítői adatbázisban._

- Az Új Menü gombra való kattintással egy új oldal nyílik meg, ahol egy új menü adatait lehet input mezők segítségével bevinni.
- A Mentés gombra kattintva a program az adatbázisba menti a megadott adatokat.
- A Vissza gombra kattintva az összes menüt listázó oldalra navigál vissza az alkalmazás.

---

**Update:**

> _Az Update ikonnal ellátott gombra kattintva egy űrlap segítségével
> a menü adatai szerkeszthetők és menthetők az adatbázisban._

- Az Update gombra való kattintással a menü egyedi adatait tartalmazó aloldal nyílik meg, ahol a menü adatait lehet szerkeszthető mezők segítségével módosítani.
- A Mentés gombra kattintva a program az adatbázisba menti a módosított adatokat.
- A Vissza gombra kattintva az összes menüt listázó oldalra navigál vissza az alkalmazás.

---

**Delete:**

> _A Delete ikonnal ellátott gombra kattintva 
> egy menü törölhető az adatbázisból._

- A Delete gombra való kattintással az alkalmazás törli a felhasználót az adatbázisból.
- Az adatbázisból való törlést követően az alkalmazás frissíti a listaoldalt, ahol a már törölt felhasználó nem lesz látható.

---
## _**7. Üzenetek adatbázis**_
---

> 

**Osztály neve:** message  
**Osztály helye:** model/message  

**Service neve:** message   
**Osztály helye:** service/message  

**Komponens neve:** message  
**Komponens helye:** page/message  

Az aloldal megjeleníti az összes üzenet adatait lista formátumban.  

Ezek az adatok a következők:
- id (azonosító)
- email (e-mail cím)
- sender (feladó)
- subject (tárgy)
- message (üzenet tartalma)
- status (az üzenet státusza)

---

**Create:**

A Kapcsolat oldalon megadott üzenet adatok közvetlenül kerülnek az adatbázisba, a megadott adatokkal a küldő erről kap egy visszaigazoló e-mailt.

---

**Update:**

Az összes üzenetet tartalmazó aloldalon kizárólag a státusz átállítására van lehetősége az adminisztrátornak.

---

**Delete:**

Minőségbiztosítási okokból a törlés itt nem engedélyezett.


## **Linkek:**  

- [A User Story (adminisztrátori szerepkör) itt érhető el.](https://github.com/czetoj/recipeDB/blob/main/README.md)

- [A dokumentáció itt érhető el.](https://github.com/czetoj/recipeDB/blob/main/DOCUMENTATION.md)


