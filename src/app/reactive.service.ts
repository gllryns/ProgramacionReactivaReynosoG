import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root',
})
export class ReactiveService {
  numbers$ = interval(1000);
  cursos$: Observable<Curso[]>;
  cursosSubject: BehaviorSubject<Curso[]>;
  cursos: Curso[] = [
    {
      nombre: 'Angular',
      profesor: 'Martin Karadagian',
    },
    {
      nombre: 'ReactJS',
      profesor: 'La momia',
    },
    {
      nombre: 'Kotlin',
      profesor: 'Caballero Rojo',
    },
  ];

  public getInterval() {
    return this.numbers$;
  }

  obtenerCursosPromise(): Promise<Curso[] | any> {
    return new Promise((resolve, reject) => {
      if (this.cursos.length > 0) {
        resolve(this.cursos);
      } else {
        reject({
          codigo: 0,
          mensaje: 'No hay cursos disponibles en este momento',
        });
      }
    });
  }

  obtenerCursosObservable() {
    return this.cursosSubject.asObservable();
  }
  agregarCurso(curso: Curso) {
    this.cursos.push(curso);
    this.cursosSubject.next(this.cursos);
  }

  constructor() {
    this.cursosSubject = new BehaviorSubject<Curso[]>(this.cursos);

    this.cursos$ = new Observable<Curso[]>((suscriptor) => {
      suscriptor.next(this.cursos);

      setTimeout(() => {
        this.cursos.push({
          nombre: 'VueJS',
          profesor: 'Ruben Peucelle',
        });
        suscriptor.next(this.cursos);
      }, 2000);
    });
  }
}
