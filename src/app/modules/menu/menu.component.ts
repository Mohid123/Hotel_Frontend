import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';
import { ApiResponse } from 'src/app/models/response.model';
import { MenuService } from 'src/app/services/menu.service';
import { from, Observable, BehaviorSubject, debounceTime, fromEvent } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../components/modal/modal.component';
import { TestingComponent } from '../components/testing/testing.component';
import { ModalConfig } from 'src/app/models/modal.config';
import { CustomModalComponent } from 'src/app/reusables/custom-modal/custom-modal.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {
  public modalConfig: ModalConfig = {
    modalTitle: "Title",
    onDismiss: () => {
      return true
    },
    dismissButtonLabel: "Dismiss",
    onClose: () => {
      return true
    },
    closeButtonLabel: "Close"
  }
  @ViewChild('modal') private modal: CustomModalComponent
  public menuItems: any;
  public newItems: any;
  empty: any[] = [];
  empty2: any[] = [];
  menuItems$: BehaviorSubject<any[]> = new BehaviorSubject(this.empty);
  newItems$: BehaviorSubject<any[]> = new BehaviorSubject(this.empty2);
  finished: boolean;
  menuObs: Observable<any[]>;
  public id: string;
  public newId: string;
  public limit: number = 12;
  public offset: number = 0;
  public menu$: Observable<any[]>;
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
    private modalService: NgbModal,
    private toast: ToastrService
    ) {
      this.menuItems;
    }

  ngOnInit(): void {
    this.getMenu(this.offset, this.limit);
    this.initEditForm();
  }

  ngAfterViewInit() {
    this.getNextItems();
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



  open(openDialog:any, menu: any) {
    this.modalService.open(openDialog, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.editForm.setValue({
      id: menu.id,
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

  getMenu(offset: number, limit: number) {
    let newMenu: any[] = [];
    this.menuService.getAllItems(offset, limit)
    .subscribe((res: ApiResponse<Menu>) => {
      if(!res.hasErrors()) {
        this.menuItems = res.data;
        this.menuItems$.next(this.menuItems);
        newMenu.push(this.menuItems);
        this.menu$ = from(newMenu);
      }
    })
  }

  getNextItems() {
    this.menuService.getAllItems(12, 6)
    .subscribe((res: ApiResponse<Menu>) => {
      if(!res.hasErrors()) {
        this.newItems = res.data;
        this.newItems$.next(this.newItems);
      }
    })
  }

  onScrollDown() {
    let final: any[] = [];
    const currentArray = this.menuItems$.getValue();
    const updatedArray = this.newItems$.getValue();
    const finalArray = currentArray.concat(updatedArray)
    final.push(finalArray)
    this.menu$ = from(final);
    // this.menuService.getAllItems(++this.offset, this.limit)
    // .subscribe((res: ApiResponse<Menu>) => {
    //   debugger
    //   if(!res.hasErrors()) {
    //     debugger
    //     this.menuItems = res.data;
    //     this.menuItems$.next(this.newItems);
    //     final.push(...this.menuItems);

    //     this.menu$ = from(final)
    //   }
    // })
  }

  editMenu() {
    this.menuService.updateMenu(this.editForm.value.id, this.editForm.value).subscribe((res: ApiResponse<Menu>) => {
      if(!res.hasErrors()) {
        this.toast.success('Successfully updated menu item', 'Update Menu')
        this.getMenu(this.offset, this.limit);
      }
    });
  }

  saveMenu(data: Menu) {
    return this.menuService.createNewItem(data);
  }

  deleteMenu(menu: Menu) {
    this.menuService.deleteMenuItem(menu.id).subscribe((res: ApiResponse<Menu>) => {
      this.getMenu(this.offset, this.limit);
      this.toast.success('Menu item deletd', 'Delete Menu')
    })
  }
}
