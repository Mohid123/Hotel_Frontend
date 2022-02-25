import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../models/menu.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/response.model';

type menu = Menu

@Injectable({
  providedIn: 'root'
})
export class MenuService extends BaseApiService<menu>{

  constructor(protected override http: HttpClient) {
    super(http)
  }

  getAllItems(): Observable<ApiResponse<menu>> {
    return this.get(`menu/getAllMenuItems`)
  }

  createNewItem(menu: Menu): Observable<ApiResponse<menu>> {
    return this.post(`menu`, menu);
  }
}
