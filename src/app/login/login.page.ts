// Importación de dependencias y módulos necesarios
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { AlertController } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput, IonImg, IonInputPasswordToggle, IonText } from '@ionic/angular/standalone';
import { RedirectCommand } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Definición del componente
@Component({
  selector: 'app-login', // El selector utilizado para referenciar el componente en la plantilla HTML
  templateUrl: './login.page.html', // La plantilla HTML asociada a este componente
  styleUrls: ['./login.page.scss'], // Los estilos asociados a este componente
  standalone: true, // Marca el componente como independiente para ser usado sin necesidad de un módulo adicional

  // Importación de módulos que se utilizarán en el componente
  imports: [IonContent, IonHeader, IonInputPasswordToggle, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCard, IonCardContent, IonCardHeader, IonInput]
})
export class LoginPage implements OnInit {
  // Declaración de variables para almacenar las credenciales del usuario
  credenciales = {
    usuario: '', // Usuario ingresado por el usuario
    password: '' // Contraseña ingresada por el usuario
  };

  usuariosCredes = {
    usuario: '', // Usuario ingresado para autenticación
    password: '' // Contraseña ingresada para autenticación
  };

  data: any; // Variable para almacenar los usuarios obtenidos desde la API

  // Constructor del componente que inyecta dependencias necesarias
  constructor(private fb: FormBuilder, private ruta: Router, private userS: UsuariosService, private alertController: AlertController) {
    // Aquí se puede inicializar formularios reactivos, pero está comentado
    /* this.loginForm = this.fb.group({
      usuario: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(6)]
    }) */
  }

  // Método que se ejecuta cuando el componente es inicializado
  ngOnInit() {
    // Llamada a la API para obtener los usuarios
    this.userS.getUsers().subscribe((res: any) => {
      console.log("Respuesta completa:", res);

      if (res?.Respuesta?.length > 0) {
        this.data = res.Respuesta; // Guardamos los usuarios obtenidos
        console.log("Usuarios cargados:", this.data);
      } else {
        console.error("❌ No se recibieron usuarios válidos.");
      }
    });
  }

  // Función para mostrar alertas con un título y mensaje
  mostrarAlerta(titulo: string, mensaje: string) {
    alert(`${titulo}\n${mensaje}`); // Muestra una alerta simple
  }

  // Función que se ejecuta al hacer clic en el botón de login
  mostrar() {
    console.log("Credenciales ingresadas:", this.usuariosCredes);

    // Busca un usuario que coincida con las credenciales ingresadas
    const usuarioEncontrado = this.data.find((user: any) => 
      user.user === this.usuariosCredes.usuario && user.password === this.usuariosCredes.password
    );

    // Si el usuario fue encontrado, redirige a la página principal
    if (usuarioEncontrado) {
      this.mostrarAlerta('Acceso correcto', 'Has iniciado sesión correctamente.');
      console.log('Usuario autenticado:', usuarioEncontrado);
      this.ruta.navigate(['principal/tabs/tab1']); // Navega a la página de inicio
    } else {
      // Si no se encuentra el usuario, muestra un mensaje de error
      console.log('Acceso incorrecto');
      this.mostrarAlerta('Acceso denegado', 'Usuario o contraseña incorrectos.');
    }
  }

  // Función para registrar un nuevo usuario
  insertar() {
    // Datos del nuevo usuario
    const nuevoUsuario = {
      user: this.credenciales.usuario,
      password: this.credenciales.password,
      email: '' // Agregar otros campos necesarios en el futuro
    };

    // Llamada a la API para registrar al nuevo usuario
    this.userS.postUsers(nuevoUsuario).subscribe(
      (res: any) => {
        console.log('Usuario insertado:', res);
        this.mostrarAlerta('Usuario insertado correctamente', 'El usuario se registró con éxito.');
      },
      (err: any) => {
        console.error('Error al insertar usuario:', err);
        this.mostrarAlerta('Error al insertar usuario', 'Hubo un problema al registrar el usuario.');
      }
    );
  }
}
