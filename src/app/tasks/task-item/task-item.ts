import { EventEmitter, Component, Input, Output, input, output} from '@angular/core';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
  // changeDetection: ChangeDetectionStrategy.Default
})
export class TaskItem {
  titre = input.required<string>();
  // @Input({required: true}) titre!: string;
  id = input.required<number>();
  terminee = input.required<boolean>();
 
  // @Input({required: true}) id!: number;
  // @Input() toggleTask!: (id: number, info: string) => void;
  taskToggled = output<number>();
  taskSelected = output<number>();
  taskDel = output<number>();
  // @Output() taskToggled = new EventEmitter<number>();

  toggleTask(){
    this.taskToggled.emit(this.id())
  }
  selectTask(){
    this.taskSelected.emit(this.id());
  }

  deleteTask(){
    this.taskDel.emit(this.id())
  }
}
