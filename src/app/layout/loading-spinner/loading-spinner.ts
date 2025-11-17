import { Component, inject } from '@angular/core';
import { Loading } from '../../services/loading';

@Component({
  selector: 'app-loading-spinner',
  imports: [],
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.css',
})
export class LoadingSpinner {
  loadingService = inject(Loading)
}
