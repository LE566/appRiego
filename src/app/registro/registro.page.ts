import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuariosService } from '../services/usuarios.service';
import { IonContent, IonHeader, IonTitle, IonToolbar,   IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,


  IonCardTitle, IonInput, IonImg, IonInputPasswordToggle, IonText} from '@ionic/angular/standalone';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonInputPasswordToggle, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput]
})
export class RegistroPage implements OnInit {
credenciales={
    usuario: '',
    password:'',
    email: ''
  }
  usuariosCredes={
    usuario:'',
    password:''
  }
  data:any
  constructor(private ruta:Router, private userS:UsuariosService,private alertController: AlertController) { }

  ngOnInit() {
    
  }
  mostrarAlerta(titulo: string, mensaje: string) {
    alert(`${titulo}\n${mensaje}`);
  }
  insertar() {
    const nuevoUsuario = {
      user: this.credenciales.usuario,
      password: this.credenciales.password,
      email: '' // Agrega otros campos necesarios aquí
    };

    this.userS.postUsers(nuevoUsuario).subscribe(
      (res: any) => {
        console.log('Usuario registrado:', res);
        this.mostrarAlerta('Usuario registrado correctamente', 'El usuario se registró con éxito.');
      },
      (err: any) => {
        console.error('Error al insertar usuario:', err);
        this.mostrarAlerta('Error al insertar usuario', 'Hubo un problema al registrar el usuario.');
      }
    );
  }

}
