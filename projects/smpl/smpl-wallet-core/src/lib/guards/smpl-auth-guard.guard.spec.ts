import { TestBed } from '@angular/core/testing';

import { SmplAuthGuardGuard } from './smpl-auth-guard.guard';

describe('SmplAuthGuardGuard', () => {
  let guard: SmplAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SmplAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
