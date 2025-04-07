-- 1. Connect to the correct database
\c budget_db;

-- 2. Drop the existing table (this will delete all records and structure)
DROP TABLE IF EXISTS transactions;

-- 3. Create the new transactions table
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    clothing_type TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_type TEXT NOT NULL CHECK (
        transaction_type IN ('Credit', 'Debit')
    ),
    payment_method TEXT NOT NULL CHECK (
        payment_method IN ('Cash', 'Card', 'Online')
    ),
    mode_of_transaction TEXT CHECK (
        mode_of_transaction IS NULL OR
        mode_of_transaction IN (
            'UPI', 'Wallet', 'NEFT', 'RTGS', 'IMPS', 
            'Google Pay', 'PhonePe', 'Paytm', 'Net Banking'
        )
    ),
    category TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
