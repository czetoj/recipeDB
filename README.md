# recipeDB
Receptgyűjtemény adminisztrátor szempontból


## 1. Belépés

### Felhasználói történet:

> Az adminisztrátor be tudjon lépni a felületre.

### Elfogadási kritérium:

Az univerzális belépés menüpontban az adminisztrátor a szükséges adatok megadásával be tudjon lépni és közvetlenül átirányításra kerüljön az admin oldalra.

___

## 2. Receptek adatbázis

### 1. felhasználói történet:

> Egy helyen legyenek elérhetőek a receptek adatai.

### Elfogadási kritérium:

Az admin oldalon megjelenik az összes recept adata egy helyen.

### 2. felhasználói történet:

> Kategória adat alapján lehessen szűrni.

### Elfogadási kritérium:

Az adott kategória kiválasztásával frissül az oldal és csak az adott kategóriába tartozó receptek jelennek meg.

### 3. felhasználói történet:

> Adott kategórián belül vagy a teljes adatbázisban is lehessen kulcsszóra keresni.

### Elfogadási kritérium:

Az adott kategória kiválasztásával a megadott kulcsszó alapján frissül az oldal és az adott kategóriába tartozó, kulcsszó szerint szűrt receptek jelenjenek meg.

### 4. felhasználói történet:

> A receptek az adataik alapján sorrendbe rendezhetők legyenek.

### Elfogadási kritérium:

A szám típusú adatok alapján növekvő/csökkenő, míg a szöveges adatok alapján ABC sorrendben lehessen rendezni a recepteket.

### 5. felhasználói történet:

> Új receptet lehessen felvenni.

### Elfogadási kritérium:

Az admin oldalból kiindulva egy új oldalon:
- új receptet lehessen felvinni,
- a kötelező adatok legyenek megjelölve,
- legyen ellenőrzés az adatok formátumára,
- az új recept csak akkor kerüljön elmentésre ha a kötelező mezők megfelelően ki vannak töltve,
- mentés után navigáljon vissza a rendszer az admin oldalra, ahol az új recept már jelenjen meg az elemek között.

### 6. felhasználói történet:

> A recept törölhető legyen.

### Elfogadási kritérium:

A kiválasztott recept az admin oldalon törölhető legyen, melyet követően az admin oldal frissüljön, azaz a törölt recept már ne legyen látható.

### 7. felhasználói történet:

> A recept szerkeszthető legyen.

### Elfogadási kritérium:

A kiválasztott recept adatai egy új oldalon:

- módosíthatók legyenek,
- legyen ellenőrzés a felvitt adatok megkövetelt formátumára,
- a módosított recept csak akkor kerüljön elmentésre ha a kötelező mezők megfelelően ki vannak töltve,
- mentés után navigáljon vissza a rendszer az admin oldalra, ahol a módosított recept már a módosított adatokkal jelenjen meg.
  
___

## 3. Alapanyagok adatbázis

### 1. felhasználói történet:

> Egy helyen legyenek elérhetőek az alapanyagok adatai.

### Elfogadási kritérium:

Az admin oldalon megjelenik az összes alapanyag adata egy helyen.

### 2. felhasználói történet:

> Kategória adat alapján lehessen szűrni.

### Elfogadási kritérium:

Az adott kategória kiválasztásával frissül az oldal és csak az adott kategóriába tartozó alapanyagok jelennek meg.

### 3. felhasználói történet:

> Adott kategórián belül vagy a teljes alapanyag adatbázisban is lehessen kulcsszóra keresni.

### Elfogadási kritérium:

Az adott kategória kiválasztásával a megadott kulcsszó alapján frissül az oldal és az adott kategóriába tartozó kulcsszó szerint szűrt alapanyagok jelenjenek meg.

### 4. felhasználói történet:

> Az alapanyagok az adataik alapján sorrendbe rendezhetők legyenek.

### Elfogadási kritérium:

A szám típusú adatok alapján növekvő/csökkenő, míg a szöveges adatok alapján ABC sorrendben lehessen rendezni az alapanyagokat.

### 5. felhasználói történet:

> Új alapanyagot lehessen felvenni.

### Elfogadási kritérium:

Az admin oldalból kiindulva egy új oldalon:
- új alapanyagot lehessen felvinni,
- a kötelező adatok legyenek megjelölve,
- legyen ellenőrzés az adatok formátumára,
- az új alapanyag csak akkor kerüljön elmentésre ha a kötelező mezők megfelelően ki vannak töltve,
- mentés után navigáljon vissza a rendszer az admin oldalra, ahol az új alapanyag már jelenjen meg az elemek között.

### 6. felhasználói történet:

> Az alapanyag törölhető legyen.

### Elfogadási kritérium:

A kiválasztott alapanyag az admin oldalon törölhető legyen, melyet követően az admin oldal frissüljön, azaz a törölt alapanyag már ne legyen látható.

### 7. felhasználói történet:

> Az alapanyag szerkeszthető legyen.

### Elfogadási kritérium:

A kiválasztott alapanyag adatai egy új oldalon:

- módosíthatók legyenek,
- legyen ellenőrzés a felvitt adatok megkövetelt formátumára,
- a módosított alapanyag csak akkor kerüljön elmentésre ha a kötelező mezők megfelelően ki vannak töltve,
- mentés után navigáljon vissza a rendszer az admin oldalra, ahol a módosított alapanyag már a módosított adatokkal jelenjen meg.
  
___

## 4. Felhasználók adatbázis

### 1. felhasználói történet:

> Egy helyen legyenek elérhetőek a felhasználók adatai.

### Elfogadási kritérium:

Az admin oldalon megjelenik az összes felhasználó adata egy helyen.

### 2. felhasználói történet:

> Kategória adat alapján lehessen szűrni.

### Elfogadási kritérium:

Az adott kategória kiválasztásával frissül az oldal és csak az adott kategóriába tartozó felhasználók jelennek meg.

### 3. felhasználói történet:

> Adott kategórián belül vagy a teljes felhasználó adatbázisban is lehessen kulcsszóra keresni.

### Elfogadási kritérium:

Az adott kategória kiválasztásával a megadott kulcsszónak megfelelően frissül az oldal és az adott kategóriába tartozó kulcsszó szerint szűrt felhasználók jelenjenek meg.

### 4. felhasználói történet:

> A felhasználók az adataik alapján sorrendbe rendezhetők legyenek.

### Elfogadási kritérium:

A szám típusú adatok alapján növekvő/csökkenő, míg a szöveges adatok alapján ABC sorrendben lehessen rendezni a felhasználókat.

### 5. felhasználói történet:

> A felhasználó törölhető legyen.

### Elfogadási kritérium:

A kiválasztott felhasználó az admin oldalon törölhető legyen, melyet követően az admin oldal frissüljön, azaz a törölt felhasználó már ne legyen látható.

### 6. felhasználói történet:

> A felhasználó szerkeszthető legyen.

### Elfogadási kritérium:

A kiválasztott felhasználó adatai egy új oldalon:

- módosíthatók legyenek,
- legyen ellenőrzés a felvitt adatok megkövetelt formátumára,
- a módosított felhasználó csak akkor kerüljön elmentésre ha a kötelező mezők megfelelően ki vannak töltve,
- mentés után navigáljon vissza a rendszer az admin oldalra, ahol a módosított felhasználó már a módosított adatokkal jelenjen meg.

___

## 5. Heti menü adatbázis

### 1. felhasználói történet:

> Egy helyen legyenek elérhetőek a menük adatai.

### Elfogadási kritérium:

Az admin oldalon megjelenik az összes menü adata egy helyen.


### 2. felhasználói történet:

> Új menüt lehessen felvenni.

### Elfogadási kritérium:

Az admin oldalból kiindulva egy új oldalon:
- új menüt lehessen felvinni,
- napi bontásban,
- napszaknak megfelelő típusú étkezés szerinti bontásban
- a kötelező adatok legyenek megjelölve,
- legyen ellenőrzés az adatok formátumára,
- az új menü csak akkor kerüljön elmentésre ha a kötelező mezők megfelelően ki vannak töltve,
- mentés után navigáljon vissza a rendszer az admin oldalra, ahol az új menü már jelenjen meg az elemek között.

### 6. felhasználói történet:

> A menü törölhető legyen.

### Elfogadási kritérium:

A kiválasztott menü az admin oldalon törölhető legyen, melyet követően az admin oldal frissüljön, azaz a törölt menü már ne legyen látható.

### 7. felhasználói történet:

> A menü szerkeszthető legyen.

### Elfogadási kritérium:

A kiválasztott menü adatai egy új oldalon:

- módosíthatók legyenek,
- legyen ellenőrzés a felvitt adatok megkövetelt formátumára,
- a módosított menü csak akkor kerüljön elmentésre ha a kötelező mezők megfelelően ki vannak töltve,
- mentés után navigáljon vissza a rendszer az admin oldalra, ahol a módosított menü már a módosított adatokkal jelenjen meg.

___

## 6. Üzenetek adatbázis

### 1. felhasználói történet:

> Egy helyen legyenek elérhetőek a felhasználók üzenetei.

### Elfogadási kritérium:

Az admin oldalon megjelenik az összes felhasználó Kapcsolat oldalon keresztül megadott üzenete.

### 2. felhasználói történet:

> Kategória adat alapján lehessen szűrni.

### Elfogadási kritérium:

Az adott kategória kiválasztásával frissül az oldal és csak az adott kategóriába tartozó üzenetek jelennek meg.

### 3. felhasználói történet:

> Adott kategórián belül vagy a teljes üzenet adatbázisban is lehessen kulcsszóra keresni.

### Elfogadási kritérium:

Az adott kategória kiválasztásával a megadott kulcsszónak megfelelően frissül az oldal és az adott kategóriába tartozó kulcsszó szerint szűrt üzenetek jelenjenek meg.

### 4. felhasználói történet:

> Az üzenetek az adataik alapján sorrendbe rendezhetők legyenek.

### Elfogadási kritérium:

A szám típusú adatok alapján növekvő/csökkenő, míg a szöveges adatok alapján ABC sorrendben lehessen rendezni az üzeneteket.
