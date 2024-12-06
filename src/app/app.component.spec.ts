import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, // Importa el módulo de pruebas para rutas
      ],
      declarations: [
        AppComponent, // Declara el componente bajo prueba
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy(); // Verifica que el componente se crea correctamente
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontend'); // Verifica que el título es correcto
  });

  it('should render title in the DOM', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Detecta cambios en el DOM
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('frontend app is running!'); // Verifica que el título se renderiza correctamente
  });
});

