import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Code2,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", phone: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 py-14 px-4 text-center">
        <h1 className="text-white text-3xl sm:text-4xl font-bold mb-2">
          Contact Us
        </h1>
        <p className="text-emerald-200 text-sm sm:text-base max-w-xl mx-auto">
          Reach out to Jasdan Memon Jamat or the developer for any queries, suggestions,
          or support.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-4">
            {/* Jamat Office */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">🕌</span> Jamat Office
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Address</p>
                    <p>Near Jumma Masjid, Jasdan,</p>
                    <p>Rajkot District, Gujarat – 360050</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Phone</p>
                    <a href="tel:+919876543210" className="hover:text-emerald-600 transition-colors">
                      +91 98765 43210
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MessageCircle className="w-4 h-4 text-green-600 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">WhatsApp</p>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-green-600 transition-colors"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Email</p>
                    <a
                      href="mailto:jasdanmemonjamat@gmail.com"
                      className="hover:text-emerald-600 transition-colors break-all"
                    >
                      jasdanmemonjamat@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Office Hours</p>
                    <p>Mon – Fri: 10:00 AM – 6:00 PM</p>
                    <p>Friday: Closed (Juma)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Developer Contact */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-400" />
                Developer Contact
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-emerald-600">
                  <img
                    src="/images/DEV.png"
                    alt="Faizan Khimani"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement;
                      el.style.display = "none";
                      el.parentElement!.innerHTML = `<div style="width:100%;height:100%;background:#047857;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:20px">F</div>`;
                    }}
                  />
                </div>
                <div>
                  <p className="font-bold text-white">Faizan Khimani</p>
                  <p className="text-emerald-400 text-xs">Software Engineer</p>
                </div>
              </div>
              <div className="space-y-2">
                <a
                  href="mailto:faizankhimani@gmail.com"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-emerald-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  faizankhimani@gmail.com
                </a>
                <a
                  href="https://wa.me/919876543211"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-green-400 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  WhatsApp Developer
                </a>
              </div>
              <p className="text-gray-400 text-xs mt-4 leading-relaxed">
                For website issues, new features, or to digitize your community's data —
                contact Faizan Khimani directly.
              </p>
            </div>
          </div>

          {/* Map + Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Google Map */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-gray-800">Find Us on Map</h3>
              </div>
              <div className="w-full h-64 sm:h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3698.3031219026325!2d71.20499628528228!3d22.03799730047948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3958f7c9533865d3%3A0x9704ed29ff5ff360!2sJumma%20Masjid%20Jasdan!5e0!3m2!1sen!2sin!4v1778932029171!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Jasdan Memon Jamat Location"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <Send className="w-5 h-5 text-emerald-600" />
                Send a Message
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Have a query, suggestion, or need help? Fill in the form and we'll get back to you.
              </p>

              {submitted && (
                <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-emerald-800 font-semibold text-sm">
                      Message Sent Successfully!
                    </p>
                    <p className="text-emerald-600 text-xs">
                      Thank you for reaching out. We'll respond within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      required
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone"
                      type="tel"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Email Address
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email (optional)"
                    type="email"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Subject *
                  </label>
                  <select
                    required
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white text-gray-700"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Member Registration">Member Registration</option>
                    <option value="Update My Details">Update My Details</option>
                    <option value="Community Event">Community Event</option>
                    <option value="Report an Issue">Report an Issue</option>
                    <option value="Contact Developer">Contact Developer</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Write your message here..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
