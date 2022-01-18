import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, mergeMap, Observable} from 'rxjs';
import {KeycloakService} from 'keycloak-angular';

@Injectable({providedIn: 'root'})
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(private keycloakService: KeycloakService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(this.keycloakService.getToken())
      .pipe(
        mergeMap(token => {
          const authedRequest = request.clone({headers: request.headers.set('Authorization', `Bearer ${token}`)})
          return next.handle(authedRequest)
        })
      )
  }
}
