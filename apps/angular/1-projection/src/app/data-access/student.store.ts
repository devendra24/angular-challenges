import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  private students = signal<Student[]>([]);
  public students$ = toObservable(this.students);

  addAll(students: Student[]) {
    this.students.set(students);
  }

  addOne(student: Student) {
    this.students.set([...this.students(), student]);
  }

  deleteOne(id: number) {
    this.students.set(this.students().filter((s) => s.id !== id));
  }
}
