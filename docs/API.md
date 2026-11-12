# SETU REST API Specification

Base URL: `http://localhost:5000/api`

All API endpoints follow a unified response structure:

### Standard Success Envelope
```json
{
  "success": true,
  "message": "Human-readable status message",
  "data": {},
  "meta": {
    "timestamp": "2026-11-12T10:45:00.000Z"
  }
}
```

### Standard Error Envelope
```json
{
  "success": false,
  "message": "Validation or execution error message",
  "data": {},
  "error": "Detailed error string",
  "meta": {
    "timestamp": "2026-11-12T10:45:00.000Z"
  }
}
```

---

## 📌 Endpoint Summary

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | System health, service status, uptime | No |
| `GET` | `/dashboard` | Aggregated merchant KPIs & overview | Yes / Optional in Dev |
| `GET` | `/sales/summary` | Today, 7-day, 30-day sales & trend data | Yes / Optional in Dev |
| `GET` | `/sales/products` | Top revenue-generating products | Yes / Optional in Dev |
| `GET` | `/inventory` | Complete product catalog & stock levels | Yes / Optional in Dev |
| `GET` | `/inventory/recommendations` | Predictive reorder & restock recommendations | Yes / Optional in Dev |
| `GET` | `/finance/summary` | P&L overview, margins, cash flow forecast | Yes / Optional in Dev |
| `GET` | `/alerts` | Active business alerts (stock, payments) | Yes / Optional in Dev |
| `POST` | `/ai/chat` | Conversational query to SETU Advisor | Yes / Optional in Dev |

---

## 1. Health Check

### `GET /health`
Returns the status of the server and attached services.

**Query Parameters:** None

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "SETU Merchant Growth AI backend is operational",
  "data": {
    "status": "healthy",
    "uptimeSeconds": 482,
    "timestamp": "2026-11-12T10:45:00.000Z",
    "environment": "development",
    "services": {
      "database": "connected",
      "sarvamAI": "configured"
    }
  }
}
```

---

## 2. Dashboard

### `GET /dashboard`
Returns high-level business metrics for the merchant dashboard.

**Query Parameters:**
- `merchantId` *(optional, string UUID)*: Specific merchant ID.

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Dashboard metrics retrieved successfully",
  "data": {
    "totalRevenue": 284500,
    "totalOrders": 432,
    "lowStockItemsCount": 5,
    "netProfit": 62400,
    "period": "Last 30 Days",
    "recentTransactionsCount": 12,
    "activeAlertsCount": 3
  }
}
```

---

## 3. Sales Analytics

### `GET /sales/summary`
Returns collection aggregates and daily trend points.

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Sales summary retrieved successfully",
  "data": {
    "todaySales": 12450,
    "weeklySales": 78900,
    "monthlySales": 284500,
    "averageOrderValue": 658,
    "salesGrowthPercent": 14.8,
    "trend": [
      { "date": "Mon", "amount": 9200, "orderCount": 15 },
      { "date": "Tue", "amount": 11400, "orderCount": 18 },
      { "date": "Wed", "amount": 10800, "orderCount": 17 },
      { "date": "Thu", "amount": 13200, "orderCount": 22 },
      { "date": "Fri", "amount": 16500, "orderCount": 28 },
      { "date": "Sat", "amount": 18900, "orderCount": 31 },
      { "date": "Sun", "amount": 14700, "orderCount": 24 }
    ]
  }
}
```

### `GET /sales/products`
Returns top selling products ranked by sales revenue.

**Query Parameters:**
- `limit` *(optional, integer, default: 5)*

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Top selling products retrieved successfully",
  "data": [
    {
      "productId": "prod-001",
      "name": "Aashirvaad Atta 10kg",
      "category": "Staples",
      "unitsSold": 84,
      "revenue": 38640,
      "marginPercent": 12.5
    }
  ]
}
```

---

## 4. Inventory & Demand

### `GET /inventory`
Returns the product inventory list with current stock levels.

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Inventory items retrieved successfully",
  "data": [
    {
      "id": "prod-001",
      "name": "Aashirvaad Atta 10kg",
      "category": "Staples",
      "stockQuantity": 6,
      "reorderLevel": 10,
      "unit": "bag",
      "sellingPrice": 460,
      "costPrice": 402,
      "status": "low_stock"
    }
  ]
}
```

### `GET /inventory/recommendations`
Returns AI-driven stock replenishment suggestions.

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Inventory recommendations retrieved successfully",
  "data": [
    {
      "productId": "prod-003",
      "productName": "Fortune Sunflower Oil 1L",
      "currentStock": 4,
      "suggestedReorderQuantity": 30,
      "estimatedCost": 3930,
      "reason": "Fast mover with festival weekend approaching. Expected stockout within 48 hours.",
      "urgency": "high"
    }
  ]
}
```

---

## 5. Profit & Cash Flow

### `GET /finance/summary`
Returns P&L metrics, margin percentages, and 7-day cash flow projection.

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Financial summary retrieved successfully",
  "data": {
    "revenue": 284500,
    "costOfGoodsSold": 204800,
    "grossProfit": 79700,
    "grossMarginPercent": 28.0,
    "operatingExpenses": 17300,
    "netProfit": 62400,
    "netMarginPercent": 21.9,
    "projectedCashFlowNext7Days": 41200,
    "upcomingPayables": [
      { "title": "Shop Electricity Bill", "amount": 4800, "dueDate": "2026-11-18" },
      { "title": "Wholesale Supplier (Metro Cash & Carry)", "amount": 15400, "dueDate": "2026-11-20" }
    ]
  }
}
```

---

## 6. Business Alerts

### `GET /alerts`
Returns active alerts for low stock, supplier due dates, or demand surges.

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Active business alerts retrieved successfully",
  "data": [
    {
      "id": "alt-001",
      "merchant_id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
      "alert_type": "low_stock",
      "title": "Critical Stock Alert: Toor Dal",
      "message": "Only 2 units remaining. Reorder suggested within 24 hours.",
      "status": "active",
      "created_at": "2026-11-12T08:00:00.000Z"
    }
  ]
}
```

---

## 7. AI Business Advisor

### `POST /ai/chat`
Submits a natural-language query to the SETU advisor copilot.

**Request Headers:** `Content-Type: application/json`

**Request Body:**
```json
{
  "message": "How are my sales performing this week?",
  "merchantId": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d"
}
```

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "AI Advisor response generated",
  "data": {
    "reply": "Your store has generated ₹78,900 this week across 125 transactions (up 14.8% vs last week). Your top selling item is Aashirvaad Atta 10kg with ₹38,640 in revenue.",
    "suggestedActions": [
      "View Sales Trend",
      "Analyze Peak Hours",
      "Compare With Last Month"
    ],
    "insights": {
      "category": "sales"
    },
    "provider": "sarvam-ai"
  }
}
```

**Error Response `400 Bad Request`:**
```json
{
  "success": false,
  "message": "Validation failed: \"message\" field is required and cannot be empty.",
  "data": {},
  "error": "Validation failed: \"message\" field is required and cannot be empty."
}
```

