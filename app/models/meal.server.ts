import type { User } from "./user.server";
import { supabase } from "./user.server";

export type Meal = {
  id: integer;
  date: date;
  lunch: string;
  dinner: string;
  profile_id: string;
};

export async function getMeals({ userId }: { userId: User["id"] }) {
  const { data } = await supabase
    .from("meals")
    .select("id, date, lunch, dinner")
    .eq("profile_id", userId);

  return data;
}

export async function updateMeals({id,lunch,dinner})
{
  const { error } = await supabase
  .from('meals')
  .update({ lunch: lunch, dinner:dinner })
  .eq('id', id)
}