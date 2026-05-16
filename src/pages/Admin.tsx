import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Plus,
  Pencil,
  Trash2,
  Search,
  Image,
  Shield,
  LogOut,
  X,
  Save,
  AlertTriangle,
  MapPin,
  ChevronDown,
  BarChart3,
  Home,
} from "lucide-react";
import { useMembers } from "../context/MembersContext";
import { useAuth } from "../context/AuthContext";
import { Member, AREAS, COMMITTEE_ROLES } from "../data/members";

// ── Modal ──────────────────────────────────────────────────────────────────
const emptyMember = (): Member => ({
  uniqueId: "",
  headName: "",
  mobile: "",
  whatsapp: "",
  address: "",
  area: "",
  occupation: "",
  totalFamilyMembers: 1,
  committeeRole: "",
  notes: "",
});

interface MemberFormProps {
  initial: Member;
  onSave: (m: Member) => void;
  onCancel: () => void;
  isEdit: boolean;
  existingIds: string[];
}

const MemberForm: React.FC<MemberFormProps> = ({
  initial,
  onSave,
  onCancel,
  isEdit,
  existingIds,
}) => {
  const [form, setForm] = useState<Member>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.uniqueId.trim()) e.uniqueId = "ID is required";
    if (!isEdit && existingIds.includes(form.uniqueId.trim()))
      e.uniqueId = "ID already exists";
    if (!form.headName.trim()) e.headName = "Name is required";
    if (!form.mobile.trim()) e.mobile = "Mobile is required";
    if (!/^[0-9]{10}$/.test(form.mobile.trim()))
      e.mobile = "Enter valid 10-digit mobile";
    if (!form.area) e.area = "Area is required";
    if (!form.occupation.trim()) e.occupation = "Occupation is required";
    if (!form.address.trim()) e.address = "Address is required";
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({
      ...p,
      [name]: name === "totalFamilyMembers" ? parseInt(value) || 1 : value,
    }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSave({ ...form, uniqueId: form.uniqueId.trim().toUpperCase() });
  };

  const field = (
    label: string,
    name: keyof Member,
    placeholder: string,
    type = "text",
    required = false
  ) => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={form[name] as string}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
          errors[name] ? "border-red-400 bg-red-50" : "border-gray-200"
        }`}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Unique ID <span className="text-red-500">*</span>
          </label>
          <input
            name="uniqueId"
            value={form.uniqueId}
            onChange={handleChange}
            placeholder="e.g. MEM-016"
            disabled={isEdit}
            className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
              isEdit ? "bg-gray-100 cursor-not-allowed" : ""
            } ${errors.uniqueId ? "border-red-400 bg-red-50" : "border-gray-200"}`}
          />
          {errors.uniqueId && (
            <p className="text-red-500 text-xs mt-1">{errors.uniqueId}</p>
          )}
        </div>
        {field("Head Name", "headName", "Full name of head of family", "text", true)}
        {field("Mobile", "mobile", "10-digit mobile number", "text", true)}
        {field("WhatsApp", "whatsapp", "WhatsApp number (if different)")}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Area <span className="text-red-500">*</span>
          </label>
          <select
            name="area"
            value={form.area}
            onChange={handleChange}
            className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white ${
              errors.area ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          >
            <option value="">Select Area</option>
            {AREAS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          {errors.area && (
            <p className="text-red-500 text-xs mt-1">{errors.area}</p>
          )}
        </div>
        {field("Occupation", "occupation", "e.g. Trader, Doctor, Engineer", "text", true)}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Total Family Members
          </label>
          <input
            type="number"
            name="totalFamilyMembers"
            min={1}
            value={form.totalFamilyMembers}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Committee Role
          </label>
          <select
            name="committeeRole"
            value={form.committeeRole}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
          >
            {COMMITTEE_ROLES.map((r) => (
              <option key={r} value={r}>
                {r || "-- Regular Member --"}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
          Full Address <span className="text-red-500">*</span>
        </label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          rows={2}
          placeholder="House/Plot No., Street, Area"
          className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none ${
            errors.address ? "border-red-400 bg-red-50" : "border-gray-200"
          }`}
        />
        {errors.address && (
          <p className="text-red-500 text-xs mt-1">{errors.address}</p>
        )}
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
          Notes (Optional)
        </label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={2}
          placeholder="Any additional notes..."
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
        />
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
        >
          <Save className="w-4 h-4" />
          {isEdit ? "Update Member" : "Add Member"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

// ── Banner Manager ─────────────────────────────────────────────────────────
const BannerManager: React.FC = () => {
  const { bannerImages, updateBannerImages } = useMembers();
  const [banners, setBanners] = useState(bannerImages);
  const [saved, setSaved] = useState(false);

  const handleChange = (id: string, field: "url" | "label", value: string) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    );
  };

  const handleSave = () => {
    updateBannerImages(banners);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-500 text-sm">
        Customize the homepage banner images. You can use URLs of event photos
        or uploaded images.
      </p>
      {banners.map((b, i) => (
        <div key={b.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-600 mb-3">
            Banner {i + 1}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Image URL</label>
              <input
                value={b.url}
                onChange={(e) => handleChange(b.id, "url", e.target.value)}
                placeholder="https://... or /images/banner.jpg"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Caption</label>
              <input
                value={b.label}
                onChange={(e) => handleChange(b.id, "label", e.target.value)}
                placeholder="Event name or description"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>
          {b.url && (
            <img
              src={b.url}
              alt={b.label}
              className="mt-3 h-24 w-full object-cover rounded-lg opacity-70"
              onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
            />
          )}
        </div>
      ))}
      <button
        onClick={handleSave}
        className={`px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all ${
          saved
            ? "bg-green-600 text-white"
            : "bg-emerald-600 hover:bg-emerald-700 text-white"
        }`}
      >
        <Save className="w-4 h-4" />
        {saved ? "Saved!" : "Save Banner Changes"}
      </button>
    </div>
  );
};

// ── Main Admin Component ───────────────────────────────────────────────────
const Admin: React.FC = () => {
  const { members, addMember, updateMember, deleteMember } = useMembers();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"members" | "banners" | "stats">(
    "members"
  );
  const [search, setSearch] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = members.filter((m) => {
    const matchSearch =
      search === "" ||
      m.headName.toLowerCase().includes(search.toLowerCase()) ||
      m.uniqueId.toLowerCase().includes(search.toLowerCase()) ||
      m.mobile.includes(search);
    const matchArea = areaFilter === "" || m.area === areaFilter;
    return matchSearch && matchArea;
  });

  const handleSave = (member: Member) => {
    if (editingMember) {
      updateMember(editingMember.uniqueId, member);
    } else {
      addMember(member);
    }
    setShowForm(false);
    setEditingMember(null);
  };

  const handleDelete = (id: string) => {
    deleteMember(id);
    setDeleteConfirm(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const tabs = [
    { id: "members", label: "Members", icon: Users },
    { id: "banners", label: "Banners", icon: Image },
    { id: "stats", label: "Stats", icon: BarChart3 },
  ] as const;

  const areaStats = AREAS.map((area) => ({
    area,
    count: members.filter((m) => m.area === area).length,
    familyMembers: members
      .filter((m) => m.area === area)
      .reduce((s, m) => s + m.totalFamilyMembers, 0),
  }));

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-700 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">Admin Panel</h1>
              <p className="text-gray-400 text-xs">
                Jasdan Memon Jamat – Management Console
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-xl text-sm font-medium transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-3 flex gap-6 overflow-x-auto text-sm">
          <span className="text-gray-500 shrink-0">
            Total:{" "}
            <span className="font-bold text-gray-800">{members.length}</span>{" "}
            families
          </span>
          <span className="text-gray-500 shrink-0">
            Members:{" "}
            <span className="font-bold text-gray-800">
              {members.reduce((s, m) => s + m.totalFamilyMembers, 0)}
            </span>
          </span>
          <span className="text-gray-500 shrink-0">
            Committee:{" "}
            <span className="font-bold text-gray-800">
              {members.filter((m) => m.committeeRole).length}
            </span>
          </span>
          <span className="text-gray-500 shrink-0">
            Areas:{" "}
            <span className="font-bold text-gray-800">
              {new Set(members.map((m) => m.area)).size}
            </span>
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-200 rounded-xl p-1 mb-6 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Members Tab */}
        {activeTab === "members" && (
          <div>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search members..."
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
              <div className="relative">
                <select
                  value={areaFilter}
                  onChange={(e) => setAreaFilter(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white min-w-[140px]"
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
              <button
                onClick={() => {
                  setEditingMember(null);
                  setShowForm(true);
                }}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap shadow-md"
              >
                <Plus className="w-4 h-4" />
                Add Member
              </button>
            </div>

            {/* Add/Edit Form */}
            {showForm && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-gray-800">
                    {editingMember ? "Edit Member" : "Add New Member"}
                  </h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingMember(null);
                    }}
                    className="p-1.5 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <MemberForm
                  initial={editingMember || emptyMember()}
                  onSave={handleSave}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingMember(null);
                  }}
                  isEdit={!!editingMember}
                  existingIds={members.map((m) => m.uniqueId)}
                />
              </div>
            )}

            {/* Delete Confirm */}
            {deleteConfirm && (
              <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Delete Member</h3>
                      <p className="text-gray-500 text-sm">
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-5">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">
                      {members.find((m) => m.uniqueId === deleteConfirm)?.headName}
                    </span>
                    ?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDelete(deleteConfirm)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Members Table */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-700">
                  {filtered.length} member{filtered.length !== 1 ? "s" : ""} found
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        ID
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Name
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap hidden sm:table-cell">
                        Mobile
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
                        Area
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap hidden lg:table-cell">
                        Occupation
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap hidden lg:table-cell">
                        Role
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
                        Family
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map((m) => (
                      <tr key={m.uniqueId} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-xs text-gray-400 font-mono">
                          {m.uniqueId}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">
                              {m.headName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800 text-sm">
                                {m.headName}
                              </p>
                              <p className="text-xs text-gray-400 sm:hidden">
                                {m.mobile}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">
                          {m.mobile}
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="flex items-center gap-1 text-gray-600 text-xs">
                            <MapPin className="w-3 h-3 text-emerald-500" />
                            {m.area}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 text-xs hidden lg:table-cell">
                          {m.occupation}
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          {m.committeeRole ? (
                            <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-medium">
                              {m.committeeRole}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-600 text-xs hidden md:table-cell">
                          {m.totalFamilyMembers}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                setEditingMember(m);
                                setShowForm(true);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(m.uniqueId)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={8} className="text-center py-12 text-gray-400">
                          <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>No members found</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Banners Tab */}
        {activeTab === "banners" && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Image className="w-5 h-5 text-emerald-600" />
              <h2 className="font-bold text-gray-800">Banner Management</h2>
            </div>
            <BannerManager />
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === "stats" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                Area-wise Statistics
              </h2>
              <div className="space-y-3">
                {areaStats
                  .filter((a) => a.count > 0)
                  .sort((a, b) => b.count - a.count)
                  .map((stat) => (
                    <div key={stat.area}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-sm font-medium text-gray-700">
                            {stat.area}
                          </span>
                        </div>
                        <div className="flex gap-4 text-xs text-gray-500">
                          <span>
                            <span className="font-bold text-gray-700">
                              {stat.count}
                            </span>{" "}
                            families
                          </span>
                          <span>
                            <span className="font-bold text-gray-700">
                              {stat.familyMembers}
                            </span>{" "}
                            members
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-full transition-all"
                          style={{
                            width: `${Math.max(
                              (stat.count / Math.max(...areaStats.map((a) => a.count))) * 100,
                              2
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Total Families",
                  value: members.length,
                  color: "bg-emerald-50 text-emerald-700",
                },
                {
                  label: "Total Members",
                  value: members.reduce((s, m) => s + m.totalFamilyMembers, 0),
                  color: "bg-blue-50 text-blue-700",
                },
                {
                  label: "Committee",
                  value: members.filter((m) => m.committeeRole).length,
                  color: "bg-amber-50 text-amber-700",
                },
                {
                  label: "Areas",
                  value: new Set(members.map((m) => m.area)).size,
                  color: "bg-purple-50 text-purple-700",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className={`${s.color} rounded-2xl p-5 border border-current/10`}
                >
                  <p className="text-3xl font-bold">{s.value}</p>
                  <p className="text-sm mt-1 opacity-70">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
