# SETU Database Foundation (Supabase PostgreSQL)

This directory contains the database schema, seed data, and migration files for **SETU – AI-Powered Business Growth & Financial Intelligence Copilot for Merchants**.

---

## 🗄️ Database Architecture Overview

SETU utilizes a relational PostgreSQL database hosted on **Supabase**. The schema is engineered around **merchant-level isolation**, transactional integrity, and analytical query performance.

### Core Tables

| Table | Description | Primary Key | Foreign Keys |
| :--- | :--- | :--- | :--- |
| `merchants` | Small business profiles, store names, contact info | `id (UUID)` | None |
| `products` | Inventory catalog, prices, costs, reorder levels | `id (UUID)` | `merchant_id -> merchants(id)` |
| `transactions` | Sales payments, totals, payment modes (UPI, Cash) | `id (UUID)` | `merchant_id -> merchants(id)` |
| `transaction_items` | Line items for every sale (quantity, cost, price) | `id (UUID)` | `transaction_id`, `product_id` |
| `expenses` | Operating expenses (rent, electricity, wholesale bills) | `id (UUID)` | `merchant_id -> merchants(id)` |
| `business_alerts` | Automated AI alerts (stock, cash flow, reminders) | `id (UUID)` | `merchant_id -> merchants(id)` |

---

## 🚀 Setup Instructions

### Option 1: Supabase Web Dashboard (Recommended for Hackathon)

1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Create a new project named `setu-merchant-growth`.
3. Open the **SQL Editor** from the left navigation panel.
4. Paste the entire contents of [`schema.sql`](./schema.sql) and click **Run**.
5. Once executed, paste the contents of [`seed.sql`](./seed.sql) and click **Run** to populate the demo store (*Lakshmi Provision Store*).
6. Navigate to **Project Settings -> API** to retrieve:
   - **Project URL** -> `SUPABASE_URL` in `server/.env`
   - **service_role (secret)** -> `SUPABASE_SERVICE_ROLE_KEY` in `server/.env`

### Option 2: Supabase CLI (Local / CI)

```bash
# Login to Supabase CLI
npx supabase login

# Link your local project
npx supabase link --project-ref <your-project-id>

# Apply migrations
npx supabase db push
```

---

## 🔒 Security & Merchant Data Isolation

### 1. Row Level Security (RLS)

All tables have **Row Level Security enabled** (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY`).

> [!IMPORTANT]
> Merely having a `merchant_id` column does **NOT** automatically guarantee multi-tenant security! In the initial prototype phase, the backend uses the Supabase `service_role` key to orchestrate data aggregation. Before production deployment:
> 1. Authenticate merchants via Supabase Auth (JWT).
> 2. Attach RLS policies mapping `auth.uid() = merchant_id`.
> 3. Enforce API middleware verifying that the authenticated user matches the requested `merchantId`.

Example production policy:
```sql
CREATE POLICY "Merchants can only view their own products"
ON products FOR SELECT
USING (auth.uid() = merchant_id);
```

### 2. Service Role vs. Anon Keys

* `SUPABASE_SERVICE_ROLE_KEY`: **STRICTLY BACKEND ONLY**. Bypasses RLS for administrative aggregation. Never expose this key to `client/` or commit to GitHub.
* `SUPABASE_ANON_KEY`: Safe for client-side use with strict RLS policies enabled.

---

## 📊 Sample Demo Merchant Credentials

The seed file creates a default test store:
* **Business Name:** Lakshmi Provision Store
* **Owner:** Ramesh Sharma
* **Merchant ID:** `a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d`
* **Email:** `ramesh.lakshmi@example.com`
* **Phone:** `+91 98765 43210`
* **Sample Data:** 9 products, 5 transactions with line items, 4 expenses, 3 active alerts.

