document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".button-link");
  
    buttons.forEach((button) => {
      button.addEventListener("mouseover", () => {
        button.classList.add("hovered");
      });
  
      button.addEventListener("mouseout", () => {
        button.classList.remove("hovered");
      });
    });
  
    // Optional: Dynamic greeting based on time
    const greeting = document.createElement("h3");
    greeting.style.textAlign = "center";
    greeting.style.marginTop = "1rem";
  
    const hour = new Date().getHours();
    if (hour < 12) {
      greeting.textContent = "☀️ Good morning!";
    } else if (hour < 18) {
      greeting.textContent = "🌤️ Good afternoon!";
    } else {
      greeting.textContent = "🌙 Good evening!";
    }
  
    document.querySelector(".container").appendChild(greeting);
  });
  