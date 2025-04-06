import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';

// Definición del componente con sus metadatos
@Component({
  selector: 'app-tab1',  // Selector del componente
  templateUrl: 'tab1.page.html',  // Archivo HTML para la vista
  styleUrls: ['tab1.page.scss'],  // Estilos asociados a la página
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, CommonModule, FormsModule],  // Módulos importados
})
export class Tab1Page {

  estado1: any;  // Variable para almacenar el estado del primer sistema
  estado2: any;  // Variable para almacenar el estado del segundo sistema

  // Constructor que recibe el servicio HttpClient y UsuariosService para hacer peticiones HTTP
  constructor(private http: HttpClient, private bd: UsuariosService) {}

  // Método que se ejecuta cuando el componente se inicializa
  ngOnInit() {
    // Realiza una petición para obtener el estado del primer sistema
    this.bd.getEstadoValvula('67bb6f2e85118d10af317f79').subscribe((res: any) => {
      console.log('Respuesta completa estado1:', res); 
      if (res && res.Respuesta && res.Respuesta.estado !== undefined) {
        this.estado1 = res.Respuesta.estado;  // Asigna el estado al valor recibido
        console.log('Estado1 asignado:', this.estado1);
      } else {
        console.warn('La respuesta no contiene la propiedad "estado".');
      }
    });
  
    // Realiza una petición para obtener el estado del segundo sistema
    this.bd.getEstadoValvula('67bb79ac1c82e9d42d445882').subscribe((res: any) => {
      console.log('Respuesta completa estado2:', res);
      if (res && res.Respuesta && res.Respuesta.estado !== undefined) {
        this.estado2 = res.Respuesta.estado;  // Asigna el estado al valor recibido
        console.log('Estado2 asignado:', this.estado2);
      } else {
        console.warn('La respuesta no contiene la propiedad "estado".');
      }
    });
  }
  
  // Método para alternar el estado del primer sistema
  toggleEstado1() {
    this.estado1 = !this.estado1;  // Alterna el estado (si está activado pasa a desactivado y viceversa)

    // Define el endpoint de la API según el estado actual
    const endpoint = this.estado1
      ? 'https://apiriego.onrender.com/actualizarEstado/67bb6f2e85118d10af317f79'
      : 'https://apiriego.onrender.com/actualizarEstadoFalse/67bb6f2e85118d10af317f79';

    // Realiza una petición PUT a la API para actualizar el estado
    this.http.put(endpoint, { headers: { 'Content-Type': 'application/json' } })
      .subscribe(response => {
        console.log('Estado actualizado:', response);
        this.mostrarAlerta('Estado actualizado', `El sistema está ${this.estado1 ? 'Activado' : 'Desactivado'}.`);
      }, error => {
        console.error('Error al actualizar estado:', error);
        this.mostrarAlerta('Error', 'Hubo un problema al actualizar el estado.');
      });
  }

  // Método para alternar el estado del segundo sistema
  toggleEstado2() {
    this.estado2 = !this.estado2;  // Alterna el estado (si está activado pasa a desactivado y viceversa)

    // Define el endpoint de la API según el estado actual
    const endpoint = this.estado2
      ? 'https://apiriego.onrender.com/actualizarEstado/67bb79ac1c82e9d42d445882'
      : 'https://apiriego.onrender.com/actualizarEstadoFalse/67bb79ac1c82e9d42d445882';

    // Realiza una petición PUT a la API para actualizar el estado
    this.http.put(endpoint, { headers: { 'Content-Type': 'application/json' } })
      .subscribe(response => {
        console.log('Estado actualizado:', response);
        this.mostrarAlerta('Estado actualizado', `El sistema está ${this.estado2 ? 'Activado' : 'Desactivado'}.`);
      }, error => {
        console.error('Error al actualizar estado:', error);
        this.mostrarAlerta('Error', 'Hubo un problema al actualizar el estado.');
      });
  }

  // Método para actualizar el estado de la configuración del primer sistema
  stateConfiguracion() {
    this.http.put(`https://apiriego.onrender.com/actualizarEstado/67bb6f2e85118d10af317f79`, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(response => {
      console.log('Estado actualizado:', response);
      this.mostrarAlerta('Estado actualizado', 'Se ha actualizado el estado de la configuración.');
    }, error => {
      console.error('Error al actualizar estado:', error);
      this.mostrarAlerta('Error al actualizar estado', 'Hubo un problema al actualizar el estado de la configuración.');
    });
  }

  // Método para actualizar el estado de la configuración del segundo sistema
  stateConfiguracion2() {
    this.http.put(`https://apiriego.onrender.com/actualizarEstado/67bb79ac1c82e9d42d445882`, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(response => {
      console.log('Estado actualizado:', response);
      this.mostrarAlerta('Estado actualizado', 'Se ha actualizado el estado de la configuración.');
    }, error => {
      console.error('Error al actualizar estado:', error);
      this.mostrarAlerta('Error al actualizar estado', 'Hubo un problema al actualizar el estado de la configuración.');
    });
  }

  // Método para mostrar una alerta con un título y mensaje
  mostrarAlerta(titulo: string, mensaje: string) {
    alert(`${titulo}\n${mensaje}`);
  }
}
