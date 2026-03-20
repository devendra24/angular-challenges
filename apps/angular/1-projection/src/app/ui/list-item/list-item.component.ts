import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      <span><ng-content /></span>
      <button (click)="deleted.emit()">
        <img class="h-5" src="assets/svg/trash.svg" alt="trash" />
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  readonly deleted = output<void>();
}
