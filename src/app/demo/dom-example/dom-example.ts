import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dom-example',
  imports: [],
  templateUrl: './dom-example.html',
  styleUrl: './dom-example.css',
})
export class DomExample implements AfterViewInit {
  @ViewChild('myInput') inputElement!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    this.inputElement.nativeElement.focus();
  }
  focusInput() {
    this.inputElement.nativeElement.focus();
  }
}
