import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';
import { ApiResponse } from 'src/app/models/response.model';
import { MenuService } from 'src/app/services/menu.service';
import { from, Observable, of } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public menuItems: Menu;
  public menu$: Observable<any[]>;

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu() {
    let newMenu: any[] = [];
    this.menuService.getAllItems()
    .subscribe((res: ApiResponse<Menu>) => {
      if(!res.hasErrors()) {
        this.menuItems = res.data;
        newMenu.push(this.menuItems);
        this.menu$ = from(newMenu);
      }
    })
  }

  createMenu() {

  }

}
