import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Archive,
  Post,
  PostArray,
  Posts,
  ResponsePost,
  ResponsePosts,
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
            m.url.includes('.png') ||
            m.url.includes('.jpg') ||
            m.url.includes('.jpeg') ||
            m.url.includes('.gif')
        );
      })
    );
  }

  deleteImages(id: string): Observable<any> {
    return this.http.delete<ResponseTrue>(this.apiUrl + '/storages/' + id);
  }

  deleteImagesInformation(id: string): Observable<any> {
    return this.http.delete<ResponseTrue>(this.apiUrl + '/informationstorages/' + id);
  }

  getAllGalery(): Observable<Archive[]> {
    return this.http
      .get<ResponseTrue>(this.apiUrl + '/informationstorages')
      .pipe(
        map(({ data }) => {
          return data.filter(
            (m) =>
              m.url.includes('.png') ||
              m.url.includes('.jpg') ||
              m.url.includes('.jpeg') ||
              m.url.includes('.gif')
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
  
  deletePost(id: string): Observable<string> {
    return this.http.delete<ResponsePost>(this.apiUrl + '/posts/' + id).pipe(
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

  getPost(id?: string): Observable<Posts> {
    return this.http.get<ResponsePosts>(this.apiUrl + '/posts/' + id).pipe(
      map(({ data }) => {
        return data[0];
      })
    );
  }
}
