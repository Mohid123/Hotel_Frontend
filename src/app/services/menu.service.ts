import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../models/menu.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiResponse } from '../models/response.model';

type menu = Menu

@Injectable({
  providedIn: 'root'
})
export class MenuService extends BaseApiService<menu>{
  getAllItems$: BehaviorSubject<[]> = new BehaviorSubject([]);
  getAll: Observable<[]> = this.getAllItems$.asObservable();

  constructor(protected override http: HttpClient) {
    super(http)
  }

  getAllItems(offset:any, limit:any): Observable<ApiResponse<menu>> {
    limit = parseInt(limit) < 1 ? 12 : limit;
    offset = parseInt(offset) < 0 ? 0 : offset;
    return this.get(`menu/getAllMenuItems?offset=${offset}&limit=${limit}`)
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
