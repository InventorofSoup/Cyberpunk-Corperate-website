// Track login attempts
let attempts = 0;
const maxAttempts = 4;

// Grab DOM elements
const userInput = document.getElementById("userInput");
const terminal = document.getElementById("terminal");
const transitionScreen = document.getElementById("transitionScreen");

// Listen for Enter key inside the fake input
userInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault(); // prevent line break

    const input = this.innerText.trim().toUpperCase(); // get input, uppercase
    this.innerText = ""; // clear input display

    if (attempts >= maxAttempts) return;

    if (input === "451-A") {
      // ✅ CORRECT PASSWORD
      const success = document.createElement("div");
      success.className = "line";
      success.innerText =
        "ACCESS GRANTED. Welcome, Operative 451-A. Routing to secure node...";
      terminal.appendChild(success);

      // disable typing
      userInput.contentEditable = "false";

      // trigger transition screen after 2 seconds
      setTimeout(() => {
        transitionScreen.classList.add("active");
      }, 2000);

      // redirect after 5 seconds of transfer
      setTimeout(() => {
        window.location.href = "dashboard.html"; // 🔁 Change this if needed
      }, 7000);
    } else {
      // ❌ WRONG PASSWORD
      attempts++;

      const error = document.createElement("div");
      error.className = "line denied";

      if (attempts >= maxAttempts) {
        error.innerText = "SYSTEM LOCKED. Too many invalid attempts.";
        userInput.contentEditable = "false";
        userInput.classList.add("locked");
      } else {
        error.innerText = `ACCESS DENIED. ${maxAttempts - attempts} attempt(s) remaining.`;

        // Auto-remove denial message after 3 seconds
        setTimeout(() => {
          error.remove();
        }, 3000);
      }

      terminal.appendChild(error);
    }
  }
});
