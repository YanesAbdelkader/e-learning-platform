import { useState, useEffect } from "react";
import { handleAPIcall } from "@/functions/custom";

export function useCartAndFavorites() {
  const [cart, setCart] = useState<string[]>([]);
  
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error parsing cart:", error);
      }
    }
  }, []);

  const addToCart = (courseId: string) => {
    if (!cart.includes(courseId)) {
      const updatedCart = [...cart, courseId];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = (courseId: string) => {
    const updatedCart = cart.filter((id) => id !== courseId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  

  // Favorites (API) - Stores only course IDs
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const { data: response } = await handleAPIcall(
          "",
          "",
          "get-user-fav",
          "GET"
        );
        setFavorites(
          response?.data.map((course: { id: string }) => course.id) || []
        );
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoadingFavorites(false);
      }
    }
    fetchFavorites();
  }, []);



  const addToFavorites = async (courseId: string) => {
    if (!favorites.includes(courseId)) {
      try {
        const {} = await handleAPIcall(courseId, "", "add-user-fav", "POST");
        setFavorites((prev) => [...prev, courseId]);
      } catch (error) {
        console.error("Error adding to favorites:", error);
      }
    }
  };

  const removeFromFavorites = async (courseId: string) => {
    try {
      const {} = await handleAPIcall(courseId, "", "delete-user-fav", "DELETE");
      setFavorites((prev) => prev.filter((id) => id !== courseId));
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    favorites,
    loadingFavorites,
    addToFavorites,
    removeFromFavorites,
  };
}
