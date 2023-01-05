import type { User } from "./user.server";
import { supabase } from "./user.server";

export type Ingredient = {
  id: string;
  title: string;
  category: string;
  profile_id: string;
};

export async function getIngredientItems({ userId }: { userId: User["id"] }) {
  const { data } = await supabase
    .from("ingredients")
    .select("id, title, category")
    .eq("profile_id", userId);

  return data;
}

export async function createIngredient({
  title,
  category,
  userId,
}: Pick<Ingredient, "title"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("ingredients")
    .insert([{ title, category, profile_id: userId }])
    .single();

  if (!error) {
    return data;
  }

  return null;
}

export async function deleteIngredient({
  id,
  userId,
}: Pick<Ingredient, "id"> & { userId: User["id"] }) {
  const { error } = await supabase
    .from("ingredients")
    .delete({ returning: "minimal" })
    .match({ id, profile_id: userId });

  if (!error) {
    return {};
  }

  return null;
}

export async function getIngredient({
  id,
  userId,
}: Pick<Ingredient, "id"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("ingredients")
    .select("*")
    .eq("profile_id", userId)
    .eq("id", id)
    .single();

  if (!error) {
    return {
      userId: data.profile_id,
      id: data.id,
      title: data.title,
      category: data.category,
    };
  }

  return null;
}
