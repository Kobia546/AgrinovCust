import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, Leaf, Shield, Zap, Users, ChevronRight, Star, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import './App.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  });
   const logo = require('./../src/Images/logo1.png');
   
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

  const projects = [
    {
      title: "Serre Agricole - Yamoussoukro",
      description: "Installation d'une serre de 500m² pour production maraîchère",
      image: "/images/serre-yamoussoukro.jpg"
    },
    {
      title: "Complexe Serricole - Bouaké",
      description: "Projet de 3 serres interconnectées avec système d'irrigation",
      image: "/images/complexe-bouake.jpg"
    },
    {
      title: "Serre High-Tech - Abidjan",
      description: "Serre climatisée avec contrôle automatisé pour cultures premium",
      image: "/images/serre-abidjan.jpg"
    }
  ];

  const products = [
    {
      title: "Filet anti-insectes",
      description: "Maille 40 pour bloquer mouches blanches, thrips, etc.",
      image:require('./Images/filet.jpeg')
    },
    {
      title: "Film Horticole",
      description: "Polyéthylène haute densité, traité anti-UV.",
      image: "/images/Horticole.jpg"
    },
    {
      title: "Filet d'ombrage",
      description: "Taux d'ombrage de 30% à 90%.",
      image: "/images/filet-ombrage.jpg"
    },
    {
      title: "Couvre sol",
      description: "Polypropylène ou polyéthylène, perméable à l'air et à l'eau.",
      image: "/images/couvre-sol.jpg"
    }
  ];

  const services = [
    { icon: <Leaf size={32} />, title: "Fabrication de Serres", description: "Conception et fabrication de serres sur mesure adaptées à vos besoins agricoles spécifiques." },
    { icon: <Shield size={32} />, title: "Installation Professionnelle", description: "Installation complète avec garantie, assurée par nos experts techniques certifiés." },
    { icon: <Zap size={32} />, title: "Matériel Agricole", description: "Vente d'équipements et matériels pour optimiser votre production en serre." },
    { icon: <Users size={32} />, title: "Support & Formation", description: "Accompagnement personnalisé et formation pour maximiser vos rendements." }
  ];

  const testimonials = [
    { name: "Kouassi Jean-Baptiste", role: "Agriculteur", content: "Grâce à AGRO SERRE INNOVATION, ma production a triplé. Service impeccable !", rating: 5 },
    { name: "Marie Ouattara", role: "Coopérative Agricole", content: "Installation rapide et équipe très professionnelle. Je recommande vivement.", rating: 5 }
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
              <h1>AGRO SERRE</h1>
              <p>INNOVATION</p>
            </div>
          </div>
          <ul className="nav-menu">
            {['accueil', 'presentation', 'modeles', 'fiches-techniques', 'accessoires', 'services', 'produits', 'contact'].map((item) => (
              <li key={item}>
                <button onClick={() => scrollToSection(item)} className={`nav-link ${activeSection === item ? 'active' : ''}`}>
                  {item === 'presentation' ? 'Présentation' : item === 'fiches-techniques' ? 'Fiches Techniques' : item === 'accessoires' ? 'Accessoires' : item}
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
              {['accueil', 'presentation', 'modeles', 'fiches-techniques', 'accessoires', 'services', 'produits', 'contact'].map((item) => (
                <li key={item}>
                  <button onClick={() => scrollToSection(item)} className="mobile-nav-link">
                    {item === 'presentation' ? 'Présentation' : item === 'fiches-techniques' ? 'Fiches Techniques' : item === 'accessoires' ? 'Accessoires' : item}
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
          <h1>L'Innovation <span className="gradient-text">Agricole</span></h1>
          <p>Fabrication, installation et vente de matériel de serre en Côte d'Ivoire. Révolutionnez votre agriculture avec nos solutions innovantes.</p>
          <div className="hero-buttons">
            <button onClick={() => scrollToSection('services')} className="btn btn-primary">
              Découvrir nos services <ChevronRight size={20} />
            </button>
            <button onClick={() => scrollToSection('contact')} className="btn btn-outline">
              Nous contacter
            </button>
          </div>
        </div>
      </section>

      <section id="presentation" className="section section-gray">
        <div className="container">
          <div className="section-title">
            <h2>Présentation de l’entreprise</h2>
            <p>AGRO SERRE INNOVATION CI est spécialisée dans la conception, la fabrication et l'installation de serres agricoles résistantes en acier galvanisé adaptées aux conditions climatiques de l’Afrique de l’Ouest.</p>
          </div>
          <div className="about-content">
            
          </div>
        </div>
      </section>

      <section id="modeles" className="section">
        <div className="container">
          <div className="section-title">
            <h2>Types de serres disponibles</h2>
          </div>
          <div className="grid grid-3">
            <div className="card">
              <h3>Mini Serre</h3>
              <p>100 m², Acier galvanisé Ø32mm, Usage recommandé: Maraîchage/Jardinage</p>
            </div>
            <div className="card">
              <h3>Pro 200</h3>
              <p>200 m², Acier galvanisé Ø40mm, Usage recommandé: Maraîchage intensif</p>
            </div>
            <div className="card">
              <h3>Tropic 300</h3>
              <p>300 m², Acier galvanisé Ø50mm, Usage recommandé: Maraîchage intensif</p>
            </div>
          </div>
        </div>
      </section>

      <section id="fiches-techniques" className="section section-gray">
        <div className="container">
          <div className="section-title">
            <h2>Fiches techniques produits</h2>
          </div>
          <div className="grid grid-3">
            <div className="card">
              <h3>Pro 250</h3>
              <p>Serre Pro 250 – 250 m², Structure : Acier galvanisé traité anticorrosion Ø40mm, Dimensions : 10 m x 25 m, hauteur faîtage 4,5 m, Couverture : Polyéthylène traité UV 200 microns + filet anti-insectes</p>
            </div>
            <div className="card">
              <h3>Tropic 300</h3>
              <p>Serre Tropic 300 - 300 m², Structure : Acier galvanisé traité anticorrosion Ø40mm, Dimensions : 10 m x 30 m, hauteur faîtage 4,5 m, Couverture : Polyéthylène traité UV 200 microns + filet anti-insectes</p>
            </div>
            <div className="card">
              <h3>Robuste 500</h3>
              <p>Serre Robuste 500 – 500 m², Structure : Acier galvanisé traité anticorrosion Ø80mm, Dimensions : 10 m x 50 m ou 20m x 50 m, hauteur faîtage 4,5 m, Couverture : Polyéthylène traité UV 200 microns + filet anti-insectes</p>
            </div>
          </div>
        </div>
      </section>

      <section id="accessoires" className="section">
        <div className="container">
          <div className="section-title">
            <h2>Accessoires et options</h2>
          </div>
          <div className="grid grid-3">
            <div className="card">
              <h3>Systèmes d’irrigation automatisés</h3>
            </div>
            <div className="card">
              <h3>Capteurs climatiques connectés</h3>
            </div>
            <div className="card">
              <h3>Chauffage solaire / ventilation</h3>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section section-gray">
        <div className="container">
          <div className="section-title">
            <h2>Nos Services</h2>
            <p>Solutions complètes pour tous vos projets agricoles en serre, de la conception à la maintenance.</p>
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
            <h2>Nos Produits</h2>
            <p>Découvrez nos produits pour l'agriculture sous serre.</p>
          </div>
          <div className="grid grid-4">
            {products.map((product, index) => (
              <div key={index} className="card">
                <div className="card-image">
                  <img src={product.image} alt={product.title} />
                </div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="realisations" className="section section-gray">
        <div className="container">
          <div className="section-title">
            <h2>Nos Réalisations</h2>
            <p>Découvrez quelques-uns de nos projets les plus emblématiques à travers la Côte d'Ivoire.</p>
          </div>
          <div className="grid grid-3">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section section-green">
        <div className="container">
          <div className="section-title">
            <h2>Contactez-nous</h2>
            <p>Prêt à démarrer votre projet ? Parlons-en ensemble !</p>
          </div>
          <div className="contact-grid">
            <div>
              <div className="contact-info">
                <div className="contact-icon"><MapPin size={20} color="white" /></div>
                <div className="contact-details">
                  <h3>Adresse</h3>
                  <p>Industrielle à 100m du Feu de Soweto, Abidjan, KOUMASSI Zone</p>
                </div>
              </div>
              <div className="contact-info">
                <div className="contact-icon"><Phone size={20} color="white" /></div>
                <div className="contact-details">
                  <h3>Téléphone</h3>
                  <p>+225 01 00 52 25 92<br />+225 01 01 61 99 19</p>
                </div>
              </div>
              <div className="contact-info">
                <div className="contact-icon"><Mail size={20} color="white" /></div>
                <div className="contact-details">
                  <h3>Email</h3>
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
                <h3>Demande de devis</h3>
                <div className="form-grid">
                  <div className="form-row">
                    <input type="text" className="form-input" placeholder="Nom complet" value={formData.nom} onChange={(e) => setFormData({...formData, nom: e.target.value})} />
                    <input type="email" className="form-input" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="form-row">
                    <input type="tel" className="form-input" placeholder="Téléphone" value={formData.telephone} onChange={(e) => setFormData({...formData, telephone: e.target.value})} />
                    <input type="text" className="form-input" placeholder="Sujet" value={formData.sujet} onChange={(e) => setFormData({...formData, sujet: e.target.value})} />
                  </div>
                  <textarea className="form-input form-textarea" placeholder="Votre message..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
                  <div className="form-buttons">
                    <button type="button" className="btn btn-email" onClick={handleSubmit}>Envoyer par Email</button>
                    <button type="button" className="btn btn-whatsapp" onClick={handleWhatsApp}>WhatsApp</button>
                  </div>
                </div>
              </form>
            </div>
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
                  <p>INNOVATION</p>
                </div>
              </div>
              <p>Votre partenaire pour l'agriculture moderne en Côte d'Ivoire.</p>
            </div>
            <div className="footer-section">
              <h3>Services</h3>
              <ul>
                <li>Fabrication de serres</li>
                <li>Installation professionnelle</li>
                <li>Matériel agricole</li>
                <li>Support technique</li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Contact</h3>
              <p>Industrielle à 100m du Feu de Soweto, Abidjan, KOUMASSI Zone<br />+225 01 00 52 25 92<br />agroserreinnovationci@gmail.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 AGRO SERRE INNOVATION. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
