import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { Ingredient } from "~/models/ingredient.server";
import { deleteIngredient, getIngredient } from "~/models/ingredient.server";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";

type LoaderData = {
  ingredient: Ingredient;
};

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.ingredient, "ingredientId not found");

  const ingredient = await getIngredient({ userId, id: params.ingredientId });
  if (!ingredient) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ ingredient });
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.ingredientId, "ingredientId not found");

  await deleteIngredient({ userId, id: params.ingredientId });

  return redirect("/ingredients");
};

export default function IngredientDetailsPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.ingredient.title}</h3>
      <p className="py-6">{data.ingredient.category}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}
