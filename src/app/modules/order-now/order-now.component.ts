import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Stepper from 'bs-stepper';
import { Order } from './../../models/order.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-order-now',
  templateUrl: './order-now.component.html',
  styleUrls: ['./order-now.component.scss']
})
export class OrderNowComponent implements OnInit {
  private stepper: Stepper;
  categories = [
    { id:1, img: '../../../assets/chicken.svg', name:'Chicken' },
    { id:2, img: '../../../assets/goat.svg', name:'Mutton' },
    { id:3, img: '../../../assets/cow.svg', name:'Beef' },
    { id:4, img: '../../../assets/grill.svg', name:'BBQ' },
    { id:5, img: '../../../assets/drink.svg', name:'Beverages' },
    { id:6, img: '../../../assets/vegetables-svgrepo-com.svg', name:'Sabzi' },
    { id:7, img: '../../../assets/rice.svg', name:'Rice' },
    { id:8, img: '../../../assets/bread.svg', name:'Tandoor' },
    { id:9, img: '../../../assets/dessert.svg', name:'Desserts' },
  ];

  temporaries = [
    { id: 1, name: 'Chicken Karahi', price: 'Rs. 365', description: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum', category: 'Chicken'},
    { id: 2, name: 'Chicken Makhni', price: 'Rs. 365', description: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum', category: 'Chicken'},
    { id: 3, name: 'Chicken Rice', price: 'Rs. 365', description: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum', category: 'Chicken'},
    { id: 4, name: 'Chicken Dessert', price: 'Rs. 365', description: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum', category: 'Chicken'},
    { id: 5, name: 'Chicken BBQ', price: 'Rs. 365', description: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum', category: 'Chicken'},
    { id: 6, name: 'Chicken KIKI', price: 'Rs. 365', description: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum', category: 'Chicken'}
  ]

  stepperForm: FormGroup;
  formValue: BehaviorSubject<any> = new BehaviorSubject({})

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.stepper = new Stepper(document.querySelector<Element | any>('#stepper1'), {
      linear: true,
      animation: true
    })

    this.initStepperForm();
  }

  initStepperForm() {
    this.stepperForm = this.fb.group({
      itemName: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      price: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      cardNo: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      category: [
        null,
        Validators.compose([
          Validators.required
        ])
      ],
      address: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      buyerName: [
        '',
        Validators.compose([
          Validators.required
        ])
      ]
    })
  }

  next() {
    this.stepper.next();
  }

  back() {
    this.stepper.previous();
  }

  get f() {
    return this.stepperForm.controls;
  }

  onSubmit() {
    const result: {
      [key: string]: string;
    } = {};
    Object.keys(this.f).forEach((key) => {
      result[key] = this.f[key].value;
    });
    const newModel = new Order();
    newModel.setModel(result);
  }

}
