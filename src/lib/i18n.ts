/**
 * i18n — Premium multilingual system
 * 7 languages: English, French, Arabic, Spanish, Italian, German, Urdu
 * Each language is written for its register, not translated literally.
 */

export type LangCode = 'en' | 'fr' | 'ar' | 'es' | 'it' | 'de' | 'ur' | 'zh'

export interface LangMeta {
  code: LangCode
  label: string         // Display label in the switcher
  abbr: string          // Short abbreviation for compact display
  dir: 'ltr' | 'rtl'
  script: string        // Script name for font-loading hint
}

export const LANGUAGES: LangMeta[] = [
  { code: 'en', label: 'English',   abbr: 'EN', dir: 'ltr', script: 'latin'    },
  { code: 'fr', label: 'Français',  abbr: 'FR', dir: 'ltr', script: 'latin'    },
  { code: 'ar', label: 'العربية',   abbr: 'AR', dir: 'rtl', script: 'arabic'   },
  { code: 'es', label: 'Español',   abbr: 'ES', dir: 'ltr', script: 'latin'    },
  { code: 'it', label: 'Italiano',  abbr: 'IT', dir: 'ltr', script: 'latin'    },
  { code: 'de', label: 'Deutsch',   abbr: 'DE', dir: 'ltr', script: 'latin'    },
  { code: 'ur', label: 'اردو',      abbr: 'UR', dir: 'rtl', script: 'arabic'   },
  { code: 'zh', label: '中文',       abbr: '中', dir: 'ltr', script: 'chinese'  },
]

export type Translations = {
  nav: {
    proposition: string
    origins: string
    practice: string
    thought: string
    forum: string
    academy: string
    addresses: string
    skillscape: string
    conversations: string
    truthLens: string
    contact: string
    harvics: string
    intelligence: string
  }
  hero: {
    eyebrow: string
    heading: string
    body: string
    cta1: string
    cta2: string
    pill: string
    quote: string
    quoteSupport: string
    statConferences: string
    statYears: string
    statDomains: string
    statOrganisations: string
  }
  about: {
    eyebrow: string
    heading: string
    para1: string
    para2: string
    ctaWork: string
    ctaContact: string
  }
  work: {
    heading: string
    subheading: string
  }
  insights: {
    heading: string
    subheading: string
  }
  speaking: {
    heading: string
    subheading: string
    availability: string
  }
  training: {
    heading: string
    para1: string
    para2: string
    cta: string
  }
  talks: {
    heading: string
    subheading: string
  }
  truth: {
    heading: string
    subheading: string
  }
  record: {
    heading: string
    subheading: string
    verifiedLabel: string
  }
  harvics: {
    heading: string
    subheading: string
    body: string
  }
  intelligence: {
    heading: string
    subheading: string
    body: string
  }
  contact: {
    heading: string
    subheading: string
    namePlaceholder: string
    emailPlaceholder: string
    messagePlaceholder: string
    send: string
  }
  ui: {
    classicView: string
    adaptedFor: string
    simplify: string
    dismiss: string
    readingTime: string
    harvicsNav: string
    intelligenceNav: string
  }
  consent: {
    body: string
    noTrackers: string
    decline: string
    allow: string
  }
  privacy: {
    trigger: string
    label: string
    heading: string
    body: string
    localAnalytics: string
    storedBrowser: string
    export: string
    deleteData: string
    deleted: string
  }
  chat: {
    welcome: string
    reply1: string
    reply2: string
    reply3: string
    reply4: string
  }
  shortcuts: {
    title: string
    home: string
    about: string
    work: string
    contact: string
    top: string
    bottom: string
  }
}

const translations: Record<LangCode, Translations> = {

  // ── ENGLISH — primary prestige ─────────────────────────────────────────────
  en: {
    nav: {
      proposition: 'Proposition', origins: 'Origins', practice: 'Practice',
      thought: 'Thought', forum: 'Forum', academy: 'Academy',
      addresses: 'Addresses', skillscape: 'Skillscape',
      conversations: 'Conversations', truthLens: 'Truth Lens', contact: 'Contact',
      harvics: 'Harvics', intelligence: 'Intelligence',
    },
    hero: {
      eyebrow: 'Lawyer · Trader · Architect · Strategist',
      heading: 'Mian Muhammad Usman.',
      body: 'The law disciplined the reason.\nThe markets disciplined the nerve.\nThe rest was left to consequence.',
      cta1: 'The record', cta2: 'Open a conversation',
      pill: 'One formation. Every domain.',
      quote: 'The law disciplined the reason. The markets disciplined the nerve. The rest was left to consequence.',
      quoteSupport: 'Fifteen years. Six domains. One governing temperament.',
      statConferences: 'Conferences',
      statYears: 'Years',
      statDomains: 'Domains',
      statOrganisations: 'Organisations',
    },
    about: {
      eyebrow: 'Formation',
      heading: 'Formed in law.\nHardened in markets.\nDeployed where it was required.',
      para1: 'Law was not a profession. It was the first instrument of formation — a discipline in reading obligation, consequence, and power before others had named the question. Capital markets completed the education: every illusion was priced, every error was cleared, and what could not survive contact with reality did not survive.',
      para2: 'What followed — across retail operations, energy fields, political corridors, fashion production, and institutional advisory — was not accumulation. It was application. The same disposition, tested in every register of commerce and consequence. The pattern did not vary. The formation held.',
      ctaWork: 'Explore the work',
      ctaContact: 'Get in touch',
    },
    work: {
      heading: 'Where the work was applied.',
      subheading: 'Ten domains. Eighteen years. No proxies.',
    },
    insights: {
      heading: 'Convictions.',
      subheading: 'Not commentary. Positions held — formed in boardrooms, trading floors, political offices and on production stages.',
    },
    speaking: {
      heading: 'Speaking & Advisory',
      subheading: 'He speaks on what he has personally operated — not trends read about, but systems built, broken and rebuilt. Conferences, leadership summits, private executive sessions.',
      availability: 'Available on invitation · Enquiries via contact',
    },
    training: {
      heading: 'Programs & Training',
      para1: 'Built for senior teams who are finished with generic frameworks. For leaders who want to think through real problems with someone who has actually solved them.',
      para2: 'Every program is built around your organisation\'s actual situation. No pre-packaged slides. No theory without the scar tissue behind it.',
      cta: 'Discuss a program',
    },
    talks: {
      heading: 'Talks & Keynotes',
      subheading: 'Three addresses built from direct experience. Each one designed for rooms where real decisions are made.',
    },
    truth: {
      heading: 'Every claim\nis verifiable.',
      subheading: 'Hover or tap any figure. No inflation. No marketing copy. What happened.',
    },
    record: {
      heading: 'The public record.',
      subheading: 'Documented engagements, keynote addresses, and institutional appearances. A record built in rooms where things were decided.',
      verifiedLabel: 'Verified record',
    },
    harvics: {
      heading: 'Harvics.',
      subheading: 'An institution built on the conviction that advisory must be earned — not credentialed.',
      body: 'Harvics is the institutional expression of a career spent inside real operations. It exists to deliver thinking that has been tested — not synthesised from theory.',
    },
    intelligence: {
      heading: 'Applied intelligence.',
      subheading: 'Research, analysis and structured thinking — produced from inside the industries, not from the outside looking in.',
      body: 'Pattern recognition trained across six distinct operational environments. The analysis produced here is not academic. It is the product of direct consequence.',
    },
    contact: {
      heading: 'Open a conversation.',
      subheading: 'For speaking, advisory or collaboration. You will receive a personal response.',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'Your email',
      messagePlaceholder: 'Your message',
      send: 'Send',
    },
    ui: {
      classicView: '◈ Classic',
      adaptedFor: 'Adapted for',
      simplify: 'Simplify',
      dismiss: 'Dismiss',
      readingTime: 'min read',
      harvicsNav: 'Harvics',
      intelligenceNav: 'Intelligence',
    },
    consent: {
      body: 'This site uses local-only analytics — stored in your browser, never sent anywhere.',
      noTrackers: 'No third-party trackers.',
      decline: 'Decline',
      allow: 'Allow local analytics',
    },
    privacy: {
      trigger: 'Privacy settings',
      label: 'Privacy settings',
      heading: 'Your data. Your choice.',
      body: 'This site uses local-only analytics — events are stored in your browser only. Nothing is sent to any external server. No cookies. No third-party trackers.',
      localAnalytics: 'Local analytics',
      storedBrowser: 'Stored in your browser only',
      export: 'Export my data',
      deleteData: 'Delete all data',
      deleted: 'Data deleted ✓',
    },
    chat: {
      welcome: "Hi! Ask me anything about Mian's work, speaking topics, experience, or how to get in touch.",
      reply1: 'Who is Mian?',
      reply2: 'Speaking topics',
      reply3: 'How to contact?',
      reply4: 'Advisory services',
    },
    shortcuts: {
      title: 'Keyboard Shortcuts',
      home: 'Home / Hero',
      about: 'About',
      work: 'Work',
      contact: 'Contact',
      top: 'Scroll to top',
      bottom: 'Scroll to bottom',
    },
  },

  fr: {
    nav: {
      proposition: 'Proposition', origins: 'Origines', practice: 'Pratique',
      thought: 'Pensée', forum: 'Forum', academy: 'Académie',
      addresses: 'Adresses', skillscape: 'Domaines',
      conversations: 'Entretiens', truthLens: 'Vérité', contact: 'Contact',
      harvics: 'Harvics', intelligence: 'Intelligence',
    },
    hero: {
      eyebrow: 'Juriste · Trader · Architecte · Stratège',
      heading: 'Mian Muhammad Usman.',
      body: 'La loi a discipliné la raison.\nLes marchés ont discipliné le nerf.\nLe reste a été laissé à la conséquence.',
      cta1: 'L\'œuvre', cta2: 'Ouvrir un entretien',
      pill: 'Une formation. Chaque domaine.',
      quote: 'La loi a discipliné la raison. Les marchés ont discipliné le nerf. Le reste a été laissé à la conséquence.',
      quoteSupport: 'Quinze ans. Six domaines. Un tempérament directeur.',
      statConferences: 'Conférences',
      statYears: 'Années',
      statDomains: 'Domaines',
      statOrganisations: 'Organisations',
    },
    about: {
      eyebrow: 'Formation',
      heading: 'Le droit l\'a rendu précis.\nLes marchés l\'ont rendu sans illusions.\nLe reste l\'a rendu redoutable.',
      para1: 'Il est venu au droit non comme à une profession, mais comme à une discipline — une façon de lire le pouvoir, l\'obligation et la conséquence avant même que la question soit posée. Les marchés ont éliminé tout ce qui ne survivait pas au contact avec la réalité. Ce qui est resté : un jugement froid, structurel, patient.',
      para2: 'Chaque domaine suivant — distribution à grande échelle, opérations énergétiques, production de défilés, stratégie politique — n\'a pas enrichi le parcours. Il a mis à l\'épreuve des instincts déjà formés. La connaissance accumulée. Le schéma est devenu évident.',
      ctaWork: 'Explorer l\'œuvre',
      ctaContact: 'Prendre contact',
    },
    work: {
      heading: 'Là où l\'œuvre s\'est déployée.',
      subheading: 'Dix domaines. Dix-huit années. Sans intermédiaire.',
    },
    insights: {
      heading: 'Convictions.',
      subheading: 'Non pas des commentaires — des positions tenues. Formées dans les conseils d\'administration, sur les parquets, dans les cabinets politiques et en coulisses de défilés.',
    },
    speaking: {
      heading: 'Conférences & Conseil',
      subheading: 'Il intervient sur ce qu\'il a personnellement opéré — non des tendances lues, mais des systèmes construits, brisés et reconstruits. Conférences, sommets de direction, sessions privées.',
      availability: 'Sur invitation · Demandes via le formulaire de contact',
    },
    training: {
      heading: 'Programmes & Formation',
      para1: 'Conçus pour les équipes dirigeantes qui en ont assez des cadres génériques. Pour ceux qui veulent penser à travers de vrais problèmes avec quelqu\'un qui les a réellement résolus.',
      para2: 'Chaque programme est construit autour de la situation réelle de votre organisation. Pas de diapositives préfabriquées. Pas de théorie sans l\'expérience qui l\'appuie.',
      cta: 'Discuter d\'un programme',
    },
    talks: {
      heading: 'Conférences & Keynotes',
      subheading: 'Trois adresses nées de l\'expérience directe. Chacune conçue pour les salles où les vraies décisions se prennent.',
    },
    truth: {
      heading: 'Chaque affirmation\nest vérifiable.',
      subheading: 'Survolez ou touchez n\'importe quel chiffre. Pas d\'inflation. Pas de discours commercial. Ce qui s\'est passé.',
    },
    record: {
      heading: 'Le dossier public.',
      subheading: 'Engagements documentés, discours-cadres et présences institutionnelles.',
      verifiedLabel: 'Dossier vérifié',
    },
    harvics: {
      heading: 'Harvics.',
      subheading: 'Une institution fondée sur la conviction que le conseil doit être mérité — non accrédité.',
      body: 'Harvics est l\'expression institutionnelle d\'une carrière vécue à l\'intérieur d\'opérations réelles.',
    },
    intelligence: {
      heading: 'Intelligence appliquée.',
      subheading: 'Recherche, analyse et pensée structurée — produites depuis l\'intérieur des industries.',
      body: 'Reconnaissance de schémas entraînée dans six environnements opérationnels distincts.',
    },
    contact: {
      heading: 'Ouvrir un entretien.',
      subheading: 'Pour une conférence, un conseil ou une collaboration. Vous recevrez une réponse personnelle.',
      namePlaceholder: 'Votre nom',
      emailPlaceholder: 'Votre adresse e-mail',
      messagePlaceholder: 'Votre message',
      send: 'Envoyer',
    },
    ui: {
      classicView: '◈ Classique',
      adaptedFor: 'Adapté pour',
      simplify: 'Simplifier',
      dismiss: 'Ignorer',
      readingTime: 'min de lecture',
      harvicsNav: 'Harvics',
      intelligenceNav: 'Intelligence',
    },
    consent: {
      body: 'Ce site utilise des analyses locales uniquement — stockées dans votre navigateur, jamais transmises.',
      noTrackers: 'Aucun traceur tiers.',
      decline: 'Refuser',
      allow: 'Autoriser les analyses locales',
    },
    privacy: {
      trigger: 'Paramètres de confidentialité',
      label: 'Paramètres de confidentialité',
      heading: 'Vos données. Votre choix.',
      body: 'Ce site utilise des analyses locales uniquement — rien n\'est envoyé à aucun serveur externe.',
      localAnalytics: 'Analyses locales',
      storedBrowser: 'Stocké dans votre navigateur uniquement',
      export: 'Exporter mes données',
      deleteData: 'Supprimer toutes les données',
      deleted: 'Données supprimées ✓',
    },
    chat: {
      welcome: 'Bonjour ! Posez-moi n\'importe quelle question sur le parcours, les conférences ou comment prendre contact.',
      reply1: 'Qui est Mian ?',
      reply2: 'Sujets de conférence',
      reply3: 'Comment contacter ?',
      reply4: 'Services de conseil',
    },
    shortcuts: {
      title: 'Raccourcis clavier',
      home: 'Accueil / Hero',
      about: 'À propos',
      work: 'Travail',
      contact: 'Contact',
      top: 'Haut de page',
      bottom: 'Bas de page',
    },
  },

  ar: {
    nav: {
      proposition: 'التعريف', origins: 'النشأة', practice: 'الممارسة',
      thought: 'الفكر', forum: 'المنتدى', academy: 'الأكاديمية',
      addresses: 'الخطابات', skillscape: 'الميادين',
      conversations: 'الحوارات', truthLens: 'ميزان الحقيقة', contact: 'تواصل',
      harvics: 'هارفيكس', intelligence: 'الاستخبارات',
    },
    hero: {
      eyebrow: 'محامٍ · متداول · مهندس أنظمة · استراتيجي',
      heading: 'ميان محمد عثمان.',
      body: 'القانون انضبط به العقل.\nالأسواق انضبط بها العصب.\nوما تبقّى تُرك للعاقبة.',
      cta1: 'مسيرة العمل', cta2: 'ابدأ حواراً',
      pill: 'تكوين واحد. كل المجالات.',
      quote: 'القانون انضبط به العقل. الأسواق انضبط بها العصب. وما تبقّى تُرك للعاقبة.',
      quoteSupport: 'خمسة عشر عاماً. ستة مجالات. مزاج واحد حاكم.',
      statConferences: 'مؤتمر', statYears: 'عاماً', statDomains: 'مجالات', statOrganisations: 'مؤسسة',
    },
    about: {
      eyebrow: 'التكوين',
      heading: 'القانون صنع منه دقيقاً.\nالأسواق صنعت منه بلا أوهام.\nوالبقية صنعت منه خطيراً.',
      para1: 'جاء إلى القانون لا كمهنة بل كانضباط — طريقة لقراءة السلطة، والالتزام، والعاقبة قبل أن يُصيغ الآخرون السؤال.',
      para2: 'كل ميدان تالٍ — التجارة على نطاق مؤسسي، وعمليات الطاقة، وإنتاج الأزياء، والاستراتيجية السياسية — اختبر جملةً من الغرائز كانت قد تشكّلت بالفعل.',
      ctaWork: 'استعرض العمل', ctaContact: 'تواصل',
    },
    work: { heading: 'حيث طُبّق العمل.', subheading: 'ستة قطاعات. خمسة عشر عاماً. بلا وسطاء.' },
    insights: { heading: 'قناعات.', subheading: 'ليست تعليقات — بل مواقف ثابتة. تشكّلت في مجالس الإدارة وقاعات التداول والمكاتب السياسية.' },
    speaking: {
      heading: 'المحاضرات والاستشارات',
      subheading: 'يتحدث عمّا اشتغل به بنفسه — لا عن توجهات قرأها، بل عن أنظمة بناها وفككها وأعاد بناءها.',
      availability: 'بالدعوة فقط · الاستفسارات عبر نموذج التواصل',
    },
    training: {
      heading: 'البرامج والتدريب',
      para1: 'مصمَّمة للفرق القيادية التي باتت في غنى عن الأطر النظرية العامة.',
      para2: 'كل برنامج يُبنى على الواقع الفعلي لمنظمتك. لا شرائح جاهزة.',
      cta: 'ناقش برنامجاً',
    },
    talks: { heading: 'الخطابات والكلمات الرئيسية', subheading: 'ثلاثة عناوين بُنيت على التجربة المباشرة.' },
    truth: { heading: 'كل ادّعاء\nقابل للتحقق.', subheading: 'مرّر على أي رقم أو المسه. لا تضخيم. ما جرى فعلاً.' },
    record: { heading: 'السجل العام.', subheading: 'مشاركات موثّقة وخطابات رئيسية وحضور مؤسسي.', verifiedLabel: 'سجل موثّق' },
    harvics: { heading: 'هارفيكس.', subheading: 'مؤسسة تُثبت أن الاستشارة يجب أن تُكتسب لا أن تُعتمد.', body: 'هارفيكس هو التعبير المؤسسي عن مسيرة قُضيت داخل العمليات الحقيقية.' },
    intelligence: { heading: 'الذكاء التطبيقي.', subheading: 'بحث وتحليل وتفكير منهجي — من داخل القطاعات لا من خارجها.', body: 'تعرّف على الأنماط المدرَّبة في ستة بيئات تشغيلية مختلفة.' },
    contact: { heading: 'ابدأ حواراً.', subheading: 'للمحاضرات أو الاستشارات أو التعاون. ستتلقى رداً شخصياً.', namePlaceholder: 'اسمك', emailPlaceholder: 'بريدك الإلكتروني', messagePlaceholder: 'رسالتك', send: 'إرسال' },
    ui: { classicView: '◈ كلاسيكي', adaptedFor: 'مُكيَّف لـ', simplify: 'تبسيط', dismiss: 'تجاهل', readingTime: 'دقائق قراءة', harvicsNav: 'هارفيكس', intelligenceNav: 'الاستخبارات' },
    consent: { body: 'يستخدم هذا الموقع تحليلات محلية فقط — مخزّنة في متصفحك، لا تُرسل أبداً.', noTrackers: 'لا متتبّعات من أطراف ثالثة.', decline: 'رفض', allow: 'السماح بالتحليلات المحلية' },
    privacy: { trigger: 'إعدادات الخصوصية', label: 'إعدادات الخصوصية', heading: 'بياناتك. اختيارك.', body: 'يستخدم هذا الموقع تحليلات محلية فقط — لا شيء يُرسل إلى أي خادم خارجي.', localAnalytics: 'التحليلات المحلية', storedBrowser: 'مخزّن في متصفحك فقط', export: 'تصدير بياناتي', deleteData: 'حذف جميع البيانات', deleted: 'تم حذف البيانات ✓' },
    chat: { welcome: 'مرحباً! اسألني أي شيء عن عمل ميان أو مواضيع محاضراته أو كيفية التواصل.', reply1: 'من هو ميان؟', reply2: 'مواضيع المحاضرات', reply3: 'كيفية التواصل؟', reply4: 'خدمات الاستشارة' },
    shortcuts: { title: 'اختصارات لوحة المفاتيح', home: 'الرئيسية', about: 'نبذة', work: 'العمل', contact: 'تواصل', top: 'أعلى الصفحة', bottom: 'أسفل الصفحة' },
  },

  // ── SPANISH — continental expansion ───────────────────────────────────────
  es: {
    nav: {
      proposition: 'Propuesta', origins: 'Orígenes', practice: 'Práctica',
      thought: 'Pensamiento', forum: 'Foro', academy: 'Academia',
      addresses: 'Discursos', skillscape: 'Dominios',
      conversations: 'Conversaciones', truthLens: 'Verdad', contact: 'Contacto',
      harvics: 'Harvics', intelligence: 'Inteligencia',
    },
    hero: {
      eyebrow: 'Abogado · Trader · Arquitecto de sistemas · Estratega',
      heading: 'Mian Muhammad Usman.',
      body: 'La ley disciplinó la razón.\nLos mercados disciplinaron el nervio.\nEl resto quedó librado a la consecuencia.',
      cta1: 'La obra', cta2: 'Iniciar una conversación',
      pill: 'Una formación. Cada dominio.',
      quote: 'La ley disciplinó la razón. Los mercados disciplinaron el nervio. El resto quedó librado a la consecuencia.',
      quoteSupport: 'Quince años. Seis dominios. Un temperamento rector.',
      statConferences: 'Conferencias', statYears: 'Años', statDomains: 'Dominios', statOrganisations: 'Organizaciones',
    },
    about: {
      eyebrow: 'Formación',
      heading: 'El derecho lo hizo preciso.\nLos mercados lo hicieron sin ilusiones.\nLo demás lo hizo peligroso.',
      para1: 'Llegó al derecho no como profesión sino como disciplina — una manera de leer el poder, la obligación y la consecuencia antes de que los demás hayan formulado la pregunta.',
      para2: 'Cada dominio posterior — el comercio a escala empresarial, las operaciones energéticas, la producción de desfiles, la estrategia política — puso a prueba un conjunto de instintos ya formados.',
      ctaWork: 'Explorar la obra', ctaContact: 'Ponerse en contacto',
    },
    work: {
      heading: 'Donde se aplicó la obra.',
      subheading: 'Seis industrias. Quince años. Sin intermediarios.',
    },
    insights: {
      heading: 'Convicciones.',
      subheading: 'No son comentarios — son posiciones sostenidas, forjadas en salas de juntas, parqués, despachos políticos y bastidores de moda.',
    },
    speaking: {
      heading: 'Conferencias y Asesoría',
      subheading: 'Habla de lo que ha operado personalmente — no de tendencias leídas, sino de sistemas construidos, rotos y reconstruidos.',
      availability: 'Por invitación · Consultas a través del formulario de contacto',
    },
    training: {
      heading: 'Programas y Formación',
      para1: 'Diseñados para equipos directivos que ya no tienen tiempo para marcos genéricos.',
      para2: 'Cada programa se construye en torno a la situación real de su organización. Sin diapositivas prediseñadas.',
      cta: 'Hablar de un programa',
    },
    talks: {
      heading: 'Conferencias y Keynotes',
      subheading: 'Tres ponencias construidas desde la experiencia directa. Cada una pensada para las salas donde se toman las decisiones reales.',
    },
    truth: {
      heading: 'Cada afirmación\nes verificable.',
      subheading: 'Pase el cursor o toque cualquier cifra. Sin inflación. Sin copia de marketing. Lo que ocurrió.',
    },
    record: { heading: 'El expediente público.', subheading: 'Compromisos documentados, discursos y presencias institucionales.', verifiedLabel: 'Expediente verificado' },
    harvics: { heading: 'Harvics.', subheading: 'Una institución fundada en la convicción de que el asesoramiento debe ganarse, no acreditarse.', body: 'Harvics es la expresión institucional de una carrera vivida dentro de operaciones reales.' },
    intelligence: { heading: 'Inteligencia aplicada.', subheading: 'Investigación, análisis y pensamiento estructurado — producidos desde el interior de las industrias.', body: 'Reconocimiento de patrones entrenado en seis entornos operativos distintos.' },
    contact: {
      heading: 'Iniciar una conversación.',
      subheading: 'Para conferencias, asesoría o colaboración. Recibirá una respuesta personal.',
      namePlaceholder: 'Su nombre',
      emailPlaceholder: 'Su correo electrónico',
      messagePlaceholder: 'Su mensaje',
      send: 'Enviar',
    },
    ui: { classicView: '◈ Clásico', adaptedFor: 'Adaptado para', simplify: 'Simplificar', dismiss: 'Ignorar', readingTime: 'min de lectura', harvicsNav: 'Harvics', intelligenceNav: 'Inteligencia' },
    consent: { body: 'Este sitio usa análisis solo locales — almacenados en su navegador, nunca enviados.', noTrackers: 'Sin rastreadores de terceros.', decline: 'Rechazar', allow: 'Permitir análisis locales' },
    privacy: { trigger: 'Configuración de privacidad', label: 'Configuración de privacidad', heading: 'Sus datos. Su elección.', body: 'Este sitio usa análisis solo locales — nada se envía a ningún servidor externo.', localAnalytics: 'Análisis locales', storedBrowser: 'Almacenado solo en su navegador', export: 'Exportar mis datos', deleteData: 'Eliminar todos los datos', deleted: 'Datos eliminados ✓' },
    chat: { welcome: '¡Hola! Pregúntame sobre el trabajo de Mian, temas de conferencias o cómo contactar.', reply1: '¿Quién es Mian?', reply2: 'Temas de conferencia', reply3: '¿Cómo contactar?', reply4: 'Servicios de asesoría' },
    shortcuts: { title: 'Atajos de teclado', home: 'Inicio / Hero', about: 'Sobre mí', work: 'Trabajo', contact: 'Contacto', top: 'Arriba', bottom: 'Abajo' },
  },

  // ── ITALIAN — continental expansion ───────────────────────────────────────
  it: {
    nav: {
      proposition: 'Proposta', origins: 'Origini', practice: 'Pratica',
      thought: 'Pensiero', forum: 'Forum', academy: 'Accademia',
      addresses: 'Discorsi', skillscape: 'Domini',
      conversations: 'Conversazioni', truthLens: 'Verità', contact: 'Contatto',
      harvics: 'Harvics', intelligence: 'Intelligenza',
    },
    hero: {
      eyebrow: 'Avvocato · Trader · Architetto di sistemi · Stratega',
      heading: 'Mian Muhammad Usman.',
      body: 'Un solo operatore. Sei settori. Quindici anni di architettura, non di osservazione.',
      cta1: 'L\'opera', cta2: 'Aprire un dialogo',
      pill: 'Una mente. Ogni sistema.',
      quote: 'Ogni industria funziona su un sistema. La maggior parte lo eredita. Io lo progetto.',
      quoteSupport: 'Dalle sale di negoziazione alle anticamere del potere. Dalle sfilate ai giacimenti petroliferi.',
      statConferences: 'Conferenze', statYears: 'Anni', statDomains: 'Settori', statOrganisations: 'Organizzazioni',
    },
    about: {
      eyebrow: 'Formazione',
      heading: 'Il diritto lo ha reso preciso.\nI mercati lo hanno reso disincantato.\nIl resto lo ha reso pericoloso.',
      para1: 'È giunto al diritto non come professione ma come disciplina — un modo di leggere il potere, l\'obbligo e la conseguenza prima che gli altri abbiano formulato la domanda.',
      para2: 'Ogni dominio successivo — il commercio su scala aziendale, le operazioni energetiche, la produzione di sfilate, la strategia politica — ha messo alla prova un insieme di istinti già formati.',
      ctaWork: 'Esplora l\'opera', ctaContact: 'Contattaci',
    },
    work: { heading: 'Dove si è applicata l\'opera.', subheading: 'Sei settori. Quindici anni. Senza intermediari.' },
    insights: { heading: 'Convinzioni.', subheading: 'Non commenti — posizioni tenute, formate in sale consiliari, sale di negoziazione, uffici politici e dietro le quinte delle sfilate.' },
    speaking: {
      heading: 'Conferenze e Consulenza',
      subheading: 'Parla di ciò che ha personalmente operato — non tendenze lette, ma sistemi costruiti, rotti e ricostruiti.',
      availability: 'Su invito · Richieste tramite il modulo di contatto',
    },
    training: { heading: 'Programmi e Formazione', para1: 'Costruiti per i team dirigenziali che ne hanno abbastanza dei quadri generici.', para2: 'Ogni programma è costruito attorno alla situazione reale della vostra organizzazione.', cta: 'Discutere un programma' },
    talks: { heading: 'Conferenze e Keynote', subheading: 'Tre interventi costruiti dall\'esperienza diretta.' },
    truth: { heading: 'Ogni affermazione\nè verificabile.', subheading: 'Passa il cursore o tocca qualsiasi cifra. Nessuna inflazione. Quello che è accaduto.' },
    record: { heading: 'Il registro pubblico.', subheading: 'Impegni documentati, discorsi chiave e presenze istituzionali.', verifiedLabel: 'Registro verificato' },
    harvics: { heading: 'Harvics.', subheading: 'Un\'istituzione fondata sulla convinzione che la consulenza debba essere guadagnata — non accreditata.', body: 'Harvics è l\'espressione istituzionale di una carriera trascorsa all\'interno di operazioni reali.' },
    intelligence: { heading: 'Intelligenza applicata.', subheading: 'Ricerca, analisi e pensiero strutturato — prodotti dall\'interno delle industrie.', body: 'Riconoscimento di pattern allenato in sei ambienti operativi distinti.' },
    contact: { heading: 'Aprire un dialogo.', subheading: 'Per conferenze, consulenza o collaborazione. Riceverete una risposta personale.', namePlaceholder: 'Il tuo nome', emailPlaceholder: 'La tua email', messagePlaceholder: 'Il tuo messaggio', send: 'Inviare' },
    ui: { classicView: '◈ Classico', adaptedFor: 'Adattato per', simplify: 'Semplifica', dismiss: 'Ignora', readingTime: 'min di lettura', harvicsNav: 'Harvics', intelligenceNav: 'Intelligenza' },
    consent: { body: 'Questo sito utilizza analisi solo locali — memorizzate nel tuo browser, mai inviate.', noTrackers: 'Nessun tracker di terze parti.', decline: 'Rifiuta', allow: 'Consenti analisi locali' },
    privacy: { trigger: 'Impostazioni privacy', label: 'Impostazioni privacy', heading: 'I tuoi dati. La tua scelta.', body: 'Questo sito utilizza analisi solo locali — niente viene inviato a server esterni.', localAnalytics: 'Analisi locali', storedBrowser: 'Memorizzato solo nel tuo browser', export: 'Esporta i miei dati', deleteData: 'Elimina tutti i dati', deleted: 'Dati eliminati ✓' },
    chat: { welcome: 'Ciao! Chiedimi qualsiasi cosa sul lavoro di Mian, gli argomenti delle conferenze o come contattarlo.', reply1: 'Chi è Mian?', reply2: 'Argomenti di conferenza', reply3: 'Come contattare?', reply4: 'Servizi di consulenza' },
    shortcuts: { title: 'Scorciatoie da tastiera', home: 'Home / Hero', about: 'Chi siamo', work: 'Lavoro', contact: 'Contatto', top: 'Vai in cima', bottom: 'Vai in fondo' },
  },

  // ── GERMAN — continental expansion ────────────────────────────────────────
  de: {
    nav: {
      proposition: 'Proposition', origins: 'Ursprünge', practice: 'Praxis',
      thought: 'Denken', forum: 'Forum', academy: 'Akademie',
      addresses: 'Reden', skillscape: 'Domänen',
      conversations: 'Gespräche', truthLens: 'Wahrheit', contact: 'Kontakt',
      harvics: 'Harvics', intelligence: 'Intelligenz',
    },
    hero: {
      eyebrow: 'Jurist · Händler · Systemarchitekt · Stratege',
      heading: 'Mian Muhammad Usman.',
      body: 'Ein Praktiker. Sechs Branchen. Fünfzehn Jahre Architektur, keine Beobachtung.',
      cta1: 'Das Werk', cta2: 'Ein Gespräch eröffnen',
      pill: 'Ein Geist. Jedes System.',
      quote: 'Jede Branche läuft auf einem System. Die meisten erben es. Ich gestalte es.',
      quoteSupport: 'Von Handelsparkett bis Kabinettsaal. Von Laufsteg-Produktionen bis zu Ölfeldoperationen.',
      statConferences: 'Konferenzen', statYears: 'Jahre', statDomains: 'Branchen', statOrganisations: 'Organisationen',
    },
    about: {
      eyebrow: 'Bildungsweg',
      heading: 'Das Recht machte ihn präzise.\nDie Märkte machten ihn nüchtern.\nDer Rest machte ihn gefährlich.',
      para1: 'Er kam zum Recht nicht als Beruf, sondern als Disziplin — eine Methode, Macht, Verpflichtung und Konsequenz zu lesen, bevor andere die Frage formuliert haben.',
      para2: 'Jeder nachfolgende Bereich — Handel im Unternehmensmaßstab, Energieoperationen, Laufstegproduktionen, politische Strategie — stellte einen bereits geformten Satz von Instinkten auf die Probe.',
      ctaWork: 'Das Werk erkunden', ctaContact: 'Kontakt aufnehmen',
    },
    work: { heading: 'Wo das Werk angewandt wurde.', subheading: 'Sechs Branchen. Fünfzehn Jahre. Ohne Mittler.' },
    insights: { heading: 'Überzeugungen.', subheading: 'Keine Kommentare — sondern Positionen, geformt in Vorstandssälen, auf Handelsparkett, in politischen Büros.' },
    speaking: {
      heading: 'Vorträge & Beratung',
      subheading: 'Er spricht über das, was er persönlich betrieben hat — keine gelesenen Trends, sondern gebaute, gebrochene und wiederaufgebaute Systeme.',
      availability: 'Auf Einladung · Anfragen über das Kontaktformular',
    },
    training: { heading: 'Programme & Training', para1: 'Gebaut für Führungsteams, die generische Rahmenwerke satt haben.', para2: 'Jedes Programm wird um die tatsächliche Situation Ihrer Organisation herum aufgebaut.', cta: 'Ein Programm besprechen' },
    talks: { heading: 'Reden & Keynotes', subheading: 'Drei Ansprachen aus direkter Erfahrung heraus gebaut.' },
    truth: { heading: 'Jede Aussage\nist überprüfbar.', subheading: 'Fahren Sie über eine Zahl oder tippen Sie sie an. Keine Übertreibung. Was tatsächlich geschehen ist.' },
    record: { heading: 'Das öffentliche Register.', subheading: 'Dokumentierte Engagements, Keynote-Reden und institutionelle Auftritte.', verifiedLabel: 'Verifiziertes Register' },
    harvics: { heading: 'Harvics.', subheading: 'Eine Institution, die auf der Überzeugung beruht, dass Beratung verdient — nicht akkreditiert — werden muss.', body: 'Harvics ist der institutionelle Ausdruck einer Karriere, die innerhalb realer Operationen gelebt wurde.' },
    intelligence: { heading: 'Angewandte Intelligenz.', subheading: 'Forschung, Analyse und strukturiertes Denken — aus dem Inneren der Branchen heraus.', body: 'Mustererkennung, trainiert in sechs verschiedenen operativen Umgebungen.' },
    contact: { heading: 'Ein Gespräch eröffnen.', subheading: 'Für Vorträge, Beratung oder Zusammenarbeit. Sie erhalten eine persönliche Antwort.', namePlaceholder: 'Ihr Name', emailPlaceholder: 'Ihre E-Mail-Adresse', messagePlaceholder: 'Ihre Nachricht', send: 'Senden' },
    ui: { classicView: '◈ Klassisch', adaptedFor: 'Angepasst für', simplify: 'Vereinfachen', dismiss: 'Ignorieren', readingTime: 'Min. Lesezeit', harvicsNav: 'Harvics', intelligenceNav: 'Intelligenz' },
    consent: { body: 'Diese Website verwendet ausschließlich lokale Analysen — in Ihrem Browser gespeichert, nie gesendet.', noTrackers: 'Keine Drittanbieter-Tracker.', decline: 'Ablehnen', allow: 'Lokale Analysen erlauben' },
    privacy: { trigger: 'Datenschutzeinstellungen', label: 'Datenschutzeinstellungen', heading: 'Ihre Daten. Ihre Wahl.', body: 'Diese Website verwendet ausschließlich lokale Analysen — nichts wird an externe Server gesendet.', localAnalytics: 'Lokale Analysen', storedBrowser: 'Nur in Ihrem Browser gespeichert', export: 'Meine Daten exportieren', deleteData: 'Alle Daten löschen', deleted: 'Daten gelöscht ✓' },
    chat: { welcome: 'Hallo! Stellen Sie mir Fragen zu Mians Arbeit, Vortragsthemen oder wie Sie Kontakt aufnehmen können.', reply1: 'Wer ist Mian?', reply2: 'Vortragsthemen', reply3: 'Wie kontaktieren?', reply4: 'Beratungsleistungen' },
    shortcuts: { title: 'Tastaturkürzel', home: 'Startseite / Hero', about: 'Über uns', work: 'Arbeit', contact: 'Kontakt', top: 'Nach oben', bottom: 'Nach unten' },
  },

  // ── URDU — literary, dignified, personal-origin ───────────────────────────
  ur: {
    nav: {
      proposition: 'تعارف', origins: 'آغاز', practice: 'عمل',
      thought: 'فکر', forum: 'منبر', academy: 'اکیڈمی',
      addresses: 'خطابات', skillscape: 'میدان',
      conversations: 'گفتگو', truthLens: 'صداقت', contact: 'رابطہ',
      harvics: 'ہارویکس', intelligence: 'ذہانت',
    },
    hero: {
      eyebrow: 'وکیل · تاجر · نظام ساز · حکمت عملی ساز',
      heading: 'میاں محمد عثمان۔',
      body: 'ایک ماہرِ عمل۔ چھ صنعتیں۔ پندرہ سال کی تعمیر، نہ مشاہدہ۔',
      cta1: 'کام دیکھیں', cta2: 'گفتگو شروع کریں',
      pill: 'ایک ذہن۔ ہر نظام۔',
      quote: 'ہر صنعت ایک نظام پر قائم ہے۔ اکثر لوگ اسے وراثت میں پاتے ہیں۔ میں اسے تخلیق کرتا ہوں۔',
      quoteSupport: 'تجارتی ہالوں سے کابینہ کے کمروں تک۔ رن وے پروڈکشن سے تیل کے کنوؤں تک۔',
      statConferences: 'کانفرنسیں', statYears: 'سال', statDomains: 'میدان', statOrganisations: 'ادارے',
    },
    about: {
      eyebrow: 'تشکیل',
      heading: 'قانون نے انہیں ٹھیک کیا۔\nمنڈیوں نے انہیں بے وہم کیا۔\nبقیہ نے انہیں خطرناک بنایا۔',
      para1: 'وہ قانون کے پاس پیشے کے طور پر نہیں، بلکہ نظم و ضبط کے طور پر آئے — سلطہ، ذمہ داری اور نتیجے کو پڑھنے کا ایک طریقہ، اس سے پہلے کہ دوسرے سوال مرتب کریں۔',
      para2: 'ہر اگلا میدان — ادارتی پیمانے پر تجارت، توانائی کی کارروائیاں، رن وے پروڈکشن، سیاسی حکمت عملی — ان کے کیریئر میں اضافہ نہیں کر رہا تھا۔',
      ctaWork: 'کام دیکھیں', ctaContact: 'رابطہ کریں',
    },
    work: { heading: 'جہاں کام ہوا۔', subheading: 'چھ صنعتیں۔ پندرہ سال۔ کوئی وسیط نہیں۔' },
    insights: { heading: 'یقینِ راسخ۔', subheading: 'تبصرہ نہیں — موقف، جو بورڈ رومز، تجارتی ہالوں، سیاسی دفاتر اور فیشن کی پردہ پوشیوں میں پختہ ہوا۔' },
    speaking: {
      heading: 'خطابات و مشاورت',
      subheading: 'وہ وہی بیان کرتے ہیں جو انہوں نے خود چلایا ہے — پڑھی ہوئی باتیں نہیں، بلکہ بنائے، توڑے اور دوبارہ بنائے گئے نظام۔',
      availability: 'بالدعوت فقط · درخواستیں رابطہ فارم کے ذریعے',
    },
    training: { heading: 'پروگرام اور تربیت', para1: 'ان سینئر ٹیموں کے لیے جو عام خاکوں سے اکتا چکی ہیں۔', para2: 'ہر پروگرام آپ کے ادارے کی حقیقی صورتحال کے گرد بنتا ہے۔', cta: 'پروگرام پر بات کریں' },
    talks: { heading: 'خطابات اور کلیدی تقاریر', subheading: 'تین خطابات جو براہِ راست تجربے سے نکلے ہیں۔' },
    truth: { heading: 'ہر دعویٰ\nقابلِ تصدیق ہے۔', subheading: 'کسی بھی ہندسے پر کرسر لے جائیں یا چھوئیں۔ کوئی مبالغہ نہیں۔ جو ہوا وہ۔' },
    record: { heading: 'عوامی ریکارڈ۔', subheading: 'دستاویزی مصروفیات، کلیدی خطابات اور ادارہ جاتی حاضری۔', verifiedLabel: 'تصدیق شدہ ریکارڈ' },
    harvics: { heading: 'ہارویکس۔', subheading: 'ایک ادارہ جو اس یقین پر قائم ہے کہ مشاورت کمائی جاتی ہے — سند سے نہیں ملتی۔', body: 'ہارویکس اس کیریئر کا ادارہ جاتی اظہار ہے جو حقیقی کارروائیوں کے اندر گزرا۔' },
    intelligence: { heading: 'عملی ذہانت۔', subheading: 'تحقیق، تجزیہ اور منظم سوچ — صنعتوں کے اندر سے پیدا کی گئی۔', body: 'چھ مختلف آپریشنل ماحول میں تربیت یافتہ نمونہ شناسی۔' },
    contact: { heading: 'گفتگو شروع کریں۔', subheading: 'خطاب، مشاورت یا تعاون کے لیے۔ آپ کو ذاتی جواب ملے گا۔', namePlaceholder: 'آپ کا نام', emailPlaceholder: 'آپ کی ای میل', messagePlaceholder: 'آپ کا پیغام', send: 'بھیجیں' },
    ui: { classicView: '◈ کلاسک', adaptedFor: 'کے لیے موزوں', simplify: 'سادہ کریں', dismiss: 'نظرانداز کریں', readingTime: 'منٹ مطالعہ', harvicsNav: 'ہارویکس', intelligenceNav: 'ذہانت' },
    consent: { body: 'یہ سائٹ صرف مقامی تجزیاتی ڈیٹا استعمال کرتی ہے — آپ کے براؤزر میں محفوظ، کہیں نہیں بھیجا جاتا۔', noTrackers: 'کوئی تھرڈ پارٹی ٹریکر نہیں۔', decline: 'انکار کریں', allow: 'مقامی تجزیات کی اجازت دیں' },
    privacy: { trigger: 'رازداری کی ترتیبات', label: 'رازداری کی ترتیبات', heading: 'آپ کا ڈیٹا۔ آپ کا انتخاب۔', body: 'یہ سائٹ صرف مقامی تجزیاتی ڈیٹا استعمال کرتی ہے — کچھ بھی کسی بیرونی سرور کو نہیں بھیجا جاتا۔', localAnalytics: 'مقامی تجزیات', storedBrowser: 'صرف آپ کے براؤزر میں محفوظ', export: 'میرا ڈیٹا برآمد کریں', deleteData: 'تمام ڈیٹا حذف کریں', deleted: 'ڈیٹا حذف ✓' },
    chat: { welcome: 'سلام! میاں کے کام، خطابات یا رابطے کے بارے میں کچھ بھی پوچھیں۔', reply1: 'میاں کون ہیں؟', reply2: 'خطابات کے موضوعات', reply3: 'رابطہ کیسے کریں؟', reply4: 'مشاورتی خدمات' },
    shortcuts: { title: 'کی بورڈ شارٹ کٹس', home: 'ہوم / ہیرو', about: 'بارے میں', work: 'کام', contact: 'رابطہ', top: 'اوپر جائیں', bottom: 'نیچے جائیں' },
  },

  // ── CHINESE (SIMPLIFIED) — prestige, concise, direct ──────────────────────
  zh: {
    nav: {
      proposition: '主张', origins: '根源', practice: '实践',
      thought: '思想', forum: '论坛', academy: '学院',
      addresses: '演讲', skillscape: '技能图谱',
      conversations: '对话', truthLens: '真相', contact: '联系',
      harvics: '哈维克斯', intelligence: '情报分析',
    },
    hero: {
      eyebrow: '律师 · 交易员 · 系统架构师 · 战略家',
      heading: '米安·穆罕默德·乌斯曼。',
      body: '法律锻炼了理性。\n市场锻炼了神经。\n其余的交给了后果。',
      cta1: '查看履历', cta2: '开启对话',
      pill: '一种格局。每个领域。',
      quote: '法律锻炼了理性。市场锻炼了神经。其余的交给了后果。',
      quoteSupport: '十八年。十个领域。一种统领气质。',
      statConferences: '次会议', statYears: '年', statDomains: '领域', statOrganisations: '家机构',
    },
    about: {
      eyebrow: '成长历程',
      heading: '法律使他精准。\n市场使他无幻。\n其余使他令人生畏。',
      para1: '他来学法律，不是作为职业，而是作为训练——一种在别人尚未命名问题之前就能读懂权力、义务与后果的方式。',
      para2: '此后的每一个领域——企业规模的零售运营、能源作业、时装走秀制作、政治战略——并非在积累履历，而是在检验已经成型的本能。',
      ctaWork: '探索工作', ctaContact: '联系我们',
    },
    work: { heading: '工作的展开之处。', subheading: '十个领域。十八年。无代理。' },
    insights: { heading: '信念。', subheading: '不是评论——而是立场，在董事会、交易大厅、政治办公室和演出舞台后台形成的立场。' },
    speaking: {
      heading: '演讲与顾问',
      subheading: '他只谈他亲自运营过的事——不是读到的趋势，而是亲手构建、打破、再建的系统。',
      availability: '受邀出席 · 通过联系表提交咨询',
    },
    training: { heading: '项目与培训', para1: '专为厌倦通用框架的高级团队打造。', para2: '每个项目都围绕您组织的实际情况构建。没有预制幻灯片。', cta: '讨论项目' },
    talks: { heading: '演讲与主题演讲', subheading: '三场来自直接经验的演讲。每一场都为真正做决策的场合设计。' },
    truth: { heading: '每一项声明\n均可核实。', subheading: '悬停或点击任意数字。没有夸大。是发生过的事实。' },
    record: { heading: '公开记录。', subheading: '有据可查的参与、主题演讲和机构出席。', verifiedLabel: '已核实记录' },
    harvics: { heading: '哈维克斯。', subheading: '一家坚信咨询必须通过实践赢得——而非凭证获得——的机构。', body: '哈维克斯是一段在真实运营内部度过的职业生涯的机构化表达。' },
    intelligence: { heading: '应用情报。', subheading: '研究、分析与结构化思维——从行业内部产生。', body: '在六个不同运营环境中训练的模式识别能力。' },
    contact: { heading: '开启对话。', subheading: '关于演讲、顾问或合作。您将收到亲自回复。', namePlaceholder: '您的姓名', emailPlaceholder: '您的邮箱', messagePlaceholder: '您的留言', send: '发送' },
    ui: { classicView: '◈ 经典', adaptedFor: '已适配', simplify: '简化', dismiss: '忽略', readingTime: '分钟阅读', harvicsNav: '哈维克斯', intelligenceNav: '情报分析' },
    consent: { body: '本网站仅使用本地分析——存储在您的浏览器中，从不发送到任何地方。', noTrackers: '无第三方追踪器。', decline: '拒绝', allow: '允许本地分析' },
    privacy: { trigger: '隐私设置', label: '隐私设置', heading: '您的数据。您的选择。', body: '本网站仅使用本地分析——任何内容都不会发送到外部服务器。', localAnalytics: '本地分析', storedBrowser: '仅存储在您的浏览器中', export: '导出我的数据', deleteData: '删除所有数据', deleted: '数据已删除 ✓' },
    chat: { welcome: '您好！请问有关米安的工作、演讲主题或联系方式的任何问题。', reply1: '米安是谁？', reply2: '演讲主题', reply3: '如何联系？', reply4: '顾问服务' },
    shortcuts: { title: '键盘快捷键', home: '首页 / 英雄区', about: '关于', work: '工作', contact: '联系', top: '回到顶部', bottom: '到页面底部' },
  },
}

export default translations

/** Get the current language from localStorage, defaulting to 'en' */
export function getStoredLang(): LangCode {
  if (typeof window === 'undefined') return 'en'
  return (localStorage.getItem('mian_lang') as LangCode) || 'en'
}

/** Persist language choice */
export function storeLang(lang: LangCode) {
  if (typeof window !== 'undefined') localStorage.setItem('mian_lang', lang)
}

/** Apply RTL/LTR and lang attribute to <html> */
export function applyLangToDocument(lang: LangCode) {
  const meta = LANGUAGES.find(l => l.code === lang)
  if (!meta || typeof document === 'undefined') return
  document.documentElement.lang = lang
  document.documentElement.dir  = meta.dir
  document.documentElement.setAttribute('data-lang', lang)
}
