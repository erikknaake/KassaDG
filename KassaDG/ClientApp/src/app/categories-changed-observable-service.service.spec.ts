import { TestBed } from '@angular/core/testing';

import { CategoriesChangedObservableService } from './categories-changed-observable.service';

describe('CategoriesChangedObservableServiceService', () => {
  let service: CategoriesChangedObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesChangedObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
