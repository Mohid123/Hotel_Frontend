import { Injectable } from '@angular/core';
import { UploadMedia } from './../models/media.model';
import { combineLatest, mergeMap, Observable } from 'rxjs';
import { MediaUploadService } from './media-upload.service';
import { ApiResponse } from './../models/response.model';
import { Menu } from '../models/menu.model';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class ImagePostService {

  constructor(private mediaService: MediaUploadService, private menuService: MenuService) { }

  async uploadImage(MediaFiles:any, description: string, itemName: string, price: string, servingSize: string, category: string) {
    debugger
    let menu = new Menu();
    menu.category = category;
    menu.description = description;
    menu.itemName = itemName;
    menu.price = price;
    menu.servingSize = servingSize;
    menu.images = [];
    let mediaRequests: Array<Observable<any>> = [];
    debugger
    await MediaFiles.forEach((file:any) => {
      mediaRequests.push(this.mediaService.uploadMedia(file))
    })

    combineLatest(mediaRequests).pipe(mergeMap((uploadedMedia): any => {
      debugger
      uploadedMedia.forEach((res: ApiResponse<any>) => {
        let media = new UploadMedia();
        media.captureFileURL = res.data.url;
        menu.images?.push(media)
      })
      return this.menuService.createNewItem(menu)
    })).subscribe((res) => {
      debugger
      console.log(res);
      window.alert('Success')
    })
  }
}
