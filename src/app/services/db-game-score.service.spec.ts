import { TestBed } from '@angular/core/testing';

import { DbGameScoreService } from './db-game-score.service';

describe('DbGameScoreService', () => {
  let service: DbGameScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbGameScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
