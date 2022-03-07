import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../models/menu.model';
import { Observable, BehaviorSubject, take, tap } from 'rxjs';
import { ApiResponse } from '../models/response.model';
import { MenuList } from './../models/menu-list.model';

type menu = MenuList;
@Injectable({
  providedIn: 'root'
})
export class MenuService extends BaseApiService<menu>{
  limit: number = 6;
  offset: number = 0;

  constructor(protected override http: HttpClient) {
    super(http)
  }

  getAllItems(page: number): Observable<ApiResponse<menu>> {
    const param: any = {
      offset: page ? this.limit * page : 0,
      limit: this.limit,
    }
    return this.get(`menu/getAllMenuItems`, param);
  }

  createNewItem(menu: Menu): Observable<ApiResponse<menu>> {
    return this.post(`menu`, menu);
  }

  updateMenu(id: string, menu: Menu): Observable<ApiResponse<menu>> {
    return this.put(`menu/updateMenuItem/${id}`, menu);
  }

  getMenuItem(id: string): Observable<ApiResponse<menu>> {
    return this.get(`menu/getMenuItem/${id}`);
  }

  deleteMenuItem(id: string): Observable<ApiResponse<menu>> {
    return this.delete(`menu/deleteMenuItem/${id}`);
  }
}
