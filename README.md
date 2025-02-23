# Dynamic Blog Page with Next.js, Tailwind CSS,Typescript and Redux

![GitHub](https://img.shields.io/github/license/deveshshrestha20/blog-web)
![GitHub last commit](https://img.shields.io/github/last-commit/deveshshrestha20/blog-web)
![GitHub repo size](https://img.shields.io/github/repo-size/deveshshrestha20/blog-web)

## 🚀 Deployment  

This project has been deployed on **Vercel** and can be accessed here:  

🔗 **[Live Demo](https://blogco.vercel.app/blog)**  

To deploy your own version on Vercel:  

1. **Fork the repository**  
2. **Push your changes to GitHub**  
3. **Connect the repository to Vercel**  
4. **Vercel will automatically build and deploy your project**  

For local development and further customization, follow the installation steps mentioned below.  

**Dynamic Blog Page** is a modern, responsive blogging platform built using **Next.js**, **Tailwind CSS**, and **Redux**. It fetches blog data from a mock API (or static JSON file) and displays it in a clean, user-friendly layout. The project includes features like dynamic routing, search functionality, pagination, and a responsive design.

---
https://blogco.vercel.app/blog

## Features

- **Homepage (Blog List Page)**:
  - Fetch and display a list of blog posts with titles, summaries, and dates.
  - Responsive grid layout using Tailwind CSS.
  - Clickable posts that redirect to the blog detail page.
  - Loading states with Skeleton UI or loaders for better UX.
- **Blog Post Detail Page**:
  - Dynamic routing for each blog post (e.g., `/blog/[slug]`).
  - Display full content of the blog post (title, full text, and date).
  - Styled using Tailwind CSS.
- **Search Functionality**:
  - Case-insensitive search bar to filter blog posts by title.
  - Real-time filtering with debounce for better performance.
  - Display "No posts found" if no matching results are found.
- **Pagination**:
  - Display a limited number of posts per page (e.g., 5 posts per page).
- **Redux Integration**:
  - Manage global state (e.g., search query, pagination) using Redux.
- **Responsive Design**:
  - Fully responsive layout using Tailwind CSS utility classes.

---

## Technologies Used

- **Frontend**: Next.js, React.js, Typescript
- **Styling**: Tailwind CSS
- **State Management**: Redux
- **Routing**: Next.js Dynamic Routing
- **Data Fetching**: `getStaticProps` or `getServerSideProps`
- **Debounce**: Implemented for search functionality
- **Deployment**: Vercel (or any preferred hosting service)

---



## Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- Node.js (v16 or higher)
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/deveshshrestha20/blog-web.git
   cd blog-web

   Install dependencies:

bash
Copy
npm install
Run the development server:

bash
Copy
npm run dev
Access the application:
Open your browser and navigate to http://localhost:3000.

Key Functionality
1. Fetching Blog Data
Blog data is fetched using getStaticProps or getServerSideProps in Next.js.

Mock data is stored in a JSON file or simulated using an API.

2. Dynamic Routing
Each blog post has a dedicated page using Next.js dynamic routing (/blog/[slug]).

3. Search Functionality
The search bar filters blog posts in real-time using Redux for state management.

Debounce is implemented to optimize performance.

4. Pagination
Blog posts are paginated with a limit of 5 posts per page.

5. Responsive Design
Tailwind CSS utility classes are used to ensure the layout is fully responsive.

Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature/YourFeatureName).

Commit your changes (git commit -m 'Add some feature').

Push to the branch (git push origin feature/YourFeatureName).

Open a pull request.

Please ensure your code follows the project's coding standards and includes appropriate tests.
