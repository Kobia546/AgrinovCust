import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { jsPDF } from 'jspdf';
import { Menu, X, Phone, Mail, MapPin, Leaf, Shield, Zap, Users, ChevronRight, Star, Facebook,Youtube, MessageCircle, Globe } from 'lucide-react';
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
    budget: '',
    delai: '',
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
    window.open(`https://wa.me/2250100522592?text=${message}`, '_blank');
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
const handleSimpleNotification = (devisData) => {
  if (!devisData.nom || !devisData.email || !devisData.surface) {
    alert('❌ Veuillez remplir au minimum votre nom, email et la surface souhaitée.');
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

  // Préparer les données pour EmailJS
  const templateParams = {
    nom: devisData.nom,
    email: devisData.email,
    telephone: devisData.telephone || 'Non renseigné',
    entreprise: devisData.entreprise || 'Particulier', 
    surface: devisData.surface,
    typeProjet: catalogType,
    budget: devisData.budget || 'Non précisé',
    delai: devisData.delai || 'Non précisé',
    description: `🔔 DEMANDE DE CONTACT

👤 PROSPECT: ${devisData.nom}
📧 Email: ${devisData.email}
📱 Téléphone: ${devisData.telephone || 'Non renseigné'}
🏢 Entreprise: ${devisData.entreprise || 'Particulier'}

📋 PROJET SOUHAITÉ:
• Type: ${catalogType}
• Surface: ${devisData.surface} m²
• Prix: ${catalogPrice}
• Budget: ${devisData.budget || 'Non précisé'}
• Délai: ${devisData.delai || 'Non précisé'}

📝 Description: ${devisData.description || 'Aucune description fournie'}

⚡ Action: Ce prospect souhaite être contacté rapidement!`
  };

  console.log('📤 Envoi demande contact:', templateParams);

  // Envoyer l'email
  emailjs.send('service_05zhygg', 'template_nky87w8', templateParams, 'GkGeJjFmlJJIrv9tF')
    .then((response) => {
      console.log('✅ Demande de contact envoyée!', response);
      alert('✅ Votre demande a été transmise à notre équipe commerciale qui vous recontactera rapidement.');
    })
    .catch((error) => {
      console.error('❌ Erreur envoi demande:', error);
      alert('❌ Erreur lors de l\'envoi. Veuillez réessayer.');
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

// EMAIL DE L'ENTREPRISE (à modifier selon vos besoins)
const COMPANY_EMAIL = 'mambochristian2018@gmail.com'; // 👈 Modifiez ici

// Template email stylé pour l'entreprise uniquement
const createCompanyNotificationTemplate = (userData, catalogInfo) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = currentDate.toLocaleTimeString('fr-FR');

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau téléchargement de catalogue</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
        }
        
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #2c5530, #4a7c59);
            color: white;
            padding: 30px;
            text-align: center;
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
        }
        
        .header h1 {
            font-size: 28px;
            margin-bottom: 8px;
            position: relative;
            z-index: 1;
        }
        
        .header p {
            font-size: 16px;
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }
        
        .content {
            padding: 30px;
        }
        
        .alert-download {
            background: linear-gradient(135deg, #e8f5e8, #f0f8f0);
            border-left: 5px solid #4a7c59;
            padding: 20px;
            margin-bottom: 25px;
            border-radius: 8px;
            position: relative;
        }
        
        .alert-download::before {
            content: '📥';
            font-size: 24px;
            position: absolute;
            top: 20px;
            right: 20px;
        }
        
        .alert-download h3 {
            color: #2c5530;
            margin-bottom: 8px;
            font-size: 18px;
        }
        
        .alert-download p {
            color: #4a7c59;
            font-weight: 500;
        }
        
        .prospect-card {
            background: #ffffff;
            border: 2px solid #e9ecef;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 25px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        
        .prospect-header {
            text-align: center;
            margin-bottom: 25px;
        }
        
        .prospect-name {
            font-size: 24px;
            font-weight: bold;
            color: #2c5530;
            margin-bottom: 5px;
        }
        
        .prospect-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .info-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #4a7c59;
        }
        
        .info-item label {
            display: block;
            font-weight: 600;
            color: #2c5530;
            margin-bottom: 5px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .info-item span {
            font-size: 16px;
            color: #333;
            word-break: break-all;
        }
        
        .catalog-downloaded {
            background: linear-gradient(135deg, #4a7c59, #2c5530);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 25px;
        }
        
        .catalog-downloaded h3 {
            margin-bottom: 10px;
            font-size: 20px;
        }
        
        .catalog-downloaded .catalog-name {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .catalog-price {
            font-size: 16px;
            color: #ffd700;
            font-weight: bold;
        }
        
        .action-needed {
            background: #fff3cd;
            border: 2px solid #ffeaa7;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .action-needed strong {
            color: #856404;
            font-size: 18px;
        }
        
        .action-needed p {
            color: #856404;
            margin-top: 10px;
        }
        
        .timestamp {
            text-align: center;
            color: #666;
            font-size: 14px;
            padding: 20px;
            background: #f8f9fa;
            border-top: 1px solid #e9ecef;
        }
        
        .timestamp strong {
            color: #2c5530;
        }
        
        @media (max-width: 600px) {
            .prospect-info {
                grid-template-columns: 1fr;
            }
            
            .container {
                margin: 10px;
            }
            
            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌱 AGRO SERRE INNOVATION</h1>
            <p>Notification de téléchargement</p>
        </div>
        
        <div class="content">
            <div class="alert-download">
                <h3>Nouveau téléchargement de catalogue</h3>
                <p>Un prospect vient de télécharger un de vos catalogues</p>
            </div>
            
            <div class="catalog-downloaded">
                <h3>📋 Catalogue téléchargé</h3>
                <div class="catalog-name">${catalogInfo.displayName}</div>
                <div class="catalog-price">Prix: ${catalogInfo.price}</div>
            </div>
            
            <div class="prospect-card">
                <div class="prospect-header">
                    <div class="prospect-name">👤 ${userData.nom}</div>
                </div>
                
                <div class="prospect-info">
                    <div class="info-item">
                        <label>📧 Email</label>
                        <span>${userData.email}</span>
                    </div>
                    
                    <div class="info-item">
                        <label>📱 Téléphone</label>
                        <span>${userData.telephone || 'Non renseigné'}</span>
                    </div>
                    
                    <div class="info-item">
                        <label>🏢 Entreprise</label>
                        <span>${userData.entreprise || 'Particulier'}</span>
                    </div>
                    
                    <div class="info-item">
                        <label>📐 Surface</label>
                        <span>${userData.surface} m²</span>
                    </div>
                </div>
            </div>
            
            <div class="action-needed">
                <strong>⚡ Action recommandée</strong>
                <p>Contactez ce prospect rapidement pour maximiser vos chances de conversion !</p>
            </div>
        </div>
        
        <div class="timestamp">
            <p><strong>📅 ${formattedDate}</strong></p>
            <p><strong>🕐 ${formattedTime}</strong></p>
        </div>
    </div>
</body>
</html>
  `;
};

// Fonction pour envoyer notification à l'entreprise seulement
const notifyCompany = async (userData, catalogInfo) => {
  // Vérifiez que toutes les données nécessaires sont présentes
  if (!userData || !catalogInfo) {
    console.error('Données manquantes pour l\'utilisateur ou le catalogue');
    return false;
  }

  const formattedDate = new Date().toLocaleDateString('fr-FR');
  const formattedTime = new Date().toLocaleTimeString('fr-FR');

  // ⚠️ IMPORTANT: Utilisez exactement les mêmes noms de variables que dans votre template EmailJS
  const templateParams = {
    // Données de base (comme dans sendEmailNotification)
    nom: userData.nom || 'Non renseigné',
    email: userData.email || 'Non renseigné', 
    telephone: userData.telephone || 'Non renseigné',
    entreprise: userData.entreprise || 'Particulier',
    surface: userData.surface || 'Non renseigné',
    
    // Informations supplémentaires sur le catalogue
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

⚡ Action: Contacter ce prospect rapidement!`,
    
    // Informations additionnelles
    budget: 'Téléchargement catalogue',
    delai: 'Immédiat'
  };

  console.log('📧 Paramètres envoyés à EmailJS:', templateParams);

  try {
    const response = await emailjs.send(
      'service_05zhygg',           // Votre Service ID
      'template_nky87w8',          // Votre Template ID  
      templateParams,              // Les données
      'GkGeJjFmlJJIrv9tF'         // Votre Public Key
    );

    console.log('✅ Email envoyé avec succès!', response);
    return true;

  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi:', error);
    return false;
  }
};


// Exemple d'utilisation





// Fonction principale - Téléchargement + Notification entreprise
const downloadCatalog = async (devisData) => {
  // 1. Validation des champs obligatoires
  if (!devisData.nom || !devisData.email || !devisData.surface) {
    alert('❌ Veuillez remplir votre nom, email et sélectionner une surface.');
    return;
  }

  // 2. Validation email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(devisData.email)) {
    alert('❌ Veuillez saisir une adresse email valide.');
    return;
  }

   const catalogInfo = catalogConfig[devisData.surface];
  
  if (!catalogInfo) {
    alert('❌ Catalogue non disponible pour cette surface.');
    return;
  }

  try {
    // 3. Téléchargement automatique du PDF
    const pdfPath = require(`./catalogues/${catalogInfo.fileName}`);
    
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = catalogInfo.fileName;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('📥 Téléchargement lancé:', catalogInfo.fileName);
    
    // 4. Notification à l'entreprise avec les bonnes données
    console.log('📤 Envoi notification avec données:', {
      nom: devisData.nom,
      email: devisData.email,
      telephone: devisData.telephone,
      entreprise: devisData.entreprise,
      surface: devisData.surface,
      catalogue: catalogInfo.displayName
    });
    
    const notificationSent = await notifyCompany(devisData, catalogInfo);
    
    if (notificationSent) {
      console.log('✅ Entreprise notifiée avec succès');
    } else {
      console.log('⚠️ Problème notification entreprise');
    }
    
    // 5. Message de confirmation utilisateur
    alert(`✅ Téléchargement en cours !

📋 Catalogue: ${catalogInfo.displayName}
💰 Prix: ${catalogInfo.price}

📞 Notre équipe commerciale vous contactera bientôt.`);
    
  } catch (error) {
    console.error('❌ Erreur téléchargement:', error);
    alert('❌ Une erreur est survenue lors du téléchargement.\n\nVeuillez réessayer ou nous contacter directement.');
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
    price: "1300FCFA/m²"
  },
  {
    title: language === 'fr' ? "Ruban adhesif" : "Horticultural Film",
    description: language === 'fr' ? "Polyéthylène haute densité, traité anti-UV." : "High density polyethylene, UV treated.",
    image: require('./Images/horticole.jpeg'),
    price: "9000 FCFA"
  },
  {
    title: language === 'fr' ? "Filet d'ombrage" : "Shade Net",
    description: language === 'fr' ? "Oubliez le stress hydrique et les feuilles brûlées." : "Shading rate from 30% to 90%.",
    image: require('./Images/Ombrage.jpeg'),
    price: "1000FCFA/m²"
  },
    {
    title: language === 'fr' ? "PH METRE" : "PH METRE",
    description: language === 'fr' ? "Type mutifonctionnel de stylo d'appareil de contrôle de qualité" : "Multifunctional type of quality control device pen",
    image: require('./Images/phmetre.jpeg'),
    price: "13,000 FCFA"
  },
    {
    title: language === 'fr' ? "Sachet culture" : "Culture bag",
    description: language === 'fr' ? "Sachet idéal pour la production qui va permettre de booster vos cultures" : "Ideal production bag to boost your crops",
    image: require('./Images/sachet.jpeg'),
    price: "200 FCFA"
  },
  {
    title: language === 'fr' ? "Brumisateur" : "Brumisator",
    description: language === 'fr' ? "Brumisateur permet de réduire la température sous la serre" : "Brumisator permits to reduce temperature under the greenhouse",
    image: require('./Images/Brumisateur.jpeg'),
    price: "25,000 FCFA"
  },
    {
    title: language === 'fr' ? "Horticole vert" : "horticultural green",
    description: language === 'fr' ? "Protégez vos cultures des rayons UV nuisibles avec Film horticole(200 micron vert)" : "Protect your crops from harmful UV rays with Horticultural film(200 micron green",
    image: require('./Images/horticolevert.jpeg'),
  price: "1400 FCFA/m²"
  },
     {
    title: language === 'fr' ? "Serre Tunnel(250m²)" : "horticultural green",
    description: language === 'fr' ? "Longeur 25 m Largeur 10m Total 250m²" : "Protect your crops from harmful UV rays with Horticultural film(200 micron green",
    image: require('./Images/tunnel.jpeg'),
  price: "A partir de 4.000.000"
  },
       {
    title: language === 'fr' ? "Serre en bois" : "horticultural green",
    description: language === 'fr' ? "Serre en bois à bon prix" : "Protect your crops from harmful UV rays with Horticultural film(200 micron green",
    image: require('./Images/serre.jpeg'),
  price: "A partir de 2.800.000"
  }
];


  const services = [
    { icon: <Leaf size={32} />, title: language === 'fr' ? "Fabrication de Serres" : "Greenhouse Manufacturing", description: language === 'fr' ? "Conception et fabrication de serres sur mesure adaptées à vos besoins agricoles spécifiques." : "Design and manufacturing of custom greenhouses adapted to your specific agricultural needs." },
    { icon: <Shield size={32} />, title: language === 'fr' ? "Installation Professionnelle" : "Professional Installation", description: language === 'fr' ? "Installation complète avec garantie, assurée par nos experts techniques certifiés." : "Complete installation with warranty, provided by our certified technical experts." },
    { icon: <Zap size={32} />, title: language === 'fr' ? "Matériel Agricole" : "Agricultural Equipment", description: language === 'fr' ? "Vente d'équipements et matériels pour optimiser votre production en serre." : "Sale of equipment and materials to optimize your greenhouse production." },
    { icon: <Users size={32} />, title: language === 'fr' ? "Support & Formation" : "Support & Training", description: language === 'fr' ? "Accompagnement personnalisé et formation pour maximiser vos rendements." : "Personalized support and training to maximize your yields." }
  ];

  const testimonials = [
    { name: "Kouassi Jean-Baptiste", role: language === 'fr' ? "Agriculteur" : "Farmer", content: language === 'fr' ? "Grâce à AGRO SERRE INNOVATION, ma production a triplé. Service impeccable !" : "Thanks to AGRO SERRE INNOVATION, my production has tripled. Impeccable service!", rating: 5 },
    { name: "Marie Ouattara", role: language === 'fr' ? "Coopérative Agricole" : "Agricultural Cooperative", content: language === 'fr' ? "Installation rapide et équipe très professionnelle. Je recommande vivement." : "Quick installation and very professional team. I highly recommend.", rating: 5 }
  ];

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
          <div className="language-switcher">
            <button onClick={() => changeLanguage(language === 'fr' ? 'en' : 'fr')} className="language-btn">
              <Globe size={18} />
              {language === 'fr' ? 'EN' : 'FR'}
            </button>
          </div>
          <ul className="nav-menu">
            {['accueil', 'presentation', 'fiches-techniques', 'services', 'produits', 'contact', 'devis', 'mentions-legales'].map((item) => (
              <li key={item}>
                <button onClick={() => scrollToSection(item)} className="nav-link">
                  {item === 'accueil' ? t('home') : item === 'presentation' ? t('about') : item === 'fiches-techniques' ? t('services') : item === 'produits' ? t('products') : item === 'devis' ? t('request_quote') : item === 'mentions-legales' ? t('legal_notice') : item}
                </button>
              </li>
            ))}
          </ul>
          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="mobile-menu">
            <ul>
              {['accueil', 'presentation', 'fiches-techniques', 'accessoires', 'services', 'produits', 'contact', 'devis', 'mentions-legales'].map((item) => (
                <li key={item}>
                  <button onClick={() => {
                    scrollToSection(item);
                    setIsMenuOpen(false);
                  }}>
                    {item === 'accueil' ? t('home') : item === 'presentation' ? t('about') : item === 'fiches-techniques' ? t('services') : item === 'accessoires' ? t('products') : item === 'devis' ? t('request_quote') : item === 'mentions-legales' ? t('legal_notice') : item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      <section id="accueil" className="hero">
        <div className="floating-element floating-1"></div>
        <div className="floating-element floating-2"></div>
        <div className="hero-content">
          <h1>{t('welcome')} <span className="gradient-text">{t('with_us')}</span></h1>
          <p>{language === 'fr' ? 'Agro Serre Innovation Côte  D\'ivoire; est une entreprise de construction de serre local, de vente d\'accessoires et de materiel agricole ' : 'Agro Serre Innovation Côte D\'ivoire; is a company that builds local greenhouses and sells accessories and agricultural equipment.'}</p>
          <div className="hero-buttons">
            <button onClick={() => scrollToSection('services')} className="btn btn-primary">
              {t('services')} <ChevronRight size={20} />
            </button>
            <button onClick={() => scrollToSection('contact')} className="btn btn-outline">
              {t('contact')}
            </button>
          </div>
        </div>
      </section>

      <section id="presentation" className="section section-gray">
        <div className="container">
          <div className="section-title">
            <h2>{t('about')}</h2>
            <p>{language === 'fr' ? 'AGRO SERRE INNOVATION CI est spécialisée dans la conception, la fabrication et l\'installation de serres agricoles résistantes en acier galvanisé adaptées aux conditions climatiques de l\'Afrique de l\'Ouest.' : 'AGRO SERRE INNOVATION CI specializes in the design, manufacturing, and installation of resistant agricultural greenhouses in galvanized steel adapted to the climatic conditions of West Africa.'}</p>
          </div>
        </div>
      </section>

      <section id="modeles" className="section">
        <div className="container">
          <div className="section-title">
            <h2>{language === 'fr' ? 'Types de serres disponibles' : 'Available greenhouse types'}</h2>
          </div>
          <div className="grid grid-3">
            <div className="card">
              <h3>Mini Serre</h3>
              <p>{language === 'fr' ? '100 m², Acier galvanisé Ø32mm, Usage recommandé: Maraîchage/Jardinage' : '100 m², Galvanized steel Ø32mm, Recommended use: Market gardening/Gardening'}</p>
            </div>
            <div className="card">
              <h3>Pro 200</h3>
              <p>{language === 'fr' ? '200 m², Acier galvanisé Ø40mm, Usage recommandé: Maraîchage intensif' : '200 m², Galvanized steel Ø40mm, Recommended use: Intensive market gardening'}</p>
            </div>
            <div className="card">
              <h3>Tropic 300</h3>
              <p>{language === 'fr' ? '300 m², Acier galvanisé Ø50mm, Usage recommandé: Maraîchage intensif' : '300 m², Galvanized steel Ø50mm, Recommended use: Intensive market gardening'}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="fiches-techniques" className="section section-gray">
        <div className="container">
          <div className="section-title">
            <h2>{t('services')}</h2>
          </div>
          <div className="grid grid-3">
            <div className="card">
              <h3>Pro 250</h3>
              <p>{language === 'fr' ? 'Serre Pro 250 – 250 m², Structure : Acier galvanisé traité anticorrosion Ø40mm, Dimensions : 10 m x 25 m, hauteur faîtage 4,5 m, Couverture : Polyéthylène traité UV 200 microns + filet anti-insectes' : 'Pro 250 Greenhouse – 250 m², Structure: Galvanized steel treated with anti-corrosion Ø40mm, Dimensions: 10 m x 25 m, ridge height 4.5 m, Cover: UV-treated polyethylene 200 microns + anti-insect net'}</p>
            </div>
            <div className="card">
              <h3>Tropic 300</h3>
              <p>{language === 'fr' ? 'Serre Tropic 300 - 300 m², Structure : Acier galvanisé traité anticorrosion Ø40mm, Dimensions : 10 m x 30 m, hauteur faîtage 4,5 m, Couverture : Polyéthylène traité UV 200 microns + filet anti-insectes' : 'Tropic 300 Greenhouse - 300 m², Structure: Galvanized steel treated with anti-corrosion Ø40mm, Dimensions: 10 m x 30 m, ridge height 4.5 m, Cover: UV-treated polyethylene 200 microns + anti-insect net'}</p>
            </div>
            <div className="card">
              <h3>Robuste 500</h3>
              <p>{language === 'fr' ? 'Serre Robuste 500 – 500 m², Structure : Acier galvanisé traité anticorrosion Ø80mm, Dimensions : 10 m x 50 m ou 20m x 50 m, hauteur faîtage 4,5 m, Couverture : Polyéthylène traité UV 200 microns + filet anti-insectes' : 'Robust 500 Greenhouse – 500 m², Structure: Galvanized steel treated with anti-corrosion Ø80mm, Dimensions: 10 m x 50 m or 20 m x 50 m, ridge height 4.5 m, Cover: UV-treated polyethylene 200 microns + anti-insect net'}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="accessoires" className="section">
        <div className="container">
          <div className="section-title">
            <h2>{t('products')}</h2>
          </div>
          <div className="grid grid-3">
            <div className="card">
              <h3>{language === 'fr' ? 'Systèmes d’irrigation automatisés' : 'Automated irrigation systems'}</h3>
            </div>
            <div className="card">
              <h3>{language === 'fr' ? 'Capteurs climatiques connectés' : 'Connected climate sensors'}</h3>
            </div>
            <div className="card">
              <h3>{language === 'fr' ? 'Chauffage solaire / ventilation' : 'Solar heating / ventilation'}</h3>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section section-gray">
        <div className="container">
          <div className="section-title">
            <h2>{t('services')}</h2>
            <p>{language === 'fr' ? 'Solutions complètes pour tous vos projets agricoles en serre, de la conception à la maintenance.' : 'Complete solutions for all your greenhouse agricultural projects, from design to maintenance.'}</p>
          </div>
          <div className="grid grid-4">
            {services.map((service, index) => (
              <div key={index} className="card">
                <div className="card-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  <section id="produits" className="section">
  <div className="container">
    <div className="section-title">
      <h2>{t('products')}</h2>
      <p>{language === 'fr' ? 'Découvrez nos produits pour l\'agriculture sous serre.' : 'Discover our products for greenhouse farming.'}</p>
    </div>
    <div className="grid grid-4">
      {products.slice(0, 4).map((product, index) => (
        <div key={index} className="card">
          <div className="card-image">
            <img src={product.image} alt={product.title} />
          </div>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p className="product-price">{product.price}</p>
        </div>
      ))}
    </div>
    <div className="see-more-container">
      <button className="btn see-more-btn" onClick={() => setShowAllProducts(true)}>
        {t('Voir plus de Produits')}
      </button>
    </div>
    {showAllProducts && (
      <div className="grid grid-4">
        {products.slice(4).map((product, index) => (
          <div key={index + 4} className="card">
            <div className="card-image">
              <img src={product.image} alt={product.title} />
            </div>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p className="product-price">{product.price}</p>
          </div>
        ))}
      </div>
    )}
  </div>
</section>


<section id="contact" className="section section-green">
  <div className="container">
    <div className="section-title">
      <h2>{t('contact')}</h2>
      <p>{language === 'fr' ? 'Prêt à démarrer votre projet ? Parlons-en ensemble !' : 'Ready to start your project? Let\'s talk about it!'}</p>
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
      
      <div>
        <form className="form">
          <h3>{t('request_quote')}</h3>
          <div className="form-grid">
            <div className="form-row">
              <input 
                type="text" 
                className="form-input" 
                placeholder={t('Nom Complet')} 
                value={formData.nom} 
                required 
                onChange={(e) => setFormData({...formData, nom: e.target.value})} 
              />
              <input 
                type="email" 
                className="form-input" 
                placeholder={t('email')} 
                value={formData.email} 
                required 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
              />
            </div>
            <div className="form-row">
              <input 
                type="tel" 
                className="form-input" 
                placeholder={t('Telephone')} 
                value={formData.telephone} 
                onChange={(e) => setFormData({...formData, telephone: e.target.value})} 
              />
              <input 
                type="text" 
                className="form-input" 
                placeholder={t('Service')} 
                value={formData.sujet} 
                onChange={(e) => setFormData({...formData, sujet: e.target.value})} 
              />
            </div>
            <textarea 
              className="form-input form-textarea" 
              placeholder={t('Message')} 
              value={formData.message} 
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
            <div className="form-buttons">
              <button type="button" className="btn btn-email" onClick={handleSubmit}>
                {t('send_request')}
              </button>
              <button type="button" className="btn btn-whatsapp" onClick={handleWhatsApp}>
                WhatsApp
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
    <div className="section-title">
      <h2>{t('Download_quote')}</h2>
      <p>{language === 'fr' ? 'Remplissez le formulaire pour recevoir notre catalogue personnalisé.' : 'Fill out the form to receive our personalized catalog.'}</p>
    </div>
    <form className="form">
      <div className="form-grid">
        <div className="form-row">
          <input 
            type="text" 
            name="nom" 
            className="form-input" 
            placeholder={t('name')} 
            value={devisData.nom} 
            onChange={(e) => setDevisData({...devisData, nom: e.target.value})} 
            required 
          />
          <input 
            type="email" 
            name="email" 
            className="form-input" 
            placeholder={t('Email')} 
            value={devisData.email} 
            onChange={(e) => setDevisData({...devisData, email: e.target.value})} 
            required 
          />
        </div>
        <div className="form-row">
          <input 
            type="tel" 
            name="telephone" 
            className="form-input" 
            placeholder={t('phone')} 
            value={devisData.telephone} 
            onChange={(e) => setDevisData({...devisData, telephone: e.target.value})} 
          />
          <input 
            type="text" 
            name="entreprise" 
            className="form-input" 
            placeholder={language === 'fr' ? 'Nom de l\'entreprise' : 'Company name'} 
            value={devisData.entreprise} 
            onChange={(e) => setDevisData({...devisData, entreprise: e.target.value})} 
          />
        </div>
        <select 
          name="typeProjet" 
          className="form-input" 
          value={devisData.typeProjet} 
          onChange={(e) => setDevisData({...devisData, typeProjet: e.target.value})}
        >
          <option value="">{language === 'fr' ? 'Type de projet' : 'Project type'}</option>
          <option value="Mini Serre (100m²)">Mini Serre (100m²)</option>
          <option value="Pro 200 (200m²)">Pro 200 (200m²)</option>
          <option value="Pro 250 (250m²)">Pro 250 (250m²)</option>
          <option value="Tropic 300 (300m²)">Tropic 300 (300m²)</option>
          <option value="Robuste 500 (500m²)">Robuste 500 (500m²)</option>
          <option value="Projet sur mesure">Projet sur mesure</option>
        </select>
        <select 
          name="surface" 
          className="form-input" 
          value={devisData.surface} 
          onChange={(e) => {
            const selectedSurface = e.target.value;
            console.log('Surface sélectionnée:', selectedSurface);
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
        <select 
          name="budget" 
          className="form-input" 
          value={devisData.budget} 
          onChange={(e) => setDevisData({...devisData, budget: e.target.value})}
        >
          <option value="">{language === 'fr' ? 'Budget estimé' : 'Estimated budget'}</option>
          <option value="Moins de 5M FCFA">Moins de 5M FCFA</option>
          <option value="5M - 15M FCFA">5M - 15M FCFA</option>
          <option value="15M - 30M FCFA">15M - 30M FCFA</option>
          <option value="Plus de 30M FCFA">Plus de 30M FCFA</option>
        </select>
        <select 
          name="delai" 
          className="form-input" 
          value={devisData.delai} 
          onChange={(e) => setDevisData({...devisData, delai: e.target.value})}
        >
          <option value="">{language === 'fr' ? 'Délai souhaité' : 'Desired timeline'}</option>
          <option value="Moins de 1 mois">Moins de 1 mois</option>
          <option value="1-3 mois">1-3 mois</option>
          <option value="3-6 mois">3-6 mois</option>
          <option value="Plus de 6 mois">Plus de 6 mois</option>
        </select>
        <textarea 
          name="description" 
          className="form-input form-textarea" 
          placeholder={language === 'fr' ? 'Description détaillée du projet (optionnel)' : 'Detailed project description (optional)'} 
          value={devisData.description} 
          onChange={(e) => setDevisData({...devisData, description: e.target.value})}
        ></textarea>
        <div className="form-buttons">
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={() => handleCatalogRequest(devisData)}
          >
            {language === 'fr' ? 'Recevoir le catalogue' : 'Receive catalog'}
          </button>
          <button 
            type="button" 
            className="btn btn-outline" 
            onClick={() => handleSimpleNotification(devisData)}
          >
            {language === 'fr' ? 'Demander un contact' : 'Request contact'}
          </button>
        </div>
      </div>
    </form>
  </div>
</section>


      <section id="mentions-legales" className="section">
        <div className="container">
          <div className="section-title">
            <h2>{t('legal_notice')}</h2>
          
            <h3>{t('privacy_policy')}</h3>
            <p>{language === 'fr' ? 'Nous nous engageons à protéger la vie privée des utilisateurs de notre site. Les informations collectées sont utilisées uniquement dans le cadre de la gestion des relations commerciales avec AGRO SERRE INNOVATION.' : 'We are committed to protecting the privacy of our website users. The information collected is used solely for the purpose of managing commercial relationships with AGRO SERRE INNOVATION.'}</p>
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
              <p>{language === 'fr' ? 'Votre partenaire pour l\'agriculture moderne en Côte d\'Ivoire.' : 'Your partner for modern agriculture in Côte d\'Ivoire.'}</p>
            </div>
            <div className="footer-section">
              <h3>{t('services')}</h3>
              <ul>
                <li>{t('production')}</li>
                <li>{t('installation')}</li>
                <li>{t('material')}</li>
                <li>{t('technical')}</li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>{t('contact')}</h3>
              <p>{language === 'fr' ? 'KOUMASSI ZONE INDUSTRIELLE À 100M DU FEU DE SOWETO.' : 'Industrial 100m from Feu de Soweto, Abidjan, KOUMASSI Zone'}<br />+225 01 00 52 25 92<br />agroserreinnovationci@gmail.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 AGRO SERRE INNOVATION COTE D'IVOIRE. {t('Tous droits reservés')}.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
