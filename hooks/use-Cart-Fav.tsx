"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  addTofavorites,
  fetchfavorites,
  removefromFavorites,
} from "@/functions/custom";
import { toast } from "./use-toast";

type CartAndFavorites = {
  cart: string[];
  favorites: string[];
  loadingFavorites: boolean;
  error: string | null;
  cartCount: number;
  favoritesCount: number;
  addToCart: (courseId: string) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  addToFavorites: (courseId: string) => Promise<void>;
  removeFromFavorites: (courseId: string) => Promise<void>;
  toggleFavorite: (courseId: string) => void;
};

export function useCartAndFavorites(): CartAndFavorites {
  const [cart, setCart] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Memoized counts
  const cartCount = useMemo(() => cart.length, [cart]);
  const favoritesCount = useMemo(() => favorites.length, [favorites]);

  // Initialize cart from localStorage
  useEffect(() => {
    if (isInitialized || typeof window === "undefined") return;

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (err) {
        console.error("Error parsing cart:", err);
        localStorage.removeItem("cart");
      }
    }
    setIsInitialized(true);
  }, [isInitialized]);

  // Sync cart to localStorage
  useEffect(() => {
    if (!isInitialized || typeof window === "undefined") return;
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, isInitialized]);

  const addToCart = useCallback((courseId: string) => {
    setCart((prevCart) => {
      if (prevCart.includes(courseId)) {
        toast({
          title: "Already in cart",
          description: "This course is already in your cart.",
        });
        return prevCart;
      }
      const updatedCart = [...prevCart, courseId];
      toast({
        title: "Added to cart",
        description: "The course has been added to your cart.",
      });
      return updatedCart;
    });
  }, []);

  const removeFromCart = useCallback((courseId: string) => {
    setCart((prevCart) => prevCart.filter((id) => id !== courseId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Favorites logic
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const courseIds = await fetchfavorites();
        setFavorites(courseIds);
      } catch (err) {
        console.error("Failed to load favorites:", err);
        setError("Failed to load favorites");
      } finally {
        setLoadingFavorites(false);
      }
    };
    loadFavorites();
  }, []);

  const addToFavorites = useCallback(async (courseId: string) => {
    try {
      await addTofavorites(courseId);
      setFavorites((prev) => [...prev, courseId]);
    } catch (err) {
      console.error("Failed to add favorite:", err);
      throw err;
    }
  }, []);

  const removeFromFavorites = useCallback(async (courseId: string) => {
    try {
      await removefromFavorites(courseId);
      setFavorites((prev) => prev.filter((id) => id !== courseId));
    } catch (err) {
      console.error("Failed to remove favorite:", err);
      throw err;
    }
  }, []);

  const toggleFavorite = useCallback(
    (courseId: string) => {
      if (favorites.includes(courseId)) {
        removeFromFavorites(courseId);
      } else {
        addToFavorites(courseId);
      }
    },
    [favorites, addToFavorites, removeFromFavorites]
  );

  return {
    cart,
    favorites,
    loadingFavorites,
    error,
    cartCount,
    favoritesCount,
    addToCart,
    removeFromCart,
    clearCart,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
  };
}