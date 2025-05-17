import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Notice } from '../models/notice';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  private storageKey = 'notices';

  async getNotices(): Promise<Notice[]> {
    const { value } = await Preferences.get({ key: this.storageKey });
    return value ? (JSON.parse(value) as Notice[]) : [];
  }

  async saveNotice(notice: Notice): Promise<void> {
    const notices = await this.getNotices();
    notices.push(notice);
    await Preferences.set({ key: this.storageKey, value: JSON.stringify(notices) });
  }

  async deleteNotice(id: number): Promise<void> {
    let notices = await this.getNotices();
    notices = notices.filter(n => n.id !== id);
    await Preferences.set({ key: this.storageKey, value: JSON.stringify(notices) });
  }
}
