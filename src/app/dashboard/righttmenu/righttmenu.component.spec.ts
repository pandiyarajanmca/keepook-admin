import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RighttmenuComponent } from './righttmenu.component';

describe('RighttmenuComponent', () => {
  let component: RighttmenuComponent;
  let fixture: ComponentFixture<RighttmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RighttmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RighttmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
