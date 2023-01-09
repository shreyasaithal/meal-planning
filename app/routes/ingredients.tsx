import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import type { Ingredient } from "~/models/ingredient.server";
import { getIngredientItems } from "~/models/ingredient.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import Header from "../shared/components/Header";


type LoaderData = {
  ingredientItems: Ingredient[];
};

export async function loader ({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const ingredientItems = await getIngredientItems({ userId });
  return json({ ingredientItems });
};

export default function IngredientsPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header />
      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Ingredient
          </Link>

          <hr />

          {data.ingredientItems.length === 0 ? (
            <p className="p-4">No ingredients yet</p>
          ) : (
            <ol>
              {data.ingredientItems.map((ingredient) => (
                <li key={ingredient.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={ingredient.id}
                  >
                    📝 {ingredient.title}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
