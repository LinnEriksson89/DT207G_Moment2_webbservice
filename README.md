# Webbservice

Detta är en webbservice för moment två i kursen Backend-baserad webbutveckling.

APIet är inte publicerat på internet utan är enbart tillgängligt i detta repository.

## Installation
För att köra detta API lokalt krävs en MySQL-databas, tex via XAMPP.
Utöver det kan man klona ner detta repo och köra npm install för att installera nödvändinga npm-paket. Att köra install.js skapar sedan databas-tabellen "jobs" enligt följande:
|Fält       |Krav           |NOT NULL   |Övrigt         |
|-----------|---------------|-----------|---------------|
|id         |int(2)         |X          |AUTO_INCREMENT |
|companyname|varchar(32)    |X          |               |
|jobtitle   |varchar(64)    |X          |               |
|location   |varchar(32)    |X          |               |
|startdate  |date           |X          |               |
|enddate    |date           |X          |               |
|description|varchar(128)   |X          |               |

Fältet id är primärnyckel i tabellen.

## Metoder
|Metod  |URI            |Beskrivning                |
|-------|---------------|---------------------------|
|GET    |/api           |Välkomstmeddelande.        |
|GET    |/api/work      |Hämta alla jobb.           |
|GET    |/api/work/:id  |Hämta ett specifikt jobb.  |
|POST   |/api/work      |Lägg till jobb.            |
|PUT    |/api/work/:id  |Uppdatera specifikt jobb.  |
|DELETE |/api/work/:id  |Radera specifikt jobb.     |

Jobb-objekten som hämtas eller skickas hanteras i JSON och ser ut som nedan.

```
  {
    "id": 1,
    "companyname": "Namn",
    "jobtitle": "Titel",
    "location": "Plats",
    "startdate": "2016-01-01",
    "enddate": "2019-12-31",
    "description": "Beskrivning"
  }
```