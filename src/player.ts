import * as PIXI from "pixi.js";
import { activeKeys } from "./inputhandler";
import Victor from "victor";

import Hull from "./sprites/Tank/Hulls_Color_A/Hull_01.png";
import Weapon from './sprites/Tank/Weapon_Color_A/Gun_01.png'

class Player {
  // Constructor
  speed: number;
  rotationSpeed: number;
  position: Victor;
  orientation: Victor;
  
  // Sprites
  body: PIXI.Sprite;
  weapon: PIXI.Sprite;

  constructor(x: number, y: number, rotation: number) {
    this.speed = 8;
    this.rotationSpeed = 0.05;

    this.position = new Victor(x, y);
    this.orientation = new Victor(
      // Calculate angle from degrees to radians
      Math.sin((rotation * Math.PI) / 180),
      Math.cos((rotation * Math.PI) / 180)
    );

    this.body = this.createbody(Hull);
    this.weapon = this.createbody(Weapon)
  }

  createbody(url: string) {
    const sprite = PIXI.Sprite.from(url);

    sprite.width = 100;
    sprite.height = 100;
    sprite.anchor.set(0.5);

    return sprite;
  }

  updateSprite() {
    this.body.x = this.position.x;
    this.body.y = this.position.y;
    this.body.rotation = this.orientation.direction();
  }

  onUpdate(delta: number) {
    if (activeKeys.d) {
      this.orientation.rotate(delta * this.rotationSpeed);
    }
    if (activeKeys.a) {
      this.orientation.rotate(delta * -this.rotationSpeed);
    }
    if (activeKeys.w) {
      this.position.add(
        this.orientation.clone().multiplyScalar(this.speed * delta)
      );
    }
    if (activeKeys.s) {
      this.position.add(
        this.orientation.clone().multiplyScalar(-this.speed * delta)
      );
    }
    this.updateSprite();
  }
}

export const CreatePlayer = (x: number, y: number, app: PIXI.Application) => {
  const newPlayer = new Player(x, y, 0);
  app.stage.addChild(newPlayer.body);
  app.stage.addChild(newPlayer.weapon);
  app.ticker.add((delta) => {
    newPlayer.onUpdate(delta);
  });

  return newPlayer;
};
