import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() id;
  @Input() title: string;
  modalActionSubject = new Subject<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onConfirm() {
    this.modalActionSubject.next('confirm');
  }

  onClose() {
    this.modalActionSubject.next('close');
  }

}
