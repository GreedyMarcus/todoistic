# Todoistic

A Todoistic egy modern teendőket kezelő webalkalmazás.

A projekt a Budapest Műszaki és Gazdaságtudományi Egyetem Rendszertervezés AUT specializáció témalabor **React és .NET Core alapú webalkalmazás fejlesztése** c. témakörének keretein belül készült.

## Az alkalmazás felépítése

Az alkalmazás a szoftverfejlesztésben tipikusan használt _kliens-szerver architektúrára épül_, melynek értelmében a _megjelenítés_, az _adatkezelés_ és az _üzleti logika_ különálló folyamatokra van bontva. A modern felhasználóbarát felület kialakításához **React** technológiát használunk frontenden, a backend működését pedig az **ASP.NET Core** szolgálja ki. A teendőket **SQLite** adatbázisban tároljuk, a webes felülethez tartozó kiszolgáló pedig **REST** interfészen keresztül érhető el.

### Frontend felépítése

Az alkalmazás a **Single-Page Application** megközelítést alkalmazva komponensekből épül fel. A komponensek kontrolláltak, mely magában hordozza a **Single Source of Truth** koncepcióját. Az alkalmazás két nézettel rendelkezik, egy _összesítő_ és egy _szerkesztő_ nézettel. Az összesítő nézetben jelennek meg a teendők, amelyek állapotuk szerint táblázatokba rendezettek, a szerkesztő nézetben pedig egy konkrét teendőhöz tartozó további információk találhatók. A _Single Source of Truth_ koncepciót követve egy-egy komponens tartozik ezekhez a nézetekhez, amelyek saját belső állapottal rendelkeznek és az őket felépítő komponensek számára biztosítják az adatfolyamot. Az összesítő nézethez a **HomeBoard** komponens, míg a szerkesztő nézethez a **TodoItemEditor** komponens tartozik. Ezek felelnek az adatok lekérdezéséért a Web API-n keresztül. Végezetül az egyes nézetek közötti navigálásért az **App** komponens felel.

A Web API-val történő kommunikációért az **ApiService** felelős, így a komponensek már csak a lekérdezett adatokkal dolgoznak. Alapvetően kétféle adatmodellt különböztetünk meg, a **Todo** és a **Status** modellt. A _Todo_ a teendőket, a _Status_ pedig a teendők lehetséges állapotait reprezentálja. A teendőkkel kapcsolatban a **CRUD** műveletek biztosítottak az alkalmazáson belül. A kliens-szerver közötti adatátvitel során az adatok **JSON** formátumban kerülnek továbbításra.

Az alkalmazás **Pure CSS** elven készült, így semmilyen külső könyvtárat nem használ az egyes nézetek kialakításához.

### Backend felépítése

Az alkalmazás backend részének megvalósításához az **ASP.NET Core 2.1** szolgáltatja a szükséges építőelemeket.

Az adatok **SQLite** adatbázisban tárolódnak, maga az adattárolás pedig egyszerű relációs sémában **Entity Framework Core** alapokon történik. Az adatbázisban tárolt adatok modellezésére a **Todo** és **Status** modellek szolgálnak, melyek a már fent említett teendők és teendőkhöz tartozó állapotok reprezentációi. Az adatbázis inicializálásakor az alkalmazás előre meghatározott, véges számú állapotot definiál, amivel feltölti az adatbázist. Az alkalmazás használata során nincs mód új állapotok felvételére, azonban az architektúra és a _Status_ modell felépítésének köszönhetően az állapotok igény szerint bővíthetőek a későbbiekben.

A Web API-hoz érkező kéréseket meghatározott kontrollerek kezelik. A `api/Todos` címmel kezdődő kéréseket a **TodosController**, míg a `api/Status` címmel kezdődőeket a **StatusController**. A **Repository minta** implementálásával a kérések kiszolgálásához szükséges adatbázisműveleteket elfedjük egy extra réteggel a kontrollerek elől, így azok közvetlenül nem is érik el az adatbázist. A lekért adatok **adatátviteli objektumokban** tárolódva érkeznek meg a kliens oldalra, így csak a szükséges információkat biztosítva az alkalmazás számára.

## Az alkalmazás beüzemelése

Az alkalmazás a **Git** verziókezelőt használja, így a projekt folyamatosan elérhető **GitHub** repository-ban.

Git repository-ból való klónozás **Git Bash** használatával:

```
$ git clone https://github.com/GreedyMarcus/todoistic.git
```

Mielőtt a Web API-t elindíthatnánk, létre kell hoznunk az adatbázist. Amennyiben nem áll rendelkezésre korábbi **migráció**, abban az esetben létre kell hoznunk egy kezdeti verziót, különben a lépés kihagyható.

Migráció létrehozása **.NET Core CLI** használatával:

```
dotnet ef migrations add InitialCreate
```

vagy **Visual Studio-ban PowerShell** használatával:

``` 
Add-Migration InitialCreate
```

Ezután már csak alkalmaznunk kell a migrációt az adatbázisra a séma létrehozásához.

**.NET Core CLI** használatával:

```
dotnet ef database update
```

vagy **Visual Studio-ban PowerShell** használatával:

``` 
Update-Database
```

Amennyiben sikeres volt a végrehajtás, elindíthatjuk a backend alkalmazást.

**.NET Core CLI** használatával:

```
dotnet run
```

vagy **Visual Studio**-ban egyszerűen futtatjuk az alkalmazást. Amennyiben ezt a módszert választjuk, úgy a React alkalmazásunk is elindul és az általunk megadott porton elérhetővé válik.

Ellenkező esetben parancssorból a `/ClientApp` mappához kell navigálnunk, majd az alábbi parancs megadásával a React alkalmazást is el kell indítanunk:

```
npm run
```

## Használat

Az alkalmazás modern, letisztult vonalat követ. Az egyes teendők állapotuk szerint a megfelelő táblázatba rendezetten jelennek meg. A rendezettséget az állapotok prioritása határozza meg. Az _összesített_ nézetben új teendőket vehetünk fel állapottól függően a megfelelő táblázat fejlécében elhelyezett komponens segítségével. Alapértelmezetten a teendők leírás nélkül és az aktuális dátumhoz tartozó határidővel jönnek létre. Adott teendőhöz tartozó prioritást és állapotot **drag and drop** módon változtathatjuk meg. Egy teendővel kapcsolatos további információkat kizárólag _szerkesztő_ nézetben érhetünk el, ahol lehetőségünk van az adatok módosítására, vagy akár a teendő törlésére is. A nézetek közötti navigáció egyszerű és letisztult. A _szerkesztő_ nézet eléréséhez elegendő rákattintanunk egy teendőre, onnan pedig mentéssel, vagy a panel szélén található x jel lenyomásával térhetünk vissza az _összesítő_ nézethez.

## Szerző

Domahidi Márk