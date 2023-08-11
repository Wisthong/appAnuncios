import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationStoragesComponent } from './information-storages.component';

describe('InformationStoragesComponent', () => {
  let component: InformationStoragesComponent;
  let fixture: ComponentFixture<InformationStoragesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ InformationStoragesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationStoragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
