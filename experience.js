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

function goToSpaceShooter() {
  // deactivate tabs
  document.querySelectorAll('.toggle-btn').forEach(btn =>
    btn.classList.remove('active')
  );
  document.querySelectorAll('.content-section').forEach(sec =>
    sec.classList.remove('active')
  );

  // activate projects tab
  document.querySelector('[data-target="projects"]').classList.add('active');
  document.getElementById('projects').classList.add('active');

  // wait for the layout & then scroll
  setTimeout(() => {
    document
      .getElementById('space-shooter')
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 50);
}
