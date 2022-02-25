import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constants } from '../app.constants';
import { take, tap, Observable } from 'rxjs';
import { ApiResponse } from './../models/response.model';
import { BaseApiService } from './base-api.service';
import { UploadMedia } from '../models/media.model';

type media = UploadMedia

@Injectable({
  providedIn: 'root'
})
export class MediaUploadService extends BaseApiService<media> {

  constructor(protected override http: HttpClient) {
    super(http);
  }


uploadMedia(folderName:string, file:FormData): Observable<ApiResponse<media>> {
  return this.postMedia(`media-upload/mediaFiles/${folderName}`, file)
  .pipe(
    take(1),
    tap((result:ApiResponse<media>) => {
    if (result.hasErrors()) {
      window.alert('Failure')
    }
  }))
}
}
