import { ServiceItem, GalleryItem, InterventionZone, Testimonial, FaqItem } from '../types';

export const BUSINESS_INFO = {
  name: "Major Plomberie & Fils",
  shortName: "Major Plomberie",
  phoneDisplay: "640 321 535",
  phoneFull: "+237640321535",
  whatsappNumber: "237640321535",
  email: "Mahlacaseafruits@gmail.com",
  city: "Foumbot",
  region: "Région de l'Ouest, Cameroun",
  zonesIntervention: ["Foumbot", "Bafoussam", "Foumban"],
  slogan: "Dépannage plomberie et installation sanitaire de tout type.",
  experienceYears: 12,
  completedProjects: 850,
  emergencyAvailability: "24h/24 & 7j/7 pour urgences fuites & bouchons",
  workingHours: "Lundi - Samedi : 07h00 - 19h00 | Dimanche : Astreinte Urgence",
  paymentPolicy: "Payé après service",
  paymentMethods: [
    { provider: "Orange Money", number: "640 321 535" },
    { provider: "MTN Mobile Money (MoMo)", number: "651 017 585" }
  ]
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'depannage-urgence',
    title: "Dépannage & Réparation d'Urgence",
    category: 'Urgence 24/7',
    shortDesc: "Intervention rapide pour stopper les fuites d'eau, déboucher vos canalisations ou réparer une casse.",
    fullDesc: "Une fuite d'eau non contrôlée ou un WC bouché peut causer d'importants dégâts matériels en quelques heures. L'équipe de Major Plomberie & Fils intervient en urgence à Foumbot, Bafoussam et Foumban munie d'outils de détection et de réparation haute pression.",
    iconName: 'AlertTriangle',
    priceRange: "À partir de 15 000 FCFA",
    estimatedDuration: "30 min à 2h",
    popular: true,
    includedFeatures: [
      "Détection et colmatage de fuite d'eau (apparentes et sous-dalle)",
      "Débouchage haute pression de canalisation, évier, lavabo ou WC",
      "Remplacement immédiat de robinet, vanne d'arrêt ou flexible percé",
      "Réparation de chasse d'eau qui coule en continu",
      "Nettoyage après intervention et garantie pièce & main d'œuvre"
    ]
  },
  {
    id: 'installation-sanitaire',
    title: "Installation Sanitaire Complète",
    category: 'Sanitaire & Salle de bain',
    shortDesc: "Pose professionnelle de douches italiennes, baignoires, WC modernes, lavabos et éviers de cuisine.",
    fullDesc: "Que vous construisiez une nouvelle villa ou rénoviez votre appartement, nous réalisons l'installation clé en main de tous vos équipements sanitaires. Finitions impeccables, étanchéité absolue et respect des normes de plomberie.",
    iconName: 'Bath',
    priceRange: "Sur devis (Selon équipements)",
    estimatedDuration: "1 à 3 jours",
    popular: true,
    includedFeatures: [
      "Pose de douches italiennes avec caniveau inox et étanchéité bicomposant",
      "Installation de WC à poser ou WC suspendus avec bâti-support",
      "Montage de meubles sous-vasque et mitigeurs thermostatiques",
      "Installation d'éviers de cuisine 1 ou 2 bacs avec siphon anti-odeur",
      "Conseil sur le choix de la céramique et robinetterie de qualité"
    ]
  },
  {
    id: 'tuyauterie-adduction',
    title: "Réseau de Tuyauterie & Adduction d'Eau",
    category: 'Canalisations & Forage',
    shortDesc: "Pose de tuyaux PPR thermosoudés, PVC pression, multicouche et raccordement au réseau ou château d'eau.",
    fullDesc: "Le cœur d'une bonne plomberie est son réseau de tuyauterie. Nous utilisons les technologies modernes comme le tube PPR thermosoudé (garanti sans fuite et incassable) pour alimenter toute votre maison en eau propre avec un débit optimal.",
    iconName: 'Pipette',
    priceRange: "Selon métrage & complexité",
    estimatedDuration: "2 à 5 jours",
    popular: true,
    includedFeatures: [
      "Soudure thermique de tuyauterie PPR haute résistance (eau froide/chaude)",
      "Raccordement complet au réseau d'eau public (CAMWATER) ou forage local",
      "Installation de collecteurs, nourrices et vannes d'isolement par secteur",
      "Pose de surpresseurs et pompes immergées pour châteaux d'eau",
      "Mise en épreuve sous pression avant scellement dans les murs"
    ]
  },
  {
    id: 'chauffe-eau-pompe',
    title: "Chauffe-Eau & Pompes d'Alimentation",
    category: 'Confort & Pression',
    shortDesc: "Installation, détartrage et maintenance de chauffe-eau électriques/solaires et surpresseurs d'eau.",
    fullDesc: "Profitez d'une eau chaude constante et d'une pression forte dans toutes vos robinetteries. Major Plomberie assure la pose sécurisée et l'entretien régulier de vos ballons d'eau chaude et systèmes de pompage automatique.",
    iconName: 'Flame',
    priceRange: "À partir de 25 000 FCFA (pose)",
    estimatedDuration: "2h à demi-journée",
    popular: false,
    includedFeatures: [
      "Installation de chauffe-eau électrique (Ariston, Atlantic, etc.) de 50L à 300L",
      "Pose de groupe de sécurité anti-surpression et réducteur de pression",
      "Détartrage complet de cuve et remplacement d'anode magnésium / résistance",
      "Installation de pompe automatique de relevage ou de surpression",
      "Vérification électrique de mise à la terre et disjoncteur dédié"
    ]
  },
  {
    id: 'assainissement-evacuation',
    title: "Assainissement & Évacuation des Eaux",
    category: 'Assainissement',
    shortDesc: "Raccordement des eaux usées, pose de regards, fosses septiques, puisards et évacuation pluviale.",
    fullDesc: "Une évacuation mal conçue provoque de mauvaises odeurs, des remontées et une humidité constante. Nous concevons vos réseaux d'évacuation avec des pentes rigoureusement calculées et une ventilation adéquate.",
    iconName: 'Waves',
    priceRange: "Sur devis chantier",
    estimatedDuration: "1 à 4 jours",
    popular: false,
    includedFeatures: [
      "Pose de canalisations PVC gros diamètre (100mm, 110mm, 160mm) avec pente étudiée",
      "Construction et raccordement de regards de visite étanches",
      "Mise en place de clapets anti-retour pour éviter les refoulements",
      "Ventilation primaire et secondaire des colonnes de chute (zéro odeur)",
      "Evacuation optimisée des eaux pluviales et chéneaux"
    ]
  },
  {
    id: 'contrat-maintenance',
    title: "Contrat de Maintenance Immeubles & Hôtels",
    category: 'Pro & Résidentiel',
    shortDesc: "Suivi préventif, inspection régulière et dépannages prioritaires pour résidences, hôtels et commerces.",
    fullDesc: "Pour les gestionnaires immobiliers, hôtels et résidences à Bafoussam, Foumbot ou Foumban, nous offrons une tranquillité d'esprit totale avec des visites de maintenance préventive et une ligne d'appel prioritaire.",
    iconName: 'ShieldCheck',
    priceRange: "Forfait mensuel / annuel",
    estimatedDuration: "Intervention sur mesure",
    popular: false,
    includedFeatures: [
      "Inspection trimestrielle de toute la robinetterie et chasses d'eau",
      "Vérification des pompes de relevage et châteaux d'eau",
      "Nettoyage préventif des siphons et canalisations principales",
      "Intervention prioritaire en moins d'une heure en cas d'urgence",
      "Rapport technique détaillé après chaque visite"
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: "Collecteur de distribution PPR encastré sous coffret mural",
    category: 'tuyauterie',
    location: 'Foumbot',
    type: 'photo',
    url: "/images/collecteur_ppr.jpg",
    description: "Installation professionnelle d'un collecteur en laiton avec vannes quart de tour bleues et gaines annelées sous boîtier encastré dans un mur en parpaing à Foumbot.",
    date: "Mars 2026"
  },
  {
    id: 'gal-2',
    title: "Pose de WC monobloc moderne sur carrelage texturé",
    category: 'sanitaire',
    location: 'Bafoussam',
    type: 'photo',
    url: "/images/wc_moderne.jpg",
    description: "Installation sanitaire impeccable d'un WC céramique à double flux sur carrelage sol gris clair avec mur en carreaux 3D texturés vague à Bafoussam.",
    date: "Mars 2026"
  },
  {
    id: 'gal-3',
    title: "Réseau d'évacuation sanitaire en tuyaux PVC haute pression",
    category: 'tuyauterie',
    location: 'Foumban',
    type: 'photo',
    url: "/images/evacuation_pvc.jpg",
    description: "Assemblage précis des culottes et coudes d'évacuation en PVC gris sur mur ciment pour garantir une circulation fluide sans risque d'engorgement.",
    date: "Février 2026"
  },
  {
    id: 'gal-4',
    title: "Évier en inox encastré sur paillasse carrelée avec mitigeur",
    category: 'sanitaire',
    location: 'Foumbot',
    type: 'photo',
    url: "/images/evier_inox.jpg",
    description: "Montage et étanchéification au silicone d'un évier cuisine en inox sur support carrelé avec robinetterie murale col de cygne.",
    date: "Février 2026"
  },
  {
    id: 'gal-5',
    title: "Installation surpresseur automatique et château d'eau",
    category: 'tuyauterie',
    location: 'Bafoussam',
    type: 'photo',
    url: "/images/surpresseur.jpg",
    description: "Système complet de pompage et surpression pour garantir une excellente pression d'eau 24h/24 dans un immeuble résidentiel R+2.",
    date: "Janvier 2026"
  },
  {
    id: 'gal-6',
    title: "Pose de robinetterie haut de gamme et vasque en granit",
    category: 'sanitaire',
    location: 'Foumban',
    type: 'photo',
    url: "/images/robinetterie.jpg",
    description: "Installation minutieuse d'un mitigeur en laiton chromé sur un plan de travail sur mesure pour un client particulier au quartier artistique de Foumban.",
    date: "Décembre 2025"
  },
  {
    id: 'gal-7',
    title: "Vidéo : Test de pression et fonctionnement pompe surpresseur",
    category: 'video',
    location: 'Foumbot',
    type: 'video',
    url: "https://assets.mixkit.co/videos/preview/mixkit-water-flowing-from-a-silver-faucet-41483-large.mp4",
    videoPoster: "/images/surpresseur.jpg",
    description: "Démonstration vidéo du débit d'eau optimal obtenu après installation d'une pompe automatique couplée à un château d'eau à Foumbot.",
    date: "Décembre 2025"
  },
  {
    id: 'gal-8',
    title: "Avant / Après : Rénovation plomberie vétuste sous évier",
    category: 'depannage',
    location: 'Bafoussam',
    type: 'before-after',
    url: "/images/evier_inox.jpg",
    beforeUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1000&q=80",
    afterUrl: "/images/evier_inox.jpg",
    description: "Remplacement complet d'une tuyauterie en fer rouillé fuyante par un réseau PVC haute densité propre avec siphons anti-bouchage.",
    date: "Novembre 2025"
  }
];

export const INTERVENTION_ZONES: InterventionZone[] = [
  {
    name: "Foumbot (Siège)",
    desc: "Notre ville de base ! Nous sommes au cœur de Foumbot pour des interventions ultra-rapides en moins de 30 minutes, que vous soyez au centre-ville, aux alentours du marché ou dans les quartiers périphériques.",
    approxResponseTime: "15 à 30 minutes",
    landmark: "Marché central & Axe principal Foumbot",
    lat: 5.5034,
    lng: 10.6333,
    activeChantiersCount: 14
  },
  {
    name: "Bafoussam",
    desc: "Chef-lieu de la région de l'Ouest. Nos équipes mobiles interviennent quotidiennement dans tous les quartiers : Djeleng, Tamdja, Famla, Banengo, Haoussa, et la route de Foumbot.",
    approxResponseTime: "30 à 45 minutes",
    landmark: "Rond-point Bafoussam & Marché A",
    lat: 5.4778,
    lng: 10.4181,
    activeChantiersCount: 22
  },
  {
    name: "Foumban",
    desc: "Cité des arts et d'histoire. Nous réalisons l'installation et le dépannage pour les résidences, palais, commerces et nouvelles constructions à Foumban et ses environs.",
    approxResponseTime: "30 à 45 minutes",
    landmark: "Palais Royal de Foumban & Carrefour",
    lat: 5.7292,
    lng: 10.9001,
    activeChantiersCount: 9
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: "M. Ibrahim Njoya",
    location: "Foumbot",
    rating: 5,
    comment: "Major Plomberie a résolu une grosse fuite d'eau encastrée dans le mur de mon salon en un temps record. Travail très propre, ponctuel et facture honnête. Je recommande vivement !",
    serviceUsed: "Dépannage fuite d'urgence",
    date: "Il y a 2 semaines"
  },
  {
    id: 't-2',
    name: "Mme Clarisse Tchakounte",
    location: "Bafoussam (Quartier Tamdja)",
    rating: 5,
    comment: "Nous avons confié l'installation sanitaire complète de nos 4 appartements à Major et ses fils. La tuyauterie en PPR est excellente et la pression d'eau au 2ème étage est parfaite grâce au surpresseur installé.",
    serviceUsed: "Installation sanitaire villa R+2",
    date: "Il y a 1 mois"
  },
  {
    id: 't-3',
    name: "Alhadji Ousmane",
    location: "Foumban",
    rating: 5,
    comment: "Très satisfaisant. Contacté via WhatsApp pour un chauffe-eau qui ne chauffait plus, ils sont arrivés avec les pièces de rechange et tout refonctionne. Un vrai professionnalisme.",
    serviceUsed: "Réparation chauffe-eau électrique",
    date: "Il y a 3 semaines"
  },
  {
    id: 't-4',
    name: "M. Jean-Pierre Fokou",
    location: "Bafoussam (Quartier Djeleng)",
    rating: 5,
    comment: "J'ai apprécié la transparence des prix et les explications claires avant de commencer le travail. Ils ont débouché notre canalisation principale en moins d'une heure. Très pro !",
    serviceUsed: "Débouchage canalisation",
    date: "Il y a 4 jours"
  },
  {
    id: 't-5',
    name: "Mme Aminatou Nsangou",
    location: "Foumban (Quartier Palais)",
    rating: 5,
    comment: "L'installation de la douche italienne dans notre suite parentale est magnifique. Major Plomberie a fait preuve d'un grand sens du détail : les joints de carrelage et l'étanchéité sont parfaits.",
    serviceUsed: "Pose de douche italienne",
    date: "Il y a 3 semaines"
  },
  {
    id: 't-6',
    name: "M. Samuel Eyong",
    location: "Foumbot",
    rating: 5,
    comment: "Installation impeccable d'un château d'eau de 3000L avec pompe automatique. Plus aucun problème de coupure d'eau chez moi, le système bascule tout seul. Merci pour ce super boulot !",
    serviceUsed: "Installation de château d'eau",
    date: "Il y a 2 mois"
  }
];

export const FAQ_ITEMS: (FaqItem & { q: string; a: string })[] = [
  {
    id: 'faq-1',
    question: "Quels sont vos délais d'intervention en cas d'urgence à Foumbot ?",
    answer: "Étant basés à Foumbot, nous pouvons être sur place en 15 à 30 minutes suite à votre appel. Pour Bafoussam et Foumban, comptez en moyenne 35 à 45 minutes selon la circulation.",
    q: "Quels sont vos délais d'intervention en cas d'urgence à Foumbot ?",
    a: "Étant basés à Foumbot, nous pouvons être sur place en 15 à 30 minutes suite à votre appel. Pour Bafoussam et Foumban, comptez en moyenne 35 à 45 minutes selon la circulation.",
    category: 'intervention'
  },
  {
    id: 'faq-2',
    question: "Comment se déroule un dépannage en cas de fuite d'eau ou de canalisation bouchée ?",
    answer: "Dès votre appel ou message WhatsApp, nous posons un diagnostic préalable. Sur place, nous localisons précisément l'origine de la fuite ou du bouchon, coupons l'arrivée d'eau concernée et réparons immédiatement avec des pièces certifiées anti-corrosion et haute pression.",
    q: "Comment se déroule un dépannage en cas de fuite d'eau ou de canalisation bouchée ?",
    a: "Dès votre appel ou message WhatsApp, nous posons un diagnostic préalable. Sur place, nous localisons précisément l'origine de la fuite ou du bouchon, coupons l'arrivée d'eau concernée et réparons immédiatement avec des pièces certifiées anti-corrosion et haute pression.",
    category: 'depannage'
  },
  {
    id: 'faq-3',
    question: "Quels types de tuyaux recommandez-vous pour l'alimentation en eau d'une maison neuve ?",
    answer: "Nous privilégions fortement le tube PPR (polypropylène réticulé) soudé par thermofusion pour l'intérieur des maisons. Contrairement au PVC collé ou au fer galvanisé, le PPR ne rouille jamais, supporte de très fortes pressions et garantit des joints fusionnés incassables à 100%.",
    q: "Quels types de tuyaux recommandez-vous pour l'alimentation en eau d'une maison neuve ?",
    a: "Nous privilégions fortement le tube PPR (polypropylène réticulé) soudé par thermofusion pour l'intérieur des maisons. Contrairement au PVC collé ou au fer galvanisé, le PPR ne rouille jamais, supporte de très fortes pressions et garantit des joints fusionnés incassables à 100%.",
    category: 'installation'
  },
  {
    id: 'faq-4',
    question: "Installez-vous des surpresseurs et châteaux d'eau pour les zones à faible pression ?",
    answer: "Oui ! C'est l'une de nos spécialités dans l'Ouest (Foumbot, Bafoussam, Foumban). Nous installons des cuves 1000L à 5000L sur tour ou dalle avec pompes surpresseurs automatiques et clapets anti-retour pour garantir un débit puissant en tout temps.",
    q: "Installez-vous des surpresseurs et châteaux d'eau pour les zones à faible pression ?",
    a: "Oui ! C'est l'une de nos spécialités dans l'Ouest (Foumbot, Bafoussam, Foumban). Nous installons des cuves 1000L à 5000L sur tour ou dalle avec pompes surpresseurs automatiques et clapets anti-retour pour garantir un débit puissant en tout temps.",
    category: 'installation'
  },
  {
    id: 'faq-5',
    question: "Comment obtenir un devis et quels sont vos modes de facturation ?",
    answer: "Vous pouvez utiliser notre formulaire 'Demande de devis' dans l'application ou nous envoyer les photos/plans par WhatsApp au 640 321 535. Nous établissons un devis clair et transparent détaillant la fourniture des matériels et la main d'œuvre avant tout début de chantier. Le règlement s'effectue après service rendu.",
    q: "Comment obtenir un devis et quels sont vos modes de facturation ?",
    a: "Vous pouvez utiliser notre formulaire 'Demande de devis' dans l'application ou nous envoyer les photos/plans par WhatsApp au 640 321 535. Nous établissons un devis clair et transparent détaillant la fourniture des matériels et la main d'œuvre avant tout début de chantier. Le règlement s'effectue après service rendu.",
    category: 'tarifs'
  },
  {
    id: 'faq-paiement',
    question: "Quels sont les moyens de paiement acceptés pour vos prestations ?",
    answer: "Vous êtes payé après service rendu et vérification de l'installation ! Le règlement se fait par Orange Money au 640 321 535 ou par MTN Mobile Money (MoMo) au 651 017 585.",
    q: "Quels sont les moyens de paiement acceptés pour vos prestations ?",
    a: "Vous êtes payé après service rendu et vérification de l'installation ! Le règlement se fait par Orange Money au 640 321 535 ou par MTN Mobile Money (MoMo) au 651 017 585.",
    category: 'tarifs'
  },
  {
    id: 'faq-6',
    question: "Proposez-vous une garantie sur vos installations sanitaires et chauffe-eau ?",
    answer: "Absolument. Toutes nos installations neuves bénéficient d'une garantie formelle sur la main d'œuvre et l'étanchéité des raccordements réalisés par Major Plomberie & Fils. Nous assurons également le suivi technique et la maintenance périodique.",
    q: "Proposez-vous une garantie sur vos installations sanitaires et chauffe-eau ?",
    a: "Absolument. Toutes nos installations neuves bénéficient d'une garantie formelle sur la main d'œuvre et l'étanchéité des raccordements réalisés par Major Plomberie & Fils. Nous assurons également le suivi technique et la maintenance périodique.",
    category: 'tarifs'
  },
  {
    id: 'faq-7',
    question: "Intervenez-vous le dimanche ou les jours fériés en cas de fuite grave ?",
    answer: "Oui, notre équipe d'astreinte est disponible 24h/24 et 7j/7, y compris les dimanches et jours fériés, pour stopper les inondations domestiques, déboucher les canalisations principales et réparer les fuites urgentes.",
    q: "Intervenez-vous le dimanche ou les jours fériés en cas de fuite grave ?",
    a: "Oui, notre équipe d'astreinte est disponible 24h/24 et 7j/7, y compris les dimanches et jours fériés, pour stopper les inondations domestiques, déboucher les canalisations principales et réparer les fuites urgentes.",
    category: 'intervention'
  },
  {
    id: 'faq-8',
    question: "Que faire en attendant l'arrivée du plombier lors d'une fuite importante ?",
    answer: "Coupez immédiatement la vanne d'arrêt générale (souvent située près du compteur d'eau ou à l'entrée de l'appartement). Si l'eau touche des prises électriques, coupez le disjoncteur général par sécurité, puis appelez-nous directement au 640 321 535.",
    q: "Que faire en attendant l'arrivée du plombier lors d'une fuite importante ?",
    a: "Coupez immédiatement la vanne d'arrêt générale (souvent située près du compteur d'eau ou à l'entrée de l'appartement). Si l'eau touche des prises électriques, coupez le disjoncteur général par sécurité, puis appelez-nous directement au 640 321 535.",
    category: 'depannage'
  }
];
