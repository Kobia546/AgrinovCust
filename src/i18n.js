import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "welcome": "Welcome",
          "with_us":"With us",
          "about": "About Us",
          "phone":"phone",
          "name":"Full name",
          "Download_quote":"Download quote",
          "services": "Our Services",
          "products": "Our Products",
          "contact": "Contact Us",
          "send_request":"Send request",
          "request_quote": "Request a Quote",
          "legal_notice": "Legal Notice",
          "privacy_policy": "Privacy Policy",
          "home": "Home",
          "material":"Farm equipment",
          "production":"Greenhouse production",
          "technical":"Technical support",
          "installation":"Professional installation",
          "language": "Language"
        }
      },
      fr: {
        translation: {
          "welcome": "Bienvenue",
          "with_us":"Chez nous",
          "about": "À Propos",
          "production":"Fabrication de serre",
          "name":"Nom complet",
          "installation":"installation professionelle",
          "phone":"Telephone",
          "technical":"Support technique",
          "material":"Materiel agriculture",
          "services": "Nos Services",
          "products": "Nos Produits",
          "send_request":"Envoyer Demande",
          "contact": "Contactez-nous",
          "request_quote": "Demande de Devis",
          "Download_quote":"Telecharger Devis",
          "legal_notice": "Mentions Légales",
          "privacy_policy": "Politique de Confidentialité",
          "home": "Accueil",
          "language": "Langue"
        }
      }
    },
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
