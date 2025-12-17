
# Posty – Prosta aplikacja do zarządzania postami

## Opis projektu
Prosta aplikacja webowa do zarządzania postami (artykuły, poradniki, newsy, recenzje) z możliwością dodawania, edycji, usuwania i przeglądania postów. Operacje edycji i usuwania są zabezpieczone hasłem. Projekt oparty o Node.js, Express, EJS i MongoDB.

## Funkcjonalności
- Dodawanie nowych postów z tytułem, opisem, typem i hasłem
- Edycja istniejących postów po podaniu hasła
- Usuwanie postów po podaniu hasła
- Przeglądanie listy postów
- Filtrowanie postów po typie (artykuł, poradnik, news, recenzja)
- Podgląd pojedynczego posta

## Instrukcja instalacji i uruchomienia
1. **Klonuj repozytorium:**
   ```bash
   git clone https://github.com/mecik111/4E217/
   cd posts
   ```
2. **Zainstaluj zależności:**
   ```bash
   npm install
   ```
3. **Uruchom MongoDB** (przez Docker):
   ```bash
   docker run -d --name posts -p 27017:27017 mongo:6.0
   ```
   Nazwa bazy: `posts`, port: `27017`
4. **Uruchom aplikację:**
   ```bash
   npm start
   ```
   lub
   ```bash
   node src/server.js
   ```
5. **Otwórz w przeglądarce:**
   [http://localhost:3000](http://localhost:3000)

## Lista endpointów
- `GET /` – lista postów, filtracja po typie przez query string (`?type=...`)
- `GET /add` – formularz dodawania posta
- `POST /add` – dodanie posta
- `GET /edit/:id` – formularz edycji posta
- `POST /edit/:id` – edycja posta
- `POST /delete/:id` – usunięcie posta (wymaga hasła)
- `GET /view/:id` – podgląd pojedynczego posta

## Technologie
- Node.js
- Express
- MongoDB
- EJS (szablony widoków)
- CSS

## Autor
Kacper Męcik 4E
