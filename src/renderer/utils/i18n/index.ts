import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        editor: {
          btn: {
            cancel: 'Cancel',
            done: 'Done',
          },
          draw: 'Draw',
          stickers: 'Stickers',
        },
        print: {
          uploadTitle: 'Your Photos is now uploading',
          uploadDesc: 'you can download your photos at the qrcode below',
          btn: {
            print: 'Print',
            close: 'Close',
          },
        },
        setting: {
          title: 'Settings',
          general: {
            title: 'General',
            photosDir: 'Photo directory',
            language: 'Language',
            remains: 'Print Remains',
            printers: 'Printers',
          },
          theme: {
            title: 'Theme',
            primary: 'Primary color',
            secondary: 'Secondary color',
            background: 'Background color',
            text: 'Text color',
          },
        },
      },
    },
    th: {
      translation: {
        editor: {
          btn: {
            cancel: 'ยกเลิก',
            done: 'เสร็จสิ้น',
          },
          draw: 'วาด',
          stickers: 'สติกเกอร์',
        },
        print: {
          uploadTitle: 'รูปของคุณกำลังอัพโหลด',
          uploadDesc: 'คุณสามารถโหลดรูปของคุณได้ที่รหัส QR ด้านล่าง',
          btn: {
            print: 'ปริ้นท์',
            close: 'ปิด',
          },
        },
        setting: {
          title: 'ตั้งค่า',
          general: {
            title: 'ทั่วไป',
            photosDir: 'โฟลเดอร์รูป',
            language: 'ภาษา',
            remains: 'ปริ้นท์ได้อีก',
            printers: 'ปริ้นเตอร์',
          },
          theme: {
            title: 'ธีม',
            primary: 'สีหลัก',
            secondary: 'สีรอง',
            background: 'สีพื้นหลัง',
            text: 'สีตัวหนังสือ',
          },
        },
      },
    },
  },
});

export default i18n;
