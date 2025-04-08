document.addEventListener("DOMContentLoaded", () => {
    const filterForm = document.getElementById("filter-form");
    const message = document.getElementById("message");
    const tableBody = document.querySelector("#expenses-table tbody");
  
    if (filterForm) {
      filterForm.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const formData = new FormData(filterForm);
        const data = Object.fromEntries(formData.entries());
  
        try {
          const res = await fetch("/filter_expenses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
  
          const result = await res.json();
          tableBody.innerHTML = "";
  
          if (result.expenses.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='5'>No expenses found.</td></tr>";
          } else {
            result.expenses.forEach((exp) => {
              const row = document.createElement("tr");
              row.innerHTML = `
                <td>${exp.id}</td>
                <td>${exp.title}</td>
                <td>${exp.amount}</td>
                <td>${exp.category}</td>
                <td>${exp.timestamp}</td>
              `;
              tableBody.appendChild(row);
            });
          }
        } catch (err) {
          message.textContent = "Failed to filter expenses.";
          console.error(err);
        }
      });
    }
  });
  