import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonImg,IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonImg, IonButton],
})
export class Tab1Page {
  constructor(private http: HttpClient) {}
  ngOnInit(){
    
  }
  // enviarConfiguracion() {
  //   // Obtener la configuración desde la API
  //   this.http.get<any>('https://apiriego.onrender.com/config1/67bb6f2e85118d10af317f79').subscribe(
  //     (config) => {
  //       console.log('Configuración obtenida:', config);

  //       // Enviar la configuración al ESP32
  //       this.http.post('http://192.168.118.231/configurar', config).subscribe(
  //         (res) => console.log('Configuración enviada al ESP32:', res),
  //         (error) => console.error('Error al enviar configuración:', error)
  //       );
  //     },
  //     (error) => console.error('Error al obtener configuración:', error)
  //   );
  // }
  stateConfiguracion() {
    this.http.put(`https://apiriego.onrender.com/actualizarEstado/67bb6f2e85118d10af317f79`,{
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(response => {
        console.log('Estado actualizado:', response);
        this.mostrarAlerta('Estado actualizado', 'Se ha actualizado el estado de la configuración.');
      }, error => {
        console.error('Error al actualizar estado:', error);
        this.mostrarAlerta('Error al actualizar estado', 'Hubo un problema al actualizar el estado de la configuración.');
      });
  }
  mostrarAlerta(titulo: string, mensaje: string) {
    alert(`${titulo}\n${mensaje}`);
  }
  

}
