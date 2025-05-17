import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { NoticeService } from '../../services/notice.service';

@Component({
  selector: 'app-create-notice',
  templateUrl: './create-notice.component.html',
  styleUrls: ['./create-notice.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class CreateNoticeComponent {
  noticeForm: FormGroup;
  submitted = false;
  photo: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private noticeService: NoticeService,
    private alertCtrl: AlertController,
    private router: Router
  ) {
    this.noticeForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  get f() {
    // Se declara que f es un objeto indexado con claves de string y valores AbstractControl
    return this.noticeForm.controls;
  }

  async capturePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });
      this.photo = 'data:image/jpeg;base64,' + image.base64String;
    } catch (error) {
      console.error('Error al capturar la foto:', error);
    }
  }

  async onSubmit() {
    this.submitted = true;
    if (this.noticeForm.invalid) return;

    // Se corrige el acceso a las propiedades con notación de corchetes
    const newNotice = {
      id: new Date().getTime(),
      title: this.f['title'].value,
      description: this.f['description'].value,
      date: new Date(), // fecha actual
      // Se asigna undefined si this.photo es null, para ajustar el tipo a string | undefined
      image: this.photo ? this.photo : undefined 
      // O alternativamente: image: this.photo ?? undefined
    };

    await this.noticeService.saveNotice(newNotice);

    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'Aviso guardado correctamente',
      buttons: ['Ok']
    });
    await alert.present();

    // Reiniciar el formulario y redirigir
    this.noticeForm.reset();
    this.submitted = false;
    this.photo = null;
    this.router.navigate(['/list-notices']);
  }
}
