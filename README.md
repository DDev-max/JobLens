# 🔍 JobLens

This platform helps people find jobs and makes it easier to choose which skills they should learn by creating charts and allowing users to filter job offers.

To build it, I had to do a deep dive into how [Glassdoor](https://www.glassdoor.com/)
 works. I analyzed the page’s fetch requests and figured out what each URL parameter meant. With that, I managed to get the data I needed. After that, I used web scraping to collect all the information and integrate it into my website.

 Keep in mind that the search process can take around 25 seconds. This is because the platform uses multiple APIs behind the scenes, including one that bypasses site security mechanisms and another that hides the frontend request to protect sensitive data. These extra layers add some delay but are essential to ensure both access and security.


🔗[View Live Site](github.com)

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

1️⃣ Clone this repository:

```bash
git clone https://github.com/DDev-max/JobLens.git
```

2️⃣ Navigate into the project directory:

```bash
cd JobLens
```

3️⃣ Install dependencies:

```bash
npm install
```

4️⃣ Run the project locally:

```bash
npm run dev
npm run api
```