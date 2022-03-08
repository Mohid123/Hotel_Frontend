import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';
import { ApiResponse } from 'src/app/models/response.model';
import { MenuService } from 'src/app/services/menu.service';
import { from, Observable, BehaviorSubject, debounceTime, fromEvent, exhaustMap, tap, delay, last } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalConfig } from 'src/app/models/modal.config';
import { CustomModalComponent } from 'src/app/reusables/custom-modal/custom-modal.component';
import { ImagePostService } from './../../services/image-post.service';
import { MenuList } from './../../models/menu-list.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {
  public modalConfig: ModalConfig = {
    modalTitle: "Edit Menu Item",
    onDismiss: () => {
      return true
    },
    dismissButtonLabel: "Dismiss",
    onClose: () => {
      return true
    },
    closeButtonLabel: "Close"
  }

  public createModalConfig: ModalConfig = {
    modalTitle: "Add New Item",
    onDismiss: () => {
      return true
    },
    dismissButtonLabel: "Dismiss",
    onClose: () => {
      return true
    },
    closeButtonLabel: "Close"
  }
  @ViewChild('modal') private modal: CustomModalComponent;
  @ViewChild('createModal') createModal: CustomModalComponent;
  @ViewChild('saveMenuButton') saveMenuButton: ElementRef;
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
  private getAllItems$ = new BehaviorSubject<Array<any>>([]);
  public menu$: Observable<Array<any>> = this.getAllItems$.asObservable();
  public finished: boolean;
  public showItems: boolean;
  public menuItems: any;
  public newItems: any;
  public page: number = 0;
  menuForm: FormGroup;
  multiples: any[] = [];
  urls: any[] = [];
  closeResult: string = '';
  editForm: FormGroup;
  file: any;
  Sizes: string[] = ["Full", "Half", "1 per person", "6 Pieces", "8 Pieces"];
  category: string[] = ["Mutton", "Chicken", "Beef", "Rice", "Beverages", "Dessert", "BBQ", "Tandoor", "Starters", "Soup", "Daal", "Sabzi", "Fast Food"];

  constructor(
    private menuService: MenuService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private imageService: ImagePostService
    ) {
      this.menuItems;
    }

  ngOnInit(): void {
    this.getMenu(this.page);
    this.initMenuForm();
    this.initEditForm();
  }

  ngAfterViewInit() {
    fromEvent(this.saveMenuButton.nativeElement, 'click').pipe(
      exhaustMap(() => this.saveMenu(this.menuForm.value)),
    ).subscribe(() => {
      this.resetMenuForm();
      this.dismiss();
    })
  }

  async openModal(menu: any) {
    return await this.modal.open(
      this.editForm.setValue({
        id: menu.id,
        itemName: menu.itemName,
        description: menu.description,
        category: menu.category,
        price: menu.price,
        servingSize: menu.servingSize
      })
    );
  }

  async openNew() {
    return await this.createModal.open();
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
      id: [null],
      itemName: [null],
      description: [null],
      price: [null],
      category: [null],
      servingSize: [null]
    })
  }

  getMenu(page: number) {
    this.showItems = false;
    this.menuService.getAllItems(page).pipe(delay(3000), tap((res: ApiResponse<MenuList>) => {
      this.getAllItems$.next(res.data?.data)
    })).subscribe(() => {
      this.showItems = true;
    });
  }

  async dismiss() {
    return await this.createModal.dismiss();
  }

  async dismissEdit() {
    return await this.modal.dismiss();
  }

  async saveMenu(data: Menu) {
    return await this.imageService.uploadImage(this.urls, data.description, data.itemName, data.price, data.servingSize, data.category)
  }

  onScrollDown() {
    this.finished = false;
    this.menuService.getAllItems(++this.page).pipe(delay(2000), tap((res: ApiResponse<MenuList>) => {
      const currentData = this.getAllItems$.value;
      const latestData = [...currentData, ...res.data?.data];
      this.getAllItems$.next(latestData);
      const lastItem = latestData[latestData.length - 1]
      if(lastItem) {
        this.finished = true;
      }
    })).subscribe();
  }

  editMenu() {
    this.menuService.updateMenu(this.editForm.value.id, this.editForm.value).subscribe((res: ApiResponse<MenuList>) => {
      if(!res.hasErrors()) {
        this.toast.success('Successfully updated menu item', 'Update Menu')
        this.getMenu(this.page);
        this.dismissEdit()
      }
    });
  }

  resetMenuForm() {
    this.menuForm.reset();
    this.defaultMenu = new Menu();
  }

  deleteMenu(menu: Menu) {
    this.menuService.deleteMenuItem(menu.id).subscribe((res: ApiResponse<MenuList>) => {
      this.getMenu(this.page);
      this.toast.success('Menu item deletd', 'Delete Menu')
    })
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
            this.toast.warning('Maximum No. of files reached', 'File Limit!')
          }
        };
      }
    }
  }
}
