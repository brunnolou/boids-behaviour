// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM
import P5, { Vector } from "p5";

export class Boid {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
  maxForce: number;
  maxSpeed: number;
  p5: P5;

  constructor(p5: P5) {
    this.p5 = p5;
    this.position = p5.createVector(p5.random(p5.width), p5.random(p5.height));
    this.velocity = Vector.random2D();
    this.velocity.setMag(p5.random(1, 3));
    this.acceleration = p5.createVector();
    this.maxForce = 0.2;
    this.maxSpeed = 5;

    console.log(this.velocity);
  }

  edges() {
    if (this.position.x > this.p5.width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = this.p5.width;
    }
    if (this.position.y > this.p5.height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = this.p5.height;
    }
  }

  align(boids: Boid[]) {
    let perceptionRadius = 25;
    let steering = this.p5.createVector();
    let total = 0;
    for (let other of boids) {
      let d = this.p5.dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other !== this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  separation(boids: Boid[]) {
    let perceptionRadius = 24;
    let steering = this.p5.createVector();
    let total = 0;
    for (let other of boids) {
      let d = this.p5.dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other !== this && d < perceptionRadius) {
        let diff = Vector.sub(this.position, other.position);
        diff.div(d * d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  cohesion(boids: Boid[]) {
    let perceptionRadius = 50;
    let steering = this.p5.createVector();
    let total = 0;
    for (let other of boids) {
      let d = this.p5.dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other !== this && d < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  flock(
    boids: Boid[],
    alignmentV: number,
    cohesionV: number,
    separationV: number
  ) {
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);

    // alignment.mult(alignment);
    // cohesion.mult(cohesion);
    // separation.mult(separation);

    this.acceleration.add(alignmentV);
    // this.acceleration.add(cohesionV);
    // this.acceleration.add(separationV);
  }

  update() {
    // this.position.add(this.velocity);
    this.position.add(Number(this.velocity.x), Number(this.velocity.y));
    // this.position.add(this.p5.createVector(0.3, 0.3, 0));

    // this.velocity.add(Number(this.acceleration.x), Number(this.acceleration.y));
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  show() {
    this.p5.strokeWeight(6);
    this.p5.stroke(255);
    this.p5.point(this.position.x, this.position.y);
  }
}
