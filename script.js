// For Typing continuously
const githubText = "https://github.com/manoj-kewat";
const githubElement = document.getElementById("github-text");

let index = 0;
let deleting = false;

function typeEffect() {
  if (!deleting) {
    githubElement.textContent = githubText.substring(0, index);
    index++;

    if (index > githubText.length) {
      deleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    githubElement.textContent = githubText.substring(0, index);
    index--;

    if (index === 0) {
      deleting = false;
    }
  }

  setTimeout(typeEffect, deleting ? 40 : 70);
}

typeEffect();




const form = document.getElementById("formSubmission");

const successPopup = document.getElementById("successPopup");
const successBox = document.getElementById("successBox");
const closePopup = document.getElementById("closePopup");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const submitButton = form.querySelector("button");

  // Disable button while sending
  submitButton.disabled = true;
  submitButton.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin text-white text-sm"></i>
        <span class="text-white text-sm">Sending...</span>
    `;

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      // Clear form
      form.reset();

      // Show popup
      successPopup.classList.remove("hidden");
      successPopup.classList.add("flex");

      // Animate popup
      setTimeout(() => {
        successBox.classList.remove("opacity-0", "scale-90");
        successBox.classList.add("opacity-100", "scale-100");
      }, 50);
    } else {
      throw new Error("Submission failed");
    }
  } catch (error) {
    alert("Something went wrong. Please try again.");
  } finally {
    // Restore button
    submitButton.disabled = false;

    submitButton.innerHTML = `
            <i class="fa-solid fa-paper-plane text-white text-sm"></i>
            <span class="text-white text-sm">Send Message</span>
        `;
  }
});

// For Pop-Up
closePopup.addEventListener("click", function () {
  successBox.classList.remove("opacity-100", "scale-100");
  successBox.classList.add("opacity-0", "scale-90");

  setTimeout(() => {
    successPopup.classList.remove("flex");
    successPopup.classList.add("hidden");
  }, 300);
});
