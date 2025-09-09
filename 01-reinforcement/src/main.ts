import "./style.css";
import "./bases/task-useState";
import { getHerosByOwner } from "./bases/task-imp-exp";
import { Owner } from "./data/heros.data";

console.log(getHerosByOwner(Owner.Marvel));

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Hello World</h1>
  </div>
`;
