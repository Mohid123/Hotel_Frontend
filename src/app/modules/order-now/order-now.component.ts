import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
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
  crusts = [
    { id:1, img: '../../../assets/pizza.svg', name:'Thin' },
    { id:2, img: '../../../assets/pizza-original.svg', name:'Original' },
    { id:3, img: '../../../assets/frying.svg', name:'Skillet' },
    { id:4, img: '../../../assets/grill.svg', name:'BBQ' },
    { id:5, img: '../../../assets/castle.svg', name:'Neapolitan' },
    { id:6, img: '../../../assets/city.svg', name:'New-Yorker' },
    { id:7, img: '../../../assets/cracker.svg', name:'Cracker' },
    { id:8, img: '../../../assets/bread.svg', name:'Flat Bread' },
    { id:9, img: '../../../assets/extra.svg', name:'Extra-Filling' },
  ];

  stepperForm: FormGroup;
  formValue: BehaviorSubject<any> = new BehaviorSubject({});
  value = 0;
  prices = [
    { size: 'Extra Small (8-10")', price: 250 },
    { size: 'Small (12")', price: 400 },
    { size: 'Medium (14")', price: 650 },
    { size: 'Large (16")', price: 850 },
    { size: 'Extra Large (18")', price: 1250 },
    { size: 'Party (22")', price: 1700 },
  ]
  lastPage: boolean = false;


  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.stepper = new Stepper(document.querySelector<Element | any>('#stepper1'), {
      linear: true,
      animation: true
    })

    this.initStepperForm();
  }

  initStepperForm() {
    this.stepperForm = this.fb.group({
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
      ],
      crust: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      topping: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      sauce: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      meatToppings: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      size: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      quantity: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      cashPayment: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      expiryDate: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      checkBox: [ false ]
    })
  }

  next() {
    this.stepper.next();
  }

  lastNext() {
    this.lastPage = true;
    this.stepper.next();
  }

  back() {
    this.stepper.previous();
  }

  get f() {
    return this.stepperForm.controls;
  }

  disableCheckBox() {
    const checkA = document.querySelector<Element | any>('#specialCheck');
    const checkB = document.querySelector<Element | any>('#specialChecked');

    if(checkA.checked == true) {
      checkB.disabled = true;
    }
    else if(checkB.checked == true) {
      checkA.disabled = true;
    }
    else if(checkA.checked == false || checkB.checked == false) {
      checkA.disabled = false;
      checkB.disabled = false
    }
  }

  handleMinus() {
    this.value--;
  }

  handlePlus() {
    this.value++;
  }

  onSubmit() {
    debugger
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
