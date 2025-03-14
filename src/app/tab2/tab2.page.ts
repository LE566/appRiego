import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonDatetime, IonDatetimeButton, IonModal, IonInput } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, CommonModule, IonDatetime, IonDatetimeButton, IonModal, IonInput]
})


export class Tab2Page {
  configuracion: {estado: boolean, fechaInicio: string; fechaFin: string; duracion: number; dias: string[]; horaInicio: string; pausas: number; duracionPausa: number } = {
    fechaInicio: this.getLocalDate(),
    fechaFin: this.getLocalDate(),
    duracion: 0,
    dias: [],
    horaInicio: this.getFormattedCurrentTime(),
    pausas: 0,
    duracionPausa: 0,
    estado: false
  };
  configuracion2: {estado: boolean, fechaInicio: string; fechaFin: string; duracion: number; dias: string[]; horaInicio: string; pausas: number; duracionPausa: number } = {
    fechaInicio: this.getLocalDate(),
    fechaFin: this.getLocalDate(),
    duracion: 0,
    dias: [],
    horaInicio: this.getFormattedCurrentTime(),
    pausas: 0,
    duracionPausa: 0,
    estado: false
  };
  
  diasSector1 = [
    { nombre: 'Lunes', selected: false },
    { nombre: 'Martes', selected: false },
    { nombre: 'Miercoles', selected: false },
    { nombre: 'Jueves', selected: false },
    { nombre: 'Viernes', selected: false },
    { nombre: 'Sabado', selected: false },
    { nombre: 'Domingo', selected: false }
  ];
  
  diasSector2 = [
    { nombre: 'Lunes', selected: false },
    { nombre: 'Martes', selected: false },
    { nombre: 'Miercoles', selected: false },
    { nombre: 'Jueves', selected: false },
    { nombre: 'Viernes', selected: false },
    { nombre: 'Sabado', selected: false },
    { nombre: 'Domingo', selected: false }
  ];

  toggleDia(dia: any) {
    dia.selected = !dia.selected;
    this.onDiasFinChangeSector1(); // Modifica esta función si es necesario
  }
  
  toggleDia2(dia: any) {
    dia.selected = !dia.selected;
    this.onDiasFinChangeSector2(); // Modifica esta función si es necesario
  }

  getPrimeraLetra(dia: string): string {
    return dia.charAt(0);
  }

  constructor(private Sector:UsuariosService) {}

  ngOnInit() {}

  guardar(idSector: string) {
    if (!idSector) {
      this.mostrarAlerta('Error', 'No se proporcionó un ID para actualizar.');
      return;
    }
  
    const configuracionActualizada = {
      fechaInicio: this.configuracion.fechaInicio,
      fechaFin: this.configuracion.fechaFin,
      duracion: this.configuracion.duracion,
      dias: this.configuracion.dias,
      horaInicio: this.configuracion.horaInicio,
      pausas: this.configuracion.pausas,
      duracionPausa: this.configuracion.duracionPausa,
      estado: this.configuracion.estado
    };
  
    console.log('Datos a actualizar:', configuracionActualizada);
  
    this.Sector.putSector1(idSector, configuracionActualizada).subscribe(
      (res: any) => {
        console.log('Sector actualizado:', res);
        this.mostrarAlerta('Sector actualizado correctamente', 'El sector se actualizó con éxito.');
      },
      (err: any) => {
        console.error('Error al actualizar sector:', err);
        this.mostrarAlerta('Error al actualizar sector', 'Hubo un problema al actualizar el sector.');
      }
    );
  }
  guardar2(idSector: string) {
    if (!idSector) {
      this.mostrarAlerta('Error', 'No se proporcionó un ID para actualizar.');
      return;
    }
  
    const configuracionActualizada2 = {
      fechaInicio: this.configuracion2.fechaInicio,
      fechaFin: this.configuracion2.fechaFin,
      duracion: this.configuracion2.duracion,
      dias: this.configuracion2.dias,
      horaInicio: this.configuracion2.horaInicio,
      pausas: this.configuracion2.pausas,
      duracionPausa: this.configuracion2.duracionPausa,
      estado: this.configuracion2.estado
    };
  
    console.log('Datos a actualizar:', configuracionActualizada2);
  
    this.Sector.putSector1(idSector, configuracionActualizada2).subscribe(
      (res: any) => {
        console.log('Sector actualizado:', res);
        this.mostrarAlerta('Sector actualizado correctamente', 'El sector se actualizó con éxito.');
      },
      (err: any) => {
        console.error('Error al actualizar sector:', err);
        this.mostrarAlerta('Error al actualizar sector', 'Hubo un problema al actualizar el sector.');
      }
    );
  }
  

  onFechaInicioChange(event: any) {
    this.configuracion.fechaInicio = this.formatDate(event.detail.value);
  }
  onFechaInicioChange2(event: any) {
    this.configuracion2.fechaInicio = this.formatDate(event.detail.value);
  }

  onFechaFinChange(event: any) {
    this.configuracion.fechaFin = this.formatDate(event.detail.value);
  }
  onFechaFinChange2(event: any) {
    this.configuracion2.fechaFin = this.formatDate(event.detail.value);
  }
  onHoraInicioChange(event: any) {
    this.configuracion.horaInicio = this.formatTime(event.detail.value);
  }
  onHoraInicioChange2(event: any) {
    this.configuracion2.horaInicio = this.formatTime(event.detail.value);
  }

  onDiasFinChangeSector1() {
    this.configuracion.dias = this.diasSector1.filter(dia => dia.selected).map(dia => dia.nombre);
  }
  
  onDiasFinChangeSector2() {
    this.configuracion2.dias = this.diasSector2.filter(dia => dia.selected).map(dia => dia.nombre);
  }
  

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  formatTime(timeString: string): string {
    const date = new Date(timeString);
    let hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // La hora '0' debe ser '12'
    return `${('0' + hours).slice(-2)}:${minutes} ${ampm}`;
  }
  getFormattedCurrentTime(): string {
    const date = new Date();
    let hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // La hora '0' debe ser '12'
    return `${('0' + hours).slice(-2)}:${minutes} ${ampm}`;
  }

  mostrarAlerta(titulo: string, mensaje: string) {
    alert(`${titulo}\n${mensaje}`);
  }
  getLocalDate(): string {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset()); // Ajuste de zona horaria
    return date.toISOString().split('T')[0]; 
  }
  
  
}

interface Dia {
  nombre: string;
  selected: boolean;
}
