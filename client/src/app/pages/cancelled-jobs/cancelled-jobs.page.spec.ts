import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledJobsPage } from './cancelled-jobs.page';

describe('CancelledJobsPage', () => {
  let component: CancelledJobsPage;
  let fixture: ComponentFixture<CancelledJobsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelledJobsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledJobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
