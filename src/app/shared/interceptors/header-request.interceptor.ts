import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HeaderRequestInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authService.isLoggedIn()) {
      const url = request.url;
      const method = request.method;
      if (method === 'POST') {
        let isValid = false;
        if (url.includes('personaHorarioAgenda')) {
          isValid = true;
        } else if (url.includes('horarioExcepcion')) {
          isValid = true;
        } else if (url.includes('reserva')) {
          isValid = true;
        } else if (url.includes('fichaClinica')) {
          isValid = true;
        } else if (url.includes('servicio')) {
          isValid = true;
        }

        if (isValid) {
          const usuario = this.authService.getUsuario();
          request = request.clone({
            setHeaders: {
              usuario: usuario,
            },
          });
        }
      } else if (method === 'PUT') {
        let isValid = false;
        if (url.includes('fichaClinica')) {
          isValid = true;
        }
        if (isValid) {
          const usuario = this.authService.getUsuario();
          request = request.clone({
            setHeaders: {
              usuario: usuario,
            },
          });
        }
      }
    }
    console.log('request');
    console.log(request);

    return next.handle(request);
  }
}
