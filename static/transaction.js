document.addEventListener("DOMContentLoaded", () => {
  const transactionForm = document.getElementById("transaction-form");
  const message = document.getElementById("message");

  if (transactionForm) {
    transactionForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(transactionForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const res = await fetch("/add_transaction", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await res.json();
        message.textContent = result.message || "Transaction added!";
        transactionForm.reset();
      } catch (err) {
        message.textContent = "Failed to add transaction.";
        console.error(err);
      }
    });
  }
});
