import { Link } from "react-router-dom";
import "../css/Footer.css";

export default function Footer() {
  const companyName = "iCodeGuru</>";

  return (
    <footer className="footer-navbar">
      <div className="footer-navbar-left">
        <span className="brand">{companyName}</span>
        <p className="founder">Founded by Wonder Nxele, UKZN Computer Science Student</p>
      </div>

      <div className="footer-navbar-right">
        <Link to="/about">About</Link>
        <a
          href="mailto:nkonzon123@gmail.com"
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact
        </a>
        <a
          href="https://www.linkedin.com/in/wonder-nxele-030881290"
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
