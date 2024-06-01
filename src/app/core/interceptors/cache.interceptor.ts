import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const httpRequest = req.clone({
      params: req.params
        .set('id', uuidv4())
    });

    return next.handle(httpRequest)
  }
}