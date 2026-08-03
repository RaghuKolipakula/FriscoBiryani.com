-- ---------------------------------------------------------
-- aggregator-schema.sql
-- ---------------------------------------------------------
-- Additive schema for the automated Gemini Aggregator.
-- We use IF NOT EXISTS to ensure zero impact on existing tables.
-- ---------------------------------------------------------

CREATE TABLE IF NOT EXISTS ingested_deals (
    id TEXT PRIMARY KEY,
    restaurant_name TEXT NOT NULL,
    deal_description TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL,
    source TEXT NOT NULL,
    raw_text TEXT,
    valid_until DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ab_ui_analytics (
    id TEXT PRIMARY KEY,
    variant_name TEXT NOT NULL,
    event_type TEXT NOT NULL, -- 'pageview' or 'click'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ingested_deals_valid_until ON ingested_deals(valid_until);
CREATE INDEX IF NOT EXISTS idx_ab_ui_analytics_variant ON ab_ui_analytics(variant_name);
