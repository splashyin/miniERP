import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InAppPurchasePage } from './in-app-purchase.page';

describe('InAppPurchasePage', () => {
  let component: InAppPurchasePage;
  let fixture: ComponentFixture<InAppPurchasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InAppPurchasePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InAppPurchasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
