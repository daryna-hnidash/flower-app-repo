import { Link } from 'react-router-dom';
import { Nav } from '../Nav';
import "./Footer.scss";

export function Footer() {
  return (
    <footer className="page__footer footer">
      <div className="footer__content">
        <ul className="footer__socials-list">
          <li className="footer__footer__socials-item">
            <a
              href="facebook.com"
              title="We on Facebook"
              className="footer__link footer__link--facebook"
              target="blank"
            ></a>
          </li>
          <li className="footer__socials-item">
            <a
              href="web.telegram.org"
              title="We on Telegram"
              className="footer__link footer__link--telegram"
              target="blank"
            ></a>
          </li>
          <li className="footer__socials-item">
            <a
              href="instagram.com"
              title="We on Instagram"
              className="footer__link  footer__link--instagram"
              target="blank"
            ></a>
          </li>
        </ul>
        <div className="footer__links">
          <Nav isFooter={true} />
          <div className="footer__other-links">
            <Link to="faq">FAQ</Link>
          </div>
          <address className="footer__address">
            <a
              href="tel:+38066578398"
              className="footer__address-item footer__address-item--phone"
            >
              +38066578398
            </a>
            <a
              href="mailto:LilyLove@gmail.com"
              className="footer__address-item"
            >
              LilyLove@gmail.com
            </a>
            <a
              href="https://maps.app.goo.gl/EMWspUEiB1Yobt8c8"
              target="blank"
              className="footer__address-item"
            >
              Вулиця Неіснуюча, буд. 123, Київ, Україна
            </a>
            <p>10:00 - 19:00</p>
          </address>
        </div>
      </div>
    </footer>
  )
}
