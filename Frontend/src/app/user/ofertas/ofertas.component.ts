import { Component, OnInit } from '@angular/core';
declare function ejecutarAnimacion(): any;
import { ToastrService } from 'ngx-toastr';
//import { indicadoresEconomicosBCCR } from 'indicadores-economicos-bccr';

import { AeropuertoService } from 'src/app/services/aeropuerto.service';
import { AvionService } from 'src/app/services/avion.service';
import { VueloService } from 'src/app/services/vuelo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RutaService } from 'src/app/services/ruta.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css'],
})
export class OfertasComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private _aeropuertoService: AeropuertoService,
    private _rutaService: RutaService,
    private vueloService: VueloService,
    private avionService: AvionService,
    private usuarioService: UsuarioService
  ) //private indicadoresEconomicosBCCR: indicadoresEconomicosBCCR
  {}

  _rutasDescuento: any = [];
  precioDolar: any = '';
  p: any = 1;

  ngOnInit(): void {
    ejecutarAnimacion();
    this.rutasDescuento();
  }

  rutasDescuento() {
    this._rutaService.get().subscribe((data) => {
      for (const item of data) {
        if (item.descuento != 0) {
          item.duracion = item.precio_trayecto; //utilizo este campo para guardar el precio real
          item.precio_trayecto =
            item.precio_trayecto - item.precio_trayecto * item.descuento;
          item.precio_trayecto = '$' + item.precio_trayecto;
          item.descuento = item.descuento * 100;
          this._rutasDescuento.push(item);
        }
      }
    });
  }

  monedaColones() {
    //Consumo servicio del BCCR
    // indicadoresEconomicosBCCR
    //   .get('johnpaul899@hotmail.com', 'U2ANL22FHU')
    //   .subscribe((tipoDeCambio) => {
    //     // { compra: 500.00, venta: 500.00 }
    //     precioDolar = tipoDeCambio.compra;
    //   });

    this._rutasDescuento = []; //se limpia el arreglo que carga la tabla en dolares

    this._rutaService.get().subscribe((data) => {
      for (const item of data) {
        if (item.descuento != 0) {
          //Se aplica el descuento al precio, si es que tiene uno.
          item.precio_trayecto =
            item.precio_trayecto - item.precio_trayecto * item.descuento;
            
          //Conversion a COLONES por medio del API del BCCR
          // item.precio_trayecto = precio_trayecto * precioDolar;

          //Se le da el icono que se va mostrar en la tabla
          item.precio_trayecto = '₡' + item.precio_trayecto;

          //Se pasa de decimas a % de 100 el descuento
          item.descuento = item.descuento * 100;

          this._rutasDescuento.push(item);
        }
      }
    });
  }
}
