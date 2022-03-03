import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';
import { ApiResponse } from 'src/app/models/response.model';
import { MenuService } from 'src/app/services/menu.service';
import { from, Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from './../modal/modal.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {
  @ViewChild('saveMenuButton') saveMenuButton: ElementRef
  public menuItems: any;
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
  category: string[] = ["Mutton", "Chicken", "Beef", "Rice", "Beverages", "Dessert", "BBQ", "Tandoor", "Starters", "Soup", "Daal", "Sabzi"];

  constructor(
    private menuService: MenuService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toast: ToastrService
    ) {
      this.menuItems;
    }

  ngOnInit(): void {
    this.getMenu();
    this.initEditForm();
  }

  ngAfterViewInit() {
  }

  openMain() {
    this.modalService.open(ModalComponent);
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

  getMenu() {
    let newMenu: any[] = [];
    this.menuService.getAllItems(this.offset, this.limit)
    .subscribe((res: ApiResponse<Menu>) => {
      if(!res.hasErrors()) {
        this.menuItems = res.data;
        newMenu.push(this.menuItems);
        this.menu$ = from(newMenu);
      }
    })
  }

  editMenu() {
    this.menuService.updateMenu(this.editForm.value.id, this.editForm.value).subscribe((res: ApiResponse<Menu>) => {
      if(!res.hasErrors()) {
        this.toast.success('Successfully updated menu item', 'Update Menu')
        this.getMenu();
      }
    });
  }

  saveMenu(data: Menu) {
    return this.menuService.createNewItem(data);
  }

  deleteMenu(menu: Menu) {
    this.menuService.deleteMenuItem(menu.id).subscribe((res: ApiResponse<Menu>) => {
      this.getMenu();
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
            window.alert('Maximum number of files reached') //temporary alert. will replace with toast
          }
        };
      }
    }
  }

}
