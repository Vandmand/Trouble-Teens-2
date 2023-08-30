import * as PIXI from "pixi.js";
import { CreatePlayer } from "./player";

export const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
});

CreatePlayer(100,100, app);

document
  .querySelector<HTMLDivElement>("#app")!
  .appendChild(app.view as unknown as HTMLElement);

