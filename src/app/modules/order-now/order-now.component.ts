import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Stepper from 'bs-stepper';
import { Order } from './../../models/order.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    { id: 2, name: 'Chicken Makhni', price: 'Rs. 365', description: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum', category: 'Chicken'}
  ]

  public defaultStepper: Order = {
    itemName: '',
    price: '',
    cardNo: '',
    category: '',
    address: '',
    buyerName: '',
    quantity: ''
  }
  stepperForm: FormGroup;

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
        this.defaultStepper.itemName,
        Validators.compose([
          Validators.required
        ])
      ],
      price: [
        this.defaultStepper.price,
        Validators.compose([
          Validators.required
        ])
      ],
      cardNo: [
        this.defaultStepper.cardNo,
        Validators.compose([
          Validators.required
        ])
      ],
      category: [
        this.defaultStepper.category,
        Validators.compose([
          Validators.required
        ])
      ],
      address: [
        this.defaultStepper.address,
        Validators.compose([
          Validators.required
        ])
      ],
      buyerName: [
        this.defaultStepper.buyerName,
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
  }

}
