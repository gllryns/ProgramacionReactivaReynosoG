import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, mergeMap, of, map, filter } from 'rxjs';
import { ReactiveService } from './reactive.service';
import { Observable, Subscription } from 'rxjs';
import { Curso } from './curso';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ProgramacionReactivaReynosoG';
  numbers$ = interval(1000);
  numbersSuscription!: Subscription;
  number!: Number;

  cursos!: Curso[];
  cursos$: Observable<Curso[]>;
  suscripcion: any;
  promesa: any;

  filterMe$: Observable<number> = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
    filter((v) => v % 2 === 0)
  );
  filterMeSubscription!: Subscription;

  constructor(private reactiveService: ReactiveService) {
    this.promesa = reactiveService.obtenerCursosPromise();

    this.suscripcion = reactiveService.obtenerCursosObservable().subscribe({
      next: (cursos: Curso[]) => {
        this.cursos = cursos;
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.cursos$ = reactiveService.obtenerCursosObservable();
  }
  ngOnInit(): void {
    this.numbersSuscription = this.reactiveService
      .getInterval()
      .subscribe((number) => (this.number = number + 5));

    this.filterMeSubscription = this.filterMe$.subscribe(
      (next) => (this.number = next),
      (error) => console.error(error)
    );
  }
  ngOnDestroy(): void {
    this.numbersSuscription.unsubscribe();
    this.suscripcion.unsubscribe();
  }
  agregarCurso() {
    let curso: Curso = {
      nombre: 'TypeScript',
      profesor: 'Yolanka',
    };
    this.reactiveService.agregarCurso(curso);
  }
}
