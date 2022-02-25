import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';
import { ApiResponse } from 'src/app/models/response.model';
import { MenuService } from 'src/app/services/menu.service';
import { exhaustMap, from, Observable, of, throwError } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediaUploadService } from './../../services/media-upload.service';
import { UploadMedia } from './../../models/media.model';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public menuItems: Menu;
  public menu$: Observable<any[]>;
  menuForm: FormGroup;
  multiples: any[] = [];
  urls: any[] = [];
  file: any;
  defaultMenu: Menu = {
    itemName: '',
    description: '',
    price: '',
    category: '',
    servingSize: '',
    images: [{
      captureFileURL: '',
      blurHash: ''
    }]
  }

  constructor(private menuService: MenuService, private fb: FormBuilder, private mediaService: MediaUploadService) {
  }

  ngOnInit(): void {
    this.getMenu();
    this.initMenuForm()
  }

  initMenuForm() {
    this.menuForm = this.fb.group({
      itemName: [
        this.defaultMenu.itemName,
        Validators.compose([
          Validators.required,
        ])
      ],
      price: [
        this.defaultMenu.price,
        Validators.compose([
          Validators.required
        ]),
      ],
      category: [
        this.defaultMenu.category,
        Validators.compose([
          Validators.required
        ]),
      ],
      description: [
        this.defaultMenu.description,
        Validators.compose([
          Validators.required
        ])
      ],
      servingSize: [
        this.defaultMenu.servingSize,
        Validators.compose([
          Validators.required
        ])
      ],
      images: [
        this.defaultMenu.images,
        Validators.compose([
          Validators.required
        ])
      ]
    })
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

  saveMenu(data: Menu) {
    return this.menuService.createNewItem(data);
  }

  createMenu() {
    this.menuForm.valueChanges.pipe(
      exhaustMap((formData: Menu) => this.saveMenu(formData))).subscribe((res: ApiResponse<Menu>) => {
        debugger
        if(!res.hasErrors()) {
          window.alert('Success')
        }
      })
    }

  resetMenuForm() {
    this.menuForm.reset();
    this.defaultMenu = new Menu();
  }

  onSelectFile(event: any) {
    this.file = event.target.files && event.target.files.length;
    if (this.file > 0 && this.file < 5) {
      let i: number = 0;
      for (const singlefile of event.target.files) {
        var reader = new FileReader();
        reader.readAsDataURL(singlefile);
        this.urls.push(singlefile);
        i++;
        reader.onload = (event) => {
          const url = (<FileReader>event.target).result as string;
          this.multiples.push(url);
          if (this.multiples.length > 4) {
            this.multiples.pop();
            this.urls.pop();
            window.alert('Maximum number of files reached') //temporary alert. will replace with toast
          }
        };
      }
    }
  }

}
