// contentScript.js
document.addEventListener("input", function (event) {
  if (
    (event.target.tagName.toLowerCase() === "input" ||
      event.target.tagName.toLowerCase() === "textarea") &&
    localStorage.getItem("toneBoxEnabled") === "true"
  ) {
    let suggestionBox = document.getElementById("tone-suggestion-box");
    if (!suggestionBox) {
      suggestionBox = document.createElement("div");
      suggestionBox.id = "tone-suggestion-box";
      suggestionBox.style.position = "fixed";
      suggestionBox.style.bottom = "20px";
      suggestionBox.style.right = "20px";
      suggestionBox.style.padding = "10px";
      suggestionBox.style.background = "white";
      suggestionBox.style.border = "1px solid black";
      suggestionBox.style.zIndex = "1000";
      suggestionBox.textContent =
        "Hello, this is a suggestion based on your input!";
      document.body.appendChild(suggestionBox);
    }
    suggestionBox.style.display = "block"; // Show the box

    // Hide the box when clicking elsewhere
    document.addEventListener("click", function hideBox(e) {
      if (e.target !== suggestionBox) {
        suggestionBox.style.display = "none";
        document.removeEventListener("click", hideBox);
      }
    });
  }
});
