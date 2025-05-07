# 🔍 JobLens

This platform helps people find jobs and makes it easier to choose which skills they should learn by creating charts and allowing users to filter job offers.

To build it, I had to do a deep dive into how [Glassdoor](https://www.glassdoor.com/)
 works. I analyzed the page’s fetch requests and figured out what each URL parameter meant. With that, I managed to get the data I needed. After that, I used web scraping to collect all the information and integrate it into my website.

 Keep in mind that the search process can take around 20 seconds. This is because the platform uses multiple APIs behind the scenes, including one that bypasses site security mechanisms and another that hides the frontend request to protect sensitive data. These extra layers add some delay but are essential to ensure both access and security.


🔗[View Live Site](https://search-xi-rosy.vercel.app/)


## **Folder structure**

This project follows the **Screaming Architecture** pattern

```plaintext
app/
├── global-shared-joblens/   # NPM package to share code between frontend and backend
├── jobs/                    # Backend folder
└── search/                  # Frontend folder
```

## **Tech Stack**

- **Vite** – Fast build tool  
- **TypeScript** – Static typing  
- **Jest & Testing Library** – Unit and integration testing
- **Chart.js** – Data visualization  
- **Express** – Node.js backend  
- **Redux** – State management  
- **Tailwind** – Utility-first CSS  


## Features

✔️  **Multi-language support** – English and Spanish interface  
✔️ **Accessible design** – Follows accessibility best practices (a11y)  
✔️ **RESTful API** – Clean and well-structured backend API  
✔️  **Well-documented code** – In-depth comments explaining key decisions and logic


## **Installation & Setup**

### 1️⃣ Clone this repository:

```bash
git clone https://github.com/DDev-max/JobLens.git
```

### 2️⃣  Set up the Frontend

```bash
cd JobLens/app/search
```

Create a .env file at the root of the search folder with the following content (Replace XXXX with the actual port your backend will run on):

```bash
VITE_API_URL=http://localhost:XXXX
```
Install frontend dependencies:

```bash
npm install
```
Run the project locally:
```bash
npm run dev
```
### 2️⃣  Set up the Backend

```bash
cd ..
cd jobs
```
Build the backend code:
```bash
npm run build
```

Start the backend server with your API key (replace XXXX with your actual API key):

```bash
API_KEY=XXXX npm run start
```