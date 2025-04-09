-- Connect to the database
\c budget_db;

-- Clean up old tables and types
DROP TABLE IF EXISTS transactions, expenses;
DROP TYPE IF EXISTS transaction_type_enum, payment_method_enum, mode_of_transaction_enum;

-- ENUM types for transactions
CREATE TYPE transaction_type_enum AS ENUM ('Credit', 'Debit');
CREATE TYPE payment_method_enum AS ENUM ('Cash', 'Card', 'Online');
CREATE TYPE mode_of_transaction_enum AS ENUM (
  'UPI', 'Wallet', 'NEFT', 'RTGS', 'IMPS',
  'Google Pay', 'PhonePe', 'Paytm', 'Net Banking'
);

-- Transactions table for clothing shop records
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  clothing_type TEXT NOT NULL,
  quantity INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
  transaction_type transaction_type_enum NOT NULL,
  payment_method payment_method_enum NOT NULL,
  mode_of_transaction mode_of_transaction_enum,
  category TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Expenses table for general budget tracking
CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
  category TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_transactions_timestamp ON transactions(timestamp);
CREATE INDEX idx_transactions_category ON transactions(category);
CREATE INDEX idx_expenses_timestamp ON expenses(timestamp);
CREATE INDEX idx_expenses_category ON expenses(category);
