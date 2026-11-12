# SETU – AI-Powered Business Growth & Financial Intelligence Copilot for Merchants

> Built for the **Paytm Build for India AI Hackathon – Hyderabad Finale**  
> **Track:** Merchant Growth AI  
> **Team:** Yeswanth Kumar Kaluva & Akash Sharabu  

---

## 📌 1. Project Overview

**SETU** (सेतु - *The Bridge*) is an AI-powered conversational financial copilot designed to empower Indian micro-merchants and Kirana store owners. By transforming daily sales, inventory levels, and operating expenses into actionable natural-language intelligence, SETU acts as an on-demand business advisor right in the merchant's pocket.

---

## 🛑 2. Problem Statement

Millions of Indian small merchants process digital payments every day through Paytm Soundbox and QR codes. However, they face significant operational and financial challenges:
1. **Blind Margins:** High daily gross collections frequently mask thin net profit margins after accounting for inventory procurement, rent, and electricity.
2. **Stockouts & Dead Capital:** Kirana owners either overstock slow-moving goods (freezing capital) or run out of high-demand items during weekend demand spikes.
3. **Cash Flow Surprises:** Lack of forward cash visibility leads to sudden liquidity crunches when supplier invoices or commercial rent payments come due.
4. **Complex Software:** Existing ERP and accounting software is overly complicated for busy shopkeepers attending to store customers.

---

## 💡 3. Proposed Solution

SETU provides an intuitive, merchant-friendly copilot that solves these problems across four integrated pillars:

- **Intelligent Sales Analytics:** Automated tracking of daily collections, average order value (AOV), and customer checkout trends.
- **AI Inventory & Demand Forecasting:** Predictive replenishment warnings that alert merchants before critical items run out.
- **Profit & Cash Flow Intelligence:** Real-time P&L calculation, margin visibility, and 7-day rolling cash flow projections.
- **Conversational AI Business Advisor:** A natural-language interface powered by **Sarvam AI** that answers queries in simple conversational language (e.g. *"How were my sales this week?", "Which items should I reorder?"*).

---

## 🛠️ 4. Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite, TypeScript | High-performance Single Page Application |
| **Styling** | Tailwind CSS, Lucide React | Modern, mobile-responsive merchant UI |
| **Data Visualization**| Recharts | Interactive sales and cash flow trend graphs |
| **Networking** | Axios | Reusable HTTP client with error interceptors |
| **Backend** | Node.js, Express.js, TypeScript | Clean REST API with structured envelopes |
| **Database** | Supabase PostgreSQL | Multi-tenant schema, RLS, cascade foreign keys |
| **AI Layer** | Sarvam AI API | Indian language & context-aware business copilot |
| **Monorepo** | npm Workspaces, Concurrently | Single repository development workflow |

---

## 🏛️ 5. Project Architecture & Monorepo Structure

```
SETU-Merchant-Growth-AI/
├── client/                     # Frontend React Application
│   ├── public/                 # Static assets & icons
│   ├── src/
│   │   ├── assets/             # Images & branding assets
│   │   ├── components/         # Modular UI components
│   │   │   ├── common/         # Atomic UI (Button, Card, Badge, Spinner)
│   │   │   ├── dashboard/      # StatCard, RecentTransactions, AlertBanner
│   │   │   ├── sales/          # SalesChart, TopProductsTable
│   │   │   ├── inventory/      # InventoryTable, StockAlertBadge
│   │   │   ├── finance/        # CashFlowCard, ExpenseBreakdown
│   │   │   └── advisor/        # ChatMessage, ChatInput, PromptSuggestions
│   │   ├── pages/              # Domain views
│   │   │   ├── Dashboard/      # Main executive dashboard
│   │   │   ├── Sales/          # Sales performance analytics
│   │   │   ├── Inventory/      # Inventory & restocking
│   │   │   ├── Finance/        # Profit & cash flow analysis
│   │   │   ├── Advisor/        # Sarvam AI chat assistant
│   │   │   └── NotFound/       # 404 handler
│   │   ├── layouts/            # MainLayout, Sidebar, Navbar
│   │   ├── hooks/              # Custom React hooks (useApi)
│   │   ├── services/           # Axios HTTP client & API endpoints
│   │   ├── context/            # MerchantContext & global state
│   │   ├── types/              # TypeScript interface definitions
│   │   ├── utils/              # Formatters (INR, Date) & isolated mockData
│   │   ├── App.tsx             # Route configuration
│   │   ├── main.tsx            # Vite entry point
│   │   └── index.css           # Tailwind base styles
│   ├── .env.example            # Client environment template
│   ├── package.json            # Client dependencies
│   ├── tsconfig.json           # Client TypeScript configuration
│   └── vite.config.ts          # Vite bundler configuration
│
├── server/                     # Backend Node.js / Express REST API
│   ├── src/
│   │   ├── config/             # Environment validation & Supabase init
│   │   ├── routes/             # Express route definitions
│   │   ├── controllers/        # Thin request controllers
│   │   ├── services/           # Core domain logic & AI integration
│   │   ├── middleware/         # Centralized error & 404 handlers
│   │   ├── utils/              # Standard JSON response formatters
│   │   ├── types/              # Server DTOs & database interfaces
│   │   ├── app.ts              # Express application assembly
│   │   └── index.ts            # Server listener & graceful shutdown
│   ├── .env.example            # Server environment template
│   ├── package.json            # Server dependencies
│   └── tsconfig.json           # Server TypeScript configuration
│
├── database/                   # Supabase PostgreSQL Database Foundation
│   ├── schema.sql              # Master table schema, triggers, and RLS
│   ├── seed.sql                # Realistic Kirana store sample data
│   ├── migrations/             # Timestamped migration files
│   └── README.md               # Supabase setup & security guide
│
├── docs/                       # Technical & Architectural Documentation
│   ├── ARCHITECTURE.md         # Detailed system design & component diagrams
│   ├── API.md                  # REST API contract & endpoint specs
│   ├── DATABASE.md             # Data dictionary, tables, and relationships
│   ├── GITHUB-WORKFLOW.md      # Two-person Git branch & PR collaboration guide
│   └── DEMO-FLOW.md            # Live presentation script & pitch outline
│
├── .github/
│   └── pull_request_template.md # Standard PR checklist for code reviews
├── .gitignore                  # Protection against node_modules & .env leaks
├── README.md                   # Project overview & quickstart
└── package.json                # Root workspace configuration
```

---

## ⚡ 6. Installation & Quickstart

### Prerequisites
- **Node.js** v18+ (tested on Node v20 & v26)
- **npm** v9+
- **Git**

### Step 1: Clone the Repository
```bash
git clone https://github.com/Yesh-219/SETU-Merchant-Growth-AI.git
cd SETU-Merchant-Growth-AI
```

### Step 2: Install Workspace Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy the example environment files for both client and server:

```bash
# Server configuration
cp server/.env.example server/.env

# Client configuration
cp client/.env.example client/.env
```

*(Optional)* Fill in your `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `SARVAM_API_KEY` in `server/.env`. If omitted, the server operates cleanly in developer prototyping mode with rich synthetic Kirana store data.

---

## 🚀 7. Development Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts **both** Express backend and React frontend concurrently |
| `npm run dev:server` | Starts the Express backend on `http://localhost:5000` |
| `npm run dev:client` | Starts Vite React frontend on `http://localhost:5173` |
| `npm run build` | Builds both backend (`server/dist`) and frontend (`client/dist`) |
| `npm run build:server` | Compiles backend TypeScript |
| `npm run build:client` | Compiles frontend TypeScript & produces production Vite bundle |
| `npm run test` | Runs unit verification across workspaces |

### Verification Endpoints:
- **Frontend Dashboard:** [http://localhost:5173](http://localhost:5173)
- **Backend API Base:** [http://localhost:5000/api](http://localhost:5000/api)
- **Health Check Endpoint:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 👥 8. Team Collaboration & Ownership

This project is built collaboratively by two developers:

- **Yeswanth Kumar Kaluva** (`server/`, `database/`):
  - Backend REST API routes, controllers, and services
  - Supabase database schema, performance indexes, and migrations
  - Sarvam AI prompt engineering and server integration
  - Data aggregation and financial forecasting algorithms
- **Akash Sharabu** (`client/`):
  - React application shell, responsive navigation, and layout
  - Component library, Tailwind styling, and Indian merchant UX
  - Recharts visualizers for sales curves and P&L breakdowns
  - Conversational AI chat interface and prompt pills
- **Joint Responsibilities** (`docs/`, Root):
  - System architecture and API contract alignment
  - Integration testing and end-to-end verification
  - Hackathon presentation and demo flow

*For complete Git workflow rules and branching instructions, refer to [docs/GITHUB-WORKFLOW.md](./docs/GITHUB-WORKFLOW.md).*

