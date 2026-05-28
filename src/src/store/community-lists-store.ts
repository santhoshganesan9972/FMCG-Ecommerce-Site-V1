"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CommunityList {
  id: string;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  items: { id: number; name: string; image: string; price: number }[];
  followers: number;
  category: string;
  createdAt: string;
}

interface CommunityListsStore {
  featured: CommunityList[];
  followed: string[];
  toggleFollow: (listId: string) => void;
  isFollowed: (listId: string) => boolean;
}

const initialFeatured: CommunityList[] = [
  {
    id: "CL-001",
    title: "Top 10 Budget Snacks Under ₹50",
    description: "Curated list of the best affordable snacks that don't compromise on taste.",
    author: "SnackLover_Priya",
    authorAvatar: "P",
    items: [
      { id: 15, name: "Lays Chips", image: "/placeholder.svg?text=Chips", price: 30 },
      { id: 18, name: "Kurkure", image: "/placeholder.svg?text=Kurkure", price: 20 },
      { id: 25, name: "Haldiram's Namkeen", image: "/placeholder.svg?text=Namkeen", price: 45 },
    ],
    followers: 1243,
    category: "Snacks",
    createdAt: "2026-05-10",
  },
  {
    id: "CL-002",
    title: "Daily Essentials — Must-Haves",
    description: "Everything you need for your everyday cooking and household needs.",
    author: "ChefAmit_Official",
    authorAvatar: "A",
    items: [
      { id: 1, name: "Tata Salt", image: "/placeholder.svg?text=Salt", price: 18 },
      { id: 3, name: "Fortune Sunflower Oil", image: "/placeholder.svg?text=Oil", price: 195 },
      { id: 5, name: "Amul Butter", image: "/placeholder.svg?text=Butter", price: 55 },
    ],
    followers: 2891,
    category: "Groceries",
    createdAt: "2026-05-08",
  },
  {
    id: "CL-003",
    title: "Healthy Breakfast Ideas",
    description: "Start your day right with these nutritious breakfast picks.",
    author: "WellnessNeha",
    authorAvatar: "N",
    items: [
      { id: 8, name: "Britannia Milk Bread", image: "/placeholder.svg?text=Bread", price: 35 },
      { id: 12, name: "Kellogg's Corn Flakes", image: "/placeholder.svg?text=CornFlakes", price: 120 },
      { id: 20, name: "Nestlé Milk", image: "/placeholder.svg?text=Milk", price: 28 },
    ],
    followers: 1567,
    category: "Breakfast",
    createdAt: "2026-05-05",
  },
  {
    id: "CL-004",
    title: "Party Platter Special",
    description: "Everything you need to host an epic party with friends.",
    author: "PartyRavi",
    authorAvatar: "R",
    items: [
      { id: 20, name: "Coca-Cola", image: "/placeholder.svg?text=Cola", price: 40 },
      { id: 15, name: "Lays Chips", image: "/placeholder.svg?text=Chips", price: 30 },
      { id: 25, name: "Pepsi", image: "/placeholder.svg?text=Pepsi", price: 40 },
    ],
    followers: 892,
    category: "Party",
    createdAt: "2026-05-12",
  },
  {
    id: "CL-005",
    title: "Student Budget Meals",
    description: "Affordable meal options perfect for hostel life and college students.",
    author: "CollegeEats_Rahul",
    authorAvatar: "R",
    items: [
      { id: 1, name: "Tata Salt", image: "/placeholder.svg?text=Salt", price: 18 },
      { id: 8, name: "Britannia Milk Bread", image: "/placeholder.svg?text=Bread", price: 35 },
      { id: 5, name: "Amul Butter", image: "/placeholder.svg?text=Butter", price: 55 },
    ],
    followers: 2104,
    category: "Budget",
    createdAt: "2026-05-03",
  },
  {
    id: "CL-006",
    title: "Tea Time Favorites",
    description: "Perfect accompaniments for your evening chai.",
    author: "ChaiLover_Sneha",
    authorAvatar: "S",
    items: [
      { id: 18, name: "Kurkure", image: "/placeholder.svg?text=Kurkure", price: 20 },
      { id: 25, name: "Haldiram's Namkeen", image: "/placeholder.svg?text=Namkeen", price: 45 },
      { id: 15, name: "Lays Chips", image: "/placeholder.svg?text=Chips", price: 30 },
    ],
    followers: 1789,
    category: "Snacks",
    createdAt: "2026-05-01",
  },
];

export const useCommunityListsStore = create<CommunityListsStore>()(
  persist(
    (set, get) => ({
      featured: initialFeatured,
      followed: [],

      toggleFollow: (listId) => {
        const { followed, featured } = get();
        const isCurrentlyFollowed = followed.includes(listId);

        const newFollowed = isCurrentlyFollowed
          ? followed.filter((id) => id !== listId)
          : [...followed, listId];

        const updatedFeatured = featured.map((list) =>
          list.id === listId
            ? {
                ...list,
                followers: isCurrentlyFollowed ? list.followers - 1 : list.followers + 1,
              }
            : list
        );

        set({ followed: newFollowed, featured: updatedFeatured });
      },

      isFollowed: (listId) => get().followed.includes(listId),
    }),
    { name: "fmcg-community-lists" }
  )
);
