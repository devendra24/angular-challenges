import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" class="bg-light-green" (added)="onCityAdded()">
      <img
        card-header
        ngSrc="assets/img/city.png"
        width="200"
        height="200"
        alt="" />
      <ng-template card-list-item let-item>
        <app-list-item (deleted)="onCityDeleted(item.id)">
          {{ item.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 0, 255, 0.1);
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
export class CityCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities: Signal<City[] | undefined> = toSignal(
    this.http.fetchCities$.pipe(
      tap((s) => this.store.addAll(s)),
      switchMap(() => this.store.cities$),
    ),
    { initialValue: [] as City[] },
  );

  onCityAdded() {
    this.store.addOne(randomCity());
  }

  onCityDeleted(id: number) {
    this.store.deleteOne(id);
  }
}
