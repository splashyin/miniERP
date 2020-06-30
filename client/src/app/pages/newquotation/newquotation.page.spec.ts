import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewquotationPage } from './newquotation.page';

describe('NewquotationPage', () => {
  let component: NewquotationPage;
  let fixture: ComponentFixture<NewquotationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewquotationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewquotationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
