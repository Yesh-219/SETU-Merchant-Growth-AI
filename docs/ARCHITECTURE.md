# SETU System Architecture

## 1. High-Level Architecture Overview

**SETU** is an AI-powered business copilot and financial intelligence engine tailored for Indian small merchants and Kirana store owners, built for the **Paytm Build for India AI Hackathon – Hyderabad Finale**.

The platform is architected as an **npm workspaces Monorepo**, separating concerns across a high-performance React Single-Page Application (SPA), a modular Node.js/Express REST backend, a Supabase PostgreSQL relational database, and an AI intelligence layer integrated with **Sarvam AI**.

```
+-----------------------------------------------------------------------------------+
|                                 CLIENT (Vite + React + TS)                         |
|  - Dashboard UI           - Sales Analytics         - AI Inventory View           |
|  - Cash Flow & Profit     - Sarvam AI Chatbot       - Axios Reusable Client       |
+-----------------------------------------------------------------------------------+
                                         │  HTTPS / JSON
                                         ▼
+-----------------------------------------------------------------------------------+
|                                 SERVER (Node.js + Express + TS)                    |
|  - Routes (REST)          - Controllers (Thin)      - Services (Domain Logic)     |
|  - Error / 404 Handlers   - Auth & Merchant Context - Structured Response Formatter|
+-----------------------------------------------------------------------------------+
                    │                                            │
                    ▼                                            ▼
+------------------------------------+      +---------------------------------------+
|    DATABASE (Supabase PostgreSQL)  |      |         AI LAYER (Sarvam AI API)      |
|  - merchants       - products      |      |  - Sarvam Chat Completion Model       |
|  - transactions    - tx_items      |      |  - Indian Context / Language Copilot  |
|  - expenses        - alerts        |      |  - Replenishment & Margin Insights    |
|  - RLS Policies & Cascade Foreigns |      +---------------------------------------+
+------------------------------------+
```

---

## 2. Frontend Architecture (`client/`)

The client is built using **React 18**, **Vite**, **TypeScript**, and styled with **Tailwind CSS**.

### Key Architectural Tenets:
1. **Container / Shell Layout**: The application layout (`MainLayout`) unifies the collapsible responsive `Sidebar`, top `Navbar`, and content viewport with `<Outlet />` routing.
2. **State & Context Management**: The `MerchantContext` encapsulates the currently active merchant profile (`Lakshmi Provision Store`), active date filter ranges, and global state.
3. **Strict Separation of Concerns**:
   - `pages/`: Page containers coordinating data loading, loading skeletons, and error handling.
   - `components/common/`: Reusable, atomic UI elements (`Button`, `Card`, `Badge`, `LoadingSpinner`, `ErrorAlert`, `EmptyState`, `PageHeader`).
   - `components/{module}/`: Domain-specific widgets (e.g. `SalesChart`, `InventoryTable`, `StockAlertBadge`, `CashFlowCard`).
   - `services/`: Axios HTTP calls; backend URL is dynamically injected via `VITE_API_URL`.
   - `utils/mockData.ts`: Kept strictly separated from production services to facilitate isolated UI testing without corrupting API contracts.
   - `types/`: Strict TypeScript interfaces for all DTOs and API envelopes.

---

## 3. Backend Architecture (`server/`)

The backend is organized according to **Clean Layered Architecture Principles**:

```
Request 
   │
   ▼
[app.ts] ──> CORS & Body Parsing Middleware
   │
   ▼
[routes/] ──> URL path matching & parameter extraction
   │
   ▼
[controllers/] ──> Thin validation, status mapping, invokes service
   │
   ▼
[services/] ──> Domain algorithms, DB queries, AI prompt synthesis
   │
   ▼
[utils/apiResponse.ts] ──> Consistent JSON response envelope
   │
   ▼
Client Response
```

### Layer Responsibilities:
- **`config/`**: Reads and validates environment variables (`PORT`, `CLIENT_URL`, `SUPABASE_URL`, `SARVAM_API_KEY`). Emits actionable console diagnostics if optional keys are missing.
- **`routes/`**: Grouped by business domain (`/health`, `/dashboard`, `/sales`, `/inventory`, `/finance`, `/alerts`, `/ai`).
- **`controllers/`**: Thin request controllers. They validate parameters, call services, and return responses using `sendSuccess()` or `sendError()`.
- **`services/`**: Encapsulates all business logic, aggregations, database queries, and external AI calls.
- **`middleware/`**: Centralized error interceptor (`errorHandler`) and unknown endpoint interceptor (`notFoundHandler`).
- **`utils/apiResponse.ts`**: Guarantees that every single endpoint returns the identical format:
  ```json
  {
    "success": true,
    "message": "Request successful",
    "data": {}
  }
  ```

---

## 4. Database Architecture (`database/`)

Hosted on **Supabase PostgreSQL**, the schema models a multi-tenant merchant retail environment with high transactional throughput:

- **Entity Relationships**:
  - `merchants` (1) ──< `products` (N)
  - `merchants` (1) ──< `transactions` (N) ──< `transaction_items` (N)
  - `merchants` (1) ──< `expenses` (N)
  - `merchants` (1) ──< `business_alerts` (N)
- **Data Integrity**:
  - UUIDv4 primary keys throughout.
  - Foreign keys enforce `ON DELETE CASCADE` for merchant removal and `ON DELETE RESTRICT` for product deletions with existing transaction records.
  - `NUMERIC(12, 2)` precision on all monetary values to prevent IEEE 754 floating-point rounding errors.
  - Check constraints ensure `selling_price >= cost_price >= 0` and `stock_quantity >= 0`.
- **Row Level Security (RLS)**:
  - Enabled on all tables.
  - Ready for Supabase Auth JWT claims verification (`auth.uid() = merchant_id`).

---

## 5. AI Integration Architecture (Sarvam AI)

The AI layer is structured to leverage **Sarvam AI's** multilingual intelligence capabilities:
1. **Server-Side Exclusivity**: The frontend never communicates with Sarvam directly. All prompts pass through `POST /api/ai/chat`.
2. **Context Enrichment**: The backend gathers recent transactions, top stockout risks, and pending payables, injecting this structured merchant context into the system prompt.
3. **Structured Response Synthesis**: The advisor responds not only with conversational advice, but also generates `suggestedActions` (one-click action pills) and category tags (`sales`, `inventory`, `finance`).

---

## 6. End-to-End Data Flow

```sequence
User Browser -> Frontend (React): Clicks "AI Advisor" or loads Dashboard
Frontend (React) -> Backend (Express): GET /api/dashboard (via Axios)
Backend (Express) -> Controller: dashboard.controller.ts
Controller -> Service: dashboard.service.ts
Service -> Database (Supabase): Query transactions, products, alerts
Database -> Service: Aggregated metrics
Service -> Controller: Domain DTO
Controller -> Backend: sendSuccess(res, message, data)
Backend -> Frontend: HTTP 200 { success: true, message: "...", data: {...} }
Frontend -> User Browser: Renders dashboard cards, charts, and recommendations
```

