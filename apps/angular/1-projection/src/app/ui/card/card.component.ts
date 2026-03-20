import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  input,
  output,
  Output,
  TemplateRef,
} from '@angular/core';

@Directive({
  selector: 'ng-template [card-list-item]',
  standalone: true,
})
export class CardListItemDirective {}

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="[card-header]" />

    <section>
      @for (item of list() ?? []; track item) {
        <ng-container
          *ngTemplateOutlet="
            rowTemplate;
            context: { $implicit: item }
          "></ng-container>
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="emitAdded()">
      Add
    </button>
  `,
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
  imports: [CommonModule],
})
export class CardComponent<T> {
  readonly list = input<T[] | undefined>();
  readonly added = output<void>();
  @Output() added_1 = new EventEmitter<void>();

  @ContentChild(CardListItemDirective, { read: TemplateRef })
  rowTemplate!: TemplateRef<any>;

  emitAdded() {
    this.added.emit();
    this.added_1.emit();
  }
}
