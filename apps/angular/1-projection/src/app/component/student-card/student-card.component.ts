import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      class="bg-light-green"
      (added)="onStudentAdded()">
      <img
        card-header
        ngSrc="assets/img/student.webp"
        width="200"
        height="200"
        alt="" />
      <ng-template card-list-item let-item>
        <app-list-item (deleted)="onStudentDeleted(item.id)">
          {{ item.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    NgOptimizedImage,
    CardListItemDirective,
    ListItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students: Signal<Student[] | undefined> = toSignal(
    this.http.fetchStudents$.pipe(
      tap((s) => this.store.addAll(s)),
      switchMap(() => this.store.students$),
    ),
    { initialValue: [] as Student[] },
  );

  onStudentAdded() {
    this.store.addOne(randStudent());
  }

  onStudentDeleted(id: number) {
    this.store.deleteOne(id);
  }
}
