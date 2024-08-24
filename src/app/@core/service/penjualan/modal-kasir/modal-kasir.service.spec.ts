import { TestBed } from '@angular/core/testing';

import { ModalKasirService } from './modal-kasir.service';

describe('ModalKasirService', () => {
  let service: ModalKasirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalKasirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
