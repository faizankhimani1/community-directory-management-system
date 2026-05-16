import React from "react";
import {
  Heart,
  Users,
  Star,
  Award,
  Target,
  Lightbulb,
  Shield,
  Code2,
  Mail,
  Phone,
} from "lucide-react";

const ValueCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
}> = ({ icon, title, desc, color }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 py-14 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white rounded-full translate-y-1/2" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-yellow-400 text-3xl mb-3">🕌</p>
          <h1 className="text-white text-3xl sm:text-4xl font-bold mb-3">
            About Jasdan Memon Jamat
          </h1>
          <p className="text-emerald-200 text-sm sm:text-base">
            جسدن میمن جماعت — Unity, Brotherhood & Service
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              Our Story
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-4 mb-4">
              A Community Built on Faith & Brotherhood
            </h2>
            <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
              <p>
                The Jasdan Memon Jamat is a proud community organization representing the
                Memon Muslim families residing in Jasdan, Gujarat. Rooted in the rich
                traditions of the Memon community — known for their strong sense of unity,
                generosity, and entrepreneurial spirit — our Jamat has served as the backbone
                of social life for generations.
              </p>
              <p>
                Our Jamat encompasses over a thousand homes spread across various localities
                of Jasdan. From Memon Colony to Station Road, from Limbdi Road to the Main
                Bazaar — our members are woven into every fabric of this city.
              </p>
              <p>
                With a committee of 11 dedicated leaders — including the Pramukh (President),
                Up-Pramukh (Vice President), Secretary, Treasurer, Joint Secretary, and six
                committee members — we ensure every voice is heard and every family is taken
                care of.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-6 text-white text-center">
              <p className="text-4xl font-bold">1000+</p>
              <p className="text-emerald-200 text-sm mt-1">Families</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
              <p className="text-4xl font-bold text-gray-800">11</p>
              <p className="text-gray-500 text-sm mt-1">Committee Members</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
              <p className="text-4xl font-bold text-gray-800">10+</p>
              <p className="text-gray-500 text-sm mt-1">Areas Covered</p>
            </div>
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl p-6 text-white text-center">
              <p className="text-4xl font-bold">💚</p>
              <p className="text-amber-100 text-sm mt-1">Community First</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
        <div className="text-center mb-10">
          <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Our Values
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-4 mb-2">
            What We Stand For
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ValueCard
            icon={<Heart className="w-6 h-6 text-red-600" />}
            title="Brotherhood (Bhaichara)"
            desc="We believe in the strength of brotherhood. Every Memon family in Jasdan is connected through bonds of faith, culture, and mutual support."
            color="bg-red-50"
          />
          <ValueCard
            icon={<Shield className="w-6 h-6 text-emerald-600" />}
            title="Social Welfare"
            desc="Our Jamat actively supports families in need — from educational assistance to help in times of difficulty, we stand together."
            color="bg-emerald-50"
          />
          <ValueCard
            icon={<Users className="w-6 h-6 text-blue-600" />}
            title="Community Unity"
            desc="Over a thousand families united under one Jamat, celebrating together, mourning together, and growing together."
            color="bg-blue-50"
          />
          <ValueCard
            icon={<Star className="w-6 h-6 text-yellow-600" />}
            title="Islamic Values"
            desc="Guided by the principles of Islam — honesty, charity (zakat), prayer, and respect — we lead a life of purpose and meaning."
            color="bg-yellow-50"
          />
          <ValueCard
            icon={<Target className="w-6 h-6 text-purple-600" />}
            title="Transparent Governance"
            desc="Our committee operates with full transparency, holding regular meetings and maintaining open communication with all members."
            color="bg-purple-50"
          />
          <ValueCard
            icon={<Lightbulb className="w-6 h-6 text-orange-600" />}
            title="Progress & Innovation"
            desc="We embrace technology and new ideas to make the Jamat more efficient, connected, and future-ready — like this very digital directory."
            color="bg-orange-50"
          />
        </div>
      </section>

      {/* Committee Structure */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Leadership Structure
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-4 mb-2">
            How Our Jamat is Organized
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            The Jasdan Memon Jamat is governed by an 11-member committee that represents
            all areas and handles all community affairs.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-2xl p-6 text-white text-center mb-4">
            <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="font-bold text-lg">Pramukh (President)</p>
            <p className="text-emerald-200 text-sm">Chief leader of the Jamat</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {[
              { title: "Up-Pramukh", sub: "Vice President" },
              { title: "Secretary (Mantri)", sub: "Administrative Head" },
            ].map((r) => (
              <div
                key={r.title}
                className="bg-emerald-600 rounded-xl p-4 text-white text-center"
              >
                <p className="font-semibold">{r.title}</p>
                <p className="text-emerald-200 text-xs mt-0.5">{r.sub}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {[
              { title: "Treasurer (Khajanchi)", sub: "Finance Management" },
              { title: "Joint Secretary", sub: "Assistant Administration" },
            ].map((r) => (
              <div
                key={r.title}
                className="bg-emerald-100 rounded-xl p-4 text-center"
              >
                <p className="font-semibold text-emerald-800">{r.title}</p>
                <p className="text-emerald-600 text-xs mt-0.5">{r.sub}</p>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
            <p className="font-semibold text-amber-800">6 Committee Members</p>
            <p className="text-amber-600 text-xs mt-0.5">
              Representing different areas of Jasdan — total 11 leaders
            </p>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-900/50 rounded-full -translate-y-1/3 translate-x-1/3" />
          <div className="relative z-10">
            <div className="text-center mb-8">
              <span className="bg-emerald-800 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                About the Developer
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4">
                Meet the Developer
              </h2>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="shrink-0">
                <div className="w-36 h-36 rounded-2xl overflow-hidden border-4 border-emerald-600 shadow-xl">
                  <img
                    src="/images/DEV.png"
                    alt="Faizan Khimani"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement;
                      el.style.display = "none";
                      el.parentElement!.innerHTML = `<div class="w-full h-full bg-emerald-700 flex items-center justify-center text-5xl font-bold text-white">F</div>`;
                    }}
                  />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-1">
                  Faizan Khimani
                </h3>
                <p className="text-emerald-400 font-medium mb-3 flex items-center gap-1 justify-center md:justify-start">
                  <Code2 className="w-4 h-4" />
                  Software Engineer & Developer
                </p>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Faizan Khimani is a proud member of the Jasdan Memon Jamat community and a
                  software engineer who built this digital directory to help members stay
                  connected. As an engineer, he envisioned a platform where any member
                  could easily access the Jamat's contact directory — making it easier to
                  send invitations, find members by area, and stay informed about the community.
                </p>
                <p className="text-gray-400 text-sm italic mb-5">
                  "Technology in the service of community — that's the vision behind this
                  project. I hope this platform grows and serves not just our Jamat, but
                  many communities across India."
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <a
                    href="mailto:faizankhimani@gmail.com"
                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    faizankhimani@gmail.com
                  </a>
                  <a
                    href="tel:+919876543210"
                    className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Contact Developer
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
