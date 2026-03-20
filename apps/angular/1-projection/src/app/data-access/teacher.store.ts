import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  public teachers = signal<Teacher[]>([]);
  public teachers$ = toObservable(this.teachers);

  addAll(teachers: Teacher[]) {
    this.teachers.set(teachers);
  }

  addOne(teacher: Teacher) {
    this.teachers.set([...this.teachers(), teacher]);
  }

  deleteOne(id: number) {
    this.teachers.set(this.teachers().filter((t) => t.id !== id));
  }
}
