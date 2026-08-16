const fs = require('fs');

const langs = [
  'en', 'hi', 'as', 'bn', 'brx', 'doi', 'gu', 'kn', 'ks', 'kok', 'mai', 'ml', 'mni', 'mr', 'ne', 'or', 'pa', 'sa', 'sat', 'sd', 'ta', 'te', 'ur'
];

const enDict = {
  nav: {
    home: "Home",
    about: "About",
    products: "Products",
    crops: "Crops",
    dose_calculator: "Dose Calculator",
    dealer_locator: "Dealer Locator",
    contact: "Contact",
    careers: "Careers"
  },
  common: {
    read_more: "Read More",
    view_products: "View Products",
    learn_more: "Learn More",
    submit: "Submit",
    search: "Search",
    calculate: "Calculate",
    reset: "Reset",
    next: "Next",
    back: "Back"
  },
  home: {
    pioneer: "Pioneer in Phosphatic Fertilizers Since 1989 · ISO 9001:2015"
  },
  calc: {
    smart_farming: "Smart Farming",
    title: "Fertilizer Dose Calculator",
    subtitle: "Get precise Annadata fertilizer recommendations based on your crop, growth stage, and land area.",
    step1: "Step 1: Select Crop",
    step2: "Step 2: Calculate Dosage For",
    step3: "Step 3: Crop Stage",
    step4: "Step 4: Land Area",
    choose_crop: "Choose your crop",
    select_app: "Select application type",
    select_stage: "Select growth stage",
    enter_area: "Enter area",
    acre: "Acre",
    hectare: "Hectare",
    btn_calc: "CALCULATE DOSAGE",
    btn_reset: "RESET",
    rec_title: "Recommendations",
    complete_steps: "Complete all steps and click Calculate Dosage to see recommendations.",
    no_rec: "No recommendation available for this combination.",
    contact_support: "Contact our agro-support team for assistance.",
    th_fert: "Fertilizer",
    th_qty: "Quantity",
    lbl_crop: "Crop",
    lbl_app: "Application",
    lbl_stage: "Stage",
    lbl_area: "Land Area"
  }
};

const translations = {
  en: enDict,
  hi: {
    nav: { home: "होम", about: "हमारे बारे में", products: "उत्पाद", crops: "फसलें", dose_calculator: "खुराक कैलकुलेटर", dealer_locator: "डीलर खोजें", contact: "संपर्क करें", careers: "करियर" },
    common: { read_more: "और पढ़ें", view_products: "उत्पाद देखें", learn_more: "और जानें", submit: "जमा करें", search: "खोजें", calculate: "गणना करें", reset: "रीसेट", next: "अगला", back: "वापस" },
    home: { pioneer: "1989 से फॉस्फेटिक उर्वरकों में अग्रणी · ISO 9001:2015" },
    calc: { smart_farming: "स्मार्ट खेती", title: "उर्वरक खुराक कैलकुलेटर", subtitle: "अपनी फसल, विकास चरण और भूमि क्षेत्र के आधार पर सटीक अन्नदाता उर्वरक सिफारिशें प्राप्त करें।", step1: "चरण 1: फसल चुनें", step2: "चरण 2: इसके लिए खुराक की गणना करें", step3: "चरण 3: फसल का चरण", step4: "चरण 4: भूमि का क्षेत्रफल", choose_crop: "अपनी फसल चुनें", select_app: "आवेदन प्रकार चुनें", select_stage: "विकास चरण चुनें", enter_area: "क्षेत्रफल दर्ज करें", acre: "एकड़", hectare: "हेक्टेयर", btn_calc: "खुराक की गणना करें", btn_reset: "रीसेट", rec_title: "सिफारिशें", complete_steps: "सिफारिशें देखने के लिए सभी चरण पूरे करें और 'खुराक की गणना करें' पर क्लिक करें।", no_rec: "इस संयोजन के लिए कोई सिफारिश उपलब्ध नहीं है।", contact_support: "सहायता के लिए हमारी कृषि-सहायता टीम से संपर्क करें।", th_fert: "उर्वरक", th_qty: "मात्रा", lbl_crop: "फसल", lbl_app: "आवेदन", lbl_stage: "चरण", lbl_area: "भूमि का क्षेत्रफल" }
  },
  pa: {
    nav: { home: "ਮੁੱਖ ਪੰਨਾ", about: "ਸਾਡੇ ਬਾਰੇ", products: "ਉਤਪਾਦ", crops: "ਫਸਲਾਂ", dose_calculator: "ਖੁਰਾਕ ਕੈਲਕੁਲੇਟਰ", dealer_locator: "ਡੀਲਰ ਲੱਭੋ", contact: "ਸੰਪਰਕ", careers: "ਕਰੀਅਰ" },
    common: { read_more: "ਹੋਰ ਪੜ੍ਹੋ", view_products: "ਉਤਪਾਦ ਦੇਖੋ", learn_more: "ਹੋਰ ਜਾਣੋ", submit: "ਜਮ੍ਹਾਂ ਕਰੋ", search: "ਖੋਜ", calculate: "ਗਣਨਾ ਕਰੋ", reset: "ਰੀਸੈਟ", next: "ਅਗਲਾ", back: "ਪਿੱਛੇ" },
    home: { pioneer: "1989 ਤੋਂ ਫਾਸਫੇਟਿਕ ਖਾਦਾਂ ਵਿੱਚ ਮੋਹਰੀ · ISO 9001:2015" },
    calc: { smart_farming: "ਸਮਾਰਟ ਖੇਤੀ", title: "ਖਾਦ ਖੁਰਾਕ ਕੈਲਕੁਲੇਟਰ", subtitle: "ਆਪਣੀ ਫਸਲ, ਵਿਕਾਸ ਪੜਾਅ ਅਤੇ ਜ਼ਮੀਨ ਦੇ ਖੇਤਰ ਦੇ ਅਧਾਰ ਤੇ ਸਟੀਕ ਅੰਨਦਾਤਾ ਖਾਦ ਦੀਆਂ ਸਿਫਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰੋ।", step1: "ਕਦਮ 1: ਫਸਲ ਚੁਣੋ", step2: "ਕਦਮ 2: ਲਈ ਖੁਰਾਕ ਦੀ ਗਣਨਾ ਕਰੋ", step3: "ਕਦਮ 3: ਫਸਲ ਦਾ ਪੜਾਅ", step4: "ਕਦਮ 4: ਜ਼ਮੀਨ ਦਾ ਖੇਤਰਫਲ", choose_crop: "ਆਪਣੀ ਫਸਲ ਚੁਣੋ", select_app: "ਐਪਲੀਕੇਸ਼ਨ ਕਿਸਮ ਚੁਣੋ", select_stage: "ਵਿਕਾਸ ਪੜਾਅ ਚੁਣੋ", enter_area: "ਖੇਤਰਫਲ ਦਾਖਲ ਕਰੋ", acre: "ਏਕੜ", hectare: "ਹੈਕਟੇਅਰ", btn_calc: "ਖੁਰਾਕ ਦੀ ਗਣਨਾ ਕਰੋ", btn_reset: "ਰੀਸੈਟ", rec_title: "ਸਿਫਾਰਸ਼ਾਂ", complete_steps: "ਸਿਫਾਰਸ਼ਾਂ ਦੇਖਣ ਲਈ ਸਾਰੇ ਕਦਮ ਪੂਰੇ ਕਰੋ ਅਤੇ 'ਖੁਰਾਕ ਦੀ ਗਣਨਾ ਕਰੋ' 'ਤੇ ਕਲਿੱਕ ਕਰੋ।", no_rec: "ਇਸ ਸੁਮੇਲ ਲਈ ਕੋਈ ਸਿਫਾਰਸ਼ ਉਪਲਬਧ ਨਹੀਂ ਹੈ।", contact_support: "ਸਹਾਇਤਾ ਲਈ ਸਾਡੀ ਐਗਰੋ-ਸਹਾਇਤਾ ਟੀਮ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।", th_fert: "ਖਾਦ", th_qty: "ਮਾਤਰਾ", lbl_crop: "ਫਸਲ", lbl_app: "ਐਪਲੀਕੇਸ਼ਨ", lbl_stage: "ਪੜਾਅ", lbl_area: "ਜ਼ਮੀਨ ਦਾ ਖੇਤਰਫਲ" }
  },
  ta: {
    nav: { home: "முகப்பு", about: "எங்களை பற்றி", products: "தயாரிப்புகள்", crops: "பயிர்கள்", dose_calculator: "அளவு கால்குலேட்டர்", dealer_locator: "டீலரைத் தேடு", contact: "தொடர்பு கொள்ள", careers: "வேலைவாய்ப்புகள்" },
    common: { read_more: "மேலும் படிக்க", view_products: "தயாரிப்புகளைக் காண்க", learn_more: "மேலும் அறிய", submit: "சமர்ப்பி", search: "தேடு", calculate: "கணக்கிடு", reset: "மீட்டமை", next: "அடுத்து", back: "பின்" },
    home: { pioneer: "1989 முதல் பாஸ்பேடிக் உரங்களில் முன்னோடி · ISO 9001:2015" },
    calc: { smart_farming: "ஸ்மார்ட் விவசாயம்", title: "உர அளவு கால்குலேட்டர்", subtitle: "உங்கள் பயிர், வளர்ச்சி நிலை மற்றும் நிலப்பரப்பு அடிப்படையில் துல்லியமான அன்னதாதா உர பரிந்துரைகளைப் பெறுங்கள்.", step1: "படி 1: பயிரைத் தேர்ந்தெடுக்கவும்", step2: "படி 2: இதற்கான அளவைக் கணக்கிடு", step3: "படி 3: பயிர் நிலை", step4: "படி 4: நிலப்பரப்பு", choose_crop: "உங்கள் பயிரைத் தேர்வுசெய்க", select_app: "பயன்பாட்டு வகையைத் தேர்வுசெய்க", select_stage: "வளர்ச்சி நிலையைத் தேர்வுசெய்க", enter_area: "பரப்பளவை உள்ளிடவும்", acre: "ஏக்கர்", hectare: "ஹெக்டேர்", btn_calc: "அளவைக் கணக்கிடு", btn_reset: "மீட்டமை", rec_title: "பரிந்துரைகள்", complete_steps: "பரிந்துரைகளைக் காண அனைத்து படிகளையும் முடித்து 'கணக்கிடு' என்பதைக் கிளிக் செய்யவும்.", no_rec: "இந்த கலவைக்கு எந்த பரிந்துரையும் இல்லை.", contact_support: "உதவிக்கு எங்கள் வேளாண் ஆதரவுக் குழுவைத் தொடர்பு கொள்ளவும்.", th_fert: "உரம்", th_qty: "அளவு", lbl_crop: "பயிர்", lbl_app: "பயன்பாடு", lbl_stage: "நிலை", lbl_area: "நிலப்பரப்பு" }
  },
  te: {
    nav: { home: "హోమ్", about: "మా గురించి", products: "ఉత్పత్తులు", crops: "పంటలు", dose_calculator: "డోస్ కాలిక్యులేటర్", dealer_locator: "డీలర్ లొకేటర్", contact: "సంప్రదించండి", careers: "కెరీర్‌లు" },
    common: { read_more: "మరింత చదవండి", view_products: "ఉత్పత్తులను చూడండి", learn_more: "మరింత తెలుసుకోండి", submit: "సమర్పించండి", search: "శోధించండి", calculate: "లెక్కించండి", reset: "రీసెట్", next: "తదుపరి", back: "వెనుకకు" },
    home: { pioneer: "1989 నుండి ఫాస్ఫాటిక్ ఎరువులలో అగ్రగామి · ISO 9001:2015" },
    calc: { smart_farming: "స్మార్ట్ ఫార్మింగ్", title: "ఎరువుల మోతాదు కాలిక్యులేటర్", subtitle: "మీ పంట, వృద్ధి దశ మరియు భూమి విస్తీర్ణం ఆధారంగా ఖచ్చితమైన అన్నదాత ఎరువుల సిఫార్సులను పొందండి.", step1: "దశ 1: పంటను ఎంచుకోండి", step2: "దశ 2: దీనికి మోతాదును లెక్కించండి", step3: "దశ 3: పంట దశ", step4: "దశ 4: భూమి విస్తీర్ణం", choose_crop: "మీ పంటను ఎంచుకోండి", select_app: "అప్లికేషన్ రకాన్ని ఎంచుకోండి", select_stage: "వృద్ధి దశను ఎంచుకోండి", enter_area: "విస్తీర్ణాన్ని నమోదు చేయండి", acre: "ఎకరం", hectare: "హెక్టార్", btn_calc: "మోతాదును లెక్కించండి", btn_reset: "రీసెట్", rec_title: "సిఫార్సులు", complete_steps: "సిఫార్సులను చూడటానికి అన్ని దశలను పూర్తి చేసి 'మోతాదును లెక్కించండి' క్లిక్ చేయండి.", no_rec: "ఈ కలయికకు ఎటువంటి సిఫార్సు అందుబాటులో లేదు.", contact_support: "సహాయం కోసం మా వ్యవసాయ మద్దతు బృందాన్ని సంప్రదించండి.", th_fert: "ఎరువులు", th_qty: "పరిమాణం", lbl_crop: "పంట", lbl_app: "అప్లికేషన్", lbl_stage: "దశ", lbl_area: "భూమి విస్తీర్ణం" }
  },
  mr: {
    nav: { home: "मुख्यपृष्ठ", about: "आमच्याबद्दल", products: "उत्पादने", crops: "पिके", dose_calculator: "डोस कॅल्क्युलेटर", dealer_locator: "डीलर लोकेटर", contact: "संपर्क", careers: "करिअर" }
  },
  gu: {
    nav: { home: "મુખ્ય પૃષ્ઠ", about: "અમારા વિશે", products: "ઉત્પાદનો", crops: "પાક", dose_calculator: "ડોઝ કેલ્ક્યુલેટર", dealer_locator: "ડીલર લોકેટર", contact: "સંપર્ક", careers: "કારકિર્દી" }
  },
  bn: {
    nav: { home: "হোম", about: "আমাদের সম্পর্কে", products: "পণ্য", crops: "ফসল", dose_calculator: "ডোজ ক্যালকুলেটর", dealer_locator: "ডিলার খুঁজুন", contact: "যোগাযোগ", careers: "ক্যারিয়ার" }
  },
  kn: {
    nav: { home: "ಮುಖಪುಟ", about: "ನಮ್ಮ ಬಗ್ಗೆ", products: "ಉತ್ಪನ್ನಗಳು", crops: "ಬೆಳೆಗಳು", dose_calculator: "ಡೋಸ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್", dealer_locator: "ಡೀಲರ್ ಲೋಕೇಟರ್", contact: "ಸಂಪರ್ಕಿಸಿ", careers: "ವೃತ್ತಿಜೀವನ" }
  },
  ml: {
    nav: { home: "ഹോം", about: "ഞങ്ങളെക്കുറിച്ച്", products: "ഉൽപ്പന്നങ്ങൾ", crops: "വിളകൾ", dose_calculator: "ഡോസ് കാൽക്കുലേറ്റർ", dealer_locator: "ഡീലർ ലൊക്കേറ്റർ", contact: "ബന്ധപ്പെടുക", careers: "കരിയറുകൾ" }
  },
  or: {
    nav: { home: "ହୋମ୍", about: "ଆମ ବିଷୟରେ", products: "ଉତ୍ପାଦ", crops: "ଫସଲ", dose_calculator: "ଡୋଜ୍ କାଲକୁଲେଟର", dealer_locator: "ଡିଲର୍ ଖୋଜନ୍ତୁ", contact: "ଯୋଗାଯୋଗ", careers: "କ୍ୟାରିୟର୍ସ" }
  },
  as: {
    nav: { home: "প্ৰধান পৃষ্ঠা", about: "আমাৰ বিষয়ে", products: "সামগ্ৰী", crops: "শস্য", dose_calculator: "ড’জ কেলকুলেটৰ", dealer_locator: "ডিলাৰ বিচাৰক", contact: "যোগাযোগ", careers: "কেৰিয়াৰ" }
  },
  ur: {
    nav: { home: "ہوم", about: "ہمارے بارے میں", products: "مصنوعات", crops: "فصلیں", dose_calculator: "ڈوز کیلکولیٹر", dealer_locator: "ڈیلر لوکیٹر", contact: "رابطہ", careers: "کیریئرز" }
  }
};

// Fill missing languages with english structure
langs.forEach(l => {
  if (!translations[l]) {
    translations[l] = { ...enDict };
  } else {
    // deep merge missing keys with english
    for (const key in enDict) {
      if (!translations[l][key]) {
        translations[l][key] = enDict[key];
      } else {
        for (const subKey in enDict[key]) {
          if (!translations[l][key][subKey]) {
            translations[l][key][subKey] = enDict[key][subKey];
          }
        }
      }
    }
  }
});

const content = `export type LanguageCode = '${langs.join("' | '")}';\n\nexport const dictionaries: Record<string, any> = ${JSON.stringify(translations, null, 2)};\n`;

fs.writeFileSync('lib/translations/dictionaries.ts', content);
console.log('Dictionaries generated.');
