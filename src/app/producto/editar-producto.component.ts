import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from './../services/producto.service';
import { Producto } from './../models/producto';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  producto: Producto | null = null; // Permitir explícitamente que sea null

  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.params.id); // Convertir ID a número
    if (isNaN(id)) {
      this.toastr.error('ID de producto inválido', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
      this.router.navigate(['/']);
      return;
    }

    this.productoService.detail(id).subscribe({
      next: (data: Producto) => {
        this.producto = data;
      },
      error: (err) => {
        const message = err.error?.message || 'Error al cargar el producto';
        this.toastr.error(message, 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    });
  }

  onUpdate(): void {
    if (!this.producto) {
      this.toastr.error('No hay datos para actualizar', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
      return;
    }

    const id = Number(this.activatedRoute.snapshot.params.id);
    this.productoService.update(id, this.producto).subscribe({
      next: (data) => {
        this.toastr.success(data.message || 'Producto actualizado con éxito', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      },
      error: (err) => {
        const message = err.error?.message || 'Error al actualizar el producto';
        this.toastr.error(message, 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    });
  }

  volver(): void {
    this.router.navigate(['/']);
  }
}
