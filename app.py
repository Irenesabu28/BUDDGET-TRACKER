from flask import Flask, render_template, request, redirect, url_for
import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask(__name__)

# Database connection config
DB_CONFIG = {
    'dbname': 'your_database_name',
    'user': 'your_db_user',
    'password': 'root',
    'host': 'localhost',
    'port': '5432'
}

def get_db_connection():
    return psycopg2.connect(**DB_CONFIG, cursor_factory=RealDictCursor)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_transaction', methods=['GET', 'POST'])
def add_transaction():
    if request.method == 'POST':
        data = request.form
        try:
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute("""
                INSERT INTO transactions 
                (item, amount, transaction_type, payment_method, mode_of_transaction, date) 
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (
                data['item'],
                float(data['amount']),
                data['transaction_type'],
                data['payment_method'],
                data['mode_of_transaction'],
                data['date']
            ))
            conn.commit()
            cur.close()
            conn.close()
            return redirect(url_for('index'))
        except Exception as e:
            return f"Error: {e}"
    return render_template('add_transactions.html')

@app.route('/add_expense', methods=['GET', 'POST'])
def add_expense():
    if request.method == 'POST':
        data = request.form
        try:
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute("""
                INSERT INTO expenses (category, amount, date, description)
                VALUES (%s, %s, %s, %s)
            """, (
                data['category'],
                float(data['amount']),
                data['date'],
                data['description']
            ))
            conn.commit()
            cur.close()
            conn.close()
            return redirect(url_for('index'))
        except Exception as e:
            return f"Error: {e}"
    return render_template('add_expense.html')

@app.route('/filter_expenses', methods=['GET', 'POST'])
def filter_expenses():
    filtered_data = []
    if request.method == 'POST':
        start_date = request.form['start_date']
        end_date = request.form['end_date']
        category = request.form.get('category')

        query = "SELECT * FROM expenses WHERE date BETWEEN %s AND %s"
        params = [start_date, end_date]

        if category:
            query += " AND category = %s"
            params.append(category)

        try:
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute(query, tuple(params))
            filtered_data = cur.fetchall()
            cur.close()
            conn.close()
        except Exception as e:
            return f"Error: {e}"

    return render_template('filter_expense.html', expenses=filtered_data)

if __name__ == '__main__':
    app.run(debug=True)
