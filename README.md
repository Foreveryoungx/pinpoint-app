# PinPoint: Arsenal & Oil Manager 🎳

**PinPoint** is a specialized tracking application designed for serious bowlers to manage their arsenal, track equipment mileage, and maintain peak performance.

![PinPoint Preview](./preview.png)
*(Note: Add a screenshot of the dashboard here if available)*

## 🎯 The Purpose

Bowlers carry sets of expensive equipment that degrade over time. Oil absorption changes the reaction of a bowling ball. PinPoint solves the guesswork of maintenance by tracking the exact "mileage" (games played) on each ball.

### Key Features

*   **Arsenal Management**: Add, edit, and manage your entire bag. Track specific details like Brand, Coverstock, and serial notes.
*   **Maintenance Alerts**:
    *   **Surface Alert (30 Games)**: Reminds you to sand/polish your equipment.
    *   **Detox Alert (60 Games)**: Critical warning to extract oil to restore hook potential.
*   **Game Logging**: Log scores and assign them to specific balls to automatically increment mileage.
*   **Strategy Tracking**: Save your "Line" (Board Stand / Arrow Target) for future reference.
*   **Mobile-First Design**: Optimized for use in the bowling center. Includes camera integration to snap photos of your gear.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **State Management**: React Context + LocalStorage (Privacy-first, no login required)
*   **Analytics**: Google Analytics 4 (GA4)
*   **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

*   Node.js 18+
*   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Foreveryoungx/pinpoint-app.git
    cd pinpoint-app
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📈 Deployment

This project is optimized for deployment on **Vercel**.

1.  Push your code to a git repository.
2.  Import the project into Vercel.
3.  **Environment Variables**:
    *   `NEXT_PUBLIC_GA_ID`: Your Google Analytics Measurement ID (Required for analytics).

## 🔒 Data Privacy

PinPoint uses **LocalStorage** to persist your arsenal and logs.
*   **No Cloud Sync**: Your data lives on your device.
*   **No Login**: Start using it immediately.
*   **Image Compression**: Images are compressed locally before storage to ensure fast performance.

---

built with ❤️ for bowlers.
