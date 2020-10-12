import React from "react"
import { Link } from 'gatsby';
/* import {
  TiSocialTwitter,
  TiSocialLinkedin,
  TiSocialFacebook,
  TiSocialYoutube,
} from "react-icons/ti" */
import { siteMetadata } from '../../gatsby-config';

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        { /*<div className="footer-social">
          <div className="footer-social-text">Follow Us</div>
          <div className="footer-social-icons">
            <a
              target="_blank"
              href="https://twitter.com/"
              rel="noopener noreferrer"
            >
              <span className="icon-container" id="tw-icon">
                <TiSocialTwitter className="footer-social-icon" />
              </span>
            </a>
            <a
              target="_blank"
              href="https://www.youtube.com/"
              rel="noopener noreferrer"
            >
              <span className="icon-container" id="yt-icon">
                <TiSocialYoutube className="footer-social-icon" />
              </span>
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/"
              rel="noopener noreferrer"
            >
              <span className="icon-container" id="li-icon">
                <TiSocialLinkedin className="footer-social-icon" />
              </span>
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/"
              rel="noopener noreferrer"
            >
              <span className="icon-container" id="fb-icon">
                <TiSocialFacebook className="footer-social-icon" />
              </span>
            </a>
          </div>
        </div>*/} 
        <div><Link to="/" className="footer-link">{siteMetadata.title}</Link> | &copy; {new Date().getFullYear()} - Todos los derechos reservados </div>
      </div>
    </footer>
  )
}
export default Footer
