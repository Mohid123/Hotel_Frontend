import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { exhaustMap, fromEvent } from 'rxjs';
import { ImagePostService } from './../../services/image-post.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild('saveMenuButton') saveMenuButton: ElementRef
  category: string[] = ["Mutton", "Chicken", "Beef", "Rice", "Beverages", "Dessert", "BBQ", "Tandoor", "Starters", "Soup", "Daal", "Sabzi"];
  Sizes: string[] = ["Full", "Half", "1 per person", "6 Pieces", "8 Pieces"];
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
  public menuItems: any;
  menuForm: FormGroup;
  multiples: any[] = [];
  urls: any[] = [];
  file: any;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private imageService: ImagePostService) { }

  ngOnInit(): void {
    this.initMenuForm();
  }

  ngAfterViewInit() {
    fromEvent(this.saveMenuButton.nativeElement, 'click').pipe(
      exhaustMap(() => this.saveMenu(this.menuForm.value)),
    ).subscribe(() => {
      this.resetMenuForm();
      this.activeModal.close();
    })
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

  resetMenuForm() {
    this.menuForm.reset();
    this.defaultMenu = new Menu();
  }

  async saveMenu(data: Menu) {
    return await this.imageService.uploadImage(this.urls, data.description, data.itemName, data.price, data.servingSize, data.category)
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

  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      return false;
    }
    return true;
  }

}
