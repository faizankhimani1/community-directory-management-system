import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  MapPin,
  Phone,
  Star,
  BookOpen,
  Heart,
  Shield,
  Award,
  ArrowRight,
  Home as HomeIcon,
} from "lucide-react";
import HeroSlider from "../components/HeroSlider";
import { useMembers } from "../context/MembersContext";
import { AREAS } from "../data/members";

const StatCard: React.FC<{
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}> = ({ icon, value, label, color }) => (
  <div
    className={`bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex items-center gap-4 hover:shadow-lg transition-shadow`}
  >
    <div
      className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center shrink-0`}
    >
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  </div>
);

const CommitteeCard: React.FC<{
  role: string;
  name: string;
  icon?: React.ReactNode;
  isMain?: boolean;
}> = ({ role, name, icon, isMain }) => (
  <div
    className={`rounded-2xl p-5 flex items-center gap-4 border transition-all hover:shadow-md ${
      isMain
        ? "bg-gradient-to-br from-emerald-600 to-emerald-800 text-white border-emerald-500"
        : "bg-white border-gray-100 shadow-sm"
    }`}
  >
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
        isMain ? "bg-white/20" : "bg-emerald-50"
      }`}
    >
      {icon || <Star className={`w-5 h-5 ${isMain ? "text-yellow-300 fill-yellow-300" : "text-emerald-600"}`} />}
    </div>
    <div>
      <p className={`font-semibold text-sm ${isMain ? "text-white" : "text-gray-800"}`}>
        {name}
      </p>
      <p className={`text-xs mt-0.5 ${isMain ? "text-emerald-200" : "text-emerald-600 font-medium"}`}>
        {role}
      </p>
    </div>
  </div>
);

const Home: React.FC = () => {
  const { members } = useMembers();

  const totalFamilies = members.length;
  const totalMembers = members.reduce((s, m) => s + m.totalFamilyMembers, 0);
  const totalAreas = new Set(members.map((m) => m.area)).size;


  const pramukh = members.find((m) => m.committeeRole === "Pramukh");
  const upPramukh = members.find((m) => m.committeeRole === "Up-Pramukh");
  const secretary = members.find((m) => m.committeeRole === "Secretary");
  const treasurer = members.find((m) => m.committeeRole === "Treasurer");
  const jointSecretary = members.find(
    (m) => m.committeeRole === "Joint Secretary"
  );
  const committeeGen = members.filter(
    (m) => m.committeeRole === "Member - Committee"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Stats */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<HomeIcon className="w-7 h-7 text-emerald-700" />}
            value={totalFamilies + "+"}
            label="Member Families"
            color="bg-emerald-50"
          />
          <StatCard
            icon={<Users className="w-7 h-7 text-blue-700" />}
            value={totalMembers + "+"}
            label="Total Members"
            color="bg-blue-50"
          />
          <StatCard
            icon={<MapPin className="w-7 h-7 text-purple-700" />}
            value={totalAreas.toString()}
            label="Areas Covered"
            color="bg-purple-50"
          />
          <StatCard
            icon={<Shield className="w-7 h-7 text-amber-700" />}
            value="11"
            label="Committee Members"
            color="bg-amber-50"
          />
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <p className="text-yellow-400 text-2xl mb-2">🕌</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Welcome to Jasdan Memon Jamat
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-6">
              The Jasdan Memon Jamat has been a pillar of strength and unity for the Memon
              Muslim community in Jasdan, Gujarat. Our jamat brings together families
              from across the city — fostering brotherhood, providing social support,
              and preserving our rich cultural heritage. This digital directory helps
              every member stay connected, informed, and united.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/members"
                className="bg-yellow-400 hover:bg-yellow-300 text-emerald-900 font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                View Member Directory
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <Heart className="w-4 h-4" />
                About Our Jamat
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Committee Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Our Leadership
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-3 mb-2">
            Jamat Committee 2024–25
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            A dedicated team of 11 members managing and guiding the Jasdan Memon Jamat
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pramukh && (
            <CommitteeCard
              role="Pramukh (President)"
              name={pramukh.headName}
              isMain
              icon={<Award className="w-6 h-6 text-yellow-300 fill-yellow-300" />}
            />
          )}
          {upPramukh && (
            <CommitteeCard
              role="Up-Pramukh (Vice President)"
              name={upPramukh.headName}
              isMain
              icon={<Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />}
            />
          )}
          {secretary && (
            <CommitteeCard
              role="Secretary (Mantri)"
              name={secretary.headName}
            />
          )}
          {treasurer && (
            <CommitteeCard role="Treasurer (Khajanchi)" name={treasurer.headName} />
          )}
          {jointSecretary && (
            <CommitteeCard
              role="Joint Secretary"
              name={jointSecretary.headName}
            />
          )}
          {committeeGen.map((m) => (
            <CommitteeCard
              key={m.uniqueId}
              role="Committee Member"
              name={m.headName}
            />
          ))}
        </div>
      </section>

      {/* Areas Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-3 mb-2">
            Areas We Cover
          </h2>
          <p className="text-gray-500 text-sm">
            Our members spread across the beautiful city of Jasdan
          </p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {AREAS.map((area) => {
            const count = members.filter((m) => m.area === area).length;
            return (
              <Link
                key={area}
                to={`/members?area=${encodeURIComponent(area)}`}
                className="bg-white border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all rounded-xl px-4 py-3 flex items-center gap-2 group"
              >
                <MapPin className="w-4 h-4 text-emerald-500 group-hover:text-emerald-700" />
                <div>
                  <p className="text-sm font-medium text-gray-700 group-hover:text-emerald-700">
                    {area}
                  </p>
                  {count > 0 && (
                    <p className="text-xs text-gray-400">{count} families</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
        <div className="bg-white border border-gray-100 rounded-3xl shadow-md p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <Phone className="w-7 h-7 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Need to get in touch?
              </h3>
              <p className="text-gray-500 text-sm">
                Contact our Jamat office or visit us at Jasdan
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-md whitespace-nowrap"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
