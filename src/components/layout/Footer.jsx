import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      {/* Main Footer */}
      <div className="py-5">
        <div className="container">
          <div className="row g-4">
            {/* Brand Section */}
            <div className="col-lg-4 col-md-6">
              <h5 className="fw-bold mb-3 footer-brand">ShareYourTrip</h5>
              <p className="small mb-4">
                Conecta con viajeros de todo el mundo y descubre alojamientos únicos. Tu próxima aventura comienza aquí.
              </p>
              <div className="d-flex gap-3">
                <a href="#" className="footer-social">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="footer-social">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="#" className="footer-social">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="footer-social">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <h6 className="fw-bold mb-3">Compañía</h6>
              <ul className="list-unstyled small">
                <li className="mb-2">
                  <Link to="/about" className="footer-link">Sobre nosotros</Link>
                </li>
                <li className="mb-2">
                  <Link to="/careers" className="footer-link">Carreras</Link>
                </li>
                <li className="mb-2">
                  <Link to="/press" className="footer-link">Sala de prensa</Link>
                </li>
                <li className="mb-2">
                  <Link to="/blog" className="footer-link">Blog</Link>
                </li>
              </ul>
            </div>

            {/* Explore */}
            <div className="col-lg-2 col-md-6">
              <h6 className="fw-bold mb-3">Explorar</h6>
              <ul className="list-unstyled small">
                <li className="mb-2">
                  <Link to="/destinations" className="footer-link">Destinos</Link>
                </li>
                <li className="mb-2">
                  <Link to="/experiences" className="footer-link">Experiencias</Link>
                </li>
                <li className="mb-2">
                  <Link to="/travel-guides" className="footer-link">Guías de viaje</Link>
                </li>
                <li className="mb-2">
                  <Link to="/deals" className="footer-link">Ofertas</Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="col-lg-2 col-md-6">
              <h6 className="fw-bold mb-3">Ayuda</h6>
              <ul className="list-unstyled small">
                <li className="mb-2">
                  <Link to="/help" className="footer-link">Centro de ayuda</Link>
                </li>
                <li className="mb-2">
                  <Link to="/contact" className="footer-link">Contacto</Link>
                </li>
                <li className="mb-2">
                  <Link to="/faq" className="footer-link">Preguntas frecuentes</Link>
                </li>
                <li className="mb-2">
                  <Link to="/safety" className="footer-link">Seguridad</Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="col-lg-2 col-md-6">
              <h6 className="fw-bold mb-3">Legal</h6>
              <ul className="list-unstyled small">
                <li className="mb-2">
                  <Link to="/terms" className="footer-link">Términos y condiciones</Link>
                </li>
                <li className="mb-2">
                  <Link to="/privacy" className="footer-link">Privacidad</Link>
                </li>
                <li className="mb-2">
                  <Link to="/cookies" className="footer-link">Cookies</Link>
                </li>
                <li className="mb-2">
                  <Link to="/accessibility" className="footer-link">Accesibilidad</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="small mb-0">
                © 2026 ShareYourTrip. TFG Victor Cortés Esteve - UOC - Ingeniería Informática
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
              <p className="small mb-0">
                Hecho con <span style={{ color: '#f95a13' }}>♥</span> para viajeros
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
