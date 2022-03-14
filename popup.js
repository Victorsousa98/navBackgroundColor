// Inicializa o botão com a cor preferida do usuário
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// Quando o botão é clicado, injeta setPageBackgroundColor na página atual
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// O corpo desta função será executado como um script de conteúdo dentro do
// pagina atual
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.querySelector(".header-menu").style.backgroundColor = color;
  });
}
