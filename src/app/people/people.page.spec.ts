import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeoplePage } from './people.page';

describe('PersonasPage', () => {
  let component: PeoplePage;
  let fixture: ComponentFixture<PeoplePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PeoplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
