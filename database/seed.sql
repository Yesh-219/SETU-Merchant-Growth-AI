-- ==============================================================================
-- SETU - Seed Data for Hackathon Prototyping & Demonstration
-- Target: Realistic Indian Kirana / Retail Store ("Lakshmi Provision Store")
-- ==============================================================================

-- 1. Insert Demo Merchant
INSERT INTO merchants (id, name, business_name, business_type, email, phone)
VALUES (
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'Ramesh Sharma',
    'Lakshmi Provision Store',
    'Kirana & General Store',
    'ramesh.lakshmi@example.com',
    '+91 98765 43210'
) ON CONFLICT (id) DO NOTHING;

-- 2. Insert Core Products
INSERT INTO products (id, merchant_id, name, category, selling_price, cost_price, stock_quantity, reorder_level, unit)
VALUES
    ('b1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Aashirvaad Shudh Chakki Atta 10kg', 'Staples', 460.00, 402.00, 6, 10, 'bag'),
    ('b2222222-2222-2222-2222-222222222222', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Tata Salt Vacuum Evaporated 1kg', 'Staples', 28.00, 23.00, 45, 20, 'packet'),
    ('b3333333-3333-3333-3333-333333333333', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Fortune Sunlite Sunflower Oil 1L', 'Edible Oils', 145.00, 131.00, 4, 15, 'pouch'),
    ('b4444444-4444-4444-4444-444444444444', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Amul Pasteurized Butter 500g', 'Dairy', 280.00, 242.00, 18, 12, 'pack'),
    ('b5555555-5555-5555-5555-555555555555', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Tata Sampann Unpolished Toor Dal 1kg', 'Pulses', 185.00, 155.00, 2, 12, 'kg'),
    ('b6666666-6666-6666-6666-666666666666', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'India Gate Basmati Rice Feast 5kg', 'Staples', 495.00, 420.00, 14, 8, 'bag'),
    ('b7777777-7777-7777-7777-777777777777', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Maggi 2-Minute Masala Noodles 4-Pack', 'Snacks', 60.00, 50.00, 32, 15, 'pack'),
    ('b8888888-8888-8888-8888-888888888888', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Surf Excel Easy Wash Detergent Powder 1kg', 'Household', 140.00, 118.00, 22, 10, 'kg'),
    ('b9999999-9999-9999-9999-999999999999', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Dettol Original Bathing Soap (Combo 4)', 'Personal Care', 165.00, 138.00, 15, 10, 'pack')
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Recent Sales Transactions
INSERT INTO transactions (id, merchant_id, transaction_reference, total_amount, payment_method, status, transaction_date)
VALUES
    ('c1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'TXN-PAYTM-20261112-001', 673.00, 'UPI', 'completed', NOW() - INTERVAL '2 hours'),
    ('c2222222-2222-2222-2222-222222222222', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'TXN-CASH-20261112-002', 173.00, 'Cash', 'completed', NOW() - INTERVAL '3 hours'),
    ('c3333333-3333-3333-3333-333333333333', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'TXN-PAYTM-20261112-003', 1040.00, 'UPI', 'completed', NOW() - INTERVAL '4 hours'),
    ('c4444444-4444-4444-4444-444444444444', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'TXN-PAYTM-20261111-004', 460.00, 'UPI', 'completed', NOW() - INTERVAL '1 day'),
    ('c5555555-5555-5555-5555-555555555555', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'TXN-CARD-20261111-005', 855.00, 'Card', 'completed', NOW() - INTERVAL '1 day')
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Transaction Items
INSERT INTO transaction_items (transaction_id, product_id, quantity, unit_price, unit_cost, subtotal)
VALUES
    ('c1111111-1111-1111-1111-111111111111', 'b1111111-1111-1111-1111-111111111111', 1, 460.00, 402.00, 460.00),
    ('c1111111-1111-1111-1111-111111111111', 'b2222222-2222-2222-2222-222222222222', 1, 28.00, 23.00, 28.00),
    ('c1111111-1111-1111-1111-111111111111', 'b5555555-5555-5555-5555-555555555555', 1, 185.00, 155.00, 185.00),

    ('c2222222-2222-2222-2222-222222222222', 'b2222222-2222-2222-2222-222222222222', 1, 28.00, 23.00, 28.00),
    ('c2222222-2222-2222-2222-222222222222', 'b3333333-3333-3333-3333-333333333333', 1, 145.00, 131.00, 145.00),

    ('c3333333-3333-3333-3333-333333333333', 'b6666666-6666-6666-6666-666666666666', 2, 495.00, 420.00, 990.00),
    ('c3333333-3333-3333-3333-333333333333', 'b7777777-7777-7777-7777-777777777777', 1, 60.00, 50.00, 60.00),

    ('c4444444-4444-4444-4444-444444444444', 'b1111111-1111-1111-1111-111111111111', 1, 460.00, 402.00, 460.00),

    ('c5555555-5555-5555-5555-555555555555', 'b4444444-4444-4444-4444-444444444444', 2, 280.00, 242.00, 560.00),
    ('c5555555-5555-5555-5555-555555555555', 'b3333333-3333-3333-3333-333333333333', 2, 145.00, 131.00, 290.00);

-- 5. Insert Operating Expenses
INSERT INTO expenses (id, merchant_id, category, description, amount, expense_date, due_date)
VALUES
    ('d1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Utilities', 'TSSPDCL Commercial Electricity Bill', 4800.00, CURRENT_DATE - 5, CURRENT_DATE + 6),
    ('d2222222-2222-2222-2222-222222222222', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Supplier', 'Metro Cash & Carry Weekly Wholesale Invoice', 15400.00, CURRENT_DATE - 2, CURRENT_DATE + 8),
    ('d3333333-3333-3333-3333-333333333333', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Rent', 'Shop Monthly Commercial Lease', 12000.00, CURRENT_DATE - 12, CURRENT_DATE + 13),
    ('d4444444-4444-4444-4444-444444444444', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Salary', 'Store Helper Salary (Suresh)', 8500.00, CURRENT_DATE - 11, NULL)
ON CONFLICT (id) DO NOTHING;

-- 6. Insert Active Business Alerts
INSERT INTO business_alerts (id, merchant_id, alert_type, title, message, status)
VALUES
    ('e1111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'low_stock', 'Critical Stock Alert: Toor Dal', 'Only 2 kg remaining. Fast seller; estimated stockout within 24 hours. Reorder 25 kg.', 'active'),
    ('e2222222-2222-2222-2222-222222222222', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'payment_pending', 'Upcoming Wholesale Payment Due', '₹15,400 invoice due to Metro Cash & Carry on 20th Nov. Sufficient cash balance projected.', 'active'),
    ('e3333333-3333-3333-3333-333333333333', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'sales_spike', 'Cooking Oil Sales Surged 32%', 'Fortune Oil sold 96 pouches this week. Order 30 pouches ahead of the weekend.', 'active')
ON CONFLICT (id) DO NOTHING;

