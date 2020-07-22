import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdemServicoListaComponent } from './ordem-servico-lista.component';


describe('OrdemServicoListaComponent', () => {
  let component: OrdemServicoListaComponent;
  let fixture: ComponentFixture<OrdemServicoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrdemServicoListaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdemServicoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
