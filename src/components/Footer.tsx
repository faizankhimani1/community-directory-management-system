import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Star, Code2, Heart } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <p className="font-bold text-white">Jasdan Memon Jamat</p>
                <p className="text-emerald-300 text-xs">جسدن میمن جماعت</p>
              </div>
            </div>
            <p className="text-emerald-300 text-sm leading-relaxed">
              Serving the Memon community of Jasdan with unity, brotherhood, and
              social welfare since generations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-yellow-400 mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/members", label: "Members Directory" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-emerald-300 hover:text-yellow-400 text-sm transition-colors duration-200 flex items-center gap-1"
                  >
                    <span className="text-yellow-500">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-yellow-400 mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-emerald-300">
                <MapPin className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>Jumma Masjid Area, Jasdan, Gujarat, India</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-emerald-300">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-emerald-300">
                <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>jasdanmemonjamat@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Developer Info */}
          <div>
            <h4 className="font-semibold text-yellow-400 mb-4 text-sm uppercase tracking-wider">
              Developer
            </h4>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  Faizan Khimani
                </p>
                <p className="text-emerald-400 text-xs">Software Engineer</p>
              </div>
            </div>
            <p className="text-emerald-300 text-xs leading-relaxed">
              Built with dedication for the Jasdan Memon Jamat community.
            </p>
            <a
              href="mailto:faizankhimani@gmail.com"
              className="inline-block mt-2 text-xs text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              faizankhimani@gmail.com
            </a>
          </div>
        </div>

        <div className="border-t border-emerald-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-emerald-400 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Jasdan Memon Jamat. All rights reserved.
          </p>
          <p className="text-emerald-400 text-xs flex items-center gap-1">
            Developed with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> by{" "}
            <span className="text-yellow-400 font-medium">Faizan Khimani</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
