import React from "react";
import { faYoutube, faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/inertia-react";

const Footer = () => {
  return (
    <footer className="mt-20">
      <div className="container max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 md:flex items-center justify-between">
        <hr />

        <ul className="w-full md:flex flex-row justify-between items-center py-12 uppercase font-bold text-sm">
          <li>
            <a target="_blank" className="" href="https://www.papaloapan.com.mx/contacto/">
              Contacto
            </a>
          </li>
          <li>
            <a className="" href="https://www.papaloapan.com.mx/nosotros/">
              Empresa
            </a>
          </li>
          <li>
            <Link href="/aviso-de-privacidad">Aviso de Privacidad</Link>
          </li>
          <li>
            <Link href="/terminos-y-condiciones">Términos y Condiciones</Link>
          </li>
        </ul>
      </div>

      <div className="bg-red-700 copyright py-6">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 md:flex items-center justify-between text-white">
          <div>&copy; {new Date().getFullYear()} Carnes Papaloapan</div>
          <div>
            {/* <a className="mx-1" href="#">
              <FontAwesomeIcon icon={faWhatsapp} size="1x" />
            </a> */}
            <a className="mx-1" href="https://www.facebook.com/carnes.papaloapan/" target="_blank">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a className="mx-1" href="https://www.youtube.com/channel/UCx_QUMAmb4giITsMueUulqw" target="_blank">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a className="mx-1" href="https://www.instagram.com/carnes.papaloapan/" target="_blank">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
