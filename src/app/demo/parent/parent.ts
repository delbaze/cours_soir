import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Child } from '../child/child';

@Component({
  selector: 'app-parent',
  imports: [Child],
  templateUrl: './parent.html',
  styleUrl: './parent.css',
})
export class Parent implements AfterViewInit {
  @ViewChild(Child) childComponent!: Child;

  ngAfterViewInit(): void {
    // ViewChild est disponible APRÈS l'initilisation de la vue
    console.log(`L'enfant est chargé`, this.childComponent);
  }

  incrementChild() {
    this.childComponent.increment();
  }
  resetChild() {
    this.childComponent.reset();
  }
  showValue() {
    const value = this.childComponent.getCounterValue();
    alert(`valeur ${value}`);
  }
}
