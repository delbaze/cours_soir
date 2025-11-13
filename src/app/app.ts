import { CommonModule } from '@angular/common';
import { Component, signal, computed, inject, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TaskItem } from './tasks/task-item/task-item';
import { TasksService } from './services/tasks-service';
import { debounce, debounceTime, filter, fromEvent, map, Observable, of } from 'rxjs';
import { Timer } from './demo/timer/timer';
import { UserList } from './users/user-list/user-list';
export interface Tache {
  id: number;
  titre: string;
  terminee: boolean;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, FormsModule, TaskItem, Timer, UserList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly tasksService = inject(TasksService);

  protected readonly title = signal('cours_soir');
  protected readonly nouvelleTache = signal('');

  protected readonly taches = this.tasksService.taches;
  protected readonly nbTotal = this.tasksService.nbTotal;
  protected readonly nbEnCours = this.tasksService.nbEnCours;
  protected readonly nbTerminees = this.tasksService.nbTerminees;
  protected readonly nbSelectionnes = this.tasksService.nbSelectionnes;
  numbers$ = of(1, 2, 3, 4, 5);
  doubled$ = this.numbers$.pipe(map((n) => n * 2));
  evenNumber$ = this.numbers$.pipe(filter((n) => n % 2 === 0));

  ngOnInit(): void {
    console.log('Je suis initialisé');
    // this.taches.set(this.tasksService.getTasks());
    this.numbers$.subscribe((value) => console.log('numbers$', value));
    this.doubled$.subscribe((value) => console.log('doubled$', value));
    this.evenNumber$.subscribe((value) => console.log('evenNumber$', value));

    const searchInput = document.querySelector('#inputTache');
    if (searchInput) {
      const search$ = fromEvent(searchInput, 'input').pipe(
        debounceTime(300),
        map((event) => (event.target as HTMLInputElement).value)
      );
      search$.subscribe((value) => console.log('Rechercher', value));
    }
    // const numbers$ = new Observable<number>((subscriber) => {
    //   subscriber.next(1);
    //   subscriber.next(2);
    //   subscriber.next(3);
    //   subscriber.complete();
    // });

    // numbers$.subscribe({
    //   next: (value) => console.log('Reçu', value),
    //   complete: () => console.log('Terminé!'),
    //   error: (err) => console.log('Erreur', err),
    // });
  }

  ajouterTache() {
    this.tasksService.ajouterTache(this.nouvelleTache());
    this.nouvelleTache.set('');
  }
  toggleTerminee(id: number) {
    this.tasksService.toggleTerminee(id);
  }
  toggleSelection(id: number) {
    this.tasksService.toggleSelection(id);
  }
  supprimerTache(id: number) {
    this.tasksService.supprimerTache(id);
  }
  toutSupprimer() {
    this.tasksService.toutSupprimer();
  }
  supprimerSelectionnees() {
    this.tasksService.supprimerSelectionnees();
  }
}
