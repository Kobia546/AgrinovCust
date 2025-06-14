import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "welcome": "Welcome",
          "about": "About Us",
          "services": "Our Services",
          "products": "Our Products",
          "contact": "Contact Us",
          "request_quote": "Request a Quote",
          "legal_notice": "Legal Notice",
          "privacy_policy": "Privacy Policy",
          "home": "Home",
          "language": "Language"
        }
      },
      fr: {
        translation: {
          "welcome": "Bienvenue",
          "about": "À Propos",
          "services": "Nos Services",
          "products": "Nos Produits",
          "contact": "Contactez-nous",
          "request_quote": "Demande de Devis",
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
