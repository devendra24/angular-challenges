import { NgOptimizedImage } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      class="bg-light-red"
      (added_1)="onTeacherAdded()">
      <img
        card-header
        ngSrc="assets/img/teacher.png"
        width="200"
        height="200"
        alt="" />
      <ng-template card-list-item let-item>
        <app-list-item (deleted)="onTeacherDeleted(item.id)">
          {{ item.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    NgOptimizedImage,
    CardListItemDirective,
    ListItemComponent,
  ],
})
export class TeacherCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers: Signal<Teacher[] | undefined> = toSignal(
    this.http.fetchTeachers$.pipe(
      tap((t) => this.store.addAll(t)),
      switchMap(() => this.store.teachers$),
    ),
    { initialValue: [] as Teacher[] },
  );

  onTeacherAdded() {
    this.store.addOne(randTeacher());
  }

  onTeacherDeleted(id: number) {
    this.store.deleteOne(id);
  }
}
