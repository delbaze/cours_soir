import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-details',
  imports: [],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css',
})
export class UserDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  // userId: string = '';

  // methode 3 : signal
  userId = toSignal(this.route.paramMap.pipe(map((params) => params.get('id') || '')), {
    initialValue: '',
  });

  queryParams = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => ({
        info: params.get('info') || '',
        info2: params.get('info2') || '',
      }))
    ),
    { initialValue: { info: '', info2: '' } }
  );
  ngOnInit(): void {
    // Methode 1 : non réactif
    // this.userId = this.route.snapshot.paramMap.get('id') || '';
    // Methode 2 : reactif
    //Observable (reactive, se met à jour si le paramètre change)
    //   this.route.paramMap.subscribe((params) => {
    //     this.userId = params.get('id') || '';
    //   });
    //Methode 1 query params :
    // const info = this.route.snapshot.queryParamMap.get('info');
    // const info2 = this.route.snapshot.queryParamMap.get('info2');
    // console.log('info', info);
    // console.log('info2', info2);
    // Methode 2 query params :
    // this.route.queryParamMap.subscribe(params => {
    //   const info = params.get('info');
    //   const info2 = params.get('info2');
    //   console.log("info", info)
    //   console.log("info2", info2)
    // })
  }

  goHome() {
    this.router.navigate(['/'], {queryParams: {info: "titi"}});
  }
  goBack() {
    window.history.back();
  }
}
