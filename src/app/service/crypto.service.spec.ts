import { TestBed, inject } from '@angular/core/testing';

import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptoService]
    });
  });

  it('should ...', inject([CryptoService], (service: CryptoService) => {
    expect(service).toBeTruthy();
  }));
});
