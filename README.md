# 📚 Gestionale Biblioteca - Frontend (Angular)

Interfaccia web per il gestionale della biblioteca: catalogo libri, registrazione e login, prestiti e area di amministrazione. Si collega alla REST API della biblioteca, disponibile sia nella versione **C# (ASP.NET Core)** sia in quella **Java (Spring Boot)**: le due API espongono lo stesso contratto, quindi il frontend funziona con entrambe.

---

## 🚀 Tecnologie Utilizzate

* **Angular 22** (componenti standalone, signals, nuovo control flow `@if` / `@for`)
* **TypeScript**
* **RxJS** (gestione delle chiamate asincrone)
* **Angular Router** (rotte e guard)
* **HttpClient** con interceptor per il token JWT
* **Vitest** (test unitari)

---

## ✨ Funzionalità

| Area | Cosa si può fare | Chi |
| :--- | :--- | :--- |
| Catalogo | Vedere i libri e le copie disponibili | Tutti |
| Registrazione | Creare un account (sempre `ROLE_USER`) | Tutti |
| Login | Accedere con username e password | Tutti |
| Prestiti | Prendere in prestito un libro dal catalogo | Utente autenticato |
| Prestiti | Vedere i propri prestiti e restituirli | Utente autenticato |
| Prestiti | Vedere i prestiti di tutti gli utenti | `ROLE_ADMIN` |
| Gestione libri | Aggiungere, modificare ed eliminare libri | `ROLE_ADMIN` |

---

## 🏗️ Struttura del progetto

```text
src/app/
├── core/                  # Logica trasversale
│   ├── auth.interceptor.ts   # Aggiunge "Authorization: Bearer <token>" a ogni richiesta
│   └── auth.guard.ts         # authGuard (serve il login) e adminGuard (serve ROLE_ADMIN)
├── models/
│   └── api.models.ts         # Tipi TypeScript dei dati dell'API (Book, Borrow, ApiResponse...)
├── services/
│   ├── auth.service.ts       # Login, registrazione, logout, token e ruolo
│   ├── book.service.ts       # Chiamate ai libri
│   └── borrow.service.ts     # Chiamate ai prestiti
├── pages/
│   ├── book-list/            # Catalogo e prestito di un libro
│   ├── login/                # Accesso
│   ├── register/             # Registrazione
│   ├── borrow-list/          # Prestiti e restituzione
│   └── book-admin/           # Gestione libri (solo admin)
├── app.ts / app.html         # Componente radice con la barra di navigazione
├── app.routes.ts             # Rotte dell'applicazione
└── app.config.ts             # Configurazione (router, HttpClient, interceptor)
```

### Rotte

| Percorso | Pagina | Protezione |
| :--- | :--- | :--- |
| `/books` | Catalogo | Pubblica |
| `/login` | Accesso | Pubblica |
| `/register` | Registrazione | Pubblica |
| `/borrows` | Prestiti | `authGuard` |
| `/admin/books` | Gestione libri | `authGuard` + `adminGuard` |

---

## ⚙️ Configurazione ed avvio

### Prerequisiti

* **Node.js** e **npm**
* Una delle due API in esecuzione (vedi sotto)

### Installazione e avvio

Dalla cartella del progetto (quella con `package.json`):

```bash
npm install
ng serve
```

L'applicazione risponde su `http://localhost:4200`.

### Scelta del backend

L'indirizzo dell'API è definito nella costante `API_URL` in tre file: `auth.service.ts`, `book.service.ts` e `borrow.service.ts`.

| Backend | Indirizzo |
| :--- | :--- |
| C# (ASP.NET Core) | `http://localhost:5044/api` |
| Java (Spring Boot) | `http://localhost:8082/api` |

Per passare da uno all'altro basta cambiare quell'indirizzo nei tre file.

### CORS

Il backend deve autorizzare l'origine `http://localhost:4200`. Nella versione C# è già configurato in `Program.cs` (policy `Frontend`, attivata prima dell'autenticazione). Con il backend Java va abilitato lo stesso permesso, comprese le intestazioni `Authorization` e `Content-Type` e i metodi `GET`, `POST`, `PUT`, `DELETE`.

---

## 🔐 Autenticazione

1. `POST /api/auth/login` restituisce il token JWT nel campo `data` della risposta.
2. Il token viene salvato in `localStorage` e tenuto in un signal di `AuthService`.
3. L'interceptor lo aggiunge a ogni richiesta successiva nell'intestazione `Authorization`.
4. Il ruolo viene letto dal claim `role` del token, solo per mostrare o nascondere le voci di menu e proteggere le rotte. **La sicurezza vera è nel backend**, che rifiuta con `403` le richieste non autorizzate.

Con *Esci* il token viene rimosso.

---

## 👤 Utenti di prova

Se hai caricato i dati di test del backend:

| Username | Password | Ruolo |
| :--- | :--- | :--- |
| `admin` | `Admin123!` | `ROLE_ADMIN` |
| `mario` | `Mario123!` | `ROLE_USER` |

Sono credenziali per l'ambiente locale: non usarle in produzione.

---

## 🛠️ Comandi utili

| Comando | Descrizione |
| :--- | :--- |
| `ng serve` | Avvia il server di sviluppo con ricarica automatica |
| `ng build` | Compila il progetto nella cartella `dist/` |
| `ng test` | Esegue i test unitari con Vitest |
| `ng generate component pages/nome` | Crea un nuovo componente |
