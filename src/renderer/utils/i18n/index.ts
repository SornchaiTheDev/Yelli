import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'th',
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
          not_supported: 'Does not support this file type',
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
            setTheme: 'Set Theme',
            revert: 'Revert',
          },
          stickers: {
            title: 'Stickers',
            initial: 'Click or Drag and Drop Sticker here',
            drop: 'Drop to import',
          },
          watermark: {
            title: 'Watermark',
            initial: 'Click or Drag and Drop Watermark here',
            drop: 'Drop to import',
          },
          event: {
            title: 'Event',
            createEvent: {
              title: 'Event Name',
              btn: 'Create Event',
            },
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
          draw: 'ปากกา',
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
          not_supported: 'ไม่รองรับไฟล์ประเภทนี้',
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
            setTheme: 'ตั้งค่าธีม',
            revert: 'ยกเลิก',
          },
          stickers: {
            title: 'สติกเกอร์',
            initial: 'แตะ หรือ ลากเพื่อวาง',
            drop: 'ปล่อยได้เลย',
          },
          watermark: {
            title: 'ลายน้ำ',
            initial: 'แตะ หรือ ลากเพื่อวาง',
            drop: 'ปล่อยได้เลย',
          },
          event: {
            title: 'งาน',
            createEvent: {
              title: 'ชื่องาน',
              btn: 'สร้างงาน',
            },
          },
          inEvent: {
            photo: 'รูป',
          },
        },
      },
    },
  },
});

export default i18n;
