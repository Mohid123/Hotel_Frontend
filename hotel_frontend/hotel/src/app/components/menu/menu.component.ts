import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';
import { ApiResponse } from 'src/app/models/response.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public menuItems: Menu = {}

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu() {
    this.menuService.getAllItems().subscribe((res: ApiResponse<Menu>) => {
      if(!res.hasErrors()) {
        this.menuItems = res.data;
        console.log(this.menuItems)
        console.dir(this.menuItems)
        console.log('Response Object: ', res)
      }
    })
  }

}
