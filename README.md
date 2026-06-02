# 🇵🇭 Ligtas-Bayan (Ligtas-BayanPH)

> **A decentralized medical ID and triage system for the golden hour.**

Ligtas-Bayan is an offline-first, peer-to-peer disaster preparedness and emergency medical response platform designed to optimize rescue operations and healthcare management when central communication grids fail. Built for the Golden Hour—the critical period immediately following trauma where rapid intervention saves lives—it leverages Zero-Internet infrastructure to bridge communication gaps in dead zones.

---

## 🌟 Core Features

### 🛡️ Zero-Internet Infrastructure
Designed to survive and function in absolute communications grid failure.
*   **Offline-First NFC Access:** Stores vital health data locally on smartphones or wearable NFC stickers, enabling instant retrieval by responders even in complete network dead zones.
*   **Peer-to-Peer (P2P) Mesh Sync:** Synchronizes data dynamically between devices on the field. As soon as any single node regains connectivity, records are synced up to the central system.

### 🩺 Vitals-Driven AI Triage
Streamlining patient assessment during high-stress rescue operations.
*   **Automated Urgency Classification:** Uses integrated decision-tree triage logic to automatically categorize patient priority based on input vitals.
*   **Reduced Bias:** Eliminates human cognitive overload and triage bias under chaotic field conditions.
*   **Classification Levels:** Automatically sorts patients into **Critical** (Red), **Urgent** (Orange), and **Stable** (Green) flows.

### 🏢 Multi-Tier Role Dashboards
Tailored interfaces for different stakeholders in emergency coordination:
1.  **Citizen Portal:** 
    *   Secure personal Medical ID management.
    *   Household member tracking.
    *   Offline emergency file downloads.
2.  **Field Responder Console:**
    *   Active field triage tools.
    *   Local NFC scanning & writing utility.
    *   Offline patient logs and queue sync.
3.  **LGU (Local Government Unit) Admin Command Center:**
    *   Real-time casualty and resource heatmaps.
    *   P2P mesh ingestion and aggregation.
    *   Resource deployment coordinates and alert dispatch.

### 🩹 Everyday Health Companion (MediReach)
Extending the application's utility beyond active disaster responses:
*   **AI Symptom Triage:** Natural language symptom checker that recommends immediate next steps.
*   **Offline First Aid Guides:** Step-by-step emergency instructions and survival protocols.
*   **Medicine Safety:** Interactions checker and pediatric dosage guidelines.
*   **Facility Finder:** Maps operational hospitals, clinics, and pharmacies.
*   **Family Journal:** Tracks long-term family health records and growth milestones.

---

## 🛠️ Technology Stack

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Runtime/Environment:** [React 19](https://react.dev/) & [React DOM 19](https://react.dev/reference/react-dom)
*   **Animations:** [GSAP (GreenSock Animation Platform)](https://gsap.com/) + `ScrollTrigger` for high-fidelity interactive scrolling
*   **3D Graphics:** [Three.js](https://threejs.org/) via [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) and [@react-three/drei](https://github.com/pmndrs/drei)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```text
quamtt/
├── app/                        # Next.js App Router Root
│   ├── dashboard/              # Role Selector and Core Dashboard Router
│   │   ├── citizen/            # Citizen Dashboard routes
│   │   ├── lgu/                # LGU Command Center routes
│   │   ├── responder/          # Field Responder routes
│   │   ├── layout.tsx          # Shared dashboard shell
│   │   └── page.tsx            # Role selection page
│   ├── favicon.ico             # App icon
│   ├── globals.css             # Tailwind v4 globals & custom animation classes
│   ├── layout.tsx              # Root HTML wrapper
│   └── page.tsx                # Interactive GSAP + 3D Landing Page
├── components/                 # Reusable UI & Layout Components
│   ├── dashboard/              # Role-specific dashboard panel subcomponents
│   │   ├── citizen/            # Citizen-specific UI panels (Medical ID, Family)
│   │   ├── lgu/                # LGU-specific dashboard widgets & heatmaps
│   │   └── responder/          # Responder-specific triage forms & patient cards
│   ├── HorizontalScroll.tsx    # GSAP Horizontal Showcase component
│   ├── LoadingScreen.tsx       # Initial 3D/GSAP assets preloader
│   ├── LoginModal.tsx          # Interactive login container
│   ├── Navbar.tsx              # Application header
│   ├── ScrollCanvas.tsx        # Dynamic 3D WebGL Canvas
│   └── StickySteps.tsx         # Scroll-locked progress timeline
├── lib/                        # Common utilities
│   └── utils.ts                # Tailwind Class merger (clsx + tailwind-merge)
├── public/                     # Static assets (3D Models, textures, logos)
├── next.config.ts              # Next.js optimization configuration
├── tailwind.config.js          # Tailwind styling rules (if applicable)
└── tsconfig.json               # TypeScript configuration rules
```

---

## ⚙️ Configuration & Performance Notes

### 1. GSAP ScrollTrigger Pinning & Strict Mode
*   **reactStrictMode:** Configured to `false` in `next.config.ts`.
*   *Why?* React 18+ double-invokes effects in development. For library actions that physically modify and append wrapper elements to the DOM (like `gsap.ScrollTrigger` pinning), double execution results in empty/mismatched spacer wrappers and causes React to throw `removeChild: NotFoundError` when unmounting.

### 2. 3D WebGL SSR Deferral
*   The Three.js Canvas component (`ScrollCanvas.tsx`) directly interacts with the browser-only DOM WebGL context.
*   It must be loaded dynamically inside Next.js pages with SSR disabled:
    ```typescript
    const ScrollCanvas = dynamic(() => import("@/components/ScrollCanvas"), { ssr: false });
    ```

---

## 🚀 Getting Started

### Prerequisites
*   Node.js 18.x or later
*   npm or yarn

### Installation
Clone the repository and install dependencies:
```bash
npm install
```

### Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Build and Launch in Production Mode
```bash
npm run build
npm run start
```

### Code Formatting and Linting
```bash
npm run lint
```

---

## 🤝 Contribution Guidelines
This project is built under the principles of **UN SDG 3: Good Health and Well-being**.
1.  **Maintain Documentation Integrity:** Keep inline code comments and configuration notes up-to-date.
2.  **Optimize for Mobile Performance:** High-fidelity animations should gracefully degrade on slower mobile hardware.
3.  **Strict Linting Rules:** Ensure all TSX files pass ESLint rules before submitting PRs.

---

*Disclaimer: Ligtas-Bayan is a triage and disaster management system. It does not replace professional medical diagnosis or clinical treatment.*
