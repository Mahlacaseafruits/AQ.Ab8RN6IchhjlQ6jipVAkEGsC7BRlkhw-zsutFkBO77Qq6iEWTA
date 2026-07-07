/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AdviceArticle } from '../types';

export const CONSEILS_ARTICLES: AdviceArticle[] = [
  {
    id: 'entretien-evier-bouchon',
    title: "Comment éviter que votre évier ou lavabo ne se bouche au quotidien ?",
    category: 'canalisations',
    categoryLabel: "Entretien Canalisations",
    readTime: "2 min de lecture",
    iconName: "Droplets",
    summary: "Les bouchons sont le problème de plomberie le plus fréquent. Découvrez des gestes simples et naturels pour garder vos tuyaux propres sans abîmer le PVC.",
    content: [
      "Ne jetez jamais d'huile de friture ou de graisse chaude dans l'évier. En refroidissant, la graisse se figera dans le siphon et collera les résidus d'aliments (marc de café, restes de riz ou de couscous).",
      "Installez une petite grille de filtration en inox sur la bonde de votre évier de cuisine et de vos lavabos pour retenir les restes alimentaires et les cheveux.",
      "Astuce hebdomadaire naturelle : Versez 3 cuillères à soupe de bicarbonate de soude dans l'évier, suivi d'un verre de vinaigre blanc. Laissez agir 15 minutes, puis rincez avec une bouilloire d'eau chaude pour dissoudre le film gras.",
      "Évitez l'usage excessif de soude caustique en grains ou de produits chimiques ultra-agressifs : ils déforment et rongent les joints en caoutchouc et les tuyaux PVC."
    ],
    tipBox: "Si l'eau commence déjà à s'écouler lentement, démontez manuellement le siphon sous l'évier avec un seau en dessous pour le vider avant que le bouchon ne s'installe dans la canalisation murale.",
    warningBox: "Ne forcez jamais avec un cintre métallique pointu dans la tuyauterie : vous risquez de percer le coude PVC ou le siphon en plastique.",
    recommendedServiceId: 'depannage-urgence'
  },
  {
    id: 'prevention-fuite-sous-dalle',
    title: "Détecter une fuite d'eau invisible avant de recevoir une facture salée",
    category: 'fuites',
    categoryLabel: "Prévention des Fuites",
    readTime: "3 min de lecture",
    iconName: "ShieldCheck",
    summary: "Une micro-fuite sur une chasse d'eau ou un tuyau enterré peut faire perdre des centaines de litres. Voici comment faire un test d'étanchéité chez vous en 10 minutes.",
    content: [
      "Le test du compteur (infaillible) : Le soir avant de vous coucher, fermez bien tous les robinets de la maison et vérifiez qu'aucun appareil ne consomme de l'eau. Notez précisément les chiffres de votre compteur d'eau (CAMWATER ou forage).",
      "Le lendemain matin, avant d'ouvrir le moindre robinet, vérifiez à nouveau le compteur. Si les chiffres ont augmenté, vous avez une fuite active sur votre réseau.",
      "Inspectez en priorité les WC : Soulevez le couvercle du réservoir. Si vous entendez un léger sifflement ou si un filet d'eau coule en continu dans la cuvette, le joint du clapet ou le flotteur est entartré ou défectueux.",
      "Surveillez vos murs et plafonds : Une tache d'humidité, une peinture qui cloque ou un carrelage anormalement chaud/humide indiquent souvent une fuite sous-dalle ou encastrée."
    ],
    tipBox: "À Foumbot et Bafoussam, les variations de pression du réseau peuvent endommager les vieux joints. Pensez à faire vérifier vos robinets d'arrêt une fois par an par notre artisan.",
    warningBox: "Une fuite négligée sous le carrelage peut fragiliser la dalle béton et créer de la moisissure dangereuse pour la santé de votre famille.",
    recommendedServiceId: 'depannage-urgence'
  },
  {
    id: 'economies-eau-mousseurs',
    title: "3 gestes simples pour réduire votre facture d'eau de 30% chaque mois",
    category: 'economies',
    categoryLabel: "Économies d'Eau",
    readTime: "2 min de lecture",
    iconName: "Zap",
    summary: "Réduire sa consommation d'eau est essentiel en saison sèche et bénéfique pour votre portefeuille. Voici comment optimiser vos points d'eau sans perdre en confort.",
    content: [
      "Installez des mousseurs aérateurs sur tous vos robinets (cuisine et lavabos) : Ce petit embout mélange de l'air à l'eau. Vous gardez exactement la même sensation de pression forte, mais vous consommez 40% d'eau en moins.",
      "Optez pour un mécanisme de chasse d'eau à double bouton (3L / 6L) plutôt qu'un système à tirette unique qui vide 9 à 12 litres à chaque passage.",
      "Vérifiez l'état du joint de vos robinets dès la première goutte : Un robinet qui goutte à raison d'une goutte par seconde gaspille plus de 12 000 litres d'eau par an !",
      "Privilégiez les douches aux bains et coupez l'eau pendant le savonnage : Une douche rapide consomme environ 40 litres contre 150 litres pour une baignoire."
    ],
    tipBox: "Major Plomberie propose l'installation de kits économiseurs d'eau complets (mousseurs + pommeau de douche économique + chasse double flux) amortis en moins de 3 mois sur votre facture !",
    recommendedServiceId: 'installation-sanitaire'
  },
  {
    id: 'reflexe-urgence-rupture-tuyau',
    title: "Rupture soudaine de tuyau : les 3 gestes qui sauvent votre maison",
    category: 'urgence',
    categoryLabel: "Urgences & Réflexes",
    readTime: "1 min de lecture",
    iconName: "Wrench",
    summary: "En cas d'inondation brutale ou de canalisation éclatée, pas de panique ! Voici la procédure d'urgence à suivre immédiatement avant notre arrivée.",
    content: [
      "Étape 1 : Coupez immédiatement l'arrivée d'eau générale. Familiarisez toute la famille avec l'emplacement de la vanne d'arrêt principale (généralement située près du compteur ou du forage). Tournez la poignée dans le sens des aiguilles d'une montre.",
      "Étape 2 : Coupez le disjoncteur électrique si l'eau s'approche des prises murales, d'une multiprise ou du chauffe-eau électrique pour éviter tout risque d'électrocution.",
      "Étape 3 : Ouvrez les robinets les plus bas de la maison (ex: robinet de puisage extérieur ou lavabo du rez-de-chaussée) pour vider l'eau restante dans la tuyauterie et faire chuter la pression.",
      "Étape 4 : Appelez l'urgence Major Plomberie au 640 321 535 via appel direct ou WhatsApp en nous envoyant une photo de la casse."
    ],
    tipBox: "Manipulez vos vannes générales au moins 2 fois par an (ouvrir/fermer) pour éviter qu'elles ne se grippent ou ne cassent le jour où vous en avez besoin !",
    warningBox: "N'essayez pas de colmater une fuite à haute pression sous tension électrique avec du ruban adhésif simple ou du chiffon. Coupez d'abord la vanne.",
    recommendedServiceId: 'depannage-urgence'
  },
  {
    id: 'avantage-tuyau-ppr-cameroun',
    title: "Pourquoi le tube PPR thermosoudé est le roi de la plomberie moderne ?",
    category: 'materiaux',
    categoryLabel: "Matériaux & Innovation",
    readTime: "3 min de lecture",
    iconName: "ShieldCheck",
    summary: "Adieu les fuites récurrentes sur la colle PVC ou le fer galvanisé qui rouille ! Découvrez pourquoi Major Plomberie privilégie le PPR thermosoudé pour toutes vos adductions.",
    content: [
      "Qu'est-ce que le PPR ? C'est le Polypropylène Réticulé, un matériau plastique moderne de couleur verte ou grise, assemblé par fusion thermique à 260°C.",
      "Zéro risque de fuite aux raccords : Contrairement aux tuyaux collés qui finissent par se décoller avec la chaleur ou la pression du château d'eau, le tuyau PPR et son raccord fondent ensemble pour devenir une seule pièce monobloc incassable.",
      "Résistance extrême et hygiène : Le PPR ne rouille pas, ne s'entartre pas à l'intérieur, résiste à l'eau chaude (jusqu'à 95°C) et conserve une eau 100% pure et inodore.",
      "Durée de vie supérieure à 50 ans : C'est l'investissement idéal pour sécuriser la plomberie d'un immeuble, d'une villa ou d'un commerce à Foumbot, Bafoussam et Foumban."
    ],
    tipBox: "Exigez toujours des soudures PPR réalisées par un artisan équipé d'une polyfuseuse étalonnée. Une mauvaise température de soudure peut réduire le diamètre intérieur du tuyau.",
    recommendedServiceId: 'tuyauterie-adduction'
  },
  {
    id: 'entretien-chauffe-eau-duree-vie',
    title: "Comment multiplier par 2 la durée de vie de votre chauffe-eau ?",
    category: 'canalisations',
    categoryLabel: "Chauffe-Eau & Pression",
    readTime: "3 min de lecture",
    iconName: "Wrench",
    summary: "Un chauffe-eau électrique entartré consomme 40% d'électricité en plus et risque de percer. Voici les règles d'entretien indispensables.",
    content: [
      "Le détartrage tous les 2 ans : L'eau dans notre région peut contenir du calcaire et des sédiments. Avec le temps, une couche de tartre recouvre la résistance électrique, l'empêchant de chauffer efficacement.",
      "Le contrôle de l'anode en magnésium : Cette petite tige protège la cuve en acier contre la corrosion. Lorsqu'elle est usée, c'est la cuve elle-même qui commence à rouiller et à fuir.",
      "Actionnez le groupe de sécurité 1 fois par mois : Tournez légèrement le bouton rouge ou noir du groupe de sécurité sous le chauffe-eau pour évacuer un peu d'eau et chasser les impuretés qui pourraient bloquer la soupape.",
      "Réglez le thermostat sur 60°C : C'est la température idéale pour tuer les bactéries (légionellose) tout en évitant l'entartrage rapide et les brûlures accidentelles."
    ],
    tipBox: "Si votre chauffe-eau émet des bruits de claquement ou de sifflement pendant la chauffe, c'est que le tartre est déjà très épais sur la résistance. Contactez-nous pour un détartrage complet.",
    warningBox: "Ne coupez jamais les sécurités thermiques d'un chauffe-eau. En cas de surpression sans soupape fonctionnelle, le ballon peut éclater.",
    recommendedServiceId: 'chauffe-eau-pompe'
  }
];
