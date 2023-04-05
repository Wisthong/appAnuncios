import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Archive, ResponseTrue } from '../model/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class ArchiveService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getAllImages(): Observable<Archive[]> {
    return this.http.get<ResponseTrue>(this.apiUrl + '/storages').pipe(
      map(({ data }) => {
        return data.filter(
          (m) =>
            m.filename.includes('.png') ||
            m.filename.includes('.jpg') ||
            m.filename.includes('.jpeg')
        );
      })
    );
  }
}
