let terminal = document.querySelector("#terminal");
let input = document.querySelector(".input");
let inputs = document.querySelector("#inputs");
input.innerText = `user@ubuntu ~ $ `;

let inputStr = "";
let entries = [];

let display = () => {
  inputs.innerHTML = entries.join("<br/><br/>");
  input.innerText = `user@ubuntu ~ $ ${inputStr}`;
};

let commands = ["cd", "ls", "help", "clear"];

let split = (string) => string.split(" ");

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let command = inputStr.trim().toLocaleLowerCase();
    entries.push(`user@ubuntu ~ $ ${inputStr}`);

    if (command === "clear") entries = [];

    switch (split(command)[0]) {
      case "help":
        entries.push("Commandes disponibles: " + commands.join(", "));
        break;

      case "cd":
        entries.push("cd: changement de répertoire (simulation)");
        break;

      case "ls":
        entries.push("ls: exemple de commande perso");
        break;

      case "clear":
        entries = [];
        break;

      default:
        entries.push(`Commande introuvable: ${split(command)[0]}`);
    }

    inputStr = "";
    display();
  } else if (e.key.length === 1) {
    inputStr += e.key;
    display();
  } else if (e.key === "Backspace") {
    inputStr = inputStr.slice(0, -1);
    display();
  }
});

// exemple lire un fichier json

const line = document.querySelector(".line")


