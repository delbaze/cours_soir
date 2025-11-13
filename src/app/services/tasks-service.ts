import { computed, Injectable, signal } from '@angular/core';
import { Tache } from '../app';

@Injectable({
  providedIn: 'root', // singleton
})
export class TasksService {
  private readonly _taches = signal<Tache[]>([{ id: 1, terminee: false, titre: 'toto' }]);
  private readonly _selection = signal<number[]>([]);

  private _nextId = 1;
  protected readonly tachesSelectionnees = signal<number[]>([]);

  readonly taches = this._taches.asReadonly();
  readonly selection = this._selection.asReadonly();

  readonly nbTotal = computed(() => this._taches().length);
  readonly nbEnCours = computed(() => this._taches().filter((t) => !t.terminee).length);
  readonly nbTerminees = computed(() => this._taches().filter((t) => t.terminee).length);
  readonly nbSelectionnes = computed(() => this._selection().length);

  ajouterTache(titre: string) {
    if (!titre.trim()) return;

    const nouvelleTache: Tache = {
      id: this._nextId++,
      titre: titre.trim(),
      terminee: false,
    };

    // appel API POST body => nouvelleTache
    this._taches.update((liste) => [...liste, nouvelleTache]);
  }

  toggleTerminee(id: number) {
    this._taches.update((liste) =>
      liste.map((t) => (t.id === id ? { ...t, terminee: !t.terminee } : t))
    );
  }

  toggleSelection(id: number) {
    this._selection.update((sel) =>
      sel.includes(id) ? sel.filter((s) => s !== id) : [...sel, id]
    );
  }

  supprimerTache(id: number) {
    this._taches.update((liste) => liste.filter((t) => t.id !== id));
    this._selection.update((sel) => sel.filter((s) => s !== id));
  }

  toutSupprimer() {
    const confirmation = confirm(
      `Voulez vous supprimer toutes les tâches (${this._taches().length})?`
    );
    if (confirmation) {
      this._taches.set([]);
      this._selection.set([]);
      this._nextId = 1;
    }
  }

  supprimerSelectionnees() {
    if (this._selection().length === 0) return;
    this._taches.update((liste) => liste.filter((t) => !this._selection().includes(t.id)));
    this._selection.set([]);
  }
}
