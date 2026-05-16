import React, { createContext, useContext, useState, useEffect } from "react";
import { Member, initialMembers } from "../data/members";

interface BannerImage {
  id: string;
  url: string;
  label: string;
}

interface MembersContextType {
  members: Member[];
  addMember: (member: Member) => void;
  updateMember: (id: string, member: Member) => void;
  deleteMember: (id: string) => void;
  bannerImages: BannerImage[];
  updateBannerImages: (images: BannerImage[]) => void;
}

const defaultBanners: BannerImage[] = [
  { id: "b1", url: "/images/banner1.jpg", label: "Annual Jamat Gathering 2024" },
  { id: "b2", url: "/images/banner2.jpg", label: "Community Welfare Program" },
  { id: "b3", url: "/images/banner3.jpg", label: "Eid Celebration – Jasdan Memon Jamat" },
];

const MembersContext = createContext<MembersContextType>({
  members: [],
  addMember: () => {},
  updateMember: () => {},
  deleteMember: () => {},
  bannerImages: defaultBanners,
  updateBannerImages: () => {},
});

export const MembersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [members, setMembers] = useState<Member[]>(() => {
    const stored = localStorage.getItem("jmj_members");
    return stored ? JSON.parse(stored) : initialMembers;
  });

  const [bannerImages, setBannerImages] = useState<BannerImage[]>(() => {
    const stored = localStorage.getItem("jmj_banners");
    return stored ? JSON.parse(stored) : defaultBanners;
  });

  useEffect(() => {
    localStorage.setItem("jmj_members", JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem("jmj_banners", JSON.stringify(bannerImages));
  }, [bannerImages]);

  const addMember = (member: Member) => {
    setMembers((prev) => [...prev, member]);
  };

  const updateMember = (id: string, member: Member) => {
    setMembers((prev) => prev.map((m) => (m.uniqueId === id ? member : m)));
  };

  const deleteMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.uniqueId !== id));
  };

  const updateBannerImages = (images: BannerImage[]) => {
    setBannerImages(images);
  };

  return (
    <MembersContext.Provider
      value={{
        members,
        addMember,
        updateMember,
        deleteMember,
        bannerImages,
        updateBannerImages,
      }}
    >
      {children}
    </MembersContext.Provider>
  );
};

export const useMembers = () => useContext(MembersContext);
