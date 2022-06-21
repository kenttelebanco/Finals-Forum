import { TestBed } from '@angular/core/testing';

import { SentimentalAnalysisService } from './sentimental-analysis.service';

describe('SentimentalAnalysisService', () => {
  let service: SentimentalAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentimentalAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
