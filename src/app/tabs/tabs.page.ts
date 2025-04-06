import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { waterOutline, settingsOutline, statsChartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',  // Selector del componente (se usa como etiqueta en HTML)
  templateUrl: 'tabs.page.html',  // Archivo de plantilla HTML
  styleUrls: ['tabs.page.scss'],  // Archivo de estilos
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],  // Importa componentes necesarios de Ionic
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);  // Inyección del entorno de Angular para el manejo de dependencias

  constructor() {
    // Registra los íconos que se usarán en la barra de pestañas
    addIcons({ waterOutline, settingsOutline, statsChartOutline });
  }

  ngOnInit() {
    // Método que se ejecuta cuando el componente se inicializa (puedes meter lógica aquí si hace falta)
  }
}
