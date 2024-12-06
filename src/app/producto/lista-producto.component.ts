import { ProductoService } from './../services/producto.service';
import { Producto } from './../models/producto';
import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit, OnDestroy {
  productos: Producto[] = [];
  listaVacia: string | undefined = undefined;
  private destroy$ = new Subject<void>();

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService
      .lista()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.productos = data;
          this.listaVacia = undefined;
        },
        err => {
          this.listaVacia = 'Error al cargar productos. Intenta nuevamente.';
        }
      );
  }

  borrar(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Eliminando...',
          text: 'Por favor, espera.',
          icon: 'info',
          showConfirmButton: false,
          allowOutsideClick: false
        });

        this.productoService
          .delete(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            () => {
              Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
              this.cargarProductos();
            },
            err => {
              Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
            }
          );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'El producto no fue eliminado.', 'error');
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
