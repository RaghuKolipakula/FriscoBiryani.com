-- ---------------------------------------------------------
-- deals-schema.sql
-- ---------------------------------------------------------
-- Additive schema for the "Daily Deals" WhatsApp ingestion.
-- We use IF NOT EXISTS to ensure zero impact on existing
-- weekend drop tables in frisco-biryani-db.
-- ---------------------------------------------------------

CREATE TABLE IF NOT EXISTS deals (
    id TEXT PRIMARY KEY,
    restaurant_name TEXT NOT NULL,
    deal_description TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL,
    valid_from DATETIME DEFAULT CURRENT_TIMESTAMP,
    valid_until DATETIME NOT NULL,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Optional: index on valid_until for faster querying of active deals
CREATE INDEX IF NOT EXISTS idx_deals_valid_until ON deals(valid_until);
