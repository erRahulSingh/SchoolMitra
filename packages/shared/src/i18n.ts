export type SupportedLanguage = 'en' | 'hi';

export const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    admission: "Admission Portal",
    students: "Students Directory",
    parents: "Parents Directory",
    teachers: "Teachers & Staff",
    academics: "Academics & Timetable",
    attendance: "Daily Attendance",
    homework: "Homework & Assignments",
    exams: "Exams & Report Cards",
    fees: "Fee Collection",
    transport: "Live Bus Transport",
    library: "Library Catalog",
    inventory: "Inventory & Assets",
    hr: "HR & Staff Payroll",
    communication: "Communication Center",
    reports: "Reports & Analytics",
    settings: "School Settings",
    home: "Home",
    my_child: "My Child",
    live_bus: "Live Bus GPS",
    chat: "Teacher Chat",
    profile: "Profile & Settings",
    present: "PRESENT",
    absent: "ABSENT",
    pay_now: "Pay Fee Online",
    call_driver: "Call Driver",
    emergency_sos: "Emergency SOS"
  },
  hi: {
    dashboard: "डैशबोर्ड",
    admission: "प्रवेश पोर्टल",
    students: "छात्र निर्देशिका",
    parents: "अभिभावक निर्देशिका",
    teachers: "शिक्षक और स्टाफ",
    academics: "अकादमिक और समय सारणी",
    attendance: "दैनिक उपस्थिति",
    homework: "गृहकार्य और असाइनमेंट",
    exams: "परीक्षा और रिपोर्ट कार्ड",
    fees: "शुल्क संग्रह",
    transport: "लाइव बस परिवहन",
    library: "पुस्तकालय सूची",
    inventory: "इन्वेंट्री और संपत्ति",
    hr: "एचआर और वेतन भुगतान",
    communication: "संचार केंद्र",
    reports: "रिपोर्ट और विश्लेषिकी",
    settings: "स्कूल सेटिंग्स",
    home: "होम",
    my_child: "मेरा बच्चा",
    live_bus: "लाइव बस जीपीएस",
    chat: "शिक्षक चैट",
    profile: "प्रोफ़ाइल और सेटिंग्स",
    present: "उपस्थित",
    absent: "अनुपस्थित",
    pay_now: "शुल्क का भुगतान करें",
    call_driver: "ड्राइवर को कॉल करें",
    emergency_sos: "आपातकालीन एसओएस"
  }
};

export const getTranslation = (lang: SupportedLanguage, key: string): string => {
  return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en'][key] || key;
};
