import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ENVIRONMENT } from '@ult/shared/data-access';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	// TODO: add check if bearer exist, either in AuthService.store or something,
	// Load dialog.component.ts dynamically => use HTML dialog
	// else show dialog
	const bearerToken = inject(ENVIRONMENT).bearer ?? 'PLEASE ADD BEARER TOKEN';

	if (req.url.startsWith('https://api.themoviedb.org/3/')) {
		const headers = req.headers
			// .set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${bearerToken}`);

		req = req.clone({ headers });
	}

	return next(req);
};
