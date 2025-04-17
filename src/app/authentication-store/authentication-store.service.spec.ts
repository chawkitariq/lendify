import { TestBed } from '@angular/core/testing';

import { AuthenticationStoreService } from './authentication-store.service';

describe('AuthenticationStoreService', () => {
  let service: AuthenticationStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
