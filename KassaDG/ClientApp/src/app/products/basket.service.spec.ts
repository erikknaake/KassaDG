import { TestBed } from '@angular/core/testing';

import { BasketService } from './basket.service';

describe('OrderServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasketService = TestBed.get(BasketService);
    expect(service).toBeTruthy();
  });
});
