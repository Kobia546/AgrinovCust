import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { jsPDF } from 'jspdf';
import { Menu, X, Phone, Mail, MapPin, Leaf, Shield, Zap, Users, ChevronRight, Star, Facebook, Instagram, Linkedin, MessageCircle, Globe } from 'lucide-react';
import './App.css';
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
    const mailtoLink = `mailto:agroserreinnovationci@gmail.com?subject=${encodeURIComponent(formData.sujet)}&body=${encodeURIComponent(
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

  const generateDevisPDF = () => {
    const doc = new jsPDF();
    doc.text(`Devis pour ${devisData.nom}`, 20, 20);
    doc.text(`Email: ${devisData.email}`, 20, 30);
    doc.text(`Téléphone: ${devisData.telephone}`, 20, 40);
    doc.text(`Entreprise: ${devisData.entreprise}`, 20, 50);
    doc.text(`Type de projet: ${devisData.typeProjet}`, 20, 60);
    doc.text(`Surface: ${devisData.surface} m²`, 20, 70);
    doc.text(`Budget: ${devisData.budget}`, 20, 80);
    doc.text(`Délai: ${devisData.delai}`, 20, 90);
    doc.text(`Description: ${devisData.description}`, 20, 100);
    doc.save('devis.pdf');
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
              <p>CÔTE D'IVOIRE </p>
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
                <button onClick={() => scrollToSection(item)} className={`nav-link ${activeSection === item ? 'active' : ''}`}>
                  {item === 'accueil' ? t('home') : item === 'presentation' ? t('about') : item === 'fiches-techniques' ? t('services') : item === 'accessoires' ? t('products') : item === 'devis' ? t('request_quote') : item === 'mentions-legales' ? t('legal_notice') : item}
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
      {['accueil', 'presentation', 'modeles', 'fiches-techniques', 'accessoires', 'services', 'produits', 'contact', 'devis', 'mentions-legales'].map((item) => (
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
          <h1>{t('welcome')} <span className="gradient-text">{t('chez nous')}</span></h1>
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
            <div>
              <div className="contact-info">
                <div className="contact-icon"><MapPin size={20} color="white" /></div>
                <div className="contact-details">
                  <h3>{t('address')}</h3>
                  <p>{language === 'fr' ? 'Industrielle à 100m du Feu de Soweto, Abidjan, KOUMASSI Zone' : 'Industrial 100m from Feu de Soweto, Abidjan, KOUMASSI Zone'}</p>
                </div>
              </div>
              <div className="contact-info">
                <div className="contact-icon"><Phone size={20} color="white" /></div>
                <div className="contact-details">
                  <h3>{t('phone')}</h3>
                  <p>+225 01 00 52 25 92<br />+225 01 01 61 99 19</p>
                </div>
              </div>
              <div className="contact-info">
                <div className="contact-icon"><Mail size={20} color="white" /></div>
                <div className="contact-details">
                  <h3>{t('email')}</h3>
                  <p>agroserreinnovationci@gmail.com</p>
                </div>
              </div>
              <div className="social-links">
                <a href="#" className="social-link"><Facebook size={18} /></a>
                <a href="#" className="social-link"><Instagram size={18} /></a>
                <a href="#" className="social-link"><Linkedin size={18} /></a>
              </div>
            </div>
            <div>
              <form className="form">
                <h3>{t('request_quote')}</h3>
                <div className="form-grid">
                  <div className="form-row">
                    <input type="text" className="form-input" placeholder={t('Nom Complet')} value={formData.nom} onChange={(e) => setFormData({...formData, nom: e.target.value})} />
                    <input type="email" className="form-input" placeholder={t('email')} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="form-row">
                    <input type="tel" className="form-input" placeholder={t('Telephone')} value={formData.telephone} onChange={(e) => setFormData({...formData, telephone: e.target.value})} />
                    <input type="text" className="form-input" placeholder={t('Service')} value={formData.sujet} onChange={(e) => setFormData({...formData, sujet: e.target.value})} />
                  </div>
                  <textarea className="form-input form-textarea" placeholder={t('Message')} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
                  <div className="form-buttons">
                    <button type="button" className="btn btn-email" onClick={handleSubmit}>{t('Telecharger Demande ')}</button>
                    <button type="button" className="btn btn-whatsapp" onClick={handleWhatsApp}>WhatsApp</button>
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
            <h2>{t('request_quote')}</h2>
            <p>{language === 'fr' ? 'Remplissez le formulaire pour obtenir un devis personnalisé.' : 'Fill out the form to get a personalized quote.'}</p>
          </div>
          <form className="form">
            <div className="form-grid">
              <div className="form-row">
                <input type="text" name="nom" className="form-input" placeholder={t('nom complet')} value={devisData.nom} onChange={(e) => setDevisData({...devisData, nom: e.target.value})} required />
                <input type="email" name="email" className="form-input" placeholder={t('email')} value={devisData.email} onChange={(e) => setDevisData({...devisData, email: e.target.value})} required />
              </div>
              <div className="form-row">
                <input type="tel" name="telephone" className="form-input" placeholder={t('phone')} value={devisData.telephone} onChange={(e) => setDevisData({...devisData, telephone: e.target.value})} required />
                <input type="text" name="entreprise" className="form-input" placeholder={language === 'fr' ? 'Nom de l\'entreprise' : 'Company name'} value={devisData.entreprise} onChange={(e) => setDevisData({...devisData, entreprise: e.target.value})} />
              </div>
              <select name="typeProjet" className="form-input" value={devisData.typeProjet} onChange={(e) => setDevisData({...devisData, typeProjet: e.target.value})} required>
                <option value="">{language === 'fr' ? 'Type de projet' : 'Project type'}</option>
                <option value="Mini Serre (100m²)">Mini Serre (100m²)</option>
                <option value="Pro 200 (200m²)">Pro 200 (200m²)</option>
                <option value="Pro 250 (250m²)">Pro 250 (250m²)</option>
                <option value="Tropic 300 (300m²)">Tropic 300 (300m²)</option>
                <option value="Robuste 500 (500m²)">Robuste 500 (500m²)</option>
                <option value="Projet sur mesure">Projet sur mesure</option>
              </select>
              <input type="number" name="surface" className="form-input" placeholder={language === 'fr' ? 'Surface souhaitée (m²)' : 'Desired area (m²)'} value={devisData.surface} onChange={(e) => setDevisData({...devisData, surface: e.target.value})} required />
              <select name="budget" className="form-input" value={devisData.budget} onChange={(e) => setDevisData({...devisData, budget: e.target.value})}>
                <option value="">{language === 'fr' ? 'Budget estimé' : 'Estimated budget'}</option>
                <option value="Moins de 5M FCFA">Moins de 5M FCFA</option>
                <option value="5M - 15M FCFA">5M - 15M FCFA</option>
                <option value="15M - 30M FCFA">15M - 30M FCFA</option>
                <option value="Plus de 30M FCFA">Plus de 30M FCFA</option>
              </select>
              <select name="delai" className="form-input" value={devisData.delai} onChange={(e) => setDevisData({...devisData, delai: e.target.value})}>
                <option value="">{language === 'fr' ? 'Délai souhaité' : 'Desired timeline'}</option>
                <option value="Moins de 1 mois">Moins de 1 mois</option>
                <option value="1-3 mois">1-3 mois</option>
                <option value="3-6 mois">3-6 mois</option>
                <option value="Plus de 6 mois">Plus de 6 mois</option>
              </select>
              <textarea name="description" className="form-input form-textarea" placeholder={language === 'fr' ? 'Description détaillée du projet' : 'Detailed project description'} value={devisData.description} onChange={(e) => setDevisData({...devisData, description: e.target.value})} required></textarea>
              <div className="form-buttons">
                <button type="button" className="btn btn-primary" onClick={generateDevisPDF}>{t('Telecharger le devis')}</button>
                <button type="button" className="btn btn-outline" onClick={sendDevisRequest}>{language === 'fr' ? 'Envoyer la demande' : 'Send request'}</button>
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
                <li>{t('Fabrication de serre')}</li>
                <li>{t('Installation professionelle')}</li>
                <li>{t('Materiel agriculture')}</li>
                <li>{t('Support technique')}</li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>{t('contact')}</h3>
              <p>{language === 'fr' ? 'Industrielle à 100m du Feu de Soweto, Abidjan, KOUMASSI Zone' : 'Industrial 100m from Feu de Soweto, Abidjan, KOUMASSI Zone'}<br />+225 01 00 52 25 92<br />agroserreinnovationci@gmail.com</p>
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
