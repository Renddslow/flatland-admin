import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SermonEditorComponent } from './sermon-editor.component';

describe('SermonEditorComponent', () => {
  let component: SermonEditorComponent;
  let fixture: ComponentFixture<SermonEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SermonEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SermonEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
