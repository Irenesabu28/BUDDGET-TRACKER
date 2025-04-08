document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const message = document.getElementById("message");
  
    if (expenseForm) {
      expenseForm.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const formData = new FormData(expenseForm);
        const data = Object.fromEntries(formData.entries());
  
        try {
          const res = await fetch("/add_expense", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
  
          const result = await res.json();
          message.textContent = result.message || "Expense added!";
          expenseForm.reset();
        } catch (err) {
          message.textContent = "Failed to add expense.";
          console.error(err);
        }
      });
    }
  });
  