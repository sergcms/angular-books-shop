import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Currency } from '../models/Currency';

@Injectable()
export class CurrencyService {
  currency: Currency[] = [
    {
      name: 'USD',
      isActive: true,
      coefficient: 1
    },
    {
      name: 'EUR',
      isActive: false,
      coefficient: 0.85
    },
    {
      name: 'GBP',
      isActive: false,
      coefficient: 0.75
    }
  ];

  private currencySource = new BehaviorSubject<Currency[]>(this.currency);
  selectedCurrency = this.currencySource.asObservable();

  constructor() { }

  selectCurrency(name: string) {
    this.currency = this.currency.map((currency: Currency) => {
      currency.isActive = currency.name === name;
      return currency;
    });
    this.currencySource.next(this.currency);
  }
}
