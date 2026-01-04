# Satori Hub 🚀

**Live Demo:** [https://satori-hub.vercel.app/](https://satori-hub.vercel.app/)

Satori Hub is a full-stack MERN application I built to help developers and students share and discover high-quality learning resources. Whether it’s a deep-dive technical article, a YouTube guide, or a local PDF, this platform acts as a centralized repository for organized learning.

## **Why I Built This**
As a student, I found it hard to keep track of all the great resources I found on various platforms. I wanted to build something where I could not only save these links but also upload my own notes and files, categorize them by difficulty, and get feedback from other users through a rating system.

## **Tech Stack**
* **Frontend:** React.js, Vite, Tailwind CSS, Lucide React.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB (using Mongoose for schema modeling and aggregation pipelines).
* **Authentication:** JWT-based auth with HttpOnly Cookies.
* **Storage:** Cloudinary API for handling image and file uploads.
* **Deployment:** Vercel (Frontend) and Render (Backend).

## **Key Technical Challenges & Learnings**

### **1. Production Cookie Authentication (The "Cross-Site" Battle)**
This was the biggest hurdle. Locally, cookies worked fine, but in production, browsers rejected them because the frontend and backend were on different domains (Vercel vs. Render).
* **The Fix:** I implemented a strict `SameSite: "none"` and `Secure: true` policy in the backend controllers.
* **Learning:** Gained deep insights into CORS and modern browser privacy policies.

### **2. Solving the "Auth Flash" (Race Conditions)**
Refreshing the page caused a 1-second "jump" to the login page before identifying the user. 
* **The Fix:** Refactored `AuthContext` to initialize with a `loading: true` state, forcing the `ProtectedRoute` to wait for the session check to complete.

### **3. Efficient Data with MongoDB Aggregation**
Instead of multiple API calls, I used aggregation pipelines to calculate average ratings and review counts on the database level, optimizing performance.

## **Features**
* **Resource Management:** Upload files or share links with difficulty levels.
* **Personal Dashboard:** Manage your contributions and view stats.
* **Bookmarks:** Save resources discovered on the Explore page.
* **Review System:** Rate and comment on content.

## **How to Run Locally**
1. Clone the repo.
2. `npm install` in both `frontend` and `backend` folders.
3. Set up `.env` (JWT_USER_KEY, Cloudinary keys, MONGODB_URI).
4. Run `npm run dev`.

## **🛤️ Project Roadmap**
* **Web3 Integration:** Tipping authors using crypto (Solidity/Ethers.js).
* **Advanced Search:** Fuzzy search and granular filtering.
* **Social Features:** Following contributors and notifications.

## **📫 Contact**
I am a 3rd-year student actively seeking internship opportunities.
* **Email:** [mtaahaashraf@gmail.com]