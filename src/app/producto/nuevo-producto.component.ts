import { Producto } from './../models/producto';
import { ProductoService } from './../services/producto.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  nombre: string = '';
  precio: number | null = null;
  cargando: boolean = false;

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onCreate(): void {
    if (!this.nombre.trim() || this.precio == null || this.precio <= 0) {
      this.toastr.error('Por favor ingresa un nombre válido y un precio mayor a 0.', 'Datos inválidos', {
        timeOut: 3000,
        positionClass: 'toast-top-center'
      });
      return;
    }

    const producto = new Producto(this.nombre, this.precio);
    this.cargando = true;

    this.productoService.save(producto).subscribe(
      data => {
        this.toastr.success('Producto creado con éxito.', 'OK', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
        this.cargando = false;
        this.limpiarFormulario();
        this.router.navigate(['/']);
      },
      err => {
        this.cargando = false;
        const mensajeError = err.error?.message || 'Error al guardar el producto.';
        this.toastr.error(mensajeError, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      }
    );
  }

  limpiarFormulario(): void {
    this.nombre = '';
    this.precio = null;
  }

  volver(): void {
    this.router.navigate(['/']);
  }
}
