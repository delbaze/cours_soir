import { Component, inject, DestroyRef, OnInit, OnDestroy, signal } from '@angular/core';

import { ApiService } from '../../services/api-service';
import { UserFull } from '../../models/user.model';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

// takeUntilDestroyed(ref) => unsubscribe automatique
@Component({
  selector: 'app-user-list-full',
  imports: [],
  templateUrl: './user-list-full.html',
  styleUrl: './user-list-full.css',
})
export class UserListFull implements OnInit {
  private apiService = inject(ApiService);
  private destroyRef = inject(DestroyRef);

  // users = toSignal(this.apiService.getAllUsers(), { initialValue: [] }); // si on avait utiliser toSignal sur users, on aurait eu le subscribe / unsubscribe automatiquement
  users = signal<UserFull[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading.set(true);
    this.error.set(null);

    this.apiService
      .getAllUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))

      .subscribe({
        next: (data) => {
          this.users.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.error.set(err.message);
          this.isLoading.set(false);
        },
      });
  }

  deleteUser(id: number) {
    if (!confirm('Supprimer cet utilisateur ? ')) return;
    this.apiService
      .deleteUser(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.users.update((users) => users.filter((u) => u.id !== id));
          console.log('Utilisateur supprimé');
        },
        error: (err) => {
          alert('Erreur lors de la suppression');
          console.error(err);
        },
      });
  }
}
