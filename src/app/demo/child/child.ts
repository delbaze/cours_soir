import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.css',
})
export class Child {
  counter = 0;
  increment() {
    this.counter++;
  }
  reset() {
    this.counter = 0;
  }
  getCounterValue(): number {
    return this.counter;
  }
}
