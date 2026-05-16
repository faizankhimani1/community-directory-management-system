import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  MapPin,
  Phone,
  Users,
  Briefcase,
  X,
  ChevronDown,
  MessageCircle,
  Home,
} from "lucide-react";
import { useMembers } from "../context/MembersContext";
import { AREAS } from "../data/members";

const getRoleBadge = (role: string) => {
  if (!role) return null;
  const colors: Record<string, string> = {
    Pramukh: "bg-emerald-700 text-white",
    "Up-Pramukh": "bg-emerald-600 text-white",
    Secretary: "bg-blue-600 text-white",
    Treasurer: "bg-purple-600 text-white",
    "Joint Secretary": "bg-indigo-600 text-white",
    "Member - Committee": "bg-amber-500 text-white",
  };
  return (
    <span
      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
        colors[role] || "bg-gray-200 text-gray-700"
      }`}
    >
      {role}
    </span>
  );
};

const Members: React.FC = () => {
  const { members } = useMembers();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedArea, setSelectedArea] = useState(
    searchParams.get("area") || ""
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const area = searchParams.get("area");
    if (area) setSelectedArea(area);
  }, [searchParams]);

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const matchSearch =
        search === "" ||
        m.headName.toLowerCase().includes(search.toLowerCase()) ||
        m.mobile.includes(search) ||
        m.occupation.toLowerCase().includes(search.toLowerCase()) ||
        m.uniqueId.toLowerCase().includes(search.toLowerCase());
      const matchArea = selectedArea === "" || m.area === selectedArea;
      return matchSearch && matchArea;
    });
  }, [members, search, selectedArea]);

  const areaGroups = useMemo(() => {
    if (selectedArea) {
      return { [selectedArea]: filtered };
    }
    const groups: Record<string, typeof filtered> = {};
    filtered.forEach((m) => {
      if (!groups[m.area]) groups[m.area] = [];
      groups[m.area].push(m);
    });
    return groups;
  }, [filtered, selectedArea]);

  const clearFilters = () => {
    setSearch("");
    setSelectedArea("");
    setSearchParams({});
  };

  const handleAreaChange = (area: string) => {
    setSelectedArea(area);
    if (area) {
      setSearchParams({ area });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 py-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-white text-3xl sm:text-4xl font-bold mb-2">
            Member Directory
          </h1>
          <p className="text-emerald-200 text-sm sm:text-base">
            {members.length} families • {AREAS.length} areas •{" "}
            {members.reduce((s, m) => s + m.totalFamilyMembers, 0)} total members
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="sticky top-16 z-30 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, mobile, occupation..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={selectedArea}
                onChange={(e) => handleAreaChange(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white text-gray-700 min-w-[140px]"
              >
                <option value="">All Areas</option>
                {AREAS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {(search || selectedArea) && (
              <button
                onClick={clearFilters}
                className="px-3 py-2.5 border border-red-200 text-red-500 rounded-xl text-sm flex items-center gap-1 hover:bg-red-50 transition-colors"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
            <div className="flex border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2.5 text-xs font-medium transition-colors ${
                  viewMode === "grid"
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2.5 text-xs font-medium transition-colors ${
                  viewMode === "list"
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>
        {filtered.length !== members.length && (
          <div className="max-w-7xl mx-auto px-4 pb-2">
            <p className="text-xs text-gray-500">
              Showing {filtered.length} of {members.length} members
            </p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No members found
            </h3>
            <p className="text-gray-400 text-sm">
              Try adjusting your search or filter
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-emerald-600 text-sm font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : selectedArea ? (
          // Single area view
          <div>
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-gray-800">{selectedArea}</h2>
              <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                {filtered.length} families
              </span>
            </div>
            <MemberGrid members={filtered} viewMode={viewMode} />
          </div>
        ) : (
          // Area-grouped view
          Object.entries(areaGroups).map(([area, areaMembers]) => (
            <div key={area} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-lg font-bold text-gray-800">{area}</h2>
                </div>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                  {areaMembers.length} {areaMembers.length === 1 ? "family" : "families"}
                </span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <MemberGrid members={areaMembers} viewMode={viewMode} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

interface MemberGridProps {
  members: ReturnType<typeof useMembers>["members"];
  viewMode: "grid" | "list";
}

const MemberGrid: React.FC<MemberGridProps> = ({ members, viewMode }) => {
  if (viewMode === "list") {
    return (
      <div className="space-y-2">
        {members.map((m) => (
          <div
            key={m.uniqueId}
            className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                {m.headName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-gray-800 text-sm">{m.headName}</p>
                  {getRoleBadge(m.committeeRole)}
                </div>
                <p className="text-xs text-gray-500">{m.uniqueId}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-gray-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-500" />
                {m.area}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-blue-500" />
                {m.occupation}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3 text-purple-500" />
                {m.totalFamilyMembers} members
              </span>
            </div>
            <div className="flex gap-2">
              <a
                href={`tel:${m.mobile}`}
                className="flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              >
                <Phone className="w-3 h-3" />
                {m.mobile}
              </a>
              {m.whatsapp && (
                <a
                  href={`https://wa.me/91${m.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                >
                  <MessageCircle className="w-3 h-3" />
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {members.map((m) => (
        <div
          key={m.uniqueId}
          className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg transition-all hover:-translate-y-0.5 group"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0 group-hover:from-emerald-600 group-hover:to-emerald-800 transition-all">
              {m.headName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-800 text-sm leading-tight mb-1 truncate">
                {m.headName}
              </p>
              <p className="text-xs text-gray-400 mb-1">{m.uniqueId}</p>
              {getRoleBadge(m.committeeRole)}
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="truncate">{m.address}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Briefcase className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>{m.occupation}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Home className="w-3.5 h-3.5 text-purple-500 shrink-0" />
              <span>{m.totalFamilyMembers} family members</span>
            </div>
          </div>

          <div className="border-t border-gray-50 pt-3 flex gap-2">
            <a
              href={`tel:${m.mobile}`}
              className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-2 rounded-lg text-xs font-medium transition-colors"
            >
              <Phone className="w-3 h-3" />
              Call
            </a>
            {m.whatsapp && (
              <a
                href={`https://wa.me/91${m.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-700 py-2 rounded-lg text-xs font-medium transition-colors"
              >
                <MessageCircle className="w-3 h-3" />
                WhatsApp
              </a>
            )}
          </div>
          {m.notes && (
            <p className="mt-2 text-xs text-gray-400 italic truncate">{m.notes}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Members;
