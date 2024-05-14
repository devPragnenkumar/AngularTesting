import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValueServiceService {
  value = 0;
  constructor() {}

  getValue = () => {
    this.value = this.value + 1;

    return this.value;
  };
}
