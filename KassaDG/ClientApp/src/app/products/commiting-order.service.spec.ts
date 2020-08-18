import { TestBed } from '@angular/core/testing';

import { CommitingOrderService } from './commiting-order.service';

describe('CommitingOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommitingOrderService = TestBed.get(CommitingOrderService);
    expect(service).toBeTruthy();
  });
});
