# Aditi Dosi — Full Stack Developer Portfolio

A modern, high-performance portfolio website built with **Next.js 15**, **React 19**, and **Tailwind CSS**. Features a dedicated **Learning Space** for technical resources and smooth animations powered by **Framer Motion**.

## 🚀 Quick Start

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18.17 or later) installed.

### 2. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory based on the provided example:
```bash
cp .env.example .env
```
Add your API keys (Gemini, Claude, etc.) to the `.env` file. **Note:** `.env` is ignored by Git to keep your keys secure.

### 4. Run Development Server
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### 5. Build for Production
To create an optimized production build:
```bash
npm run build
npm run start
```

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## 📚 Features
- **Modern Hero**: Dynamic entrance animations and interactive blobs.
- **Experience & Skills**: Categorized technical expertise and professional history.
- **Learning Space**: A dedicated section (`/learning`) for cheatsheets (PDFs) and video courses.
- **Security**: Pre-configured environment variables and strict `.gitignore` for public repos.

## 📂 Project Structure
- `src/app/`: Application routes and layouts.
- `src/components/`: Reusable React components.
- `src/data/`: JSON data for the Learning Space.
- `public/assets/`: Original images, icons, and PDF resources.
- `backup/`: Contains the original static site for reference.

---
Built with ❤️ by Aditi Dosi.
