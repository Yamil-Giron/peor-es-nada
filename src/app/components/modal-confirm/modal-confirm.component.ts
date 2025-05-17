import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ModalConfirmComponent {
  @Input() message: string = '¿Confirmar acción?';

  constructor(private modalCtrl: ModalController) {}

  dismiss(confirm: boolean) {
    this.modalCtrl.dismiss({ confirm });
  }
}
