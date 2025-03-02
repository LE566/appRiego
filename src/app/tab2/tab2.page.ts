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
  imports: [FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonGrid, IonRow, IonCol, IonButton, CommonModule, IonDatetime, IonDatetimeButton, IonModal, IonInput]
})

export class Tab2Page {
  configuracion: { fechaInicio: string; fechaFin: string; duracion: number; dias: string[]; horaInicio: string; pausas: number; duracionPausa: number } = {
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaFin: new Date().toISOString().split('T')[0],
    duracion: 0,
    dias: [],
    horaInicio: this.getFormattedCurrentTime(),
    pausas: 0,
    duracionPausa: 0
  };
  
  dias = [
    { nombre: 'Lunes', selected: false },
    { nombre: 'Martes', selected: false },
    { nombre: 'Miércoles', selected: false },
    { nombre: 'Jueves', selected: false },
    { nombre: 'Viernes', selected: false },
    { nombre: 'Sábado', selected: false },
    { nombre: 'Domingo', selected: false }
  ];

  toggleDia(dia: Dia) {
    dia.selected = !dia.selected;
    this.onDiasFinChange();
  }

  getPrimeraLetra(dia: string): string {
    return dia.charAt(0);
  }

  constructor(private Sector:UsuariosService) {}

  ngOnInit() {}

  guardar() {
    const nuevaConfiguracion = {
      fechaInicio: this.configuracion.fechaInicio,
      fechaFin: this.configuracion.fechaFin,
      duracion: this.configuracion.duracion,
      dias: this.configuracion.dias,
      horaInicio: this.configuracion.horaInicio,
      pausas: this.configuracion.pausas,
      duracionPausa: this.configuracion.duracionPausa
    };
    console.log(this.configuracion);
    this.Sector.postSector1(nuevaConfiguracion).subscribe(
      (res: any) => {
        console.log('Sector registrado:', res);
        this.mostrarAlerta('Sector1 guardado correctamente', 'El sector se guardo con éxito.');
      },
      (err: any) => {
        console.error('Error al insertar sector:', err);
        this.mostrarAlerta('Error al insertar sector', 'Hubo un problema al registrar el sector.');
      }
    );
  }

  onFechaInicioChange(event: any) {
    this.configuracion.fechaInicio = this.formatDate(event.detail.value);
  }

  onFechaFinChange(event: any) {
    this.configuracion.fechaFin = this.formatDate(event.detail.value);
  }
  onHoraInicioChange(event: any) {
    this.configuracion.horaInicio = this.formatTime(event.detail.value);
  }

  onDiasFinChange() {
    this.configuracion.dias = this.dias.filter(dia => dia.selected).map(dia => dia.nombre);
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
  
  
}

interface Dia {
  nombre: string;
  selected: boolean;
}
