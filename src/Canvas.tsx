import React, { Component } from "react";
import Sketch from "react-p5";
import { Boid } from "./Boid";
import P5 from "p5";

const flock: Boid[] = [];

let alignSlider: P5.Element,
  cohesionSlider: P5.Element,
  separationSlider: P5.Element;

export class Canvas extends Component {
  setup = (p5: P5, canvasParentRef: HTMLCanvasElement) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(
      canvasParentRef
    );
    p5.frameRate(this.fr);

    alignSlider = p5.createSlider(0, 2, 1.5, 0.1);
    cohesionSlider = p5.createSlider(0, 2, 1, 0.1);
    separationSlider = p5.createSlider(0, 2, 2, 0.1);

    for (let i = 0; i < 20; i++) {
      flock.push(new Boid(p5));
    }

    // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
  };
  draw = (p5: P5) => {
    p5.background(0);

    for (let boid of flock) {
      boid.edges();

      boid.flock(
        flock,
        Number(alignSlider.value()),
        Number(cohesionSlider.value()),
        Number(separationSlider.value())
      );
      boid.update();
      boid.show();
    }
  };

  render() {
    return <Sketch setup={this.setup} draw={this.draw} />;
  }
}
