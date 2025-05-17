import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

// Importamos el Pipe para formatear la fecha
import { DateFormatPipe } from '../../pipes/date-format.pipe';
// Importamos el componente modal
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
// Importamos la interfaz y el servicio
import { Notice } from '../../models/notice';
import { NoticeService } from '../../services/notice.service';

@Component({
  selector: 'app-list-notices',
  templateUrl: './list-notices.component.html',
  styleUrls: ['./list-notices.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, DateFormatPipe]
})
export class ListNoticesComponent {
  notices: Notice[] = [];

  constructor(
    private noticeService: NoticeService,
    private modalCtrl: ModalController
  ) {
    this.loadNotices();
  }

  async loadNotices(): Promise<void> {
    this.notices = await this.noticeService.getNotices();
  }

  async confirmDelete(id: number): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ModalConfirmComponent,
      componentProps: { message: '¿Está seguro de eliminar este aviso?' }
    });

    modal.onDidDismiss().then(async (result: any) => {
      if (result.data?.confirm) {
        await this.noticeService.deleteNotice(id);
        this.loadNotices();
      }
    });

    await modal.present();
  }
}
