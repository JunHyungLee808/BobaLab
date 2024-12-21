export function updateText(id, value) {
    const textElement = document.getElementById(id);
    textElement.textContent = value;
}