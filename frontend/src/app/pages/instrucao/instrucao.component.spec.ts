import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrucaoComponent } from './instrucao.component';

describe('InstrucaoComponent', () => {
  let component: InstrucaoComponent;
  let fixture: ComponentFixture<InstrucaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrucaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
