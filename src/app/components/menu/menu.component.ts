import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';
import { ApiResponse } from 'src/app/models/response.model';
import { MenuService } from 'src/app/services/menu.service';
import { BehaviorSubject, exhaustMap, from, fromEvent, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediaUploadService } from './../../services/media-upload.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UploadMedia } from './../../models/media.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {
  @ViewChild('saveMenuButton') saveMenuButton: ElementRef
  public menuItems: Menu;
  public id: string;
  public menu$: Observable<any[]>;
  menuForm: FormGroup;
  multiples: any[] = [];
  urls: any[] = [];
  closeResult: string = '';
  editForm: FormGroup;
  menuSubject = new BehaviorSubject<any[]>([]);
  menuObserve: Observable<any[]> = this.menuSubject.asObservable();
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

  constructor(
    private menuService: MenuService, private fb: FormBuilder,
    private mediaService: MediaUploadService,
    private modalService: NgbModal
    ) {
      this.menuItems;
    }

  ngOnInit(): void {
    this.getMenu();
    this.initMenuForm();
    this.initEditForm();
  }

  ngAfterViewInit() {
    fromEvent(this.saveMenuButton.nativeElement, 'click').pipe(
      exhaustMap(() => this.saveMenu(this.menuForm.value)),
    ).subscribe(() => {
      this.getMenu();
      this.resetMenuForm();
    })
  }

  open(openDialog:any, menu: any) {
    this.modalService.open(openDialog, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.editForm.setValue({
      itemName: menu.itemName,
      description: menu.description,
      category: menu.category,
      price: menu.price,
      servingSize: menu.servingSize
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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

  initEditForm() {
    this.editForm = this.fb.group({
      itemName: [null],
      description: [null],
      price: [null],
      category: [null],
      servingSize: [null]
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
        this.menuSubject.next(newMenu);
      }
    })
  }

  editMenu(menu: Menu) {
    this.menuService.updateMenu(menu.id, menu);
  }

  updateMenu() {
    debugger
    const menuItems = this.menuSubject.getValue();
    const menuIndex = menuItems.find(menu => menu.id == this.menuItems.id)
    const newMenu = menuItems.slice(0);
    newMenu[menuIndex] = {
      ...menuItems[menuIndex],
      ...this.editForm.value
    }
    this.menuSubject.next(newMenu);
    this.editMenu(this.editForm.value);
    this.getMenu();
  }

  saveMenu(data: Menu) {
    return this.menuService.createNewItem(data);
  }

  deleteMenu(menu: Menu) {
    this.menuService.deleteMenuItem(menu.id).subscribe((res: ApiResponse<Menu>) => {
      this.getMenu();
      window.alert('Deleted');
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
