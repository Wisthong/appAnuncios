import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationuploadComponent } from './informationupload.component';

describe('InformationuploadComponent', () => {
  let component: InformationuploadComponent;
  let fixture: ComponentFixture<InformationuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ InformationuploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
