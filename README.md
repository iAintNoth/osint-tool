# 🕵️‍♂️ OSINT Portal

**ITA 🇮🇹**
**OSINT Portal** è una web app pensata per Ethical Hacker, Cybersecurity Analyst e Penetration Tester, progettata per centralizzare la raccolta di informazioni pubbliche (OSINT) su **username** e **domini**.

> 🚧 **Attenzione:** il backend è ancora in fase di sviluppo. Attualmente i risultati delle ricerche sono simulati a scopo dimostrativo (mock data).

**ENG 🇬🇧**
**OSINT Portal** is a web app designed for Ethical Hackers, Cybersecurity Analysts, and Penetration Testers. It centralizes public information gathering (OSINT) for **usernames** and **domains**.

> 🚧 **Warning:** The backend is still under development. Currently, search results are simulated for demonstration purposes (mock data).

---

## 🎯 Obiettivo / Purpose

**ITA:** Fornire uno strumento semplice, estensibile e moderno per effettuare rapidamente ricerche OSINT da interfaccia web.
**ENG:** Provide a simple, extensible, and modern tool to perform fast OSINT lookups from a web interface.

---

## ✅ Funzionalità MVP / MVP Features

### 🔑 Ricerca Username / Username Lookup

* **ITA:** Presenza su piattaforme (GitHub, Twitter, Reddit...)
* **ENG:** Presence on platforms (GitHub, Twitter, Reddit...)
* Info profilo (bio, immagine, follower)
* Link diretti ai profili trovati / Direct links to found profiles

### 🌐 Ricerca Dominio / Domain Lookup

* Info WHOIS (registrazione, scadenza...)
* Record DNS (A, MX, TXT, NS)
* Dati da [Shodan](https://www.shodan.io/) (porte, banner, servizi esposti)

### 🧾 Interfaccia Web / Web Interface

* Responsive, moderna (Tailwind CSS)
* Risultati in schede leggibili / Clear, card-based results
* Esportazione in **JSON** o **CSV**

### 🧠 Architettura modulare / Modular Architecture

* Ogni fonte OSINT è un modulo indipendente / Each OSINT source is a separate module
* Estendibile facilmente / Easily extendable

---

## 🛠️ Tecnologie Utilizzate / Technologies Used

| Componente / Component | Tecnologia / Technology                     |
| ---------------------- | ------------------------------------------- |
| Backend                | Python + FastAPI *(in sviluppo / WIP)*      |
| Frontend               | Tailwind CSS + Vanilla JS                   |
| OSINT API              | httpx, dnspython, python-whois, Shodan      |
| Database (opz.)        | SQLite *(per cronologia locale / optional)* |
| Hosting                | Vercel (frontend) + ---                     |

---

## 📂 Struttura del Progetto / Project Structure

```
osint-portal/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── domain.py
│   │   │   ├── email.py
│   │   │   ├── ip.py
│   │   │   ├── username.py
│   │   ├── services/
│   │   │   ├── dns.py
│   │   │   ├── github.py
│   │   │   ├── hibp.py
│   │   │   ├── ipinfo.py
│   │   │   ├── shodan.py
│   │   │   ├── whois.py
│   │   ├── utils/
│   │   │   ├── helpers.py
│   │   ├── main.py
│   └── requirements.txt
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/
│   │   │       └── Layout.tsx
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── index.html
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── components.json
│   ├── eslint.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts

```

---

## 🧪 Flusso Utente / User Flow

1. Vai alla home / Go to homepage
2. Seleziona tipo ricerca / Choose search type
3. Inserisci username o dominio / Enter username or domain
4. Il backend interroga i moduli (in futuro) / Backend will call modules (future)
5. Visualizza i dati raccolti / View retrieved data
6. Esporta in JSON/CSV

> 🔄 **ITA:** Attualmente i dati sono simulati.
> 🔄 **ENG:** Data is currently mocked.

---

## 🚀 Come Installare Localmente / Local Setup

```bash
git clone https://github.com/iAintNoth/osint-portal.git
cd osint-portal

python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## 🔐 Configurazione API Key / API Key Setup (future)

Crea un file `.env` con le chiavi necessarie:

```
SHODAN_API_KEY=tuachiavequi / yourkeyhere
```

---


## 🧩 Roadmap

* 🔍 Ricerca email (HIBP, leak DB) / Email search
* 🌍 Analisi IP (geolocalizzazione, reverse DNS) / IP analysis
* 🧑‍💻 Login e cronologia utente / User login & history
* 💻 Interfaccia CLI / CLI interface
* 📊 Social Graph interattivo / Relationship Graph (nodes & links)

---

## 📄 Licenza / License

Distribuito sotto licenza MIT.
Distributed under the MIT License. See [LICENSE](./LICENSE) for details.

---

## 🤝 Contribuire / Contributing

Pull request e suggerimenti sono benvenuti!
Pull requests and suggestions are welcome!

Apri una issue per proporre funzionalità o segnalare problemi.
Open an issue for bugs or feature requests.
