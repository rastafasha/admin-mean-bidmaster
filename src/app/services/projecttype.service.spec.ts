import { TestBed } from '@angular/core/testing';

import { ProjecttypeService } from './projecttype.service';

describe('ProjecttypeService', () => {
  let service: ProjecttypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjecttypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
