import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseUpload } from '../model/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  sendPost(body: FormData): Observable<string> {
    return this.http.post<ResponseUpload>(this.apiUrl + '/storages', body).pipe(
      map(({ message }) => {
        return message;
      })
    );
  }
}
