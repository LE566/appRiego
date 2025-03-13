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
  credenciales = {
    usuario: '',
    password: '',
    email: ''
  };

  errores = {
    usuario: '',
    password: '',
    email: ''
  };

  constructor(private ruta: Router, private userS: UsuariosService, private alertController: AlertController) { }

  ngOnInit() { }

  // Limpiar los errores antes de validar
  limpiarErrores() {
    this.errores.usuario = '';
    this.errores.password = '';
    this.errores.email = '';
  }

  // Validación del formulario
  validarFormulario(): boolean {
    this.limpiarErrores(); // Limpiar errores previos

    let valido = true;

    if (!this.credenciales.usuario) {
      this.errores.usuario = 'El nombre de usuario es obligatorio.';
      valido = false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.credenciales.email) {
      this.errores.email = 'El correo electrónico es obligatorio.';
      valido = false;
    } else if (!emailPattern.test(this.credenciales.email)) {
      this.errores.email = 'El correo electrónico no es válido.';
      valido = false;
    }

    if (!this.credenciales.password) {
      this.errores.password = 'La contraseña es obligatoria.';
      valido = false;
    } else if (this.credenciales.password.length < 6) {
      this.errores.password = 'La contraseña debe tener al menos 6 caracteres.';
      valido = false;
    }

    return valido;
  }

  // Función para insertar el nuevo usuario
  insertar() {
    if (this.validarFormulario()) {
      const nuevoUsuario = {
        user: this.credenciales.usuario,
        password: this.credenciales.password,
        email: this.credenciales.email
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

  mostrarAlerta(titulo: string, mensaje: string) {
    alert(`${titulo}\n${mensaje}`);
  }
}