import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalConfig } from 'src/app/models/modal.config';
import { CustomModalComponent } from 'src/app/reusables/custom-modal/custom-modal.component';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {

  @ViewChild('modal') private modal: CustomModalComponent
  @Output()
  modalEvent: EventEmitter<CustomModalComponent> = new EventEmitter<CustomModalComponent>();

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

  constructor() { }

  ngOnInit(): void {
  }

  async openModal() {
    return this.modalEvent.emit(this.modal);
  }

}
