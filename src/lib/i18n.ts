/**
 * i18n — Premium multilingual system
 * 7 languages: English, French, Arabic, Spanish, Italian, German, Urdu
 * Each language is written for its register, not translated literally.
 */

export type LangCode = 'en' | 'fr' | 'ar' | 'es' | 'it' | 'de' | 'ur'

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
  }
  about: {
    eyebrow: string
    heading: string
    para1: string
    para2: string
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
    },
    hero: {
      eyebrow: 'Lawyer · Trader · Architect · Strategist',
      heading: 'Mian Muhammad Usman.',
      body: 'The law disciplined the reason.\nThe markets disciplined the nerve.\nThe rest was left to consequence.',
      cta1: 'The record', cta2: 'Open a conversation',
      pill: 'One formation. Every domain.',
      quote: 'The law disciplined the reason. The markets disciplined the nerve. The rest was left to consequence.',
      quoteSupport: 'Fifteen years. Six domains. One governing temperament.',
    },
    about: {
      eyebrow: 'Formation',
      heading: 'Formed in law.\nHardened in markets.\nDeployed where it was required.',
      para1: 'Law was not a profession. It was the first instrument of formation — a discipline in reading obligation, consequence, and power before others had named the question. Capital markets completed the education: every illusion was priced, every error was cleared, and what could not survive contact with reality did not survive.',
      para2: 'What followed — across retail operations, energy fields, political corridors, fashion production, and institutional advisory — was not accumulation. It was application. The same disposition, tested in every register of commerce and consequence. The pattern did not vary. The formation held.',
    },
    work: {
      heading: 'Where the work was applied.',
      subheading: 'Six industries. Fifteen years. No proxies.',
    },
    insights: {
      heading: 'Convictions.',
      subheading: 'Not commentary. Positions held — formed in boardrooms, trading floors, political offices and on production stages.',
    },
    speaking: {
      heading: 'Speaking & Advisory',
      subheading: 'He speaks on what he has personally operated — not trends read about, but systems built, broken and rebuilt. Conferences, leadership summits, private executive sessions.',
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
    },
  },

  // ── FRENCH — continental, high-register, native voice ─────────────────────
  fr: {
    nav: {
      proposition: 'Proposition', origins: 'Origines', practice: 'Pratique',
      thought: 'Pensée', forum: 'Forum', academy: 'Académie',
      addresses: 'Adresses', skillscape: 'Domaines',
      conversations: 'Entretiens', truthLens: 'Vérité', contact: 'Contact',
    },
    hero: {
      eyebrow: 'Juriste · Trader · Architecte · Stratège',
      heading: 'Mian Muhammad Usman.',
      body: 'La loi a discipliné la raison.\nLes marchés ont discipliné le nerf.\nLe reste a été laissé à la conséquence.',
      cta1: 'L\'œuvre', cta2: 'Ouvrir un entretien',
      pill: 'Une formation. Chaque domaine.',
      quote: 'La loi a discipliné la raison. Les marchés ont discipliné le nerf. Le reste a été laissé à la conséquence.',
      quoteSupport: 'Quinze ans. Six domaines. Un tempérament directeur.',
    },
    about: {
      eyebrow: 'Formation',
      heading: 'Le droit l\'a rendu précis.\nLes marchés l\'ont rendu sans illusions.\nLe reste l\'a rendu redoutable.',
      para1: 'Il est venu au droit non comme à une profession, mais comme à une discipline — une façon de lire le pouvoir, l\'obligation et la conséquence avant même que la question soit posée. Les marchés ont éliminé tout ce qui ne survivait pas au contact avec la réalité. Ce qui est resté : un jugement froid, structurel, patient.',
      para2: 'Chaque domaine suivant — distribution à grande échelle, opérations énergétiques, production de défilés, stratégie politique — n\'a pas enrichi le parcours. Il a mis à l\'épreuve des instincts déjà formés. La connaissance accumulée. Le schéma est devenu évident.',
    },
    work: {
      heading: 'Là où l\'œuvre s\'est déployée.',
      subheading: 'Six industries. Quinze années. Sans intermédiaire.',
    },
    insights: {
      heading: 'Convictions.',
      subheading: 'Non pas des commentaires — des positions tenues. Formées dans les conseils d\'administration, sur les parquets, dans les cabinets politiques et en coulisses de défilés.',
    },
    speaking: {
      heading: 'Conférences & Conseil',
      subheading: 'Il intervient sur ce qu\'il a personnellement opéré — non des tendances lues, mais des systèmes construits, brisés et reconstruits. Conférences, sommets de direction, sessions privées.',
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
    },
  },

  // ── ARABIC — elevated, formal, civilisational ──────────────────────────────
  ar: {
    nav: {
      proposition: 'التعريف', origins: 'النشأة', practice: 'الممارسة',
      thought: 'الفكر', forum: 'المنتدى', academy: 'الأكاديمية',
      addresses: 'الخطابات', skillscape: 'الميادين',
      conversations: 'الحوارات', truthLens: 'ميزان الحقيقة', contact: 'تواصل',
    },
    hero: {
      eyebrow: 'محامٍ · متداول · مهندس أنظمة · استراتيجي',
      heading: 'ميان محمد عثمان.',
      body: 'القانون انضبط به العقل.\nالأسواق انضبط بها العصب.\nوما تبقّى تُرك للعاقبة.',
      cta1: 'مسيرة العمل', cta2: 'ابدأ حواراً',
      pill: 'تكوين واحد. كل المجالات.',
      quote: 'القانون انضبط به العقل. الأسواق انضبط بها العصب. وما تبقّى تُرك للعاقبة.',
      quoteSupport: 'خمسة عشر عاماً. ستة مجالات. مزاج واحد حاكم.',
    },
    about: {
      eyebrow: 'التكوين',
      heading: 'القانون صنع منه دقيقاً.\nالأسواق صنعت منه بلا أوهام.\nوالبقية صنعت منه خطيراً.',
      para1: 'جاء إلى القانون لا كمهنة بل كانضباط — طريقة لقراءة السلطة، والالتزام، والعاقبة قبل أن يُصيغ الآخرون السؤال. جرّدت أسواق المال كل ما لا يصمد أمام الواقع. ما بقي كان نوعاً خاصاً من الحكم: بارد، بنيوي، صبور.',
      para2: 'كل ميدان تالٍ — التجارة على نطاق مؤسسي، وعمليات الطاقة، وإنتاج الأزياء، والاستراتيجية السياسية — لم يُضف إلى مسيرته. بل اختبر جملةً من الغرائز كانت قد تشكّلت بالفعل. تراكمت الخبرة. وأصبح النمط جلياً.',
    },
    work: {
      heading: 'حيث طُبّق العمل.',
      subheading: 'ستة قطاعات. خمسة عشر عاماً. بلا وسطاء.',
    },
    insights: {
      heading: 'قناعات.',
      subheading: 'ليست تعليقات — بل مواقف ثابتة. تشكّلت في مجالس الإدارة، وقاعات التداول، والمكاتب السياسية، وكواليس الموضة.',
    },
    speaking: {
      heading: 'المحاضرات والاستشارات',
      subheading: 'يتحدث عمّا اشتغل به بنفسه — لا عن توجهات قرأها، بل عن أنظمة بناها، وفككها، وأعاد بناءها. مؤتمرات، قمم قيادية، جلسات خاصة.',
    },
    training: {
      heading: 'البرامج والتدريب',
      para1: 'مصمَّمة للفرق القيادية التي باتت في غنى عن الأطر النظرية العامة. للقادة الذين يريدون التفكير في مشاكل حقيقية مع من حلّها فعلاً.',
      para2: 'كل برنامج يُبنى على الواقع الفعلي لمنظمتك. لا شرائح جاهزة. لا نظرية دون خبرة حقيقية خلفها.',
      cta: 'ناقش برنامجاً',
    },
    talks: {
      heading: 'الخطابات والكلمات الرئيسية',
      subheading: 'ثلاثة عناوين بُنيت على التجربة المباشرة. كل منها مصمَّم لقاعات تُتخذ فيها القرارات الحقيقية.',
    },
    truth: {
      heading: 'كل ادّعاء\nقابل للتحقق.',
      subheading: 'مرّر على أي رقم أو المسه. لا تضخيم. لا خطاب تسويقي. ما جرى فعلاً.',
    },
    contact: {
      heading: 'ابدأ حواراً.',
      subheading: 'للمحاضرات أو الاستشارات أو التعاون. ستتلقى رداً شخصياً.',
      namePlaceholder: 'اسمك',
      emailPlaceholder: 'بريدك الإلكتروني',
      messagePlaceholder: 'رسالتك',
      send: 'إرسال',
    },
    ui: {
      classicView: '◈ كلاسيكي',
      adaptedFor: 'مُكيَّف لـ',
      simplify: 'تبسيط',
      dismiss: 'تجاهل',
      readingTime: 'دقائق قراءة',
    },
  },

  // ── SPANISH — continental expansion ───────────────────────────────────────
  es: {
    nav: {
      proposition: 'Propuesta', origins: 'Orígenes', practice: 'Práctica',
      thought: 'Pensamiento', forum: 'Foro', academy: 'Academia',
      addresses: 'Discursos', skillscape: 'Dominios',
      conversations: 'Conversaciones', truthLens: 'Verdad', contact: 'Contacto',
    },
    hero: {
      eyebrow: 'Abogado · Trader · Arquitecto de sistemas · Estratega',
      heading: 'Mian Muhammad Usman.',
      body: 'La ley disciplinó la razón.\nLos mercados disciplinaron el nervio.\nEl resto quedó librado a la consecuencia.',
      cta1: 'La obra', cta2: 'Iniciar una conversación',
      pill: 'Una formación. Cada dominio.',
      quote: 'La ley disciplinó la razón. Los mercados disciplinaron el nervio. El resto quedó librado a la consecuencia.',
      quoteSupport: 'Quince años. Seis dominios. Un temperamento rector.',
    },
    about: {
      eyebrow: 'Formación',
      heading: 'El derecho lo hizo preciso.\nLos mercados lo hicieron sin ilusiones.\nLo demás lo hizo peligroso.',
      para1: 'Llegó al derecho no como profesión sino como disciplina — una manera de leer el poder, la obligación y la consecuencia antes de que los demás hayan formulado la pregunta. Los mercados financieros eliminaron todo lo que no podía sobrevivir al contacto con la realidad. Lo que quedó fue un tipo particular de juicio: frío, estructural, paciente.',
      para2: 'Cada dominio posterior — el comercio a escala empresarial, las operaciones energéticas, la producción de desfiles, la estrategia política — no enriqueció su trayectoria. Puso a prueba un conjunto de instintos ya formados. La experiencia se acumuló. El patrón se hizo evidente.',
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
      subheading: 'Habla de lo que ha operado personalmente — no de tendencias leídas, sino de sistemas construidos, rotos y reconstruidos. Conferencias, cumbres de liderazgo, sesiones ejecutivas privadas.',
    },
    training: {
      heading: 'Programas y Formación',
      para1: 'Diseñados para equipos directivos que ya no tienen tiempo para marcos genéricos. Para líderes que quieren pensar en problemas reales con alguien que los ha resuelto de verdad.',
      para2: 'Cada programa se construye en torno a la situación real de su organización. Sin diapositivas prediseñadas. Sin teoría sin la experiencia que la respalda.',
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
    contact: {
      heading: 'Iniciar una conversación.',
      subheading: 'Para conferencias, asesoría o colaboración. Recibirá una respuesta personal.',
      namePlaceholder: 'Su nombre',
      emailPlaceholder: 'Su correo electrónico',
      messagePlaceholder: 'Su mensaje',
      send: 'Enviar',
    },
    ui: {
      classicView: '◈ Clásico',
      adaptedFor: 'Adaptado para',
      simplify: 'Simplificar',
      dismiss: 'Ignorar',
      readingTime: 'min de lectura',
    },
  },

  // ── ITALIAN — continental expansion ───────────────────────────────────────
  it: {
    nav: {
      proposition: 'Proposta', origins: 'Origini', practice: 'Pratica',
      thought: 'Pensiero', forum: 'Forum', academy: 'Accademia',
      addresses: 'Discorsi', skillscape: 'Domini',
      conversations: 'Conversazioni', truthLens: 'Verità', contact: 'Contatto',
    },
    hero: {
      eyebrow: 'Avvocato · Trader · Architetto di sistemi · Stratega',
      heading: 'Mian Muhammad Usman.',
      body: 'Un solo operatore. Sei settori. Quindici anni di architettura, non di osservazione.',
      cta1: 'L\'opera', cta2: 'Aprire un dialogo',
      pill: 'Una mente. Ogni sistema.',
      quote: 'Ogni industria funziona su un sistema. La maggior parte lo eredita. Io lo progetto.',
      quoteSupport: 'Dalle sale di negoziazione alle anticamere del potere. Dalle sfilate ai giacimenti petroliferi. La disciplina è costante — vedere il tutto, trovare ciò che è rotto, costruire ciò che dura.',
    },
    about: {
      eyebrow: 'Formazione',
      heading: 'Il diritto lo ha reso preciso.\nI mercati lo hanno reso disincantato.\nIl resto lo ha reso pericoloso.',
      para1: 'È giunto al diritto non come professione ma come disciplina — un modo di leggere il potere, l\'obbligo e la conseguenza prima che gli altri abbiano formulato la domanda. I mercati finanziari hanno eliminato tutto ciò che non poteva sopravvivere al contatto con la realtà. Ciò che rimase fu un tipo particolare di giudizio: freddo, strutturale, paziente.',
      para2: 'Ogni dominio successivo — il commercio su scala aziendale, le operazioni energetiche, la produzione di sfilate, la strategia politica — non ha arricchito la sua carriera. Ha messo alla prova un insieme di istinti già formati. L\'esperienza si è accumulata. Il modello è diventato chiaro.',
    },
    work: {
      heading: 'Dove si è applicata l\'opera.',
      subheading: 'Sei settori. Quindici anni. Senza intermediari.',
    },
    insights: {
      heading: 'Convinzioni.',
      subheading: 'Non commenti — posizioni tenute, formate in sale consiliari, sale di negoziazione, uffici politici e dietro le quinte delle sfilate.',
    },
    speaking: {
      heading: 'Conferenze e Consulenza',
      subheading: 'Parla di ciò che ha personalmente operato — non tendenze lette, ma sistemi costruiti, rotti e ricostruiti. Conferenze, vertici di leadership, sessioni esecutive private.',
    },
    training: {
      heading: 'Programmi e Formazione',
      para1: 'Costruiti per i team dirigenziali che ne hanno abbastanza dei quadri generici. Per i leader che vogliono ragionare su problemi reali con chi li ha davvero risolti.',
      para2: 'Ogni programma è costruito attorno alla situazione reale della vostra organizzazione. Nessuna diapositiva pre-confezionata. Nessuna teoria senza l\'esperienza che la supporta.',
      cta: 'Discutere un programma',
    },
    talks: {
      heading: 'Conferenze e Keynote',
      subheading: 'Tre interventi costruiti dall\'esperienza diretta. Ognuno pensato per le sale dove vengono prese le decisioni reali.',
    },
    truth: {
      heading: 'Ogni affermazione\nè verificabile.',
      subheading: 'Passa il cursore o tocca qualsiasi cifra. Nessuna inflazione. Nessun testo di marketing. Quello che è accaduto.',
    },
    contact: {
      heading: 'Aprire un dialogo.',
      subheading: 'Per conferenze, consulenza o collaborazione. Riceverete una risposta personale.',
      namePlaceholder: 'Il tuo nome',
      emailPlaceholder: 'La tua email',
      messagePlaceholder: 'Il tuo messaggio',
      send: 'Inviare',
    },
    ui: {
      classicView: '◈ Classico',
      adaptedFor: 'Adattato per',
      simplify: 'Semplifica',
      dismiss: 'Ignora',
      readingTime: 'min di lettura',
    },
  },

  // ── GERMAN — continental expansion ────────────────────────────────────────
  de: {
    nav: {
      proposition: 'Proposition', origins: 'Ursprünge', practice: 'Praxis',
      thought: 'Denken', forum: 'Forum', academy: 'Akademie',
      addresses: 'Reden', skillscape: 'Domänen',
      conversations: 'Gespräche', truthLens: 'Wahrheit', contact: 'Kontakt',
    },
    hero: {
      eyebrow: 'Jurist · Händler · Systemarchitekt · Stratege',
      heading: 'Mian Muhammad Usman.',
      body: 'Ein Praktiker. Sechs Branchen. Fünfzehn Jahre Architektur, keine Beobachtung.',
      cta1: 'Das Werk', cta2: 'Ein Gespräch eröffnen',
      pill: 'Ein Geist. Jedes System.',
      quote: 'Jede Branche läuft auf einem System. Die meisten erben es. Ich gestalte es.',
      quoteSupport: 'Von Handelsparkett bis Kabinettsaal. Von Laufsteg-Produktionen bis zu Ölfeldoperationen. Die Disziplin bleibt konstant — das Ganze sehen, das Defekte finden, das Dauerhafte bauen.',
    },
    about: {
      eyebrow: 'Bildungsweg',
      heading: 'Das Recht machte ihn präzise.\nDie Märkte machten ihn nüchtern.\nDer Rest machte ihn gefährlich.',
      para1: 'Er kam zum Recht nicht als Beruf, sondern als Disziplin — eine Methode, Macht, Verpflichtung und Konsequenz zu lesen, bevor andere die Frage formuliert haben. Die Kapitalmärkte eliminierten alles, was den Kontakt mit der Realität nicht überstand. Was blieb, war eine besondere Art von Urteilsvermögen: kalt, strukturell, geduldig.',
      para2: 'Jeder nachfolgende Bereich — Handel im Unternehmensmaßstab, Energieoperationen, Laufstegproduktionen, politische Strategie — bereicherte nicht seinen Lebenslauf. Er stellte einen bereits geformten Satz von Instinkten auf die Probe. Die Erfahrung häufte sich an. Das Muster wurde sichtbar.',
    },
    work: {
      heading: 'Wo das Werk angewandt wurde.',
      subheading: 'Sechs Branchen. Fünfzehn Jahre. Ohne Mittler.',
    },
    insights: {
      heading: 'Überzeugungen.',
      subheading: 'Keine Kommentare — sondern Positionen, geformt in Vorstandssälen, auf Handelsparkett, in politischen Büros und hinter Laufsteg-Kulissen.',
    },
    speaking: {
      heading: 'Vorträge & Beratung',
      subheading: 'Er spricht über das, was er persönlich betrieben hat — keine gelesenen Trends, sondern gebaute, gebrochene und wiederaufgebaute Systeme. Konferenzen, Führungsgipfel, private Exekutivsitzungen.',
    },
    training: {
      heading: 'Programme & Training',
      para1: 'Gebaut für Führungsteams, die generische Rahmenwerke satt haben. Für Führungskräfte, die echte Probleme mit jemandem durchdenken wollen, der sie tatsächlich gelöst hat.',
      para2: 'Jedes Programm wird um die tatsächliche Situation Ihrer Organisation herum aufgebaut. Keine vorgefertigten Folien. Keine Theorie ohne die Erfahrung dahinter.',
      cta: 'Ein Programm besprechen',
    },
    talks: {
      heading: 'Reden & Keynotes',
      subheading: 'Drei Ansprachen aus direkter Erfahrung heraus gebaut. Jede für Räume konzipiert, in denen echte Entscheidungen getroffen werden.',
    },
    truth: {
      heading: 'Jede Aussage\nist überprüfbar.',
      subheading: 'Fahren Sie über eine Zahl oder tippen Sie sie an. Keine Übertreibung. Kein Marketingtext. Was tatsächlich geschehen ist.',
    },
    contact: {
      heading: 'Ein Gespräch eröffnen.',
      subheading: 'Für Vorträge, Beratung oder Zusammenarbeit. Sie erhalten eine persönliche Antwort.',
      namePlaceholder: 'Ihr Name',
      emailPlaceholder: 'Ihre E-Mail-Adresse',
      messagePlaceholder: 'Ihre Nachricht',
      send: 'Senden',
    },
    ui: {
      classicView: '◈ Klassisch',
      adaptedFor: 'Angepasst für',
      simplify: 'Vereinfachen',
      dismiss: 'Ignorieren',
      readingTime: 'Min. Lesezeit',
    },
  },

  // ── URDU — literary, dignified, personal-origin ───────────────────────────
  ur: {
    nav: {
      proposition: 'تعارف', origins: 'آغاز', practice: 'عمل',
      thought: 'فکر', forum: 'منبر', academy: 'اکیڈمی',
      addresses: 'خطابات', skillscape: 'میدان',
      conversations: 'گفتگو', truthLens: 'صداقت', contact: 'رابطہ',
    },
    hero: {
      eyebrow: 'وکیل · تاجر · نظام ساز · حکمت عملی ساز',
      heading: 'میاں محمد عثمان۔',
      body: 'ایک ماہرِ عمل۔ چھ صنعتیں۔ پندرہ سال کی تعمیر، نہ مشاہدہ۔',
      cta1: 'کام دیکھیں', cta2: 'گفتگو شروع کریں',
      pill: 'ایک ذہن۔ ہر نظام۔',
      quote: 'ہر صنعت ایک نظام پر قائم ہے۔ اکثر لوگ اسے وراثت میں پاتے ہیں۔ میں اسے تخلیق کرتا ہوں۔',
      quoteSupport: 'تجارتی ہالوں سے کابینہ کے کمروں تک۔ رن وے پروڈکشن سے تیل کے کنوؤں تک۔ ضبطِ نفس ثابت رہتا ہے — پورے کو دیکھو، خرابی کو پہچانو، جو باقی رہے اسے بناؤ۔',
    },
    about: {
      eyebrow: 'تشکیل',
      heading: 'قانون نے انہیں ٹھیک کیا۔\nمنڈیوں نے انہیں بے وہم کیا۔\nبقیہ نے انہیں خطرناک بنایا۔',
      para1: 'وہ قانون کے پاس پیشے کے طور پر نہیں، بلکہ نظم و ضبط کے طور پر آئے — سلطہ، ذمہ داری اور نتیجے کو پڑھنے کا ایک طریقہ، اس سے پہلے کہ دوسرے سوال مرتب کریں۔ سرمائے کی منڈیوں نے وہ سب چھین لیا جو حقیقت کے سامنے نہیں ٹھہر سکتا تھا۔ جو بچا وہ ایک خاص قسم کی قوتِ فیصلہ تھی — سرد، ساختی، صابر۔',
      para2: 'ہر اگلا میدان — ادارتی پیمانے پر تجارت، توانائی کی کارروائیاں، رن وے پروڈکشن، سیاسی حکمت عملی — ان کے کیریئر میں اضافہ نہیں کر رہا تھا۔ یہ پہلے سے تشکیل پائے ہوئے جبلّتوں کو آزما رہا تھا۔ تجربہ جمع ہوتا رہا۔ نمونہ واضح ہوتا گیا۔',
    },
    work: {
      heading: 'جہاں کام ہوا۔',
      subheading: 'چھ صنعتیں۔ پندرہ سال۔ کوئی وسیط نہیں۔',
    },
    insights: {
      heading: 'یقینِ راسخ۔',
      subheading: 'تبصرہ نہیں — موقف، جو بورڈ رومز، تجارتی ہالوں، سیاسی دفاتر اور فیشن کی پردہ پوشیوں میں پختہ ہوا۔',
    },
    speaking: {
      heading: 'خطابات و مشاورت',
      subheading: 'وہ وہی بیان کرتے ہیں جو انہوں نے خود چلایا ہے — پڑھی ہوئی باتیں نہیں، بلکہ بنائے، توڑے اور دوبارہ بنائے گئے نظام۔ کانفرنسیں، قیادتی اجلاس، خصوصی نشستیں۔',
    },
    training: {
      heading: 'پروگرام اور تربیت',
      para1: 'ان سینئر ٹیموں کے لیے جو عام خاکوں سے اکتا چکی ہیں۔ ان قائدین کے لیے جو حقیقی مسائل پر اس شخص کے ساتھ سوچنا چاہتے ہیں جس نے انہیں واقعی حل کیا ہو۔',
      para2: 'ہر پروگرام آپ کے ادارے کی حقیقی صورتحال کے گرد بنتا ہے۔ کوئی تیار شدہ سلائیڈیں نہیں۔ کوئی نظریہ بغیر اس کے پیچھے کی تجربے کے نہیں۔',
      cta: 'پروگرام پر بات کریں',
    },
    talks: {
      heading: 'خطابات اور کلیدی تقاریر',
      subheading: 'تین خطابات جو براہِ راست تجربے سے نکلے ہیں۔ ہر ایک ان کمروں کے لیے جہاں اصل فیصلے ہوتے ہیں۔',
    },
    truth: {
      heading: 'ہر دعویٰ\nقابلِ تصدیق ہے۔',
      subheading: 'کسی بھی ہندسے پر کرسر لے جائیں یا چھوئیں۔ کوئی مبالغہ نہیں۔ کوئی اشتہاری زبان نہیں۔ جو ہوا وہ۔',
    },
    contact: {
      heading: 'گفتگو شروع کریں۔',
      subheading: 'خطاب، مشاورت یا تعاون کے لیے۔ آپ کو ذاتی جواب ملے گا۔',
      namePlaceholder: 'آپ کا نام',
      emailPlaceholder: 'آپ کی ای میل',
      messagePlaceholder: 'آپ کا پیغام',
      send: 'بھیجیں',
    },
    ui: {
      classicView: '◈ کلاسک',
      adaptedFor: 'کے لیے موزوں',
      simplify: 'سادہ کریں',
      dismiss: 'نظرانداز کریں',
      readingTime: 'منٹ مطالعہ',
    },
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
