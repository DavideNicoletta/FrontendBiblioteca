import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookAdmin } from './book-admin';

describe('BookAdmin', () => {
  let component: BookAdmin;
  let fixture: ComponentFixture<BookAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(BookAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
