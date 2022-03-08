import { Injectable } from '@angular/core';
import { UploadMedia } from './../models/media.model';
import { combineLatest, from, mergeMap, Observable } from 'rxjs';
import { MediaUploadService } from './media-upload.service';
import { ApiResponse } from './../models/response.model';
import { Menu } from '../models/menu.model';
import { MenuService } from './menu.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ImagePostService {

  public limit: number = 12;
  public offset: number = 0;

  constructor(private mediaService: MediaUploadService, private menuService: MenuService, private toast: ToastrService) { }

  async uploadImage(MediaFiles:any, description: string, itemName: string, price: string, servingSize: string, category: string) {

    let menu = new Menu();
    menu.category = category;
    menu.description = description;
    menu.itemName = itemName;
    menu.price = price;
    menu.servingSize = servingSize;
    menu.images = [];

    let mediaRequests: Array<Observable<any>> = [];

    await MediaFiles.forEach((file: any) => {
      mediaRequests.push(this.mediaService.uploadMedia(category, file))
    })

    combineLatest(mediaRequests).pipe(mergeMap((uploadedMedia) => {
      uploadedMedia.forEach((res: ApiResponse<any>) => {
        let media = new UploadMedia();
        media.captureFileURL = res.data.url;
        menu.images?.push(media)
      })
      return this.menuService.createNewItem(menu)
    })).subscribe(() => {
      this.toast.success('New item created', 'Add New Item');
    })
  }
}
