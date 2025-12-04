const buttons = document.querySelectorAll(".toggle-btn");
const sections = document.querySelectorAll(".content-section");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    buttons.forEach(btn => btn.classList.remove("active"));
    // Add to the clicked one
    button.classList.add("active");

    // Hide all sections
    sections.forEach(section => section.classList.remove("active"));
    // Show the one matching the button's data-target
    const target = document.getElementById(button.dataset.target);
    target.classList.add("active");
  });
});
