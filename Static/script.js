document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("transactionForm");
    const tableBody = document.getElementById("transactionTableBody");
    const incomeEl = document.getElementById("income");
    const expenseEl = document.getElementById("expense");
    const profitEl = document.getElementById("profit");

    const fetchData = async () => {
        const res = await fetch("/api/transactions");
        const data = await res.json();

        // Clear table
        tableBody.innerHTML = "";
        data.transactions.forEach(tx => {
            const row = `<tr>
                <td>${tx[0]}</td><td>${tx[1]}</td><td>${tx[2]}</td>
                <td>₹${tx[3]}</td><td>${tx[4]}</td><td>${tx[5]}</td>
                <td>${tx[6] || "-"}</td><td>${tx[7]}</td><td>${tx[8]}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });

        incomeEl.textContent = data.summary.income;
        expenseEl.textContent = data.summary.expense;
        profitEl.textContent = data.summary.profit;
    };

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        data.quantity = parseInt(data.quantity);
        data.amount = parseFloat(data.amount);

        await fetch("/api/transactions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        form.reset();
        fetchData();
    });

    fetchData();
});
