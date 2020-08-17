import { TestBed } from '@angular/core/testing';

import { ProductsChangedObservableService } from './products-changed-observable.service';

describe('ProductsChangedObservableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductsChangedObservableService = TestBed.get(ProductsChangedObservableService);
    expect(service).toBeTruthy();
  });
});
