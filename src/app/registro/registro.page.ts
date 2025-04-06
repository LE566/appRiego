import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuariosService } from '../services/usuarios.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, 
  IonCard, IonCardContent, IonCardHeader, IonInput, IonInputPasswordToggle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonInputPasswordToggle, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCard, IonCardContent, IonCardHeader, IonInput]
})
export class RegistroPage implements OnInit {
  // Objeto para almacenar las credenciales del usuario
  credenciales = {
    usuario: '',
    password: '',
    email: ''
  };

  // Objeto para manejar los errores en los campos
  errores = {
    usuario: '',
    password: '',
    email: ''
  };

  constructor(private ruta: Router, private userS: UsuariosService, private alertController: AlertController) { }

  ngOnInit() { }

  // Limpiar los mensajes de error antes de realizar la validación
  limpiarErrores() {
    this.errores.usuario = '';
    this.errores.password = '';
    this.errores.email = '';
  }

  // Validar los campos del formulario
  validarFormulario(): boolean {
    this.limpiarErrores(); // Limpiar los errores previos

    let valido = true;

    // Validar campo de usuario
    if (!this.credenciales.usuario) {
      this.errores.usuario = 'El nombre de usuario es obligatorio.';
      valido = false;
    }

    // Validar campo de email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.credenciales.email) {
      this.errores.email = 'El correo electrónico es obligatorio.';
      valido = false;
    } else if (!emailPattern.test(this.credenciales.email)) {
      this.errores.email = 'El correo electrónico no es válido.';
      valido = false;
    }

    // Validar campo de contraseña
    if (!this.credenciales.password) {
      this.errores.password = 'La contraseña es obligatoria.';
      valido = false;
    } else if (this.credenciales.password.length < 6) {
      this.errores.password = 'La contraseña debe tener al menos 6 caracteres.';
      valido = false;
    }

    return valido; // Retorna si todos los campos son válidos
  }

  // Función para insertar el nuevo usuario en el backend
  insertar() {
    if (this.validarFormulario()) { // Si el formulario es válido
      // Crear un objeto con los datos del nuevo usuario
      const nuevoUsuario = {
        user: this.credenciales.usuario,
        password: this.credenciales.password,
        email: this.credenciales.email
      };

      // Llamar al servicio para registrar el nuevo usuario
      this.userS.postUsers(nuevoUsuario).subscribe(
        (res: any) => {
          console.log('Usuario registrado:', res);
          // Mostrar alerta de éxito
          this.mostrarAlerta('Usuario registrado correctamente', 'El usuario se registró con éxito.');
        },
        (err: any) => {
          console.error('Error al insertar usuario:', err);
          // Mostrar alerta de error
          this.mostrarAlerta('Error al insertar usuario', 'Hubo un problema al registrar el usuario.');
        }
      );
    }
  }

  // Función para mostrar alertas con el título y mensaje
  mostrarAlerta(titulo: string, mensaje: string) {
    alert(`${titulo}\n${mensaje}`);
  }
}
