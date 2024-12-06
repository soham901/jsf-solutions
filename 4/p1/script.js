function validateForm(event) {
  event.preventDefault();

  // Clear previous errors
  document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));

  const fields = [
    {
      id: "fullName",
      condition: (v) => /^[a-zA-Z\s]{2,50}$/.test(v),
      error: "Enter a valid name (2-50 letters).",
    },
    {
      id: "email",
      condition: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      error: "Enter a valid email.",
    },
    {
      id: "phone",
      condition: (v) => /^\d{10}$/.test(v),
      error: "Enter a valid 10-digit phone number.",
    },
    {
      id: "dob",
      condition: (v) => {
        const age = new Date().getFullYear() - new Date(v).getFullYear();
        return age >= 16 && age <= 100;
      },
      error: "Age must be between 16 and 100.",
    },
    {
      id: "course",
      condition: (v) => v,
      error: "Select a course.",
    },
  ];

  // Validate fields
  let isValid = true;
  fields.forEach(({ id, condition, error }) => {
    const value = document.getElementById(id).value.trim();
    if (!condition(value)) {
      document.getElementById(`${id}Error`).textContent = error;
      isValid = false;
    }
  });

  if (isValid) {
    const form = document.getElementById("registrationForm");
    const formData = new FormData(form);

    console.log("Form Data:");
    formData.forEach((value, key) => console.log(`${key}: ${value}`));

    alert("Registration successful!");
    form.reset();
  }
}
