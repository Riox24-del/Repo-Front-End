  import { Injectable } from '@angular/core';
  import { HttpClient,HttpHeaders  } from '@angular/common/http';
  import { Observable } from 'rxjs';
  const URL = 'http://localhost:8000/api/';

  @Injectable({
    providedIn: 'root'
  })
  export class ServicioService {

    constructor( private http: HttpClient) { }

    newAgremiado(data: any){
      return this.http.post(`${URL}agregarAgremiado`, data);
    }

    getAgremiado(){
      return this.http.get(`${URL}obtenerAgremiados`);
    }

    getAgremiadoById(id: number) {
      return this.http.get(`${URL}obtenerAgremiadoId/${id}`);
    }

    deleteAgremiado(id: number) {
      return this.http.delete(`${URL}eliminarAgremiado/${id}`);
    }

    updateAgremiado(id: number, data: any) {
      return this.http.post(`${URL}actualizarAgremiado/${id}`, data);
    }


    newSolicitud(data: any) {
      return this.http.post(`${URL}agregarsolicitud`, data);
    }

    getSolicitudes() {
      return this.http.get(`${URL}obtenerSolicitud`);
    }

    getSolicitudById(id: number) {
      return this.http.get(`${URL}solicitudby/${id}`);
    }


    abrirArchivoEnNuevaVentana(_ruta_archivo: string): Observable<any> {
      const url = `${URL}solicitud/${_ruta_archivo}`;
      return this.http.get(url, { responseType: 'text' });
    }
    

   
    // deleteSolicitud(id: number) {
    //   return this.http.delete(`${URL}borrarSolicitud/${id}`);
    // }

    // updateSolicitud(id: number, data: any) {
    //   return this.http.post(`${URL}actualizSolicitud/${id}`, data);
    // }

    agregarSolicitud(nue: string, archivo: File): Observable<any> {
      const formData: FormData = new FormData();
      formData.append('NUE', nue);
      formData.append('archivo', archivo, archivo.name);
  
      const headers = new HttpHeaders({
        'Accept': 'application/json'
      });
  
      return this.http.post(`${URL}agregarsolicitud`, formData, { headers });
    }
  
    descargarArchivo(nombreArchivo: string): Observable<any> {
      return this.http.get(`${URL}app/public/ruta_del_archivo/${nombreArchivo}`, { responseType: 'blob' });
    }
  
  newSolicitud2(data: any) {
    return this.http.post(`${URL}agregarsolicitud`, data);
  }





  loginUsuario(credentials: any): Observable<any> {
    return this.http.post(`${URL}login`, credentials);
  }

}


  