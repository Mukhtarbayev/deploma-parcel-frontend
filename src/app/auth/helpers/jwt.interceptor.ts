import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';

import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	/**
	 *
	 * @param {AuthenticationService} _authService
	 */
	constructor(private _authService: AuthService, private router: Router) {
	}

	/**
	 * Add auth header with jwt if user is logged in and request is to api url
	 * @param request
	 * @param next
	 */
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken')
		const isLoggedIn = this._authService.check()
		const isApiUrl = request.url.startsWith(environment.api);
		if (isLoggedIn && isApiUrl) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${accessToken}`
				}
			});
		}

		return next.handle(request).pipe(
			catchError(this.errorHandler.bind(this))
		);
	}


	private errorHandler(err: HttpErrorResponse) {
		if (err.status === 500) {
			this._authService.logout();

			this.router.navigate(['/auth/login'])

		}

		return throwError(err)
	}
}
