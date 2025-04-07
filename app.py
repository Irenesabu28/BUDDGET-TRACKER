from flask import Flask, render_template, request, jsonify
import psycopg2
from datetime import datetime

app = Flask(__name__)

DB_CONFIG = {
    'host': 'localhost',
    'user': 'postgres',
    'password': 'root',
    'database': 'budget_db'
}

def get_db_connection():
    return psycopg2.connect(**DB_CONFIG)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/transactions', methods=['GET', 'POST'])
def transactions():
    conn = get_db_connection()
    cur = conn.cursor()

    if request.method == 'POST':
        data = request.json
        cur.execute('''
            INSERT INTO transactions (clothing_type, quantity, amount, transaction_type, 
                payment_method, mode_of_transaction, category, timestamp)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        ''', (
            data['clothing_type'], data['quantity'], data['amount'], data['transaction_type'],
            data['payment_method'], data['mode_of_transaction'] or None, data['category'], datetime.now()
        ))
        conn.commit()

    cur.execute("SELECT * FROM transactions ORDER BY timestamp DESC")
    rows = cur.fetchall()

    cur.execute("SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE transaction_type = 'Credit'")
    income = cur.fetchone()[0]
    cur.execute("SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE transaction_type = 'Debit'")
    expense = cur.fetchone()[0]
    profit = income - expense

    cur.close()
    conn.close()

    return jsonify({
        "transactions": rows,
        "summary": {
            "income": income,
            "expense": expense,
            "profit": profit
        }
    })

if __name__ == '__main__':
    app.run(debug=True)
