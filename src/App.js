import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { jsPDF } from 'jspdf';
import { Menu, X, Phone, Mail, MapPin, Leaf, Shield, Zap, Users, ChevronRight, Star, Facebook, Youtube, MessageCircle, Globe, ArrowRight, CheckCircle, Info, Package, Award, Clock } from 'lucide-react';
import './App.css';
import emailjs from 'emailjs-com';
import './i18n';

const App = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [showDevisModal, setShowDevisModal] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [devisData, setDevisData] = useState({
    nom: '',
    email: '',
    telephone: '',
    entreprise: '',
    typeProjet: '',
    surface: '',
    localite: '',
    description: ''
  });

  const logo = require('./Images/logo1.png');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = () => {
    const mailtoLink = `mailto:service_commercial@agroser-reinnov.org?subject=${encodeURIComponent(formData.sujet)}&body=${encodeURIComponent(
      `Nom: ${formData.nom}\nEmail: ${formData.email}\nTéléphone: ${formData.telephone}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Bonjour AGRO SERRE INNOVATION,\n\nNom: ${formData.nom}\nEmail: ${formData.email}\nTéléphone: ${formData.telephone}\n\nSujet: ${formData.sujet}\n\nMessage: ${formData.message}`
    );
    window.open(`https://wa.me/2250101619919?text=${message}`, '_blank');
  };

  const sendEmailNotification = (devisData) => {
    const templateParams = {
      nom: devisData.nom,
      email: devisData.email,
      telephone: devisData.telephone,
      entreprise: devisData.entreprise,
      typeProjet: devisData.typeProjet,
      surface: devisData.surface,
      budget: devisData.budget,
      delai: devisData.delai,
      description: devisData.description,
    };
    emailjs.send('service_05zhygg', 'template_nky87w8', templateParams, 'GkGeJjFmlJJIrv9tF')
      .then((response) => {
        console.log('Email envoyé avec succès!', response.status, response.text);
      }, (err) => {
        console.error('Erreur lors de l\'envoi de l\'email:', err);
      });
  };

  // Fonction pour afficher les alertes stylisées
  const showStyledAlert = (message, type = 'info') => {
    const alertContainer = document.getElementById('alert-container') || createAlertContainer();
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `styled-alert styled-alert-${type}`;
    
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️';
    
    alertDiv.innerHTML = `
      <div class="alert-content">
        <span class="alert-icon">${icon}</span>
        <span class="alert-message">${message}</span>
      </div>
      <button class="alert-close">&times;</button>
    `;
    
    alertContainer.appendChild(alertDiv);
    
    // Animation d'entrée
    setTimeout(() => alertDiv.classList.add('show'), 100);
    
    // Auto-suppression après 5 secondes
    const timer = setTimeout(() => removeAlert(alertDiv), 5000);
    
    // Suppression manuelle
    alertDiv.querySelector('.alert-close').onclick = () => {
      clearTimeout(timer);
      removeAlert(alertDiv);
    };
  };

  const createAlertContainer = () => {
    const container = document.createElement('div');
    container.id = 'alert-container';
    container.className = 'alert-container';
    document.body.appendChild(container);
    return container;
  };

  const removeAlert = (alertDiv) => {
    alertDiv.classList.add('hide');
    setTimeout(() => alertDiv.remove(), 300);
  };

  const handleSimpleNotification = (devisData) => {
    if (!devisData.nom || !devisData.email || !devisData.surface) {
      showStyledAlert('Veuillez remplir au minimum votre nom, email et la surface souhaitée.', 'error');
      return;
    }

    const catalogTypes = {
      '100': 'Catalogue Mini Serre 100m²',
      '200': 'Catalogue Pro 200m²', 
      '250': 'Catalogue Pro 250m²',
      '300': 'Catalogue Tropic 300m²',
      '500': 'Catalogue Robuste 500m²',
      'Sur mesure': 'Catalogue Projet sur mesure'
    };

    const catalogType = catalogTypes[devisData.surface] || 'Demande personnalisée';
    const catalogPrice = catalogConfig[devisData.surface]?.price || 'Sur devis';

    const templateParams = {
      nom: devisData.nom,
      email: devisData.email,
      telephone: devisData.telephone || 'Non renseigné',
      entreprise: devisData.entreprise || 'Particulier', 
      surface: devisData.surface,
      typeProjet: catalogType,
      localite: devisData.localite || 'Non précisée',
      typeSerre: devisData.typeProjet || 'Non précisé',
      description: `🔔 DEMANDE DE CONTACT

👤 PROSPECT: ${devisData.nom}
📧 Email: ${devisData.email}
📱 Téléphone: ${devisData.telephone || 'Non renseigné'}
🏢 Entreprise: ${devisData.entreprise || 'Particulier'}

📋 PROJET SOUHAITÉ:
• Type de serre: ${devisData.typeProjet || 'Non précisé'}
• Surface: ${devisData.surface} m²
• Prix: ${catalogPrice}
• Localité: ${devisData.localite || 'Non précisée'}

📝 Description: ${devisData.description || 'Aucune description fournie'}

⚡ Action: Ce prospect souhaite être contacté rapidement!`
    };

    console.log('📤 Envoi demande contact:', templateParams);

    emailjs.send('service_05zhygg', 'template_nky87w8', templateParams, 'GkGeJjFmlJJIrv9tF')
      .then((response) => {
        console.log('✅ Demande de contact envoyée!', response);
        showStyledAlert('Votre demande a été transmise à notre équipe commerciale qui vous recontactera rapidement.', 'success');
      })
      .catch((error) => {
        console.error('❌ Erreur envoi demande:', error);
        showStyledAlert('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
      });
  };

  const handleCatalogRequest = (devisData) => {
    downloadCatalog(devisData);
  };

  const catalogConfig = {
    '100': {
      fileName: 'devis100.pdf',
      displayName: 'Mini Serre 100m²',
      price: '2,000,000 FCFA'
    },
    '200': {
      fileName: 'devis200.pdf',
      displayName: 'Pro 200m²',
      price: '3,500,000 FCFA'
    },
    '250': {
      fileName: 'devis300.pdf',
      displayName: 'Pro 250m²',
      price: '4,200,000 FCFA'
    },
    '300': {
      fileName: 'Catalogue_Tropic_300m2.pdf',
      displayName: 'Tropic 300m²',
      price: '5,000,000 FCFA'
    },
    '500': {
      fileName: 'devis500.pdf',
      displayName: 'Robuste 500m²',
      price: '6,500,000 FCFA'
    },
    'Sur mesure': {
      fileName: 'Catalogue_Sur_Mesure.pdf',
      displayName: 'Projet sur mesure',
      price: 'Sur devis'
    }
  };

  const COMPANY_EMAIL = 'mambochristian2018@gmail.com';

  const createCompanyNotificationTemplate = (userData, catalogInfo) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = currentDate.toLocaleTimeString('fr-FR');

    return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Nouveau téléchargement de catalogue</title></head><body><div style="max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); overflow: hidden;"><div style="background: linear-gradient(135deg, #2c5530, #4a7c59); color: white; padding: 30px; text-align: center;"><h1>🌱 AGRO SERRE INNOVATION</h1><p>Notification de téléchargement</p></div><div style="padding: 30px;"><div style="background: linear-gradient(135deg, #e8f5e8, #f0f8f0); border-left: 5px solid #4a7c59; padding: 20px; margin-bottom: 25px; border-radius: 8px;"><h3 style="color: #2c5530; margin-bottom: 8px;">Nouveau téléchargement de catalogue</h3><p style="color: #4a7c59;">Un prospect vient de télécharger un de vos catalogues</p></div></div></div></body></html>`;
  };

  const notifyCompany = async (userData, catalogInfo) => {
    if (!userData || !catalogInfo) {
      console.error('Données manquantes pour l\'utilisateur ou le catalogue');
      return false;
    }

    const formattedDate = new Date().toLocaleDateString('fr-FR');
    const formattedTime = new Date().toLocaleTimeString('fr-FR');

    const templateParams = {
      nom: userData.nom || 'Non renseigné',
      email: userData.email || 'Non renseigné', 
      telephone: userData.telephone || 'Non renseigné',
      entreprise: userData.entreprise || 'Particulier',
      surface: userData.surface || 'Non renseigné',
      typeProjet: catalogInfo.displayName || 'Non renseigné',
      description: `📥 TÉLÉCHARGEMENT CATALOGUE
    
🏷️ Catalogue: ${catalogInfo.displayName}
💰 Prix: ${catalogInfo.price}
📅 Date: ${formattedDate} à ${formattedTime}

👤 INFORMATIONS CLIENT:
• Nom: ${userData.nom}
• Email: ${userData.email}  
• Téléphone: ${userData.telephone || 'Non renseigné'}
• Entreprise: ${userData.entreprise || 'Particulier'}
• Surface: ${userData.surface} m²
• Localité: ${userData.localite || 'Non précisée'}

⚡ Action: Contacter ce prospect rapidement!`,
      localite: userData.localite || 'Non précisée',
      typeSerre: 'Téléchargement catalogue'
    };

    console.log('📧 Paramètres envoyés à EmailJS:', templateParams);

    try {
      const response = await emailjs.send(
        'service_05zhygg',
        'template_nky87w8',
        templateParams,
        'GkGeJjFmlJJIrv9tF'
      );

      console.log('✅ Email envoyé avec succès!', response);
      return true;
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi:', error);
      return false;
    }
  };

  const downloadCatalog = async (devisData) => {
    if (!devisData.nom || !devisData.email || !devisData.surface) {
      showStyledAlert('Veuillez remplir votre nom, email et sélectionner une surface.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(devisData.email)) {
      showStyledAlert('Veuillez saisir une adresse email valide.', 'error');
      return;
    }

    const catalogInfo = catalogConfig[devisData.surface];
    
    if (!catalogInfo) {
      showStyledAlert('Catalogue non disponible pour cette surface.', 'error');
      return;
    }

    try {
      const pdfPath = require(`./catalogues/${catalogInfo.fileName}`);
      
      const link = document.createElement('a');
      link.href = pdfPath;
      link.download = catalogInfo.fileName;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('📥 Téléchargement lancé:', catalogInfo.fileName);
      
      const notificationSent = await notifyCompany(devisData, catalogInfo);
      
      if (notificationSent) {
        console.log('✅ Entreprise notifiée avec succès');
      } else {
        console.log('⚠️ Problème notification entreprise');
      }
      
      showStyledAlert(`Téléchargement en cours !

📋 Catalogue: ${catalogInfo.displayName}
💰 Prix: ${catalogInfo.price}

📞 Notre équipe commerciale vous contactera bientôt.`, 'success');
      
    } catch (error) {
      console.error('❌ Erreur téléchargement:', error);
      showStyledAlert('Une erreur est survenue lors du téléchargement. Veuillez réessayer ou nous contacter directement.', 'error');
    }
  };

  const sendDevisRequest = () => {
    const mailtoLink = `mailto:agroserreinnovationci@gmail.com?subject=Demande de Devis - ${devisData.typeProjet}&body=${encodeURIComponent(
      `Nom: ${devisData.nom}\nEmail: ${devisData.email}\nTéléphone: ${devisData.telephone}\nEntreprise: ${devisData.entreprise}\nType de projet: ${devisData.typeProjet}\nSurface: ${devisData.surface} m²\nBudget: ${devisData.budget}\nDélai: ${devisData.delai}\nDescription: ${devisData.description}`
    )}`;
    window.location.href = mailtoLink;
  };

  const changeLanguage = (lng) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  const projects = [
    {
      title: "Serre Agricole - Yamoussoukro",
      description: "Installation d'une serre de 500m² pour production maraîchère",
    },
    {
      title: "Complexe Serricole - Bouaké",
      description: "Projet de 3 serres interconnectées avec système d'irrigation",
    },
    {
      title: "Serre High-Tech - Abidjan",
      description: "Serre climatisée avec contrôle automatisé pour cultures premium",
    }
  ];

  const products = [
    {
      title: language === 'fr' ? "Filet anti-insectes" : "Anti-insect Net",
      description: language === 'fr' ? "Maille 40 pour bloquer mouches blanches, thrips, etc." : "40 mesh to block whiteflies, thrips, etc.",
      image: require('./Images/antiinsecte.jpeg'),
      price: "1300FCFA/m²",
      features: ["Maille 40", "Résistant aux UV", "Facile à installer", "Longue durée de vie"],
      specifications: {
        material: "Polyéthylène haute densité",
        color: "Blanc",
        meshSize: "40 mesh",
        uvTreatment: "Traité anti-UV",
        warranty: "2 ans"
      }
    },
    {
      title: language === 'fr' ? "Ruban adhésif" : "Adhesive Tape",
      description: language === 'fr' ? "Ruban adhésif spécial pour serre et réparations." : "Special adhesive tape for greenhouse and repairs.",
      image: require('./Images/horticole.jpeg'),
      price: "9000 FCFA",
      features: ["Résistant à l'humidité", "Adhésion forte", "Facile à utiliser", "Polyvalent"],
      specifications: {
        material: "Polyéthylène",
        width: "50mm",
        length: "25m",
        adhesion: "Permanente",
        temperature: "-10°C à +70°C"
      }
    },
    {
      title: language === 'fr' ? "Filet d'ombrage" : "Shade Net",
      description: language === 'fr' ? "Oubliez le stress hydrique et les feuilles brûlées." : "Forget water stress and burnt leaves.",
      image: require('./Images/Ombrage.jpeg'),
      price: "1000FCFA/m²",
      features: ["Taux d'ombrage variable", "Résistant aux UV", "Améliore la croissance", "Économise l'eau"],
      specifications: {
        shadingRate: "30% à 90%",
        material: "PEHD avec additifs UV",
        color: "Vert/Noir",
        durability: "5-8 ans",
        installation: "Facile"
      }
    },
    {
      title: language === 'fr' ? "PH METRE" : "PH METRE",
      description: language === 'fr' ? "Type multifonctionnel de stylo d'appareil de contrôle de qualité" : "Multifunctional type of quality control device pen",
      image: require('./Images/phmetre.jpeg'),
      price: "13,000 FCFA",
      features: ["Mesure précise", "Écran LCD", "Calibrage automatique", "Portable"],
      specifications: {
        range: "0.0-14.0 pH",
        accuracy: "±0.1 pH",
        resolution: "0.1 pH",
        temperature: "0-50°C",
        battery: "3 x 1.5V AG13"
      }
    },
    {
      title: language === 'fr' ? "Sachet culture" : "Culture bag",
      description: language === 'fr' ? "Sachet idéal pour la production qui va permettre de booster vos cultures" : "Ideal production bag to boost your crops",
      image: require('./Images/sachet.jpeg'),
      price: "200 FCFA",
      features: ["Drainage optimal", "Résistant", "Réutilisable", "Différentes tailles"],
      specifications: {
        material: "Polyéthylène noir",
        thickness: "100 microns",
        sizes: "15x20, 20x25, 25x30 cm",
        drainage: "Trous prépercés",
        capacity: "1-5 litres"
      }
    },
    {
      title: language === 'fr' ? "Brumisateur" : "Mist Sprayer",
      description: language === 'fr' ? "Brumisateur permet de réduire la température sous la serre" : "Mist sprayer reduces temperature under the greenhouse",
      image: require('./Images/Brumisateur.jpeg'),
      price: "25,000 FCFA",
      features: ["Refroidissement efficace", "Ajustable", "Installation facile", "Économique"],
      specifications: {
        pressure: "2-4 bar",
        flow: "0.6-2.5 L/h",
        dropletSize: "10-50 microns",
        material: "Laiton et plastique",
        coverage: "1-2 m²"
      }
    },
    {
      title: language === 'fr' ? "Film horticole vert" : "Green horticultural film",
      description: language === 'fr' ? "Protégez vos cultures des rayons UV nuisibles avec Film horticole (200 micron vert)" : "Protect your crops from harmful UV rays with horticultural film (200 micron green)",
      image: require('./Images/horticolevert.jpeg'),
      price: "1400 FCFA/m²",
      features: ["Protection UV", "Diffuse la lumière", "Réduit la chaleur", "Durable"],
      specifications: {
        thickness: "200 microns",
        color: "Vert diffusant",
        uvProtection: "Additifs anti-UV",
        lightTransmission: "85%",
        lifespan: "4-5 ans"
      }
    },
    {
      title: language === 'fr' ? "Serre Tunnel (250m²)" : "Tunnel Greenhouse (250m²)",
      description: language === 'fr' ? "Longueur 25m x Largeur 10m = Total 250m²" : "Length 25m x Width 10m = Total 250m²",
      image: require('./Images/tunnel.jpeg'),
      price: "À partir de 4.000.000 FCFA",
      features: ["Structure galvanisée", "Ventilation naturelle", "Installation rapide", "Modulaire"],
      specifications: {
        dimensions: "25m x 10m x 4.5m",
        surface: "250 m²",
        structure: "Acier galvanisé Ø40mm",
        covering: "Polyéthylène 200μ",
        ventilation: "Latérale et zénithale"
      }
    },
    {
      title: language === 'fr' ? "Serre en bois" : "Wooden greenhouse",
      description: language === 'fr' ? "Serre en bois à bon prix avec finition soignée" : "Wooden greenhouse at good price with careful finish",
      image: require('./Images/serre.jpeg'),
      price: "À partir de 2.800.000 FCFA",
      features: ["Bois traité", "Design élégant", "Isolation naturelle", "Écologique"],
      specifications: {
        material: "Bois traité autoclave",
        foundation: "Béton recommandé",
        roofing: "Polycarbonate ou verre",
        doors: "Double porte",
        windows: "Ventilation automatique"
      }
    }
  ];

  // Modal pour les détails des produits
  const ProductModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
      <div className="product-modal-overlay" onClick={onClose}>
        <div className="product-modal" onClick={e => e.stopPropagation()}>
          <div className="product-modal-header">
            <h2>{product.title}</h2>
            <button className="close-modal" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          
          <div className="product-modal-content">
            <div className="product-modal-image">
              <img src={product.image} alt={product.title} />
            </div>
            
            <div className="product-modal-info">
              <div className="product-price-large">{product.price}</div>
              <p className="product-description-full">{product.description}</p>
              
              <div className="product-features-section">
                <h3><Award size={20} /> Avantages</h3>
                <ul className="features-list">
                  {product.features?.map((feature, index) => (
                    <li key={index}>
                      <CheckCircle size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="product-specs-section">
                <h3><Info size={20} /> Spécifications techniques</h3>
                <div className="specs-grid">
                  {Object.entries(product.specifications || {}).map(([key, value], index) => (
                    <div key={index} className="spec-item">
                      <span className="spec-label">{key}:</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="product-modal-actions">
                <button className="btn btn-primary" onClick={() => {
                  window.open(`https://wa.me/2250101619919?text=${encodeURIComponent(`Bonjour, je suis intéressé par ${product.title} au prix de ${product.price}. Pouvez-vous me donner plus d'informations?`)}`, '_blank');
                }}>
                  <MessageCircle size={18} />
                  Commander via WhatsApp
                </button>
                <button className="btn btn-outline" onClick={() => scrollToSection('contact')}>
                  <Mail size={18} />
                  Demander un devis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">
            <div className="logo-icon">
              <img src={logo} alt="Logo" />
            </div>
            <div className="logo-text">
              <h1>AGRO SERRE INNOVATION</h1>
              <p>CÔTE D'IVOIRE</p>
            </div>
          </div>
          
          <div className="nav-center">
            <ul className="nav-menu">
            {['accueil', 'presentation', 'fondatrices', 'fiches-techniques', 'produits', 'contact', 'devis', 'mentions-legales'].map((item) => (
  <li key={item}>
    <button 
      onClick={() => scrollToSection(item)} 
      className={`nav-link ${activeSection === item ? 'active' : ''}`}
    >
      {item === 'accueil' ? t('home') : 
       item === 'presentation' ? t('about') : 
       item === 'fondatrices' ? (language === 'fr' ? 'Fondatrices' : 'Founders') :
       item === 'fiches-techniques' ? t('services') : 
       item === 'produits' ? t('products') : 
       item === 'devis' ? t('request_quote') : 
       item === 'mentions-legales' ? t('legal_notice') : item}
    </button>
  </li>
))}
            </ul>
          </div>

          <div className="nav-actions">
            <div className="language-switcher">
              <button 
                onClick={() => changeLanguage(language === 'fr' ? 'en' : 'fr')} 
                className="language-btn"
              >
                <Globe size={18} />
                {language === 'fr' ? 'EN' : 'FR'}
              </button>
            </div>
            <button className="mobile-menu-btn" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            <ul>
           {['accueil', 'presentation', 'fondatrices', 'fiches-techniques', 'produits', 'contact', 'devis', 'mentions-legales'].map((item) => (
  <li key={item}>
    <button onClick={() => {
      scrollToSection(item);
      setIsMenuOpen(false);
    }}>
      {item === 'accueil' ? t('home') : 
       item === 'presentation' ? t('about') : 
       item === 'fondatrices' ? (language === 'fr' ? 'Fondatrices' : 'Founders') :
       item === 'fiches-techniques' ? t('services') : 
       item === 'produits' ? t('products') : 
       item === 'devis' ? t('request_quote') : 
       item === 'mentions-legales' ? t('legal_notice') : item}
    </button>
  </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <section id="accueil" className="hero">
        <div className="hero-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
            <div className="shape shape-5"></div>
          </div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">🌱 Agriculture Moderne</span>
          </div>
          
          <h1 className="hero-title">
            <span className="title-line">
              {t('welcome')}
            </span>
            <span className="title-line gradient-text">
              {t('with_us')}
            </span>
          </h1>
          
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">10+</div>
              <div className="stat-label">Serres Installées</div>
            </div>
            <div className="stat">
              <div className="stat-number">2+</div>
              <div className="stat-label">Années d'Expérience</div>
            </div>
            <div className="stat">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfaction Client</div>
            </div>
          </div>
          
          <div className="hero-buttons">
            <button 
              onClick={() => scrollToSection('fiches-techniques')} 
              className="btn btn-primary"
            >
              <span>Nos Serres</span>
              <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="btn btn-outline"
            >
              <span>{t('contact')}</span>
            </button>
          </div>
        </div>
      </section>

      <section id="presentation" className="section section-gray">
        <div className="container">
          <div className="section-header">
            <div className="section-title">
              <h2>{t('about')}</h2>
              <p>{language === 'fr' 
                ? 'AGRO SERRE INNOVATION CI est spécialisée dans la conception, la fabrication et l\'installation de serres agricoles résistantes en acier galvanisé adaptées aux conditions climatiques de l\'Afrique de l\'Ouest.' 
                : 'AGRO SERRE INNOVATION CI specializes in the design, manufacturing, and installation of resistant agricultural greenhouses in galvanized steel adapted to the climatic conditions of West Africa.'
              }</p>
            </div>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <CheckCircle size={28} />
              </div>
              <h3>Qualité Premium</h3>
              <p>Matériaux de haute qualité et construction durable pour une longévité maximale.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={28} />
              </div>
              <h3>Garantie Étendue</h3>
              <p>Garantie complète sur nos installations avec support technique continu.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Users size={28} />
              </div>
              <h3>Équipe Experte</h3>
              <p>Techniciens qualifiés et expérimentés dans l'agriculture sous serre.</p>
            </div>
          </div>
        </div>
      </section>
     

      <section id="fiches-techniques" className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-title">
              <h2>{language === 'fr' ? 'Types de serres disponibles' : 'Available greenhouse types'}</h2>
              <p>Découvrez notre gamme complète de serres adaptées à tous vos besoins</p>
            </div>
          </div>
          
          <div className="models-grid">
            <div className="model-card">
              <div className="model-header">
                <h3>Mini Serre</h3>
                <div className="model-price">2,000,000 FCFA</div>
              </div>
              <div className="model-specs">
                <div className="spec">
                  <strong>Surface:</strong> 100 m²
                </div>
                <div className="spec">
                  <strong>Structure:</strong> Acier galvanisé Ø32mm
                </div>
                <div className="spec">
                  <strong>Usage:</strong> Maraîchage/Jardinage
                </div>
                <div className="spec">
                  <strong>Hauteur:</strong> 4.0 m au faîtage
                </div>
                <div className="spec">
                  <strong>Couverture:</strong> Polyéthylène UV 200μ
                </div>
              </div>
              <button className="model-btn" onClick={() => scrollToSection('devis')}>
                Demander un devis
              </button>
            </div>
            
            <div className="model-card featured">
              <div className="model-badge">Populaire</div>
              <div className="model-header">
                <h3>Pro 200</h3>
                <div className="model-price">3,500,000 FCFA</div>
              </div>
              <div className="model-specs">
                <div className="spec">
                  <strong>Surface:</strong> 200 m²
                </div>
                <div className="spec">
                  <strong>Structure:</strong> Acier galvanisé Ø40mm
                </div>
                <div className="spec">
                  <strong>Usage:</strong> Maraîchage intensif
                </div>
                <div className="spec">
                  <strong>Hauteur:</strong> 4.5 m au faîtage
                </div>
                <div className="spec">
                  <strong>Couverture:</strong> Polyéthylène UV + filet anti-insectes
                </div>
              </div>
              <button className="model-btn" onClick={() => scrollToSection('devis')}>
                Demander un devis
              </button>
            </div>

            <div className="model-card">
              <div className="model-header">
                <h3>Pro 250</h3>
                <div className="model-price">4,200,000 FCFA</div>
              </div>
              <div className="model-specs">
                <div className="spec">
                  <strong>Surface:</strong> 250 m²
                </div>
                <div className="spec">
                  <strong>Structure:</strong> Acier galvanisé Ø40mm
                </div>
                <div className="spec">
                  <strong>Dimensions:</strong> 10m x 25m
                </div>
                <div className="spec">
                  <strong>Hauteur:</strong> 4.5 m au faîtage
                </div>
                <div className="spec">
                  <strong>Couverture:</strong> Polyéthylène UV + anti-insectes
                </div>
              </div>
              <button className="model-btn" onClick={() => scrollToSection('devis')}>
                Demander un devis
              </button>
            </div>
            
            <div className="model-card">
              <div className="model-header">
                <h3>Tropic 300</h3>
                <div className="model-price">5,000,000 FCFA</div>
              </div>
              <div className="model-specs">
                <div className="spec">
                  <strong>Surface:</strong> 300 m²
                </div>
                <div className="spec">
                  <strong>Structure:</strong> Acier galvanisé Ø40mm
                </div>
                <div className="spec">
                  <strong>Dimensions:</strong> 10m x 30m
                </div>
                <div className="spec">
                  <strong>Hauteur:</strong> 4.5 m au faîtage
                </div>
                <div className="spec">
                  <strong>Usage:</strong> Production commerciale
                </div>
              </div>
              <button className="model-btn" onClick={() => scrollToSection('devis')}>
                Demander un devis
              </button>
            </div>

            <div className="model-card">
              <div className="model-header">
                <h3>Robuste 500</h3>
                <div className="model-price">6,500,000 FCFA</div>
              </div>
              <div className="model-specs">
                <div className="spec">
                  <strong>Surface:</strong> 500 m²
                </div>
                <div className="spec">
                  <strong>Structure:</strong> Acier galvanisé Ø80mm
                </div>
                <div className="spec">
                  <strong>Dimensions:</strong> 10m x 50m ou 20m x 25m
                </div>
                <div className="spec">
                  <strong>Hauteur:</strong> 4.5 m au faîtage
                </div>
                <div className="spec">
                  <strong>Usage:</strong> Production industrielle
                </div>
              </div>
              <button className="model-btn" onClick={() => scrollToSection('devis')}>
                Demander un devis
              </button>
            </div>

            <div className="model-card">
              <div className="model-header">
                <h3>Sur Mesure</h3>
                <div className="model-price">Sur devis</div>
              </div>
              <div className="model-specs">
                <div className="spec">
                  <strong>Surface:</strong> Selon vos besoins
                </div>
                <div className="spec">
                  <strong>Structure:</strong> Adaptée au projet
                </div>
                <div className="spec">
                  <strong>Options:</strong> Climatisation, automation
                </div>
                <div className="spec">
                  <strong>Étude:</strong> Gratuite
                </div>
                <div className="spec">
                  <strong>Délai:</strong> Variable selon complexité
                </div>
              </div>
              <button className="model-btn" onClick={() => scrollToSection('contact')}>
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="produits" className="section section-gray">
        <div className="container">
          <div className="section-header">
            <div className="section-title">
              <h2>{t('products')}</h2>
              <p>{language === 'fr' 
                ? 'Découvrez nos produits et accessoires pour l\'agriculture sous serre.' 
                : 'Discover our products and accessories for greenhouse farming.'
              }</p>
            </div>
          </div>
          
          <div className="products-grid">
            {products.slice(0, showAllProducts ? products.length : 6).map((product, index) => (
              <div key={index} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.title} />
                  <div className="product-overlay">
                    <button 
                      className="product-btn"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <Info size={16} />
                      Voir détails
                    </button>
                  </div>
                </div>
                <div className="product-content">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <div className="product-features-preview">
                    {product.features?.slice(0, 2).map((feature, idx) => (
                      <span key={idx} className="feature-tag-small">{feature}</span>
                    ))}
                  </div>
                  <div className="product-price">{product.price}</div>
                  <div className="product-actions">
                    <button 
                      className="btn-small btn-primary"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <Info size={14} />
                      Détails
                    </button>
                    <button 
                      className="btn-small btn-whatsapp"
                      onClick={() => {
                        window.open(`https://wa.me/2250101619919?text=${encodeURIComponent(`Bonjour, je suis intéressé par ${product.title} au prix de ${product.price}`)}`, '_blank');
                      }}
                    >
                      <MessageCircle size={14} />
                      Commander
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {!showAllProducts && (
            <div className="products-actions">
              <button 
                className="btn btn-outline" 
                onClick={() => setShowAllProducts(true)}
              >
                <span>Voir plus de produits</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </section>

      <section id="contact" className="section section-green">
        <div className="container">
          <div className="section-header">
            <div className="section-title">
              <h2>{t('contact')}</h2>
              <p>{language === 'fr' 
                ? 'Prêt à démarrer votre projet ? Parlons-en ensemble !' 
                : 'Ready to start your project? Let\'s talk about it!'
              }</p>
            </div>
          </div>
          
          <div className="contact-grid">
            <div className="contact-info-wrapper">
              <div className="contact-card">
                <div className="contact-item">
                  <div className="contact-icon-modern">
                    <MapPin size={22} strokeWidth={1.5} />
                  </div>
                  <div className="contact-content">
                    <h3>Adresse</h3>
                    <div className="address-modern">
                      {language === 'fr' ? (
                        <a 
                          href="https://maps.app.goo.gl/72JT97B52oSAf5gc7?g_st=awb" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="address-link-modern"
                        >
                          <span className="address-line-1">Zone Industrielle Koumassi</span>
                          <span className="address-line-2">100m du Feu de Soweto</span>
                          <span className="address-line-3">Abidjan, Côte d'Ivoire</span>
                        </a>
                      ) : (
                        <a 
                          href="https://maps.app.goo.gl/72JT97B52oSAf5gc7?g_st=awb" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="address-link-modern"
                        >
                          <span className="address-line-1">Koumassi Industrial Zone</span>
                          <span className="address-line-2">100m from Feu de Soweto</span>
                          <span className="address-line-3">Abidjan, Côte d'Ivoire</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-modern">
                    <Phone size={22} strokeWidth={1.5} />
                  </div>
                  <div className="contact-content">
                    <h3>Téléphone</h3>
                    <div className="phone-numbers">
                      <a href="tel:+22501005225292" className="phone-link">+225 01 00 52 25 92</a>
                      <a href="tel:+22501016199119" className="phone-link">+225 01 01 61 99 19</a>
                    </div>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-modern">
                    <Mail size={22} strokeWidth={1.5} />
                  </div>
                  <div className="contact-content">
                    <h3>Email</h3>
                    <a href="mailto:agroserreinnovationci@gmail.com" className="email-link">
                      agroserreinnovationci@gmail.com
                    </a>
                  </div>
                </div>

                <div className="social-section">
                  <h3>Suivez-nous</h3>
                  <div className="social-links-modern">
                    <a href="https://www.facebook.com/share/1FxLo9Qgrq/" className="social-link-modern facebook">
                      <Facebook size={20} strokeWidth={1.5} />
                      <span>Facebook</span>
                    </a>
                    <a href="https://youtube.com/@agroserreinnovationcotediv-b4q?si=eLm0bLOZaCdsPnDf" className="social-link-modern youtube">
                      <Youtube size={20} strokeWidth={1.5} />
                      <span>YouTube</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-form-wrapper">
              <form className="modern-form">
                <div className="form-header">
                  <h3>Envoyez-nous un message</h3>
                  <p>Nous vous répondrons rapidement</p>
                </div>
                
                <div className="form-grid">
                  <div className="form-row">
                    <div className="input-group">
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder=" "
                        value={formData.nom} 
                        required 
                        onChange={(e) => setFormData({...formData, nom: e.target.value})} 
                      />
                      <label className="form-label">Nom Complet</label>
                    </div>
                    <div className="input-group">
                      <input 
                        type="email" 
                        className="form-input" 
                        placeholder=" "
                        value={formData.email} 
                        required 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                      />
                      <label className="form-label">Email</label>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="input-group">
                      <input 
                        type="tel" 
                        className="form-input" 
                        placeholder=" "
                        value={formData.telephone} 
                        onChange={(e) => setFormData({...formData, telephone: e.target.value})} 
                      />
                      <label className="form-label">Téléphone</label>
                    </div>
                    <div className="input-group">
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder=" "
                        value={formData.sujet} 
                        onChange={(e) => setFormData({...formData, sujet: e.target.value})} 
                      />
                      <label className="form-label">Sujet</label>
                    </div>
                  </div>
                  
                  <div className="input-group">
                    <textarea 
                      className="form-input form-textarea" 
                      placeholder=" "
                      value={formData.message} 
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                    <label className="form-label">Message</label>
                  </div>
                  
                  <div className="form-buttons">
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                      <span>Envoyer</span>
                      <Mail size={18} />
                    </button>
                    <button type="button" className="btn btn-whatsapp" onClick={handleWhatsApp}>
                      <span>WhatsApp</span>
                      <MessageCircle size={18} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section id="devis" className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-title">
              <h2>{language === 'fr' ? 'Télécharger un catalogue' : 'Download a catalog'}</h2>
              <p>{language === 'fr' 
                ? 'Remplissez le formulaire pour recevoir notre catalogue personnalisé.' 
                : 'Fill out the form to receive our personalized catalog.'
              }</p>
            </div>
          </div>
          
          <div className="devis-form-wrapper">
            <form className="modern-form">
              <div className="form-grid">
                <div className="form-row">
                  <div className="input-group">
                    <input 
                      type="text" 
                      name="nom" 
                      className="form-input" 
                      placeholder=" "
                      value={devisData.nom} 
                      onChange={(e) => setDevisData({...devisData, nom: e.target.value})} 
                      required 
                    />
                    <label className="form-label">Nom complet</label>
                  </div>
                  <div className="input-group">
                    <input 
                      type="email" 
                      name="email" 
                      className="form-input" 
                      placeholder=" "
                      value={devisData.email} 
                      onChange={(e) => setDevisData({...devisData, email: e.target.value})} 
                      required 
                    />
                    <label className="form-label">Email</label>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="input-group">
                    <input 
                      type="tel" 
                      name="telephone" 
                      className="form-input" 
                      placeholder=" "
                      value={devisData.telephone} 
                      onChange={(e) => setDevisData({...devisData, telephone: e.target.value})} 
                    />
                    <label className="form-label">Téléphone</label>
                  </div>
                  <div className="input-group">
                    <input 
                      type="text" 
                      name="entreprise" 
                      className="form-input" 
                      placeholder=" "
                      value={devisData.entreprise} 
                      onChange={(e) => setDevisData({...devisData, entreprise: e.target.value})} 
                    />
                    <label className="form-label">{language === 'fr' ? 'Nom de l\'entreprise' : 'Company name'}</label>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="select-group">
                    <select 
                      name="typeProjet" 
                      className="form-select" 
                      value={devisData.typeProjet} 
                      onChange={(e) => setDevisData({...devisData, typeProjet: e.target.value})}
                    >
                      <option value="">{language === 'fr' ? 'Type de serre souhaité' : 'Desired greenhouse type'}</option>
                      <option value="Serre en acier galvanisé">Serre en acier galvanisé</option>
                      <option value="Serre en bois">Serre en bois</option>
                    </select>
                    <label className="select-label">{language === 'fr' ? 'Type de serre souhaité' : 'Desired greenhouse type'}</label>
                  </div>
                  
                  <div className="select-group">
                    <select 
                      name="surface" 
                      className="form-select" 
                      value={devisData.surface} 
                      onChange={(e) => {
                        const selectedSurface = e.target.value;
                        setDevisData({...devisData, surface: selectedSurface});
                      }} 
                      required
                    >
                      <option value="">{language === 'fr' ? 'Surface souhaitée (m²)' : 'Desired area (m²)'}</option>
                      <option value="100">Mini Serre (100m²)</option>
                      <option value="200">Pro 200 (200m²)</option>
                      <option value="250">Pro 250 (250m²)</option>
                      <option value="300">Tropic 300 (300m²)</option>
                      <option value="500">Robuste 500 (500m²)</option>
                      <option value="Sur mesure">Projet sur mesure</option>
                    </select>
                    <label className="select-label">{language === 'fr' ? 'Surface souhaitée' : 'Desired area'}</label>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="input-group">
                    <input 
                      type="text" 
                      name="localite" 
                      className="form-input" 
                      placeholder=" "
                      value={devisData.localite} 
                      onChange={(e) => setDevisData({...devisData, localite: e.target.value})} 
                    />
                    <label className="form-label">{language === 'fr' ? 'Localité du site' : 'Site location'}</label>
                  </div>
                </div>
                
                <div className="input-group">
                  <textarea 
                    name="description" 
                    className="form-input form-textarea" 
                    placeholder=" "
                    value={devisData.description} 
                    onChange={(e) => setDevisData({...devisData, description: e.target.value})}
                  ></textarea>
                  <label className="form-label">{language === 'fr' ? 'Description détaillée du projet (optionnel)' : 'Detailed project description (optional)'}</label>
                </div>
                
                <div className="form-buttons">
                  <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={() => handleCatalogRequest(devisData)}
                  >
                    <span>{language === 'fr' ? 'Recevoir le catalogue' : 'Receive catalog'}</span>
                    <ArrowRight size={18} />
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline" 
                    onClick={() => handleSimpleNotification(devisData)}
                  >
                    <span>{language === 'fr' ? 'Demander un contact' : 'Request contact'}</span>
                    <Phone size={18} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
       <section id="fondatrices" className="section section-empowerment">
  <div className="container">
    <div className="section-header">
      <div className="empowerment-badge">
        <span className="badge-text">👩‍💼 Women Empowerment</span>
      </div>
      <div className="section-title">
        <h2>{language === 'fr' ? 'Nos Fondatrices Visionnaires' : 'Our Visionary Founders'}</h2>
        <p>{language === 'fr' 
          ? 'Agro Serre Innovation CI est une entreprise ivoirienne fondée par deux dynamiques femmes visionnaires, animées par une passion commune pour l\'agriculture durable et l\'innovation technologique au service de la terre.' 
          : 'Agro Serre Innovation CI is an Ivorian company founded by two dynamic visionary women, driven by a common passion for sustainable agriculture and technological innovation serving the land.'
        }</p>
      </div>
    </div>
    
    <div className="founders-content">
      <div className="empowerment-message">
        <div className="message-card">
          <div className="message-icon">
            <Leaf size={32} />
          </div>
          <h3>{language === 'fr' ? 'Notre Vision' : 'Our Vision'}</h3>
          <p>{language === 'fr' 
            ? 'Convaincues que l\'avenir de l\'agriculture passe par des méthodes respectueuses de l\'environnement et accessibles à tous, elles ont uni leurs forces pour créer une structure moderne, inclusive et tournée vers l\'avenir.'
            : 'Convinced that the future of agriculture lies in environmentally friendly and accessible methods, they have joined forces to create a modern, inclusive and forward-looking structure.'
          }</p>
        </div>
      </div>
      
      <div className="founders-grid">
        <div className="founder-card">
          <div className="founder-image">
            {/* Remplacez par vos images */}
            <img src={require('./Images/image11.jpeg')} alt="Fondatrice 1" />
            <div className="founder-overlay">
              <div className="founder-social">
                <button className="social-btn">
                  <Mail size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="founder-info">
            <h3>N'guessan Amoin Séraphine</h3>
            <p className="founder-title">Co-Gérante & Responsable Commercial</p>
            <p className="founder-description">
              {language === 'fr' 
                ? 'Experte en agriculture durable avec plus de 10 ans d\'expérience dans l\'innovation agricole.'
                : 'Expert in sustainable agriculture with over 10 years of experience in agricultural innovation.'
              }
            </p>
            <div className="founder-achievements">
              <span className="achievement-tag">Agriculture Durable</span>
              <span className="achievement-tag">Innovation</span>
              <span className="achievement-tag">Leadership</span>
            </div>
          </div>
        </div>
        
        <div className="founder-card">
          <div className="founder-image">
            {/* Remplacez par vos images */}
            <img src={require('./Images/images10.jpeg')} alt="Fondatrice 2" />
            <div className="founder-overlay">
              <div className="founder-social">
                <button className="social-btn">
                  <Mail size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="founder-info">
            <h3>Awa Ouedreaogo</h3>
            <p className="founder-title">Co-Gérante & Responsable Administratif</p>
            <p className="founder-description">
              {language === 'fr' 
                ? 'Ingénieure passionnée par les technologies vertes et l\'autonomisation des communautés rurales.'
                : 'Engineer passionate about green technologies and empowering rural communities.'
              }
            </p>
            <div className="founder-achievements">
              <span className="achievement-tag">Technologies Vertes</span>
              <span className="achievement-tag">Ingénierie</span>
              <span className="achievement-tag">Impact Social</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="empowerment-stats">
        <div className="empowerment-stat">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">60%</div>
            <div className="stat-label">Équipe Féminine</div>
          </div>
        </div>
        <div className="empowerment-stat">
          <div className="stat-icon">
            <Award size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">2+</div>
            <div className="stat-label">Prix Reçus</div>
          </div>
        </div>
        <div className="empowerment-stat">
          <div className="stat-icon">
            <Shield size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">30+</div>
            <div className="stat-label">Femmes Formées</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      <section id="mentions-legales" className="section section-gray">
        <div className="container">
          <div className="section-header">
            <div className="section-title">
              <h2>{t('legal_notice')}</h2>
            </div>
          </div>
          
          <div className="legal-content">
            <h3>{t('privacy_policy')}</h3>
            <p>{language === 'fr' 
              ? "Nous nous engageons à protéger la vie privée des utilisateurs de notre site. Les informations collectées sont utilisées uniquement dans le cadre de la gestion des relations commerciales avec AGRO SERRE INNOVATION CÔTE D\'IVOIRE." 
              : "We are committed to protecting the privacy of our website users. The information collected is used solely for the purpose of managing commercial relationships with AGRO SERRE INNOVATION CÔTE D\'IVOIRE."
            }</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="logo">
                <div className="logo-icon">
                  <img src={logo} alt="Logo" />
                </div>
                <div className="logo-text">
                  <h3>AGRO SERRE</h3>
                  <p>INNOVATION COTE D'IVOIRE</p>
                </div>
              </div>
              <p>{language === 'fr' 
                ? 'Votre partenaire pour l\'agriculture moderne en Côte d\'Ivoire.' 
                : 'Your partner for modern agriculture in Côte d\'Ivoire.'
              }</p>
            </div>
            <div className="footer-section">
              <h3>Nos Serres</h3>
              <ul>
                <li>Mini Serre (100m²)</li>
                <li>Pro 200 & 250 (200-250m²)</li>
                <li>Tropic 300 (300m²)</li>
                <li>Robuste 500 (500m²)</li>
                <li>Projets sur mesure</li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>{t('contact')}</h3>
              <p>Zone Industrielle Koumassi<br />
              100m du Feu de Soweto<br />
              Abidjan, Côte d'Ivoire<br />
              +225 01 00 52 25 92<br />
              agroserreinnovationci@gmail.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 AGRO SERRE INNOVATION COTE D'IVOIRE. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Modal pour les détails des produits */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default App;
