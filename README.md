# lab2_nightwatch

## Projekta apraksts

### Projekta uzdevums
1. Automatizēt lapu ar trim testa scenārijiem.
2. Veikt testus ar Google Chrome un Firefox pārlūkprogrammām.
3. Jāiestata paralēla testa izpilde.

### Projekta struktūra

- pageObjects: mape satur CURAHomePage.js skripta failu, kurā tiek aprakstīti selektori un funkcijas, izmantojot Page Object Model pieeju.
- tests: mape satur 3 scenārijus skripta failus priekš vietnes https://katalon-demo-cura.herokuapp.com/ automatizētai testēšanai un 1 skripta failu, kur salikti lekciju scenāriji.
- nightwatch.conf.js: fails satur Nightwatch satvara konfigurāciju un iestatījumus.
- package.json un package-lock.json: faili satur informāciju par projektam nepieciešamajām atkarībām.

Projekta izstrādē tiek izmantotas Node.js 22.13.1 versija un npm 11.1.0 versija.

### Nightwatch iestatījumi

- src_folders: ['tests']: norāda uz to, ka Nightwatch satvars palaiž visus testa failus mapē "tests".
- page_objects_path: 'pageObjects': norāda uz mapi, kur atrodas Page Objects faili.
- webdriver: {port: 4444}: norāda draiveriem izveidot savienojumu, izmantojot portu 4444.
- test_settings:{default:{...},chrome:{...},firefox:{...}}: apraksta iespējamās pārlūkprogrammas testa startēšanai (pēc noklusējuma tiek palaista "Default"). Default uzstādīta arī palaišana caur Chrome pārlūkprogrammu.
- chromeOptions: {args: ["incognito",],}: Papildus iestatījums Chrome pārlūkprogrammai, kas atver Chrome pārlūkprogrammu incognito režīmā. Tas ir vienīgais veids, kā man izdevās palaist testu Chromā, jo citādi testa izpildē parādās paziņojums: "The password you just used was found in a data breach. Google Password Manager recommends changing your password now", kas bloķē tālāko testa izpildi.
- test_workers: {enabled: true, workers: 'auto'}: Iestatījums dod iespēju palaist testus paralēli.

### Uzstadīšana

1. Lai uzstādītu projektu datorā, jābūt uzinstalētām Chrome pārlūkprogrammai, Firefox pārlūkprogrammai, Node.js un Visual Studio Code.
2. Uzinstalēto zip mapi jāatspiež un jāatver Visual Studio Code programmā.
3. Visual Studio Code programmā jāatver jauns termināls (Terminal > New Terminal vai jānospiež Ctrl + Shift + `).
4. Terminālā jāuzraksta komanda "npm install", lai uzinstalētu visas nepieciešamās projekta atkarības.

### Palaišana

Konkrēta testa palaišana  
Lai palaistu 1 konkrētu testu, terminālī jāraksta komanda: 
1. npm test /tests/<faila_nosaukums>.js

    Piem.: npm test /tests/1_scenarijs.js

2. npm test -- /tests/<faila_nosaukums>.js

    Piem.: npm test -- /tests/1_scenarijs.js

3. npm test -- -t /tests/<faila_nosaukums>.js

    Piem.: npm test -- -t /tests/1_scenarijs.js

Manā datorā strādā visi varianti.

Visu testu palaišana  
Lai palaistu visus testus, terminālī jāraksta komanda:
1. npm test

Testu palaišana konkrētā browserī
Lai palaistu testus konkrētā browserī, papildus komandai pievieno:
1. -- --env <browsera_nosaukums> (nosaukums, kurš aprakstīts nightwatch.conf.js failā)

    Piem.: npm test -- -- --env chrome

2. --env <browsera_nosaukums> (nosaukums, kurš aprakstīts nightwatch.conf.js failā)

    Piem.: npm test -- --env firefox

Manā gadījumā strādā tikai pirmais variants, nevis otrais, kas tika parādīts lekcijās.

Testu paralēla palaišana
Lai palaistu testus paralēli, papildus komandai pievieno:
1. --workers= <worker_skaitlis> (skaitlis norāda, cik testu tiks veikti paralēli)

    Piem.: npm test -- -- --env chrome --workers=2
