import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from '../models/producto';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit, OnDestroy {
  producto: Producto | null = null; // Permitir explícitamente que sea `null`
  private destroy$ = new Subject<void>();

  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.params.id);
    if (isNaN(id)) {
      this.mostrarError('ID de producto inválido');
      return;
    }

    this.productoService.detail(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Producto) => {
          this.producto = data;
        },
        error: (err) => {
          const message = err.status === 404 
            ? 'Producto no encontrado' 
            : 'Error al cargar el producto';
          this.mostrarError(message);
        }
      });
  }

  mostrarError(message: string): void {
    this.toastr.error(message, 'Error', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    });
    this.volver();
  }

  volver(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
