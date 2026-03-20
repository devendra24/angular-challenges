import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  private cities = signal<City[]>([]);
  public cities$ = toObservable(this.cities);

  addAll(cities: City[]) {
    this.cities.set(cities);
  }

  addOne(city: City) {
    this.cities.set([...this.cities(), city]);
  }

  deleteOne(id: number) {
    this.cities.set(this.cities().filter((s) => s.id !== id));
  }
}
