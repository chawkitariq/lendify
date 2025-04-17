import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { authenticationGuard } from './authentication.guard';

describe('authenticationGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authenticationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
