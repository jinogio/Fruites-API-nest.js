const { VUE_APP_FRUITS_API_URL } = process.env;

export interface FruitResponse {
  id: string;
  genus: string;
  name: string;
  family: string;
  order: string;
  nutritions: {
    carbohydrates: string;
    protein: string;
    fat: string;
    calories: string;
    sugar: string;
  };
  favorite: boolean;
}

export const fetchFruits = (
  page: number = 1,
  size: number = 10,
  filter: any
): Promise<FruitResponse[]> =>
  fetch(
    `${VUE_APP_FRUITS_API_URL}/fruits?${new URLSearchParams(
      Object.assign({}, filter, { page, size })
    ).toString()}`
  ).then((res) => res.json());

export const fetchFamilies = (): Promise<string[]> =>
  fetch(`${VUE_APP_FRUITS_API_URL}/fruits/families`).then((res) => res.json());

export const addToFavorite = (id: string): Promise<any> =>
  fetch(`${VUE_APP_FRUITS_API_URL}/fruits/${id}/favorite`, {
    method: "POST",
  }).then((res) => res.json());

export const removeFromFavorite = (id: string): Promise<any> =>
  fetch(`${VUE_APP_FRUITS_API_URL}/fruits/${id}/favorite`, {
    method: "DELETE",
  }).then((res) => res.json());

export const fetchFavorites = (): Promise<FruitResponse[]> =>
  fetch(`${VUE_APP_FRUITS_API_URL}/fruits/favorites`).then((res) => res.json());

export const fetchFavoritesNutritions = (): Promise<FruitResponse[]> =>
  fetch(`${VUE_APP_FRUITS_API_URL}/fruits/favorites/nutritions`).then((res) =>
    res.json()
  );
