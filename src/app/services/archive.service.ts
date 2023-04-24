import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Archive,
  Post,
  PostArray,
  ResponsePost,
  ResponseTrue,
} from '../model/auth.interface';

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

  createPost(body: Post): Observable<string> {
    return this.http.post<ResponsePost>(this.apiUrl + '/posts', body).pipe(
      map(({ message }) => {
        return message;
      })
    );
  }

  updatePost(id: string, body: Post): Observable<string> {
    return this.http.put<ResponsePost>(this.apiUrl + '/posts/' + id, body).pipe(
      map(({ message }) => {
        return message;
      })
    );
  }

  postArrayResponde(): Observable<Post[]> {
    return this.http.get<PostArray>(this.apiUrl + '/posts').pipe(
      map(({ data }) => {
        return data;
      })
    );
  }

  getPost(id?: string): Observable<Post> {
    return this.http.get<ResponsePost>(this.apiUrl + '/posts/' + id).pipe(
      map(({ data }) => {
        return data;
      })
    );
  }
}
