import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustDocumentComponent } from './trust-document.component';

describe('TrustDocumentComponent', () => {
  let component: TrustDocumentComponent;
  let fixture: ComponentFixture<TrustDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrustDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
