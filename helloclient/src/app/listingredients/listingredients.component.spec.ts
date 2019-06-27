import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingredientsComponent } from './listingredients.component';

describe('ListingredientsComponent', () => {
  let component: ListingredientsComponent;
  let fixture: ComponentFixture<ListingredientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingredientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
