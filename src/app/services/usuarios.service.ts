import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  _URL_SECTOR1, 
  _URL_SECTOR1_ESTADO, 
  _URL_SECTOR2, 
  _URL_USERS, 
  _URL_USERS_IN 
} from '../config/config';

@Injectable({
  providedIn: 'root' // Servicio disponible en toda la aplicación
})
export class UsuariosService {

  // Constructor con inyección de HttpClient
  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  public getUsers(): Observable<any> {
    return this.http.get(_URL_USERS);
  }

  // Obtener un usuario por su ID
  public getUsersId(id: any): Observable<any> {
    return this.http.get(_URL_USERS + "/" + id);
  }

  // Obtener el estado de la válvula para un sector
  public getEstadoValvula(id: any): Observable<any> {
    return this.http.get(_URL_SECTOR1_ESTADO + id);
  }

  // Crear un nuevo usuario
  public postUsers(userData: any): Observable<any> {
    return this.http.post(_URL_USERS_IN, userData);
  }

  // Actualizar los datos de un sector 1
  public putSector1(id: string, sector1Data: any): Observable<any> {
    return this.http.put(`${_URL_SECTOR1}${id}`, sector1Data);
  }

  // Crear un nuevo sector 2
  public postSector2(sector2Data: any): Observable<any> {
    return this.http.post(_URL_SECTOR2, sector2Data);
  }
}
