import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createIngredient } from "~/models/ingredient.server";
import { requireUserId } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const title = formData.get("title");
  const category = formData.get("category");

  if (typeof title !== "string" || title.length === 0) {
    return json({ errors: { title: "Title is required" } }, { status: 400 });
  }

  if (typeof category !== "string" || category.length === 0) {
    return json({ errors: { category: "Body is required" } }, { status: 400 });
  }

  const ingredient = await createIngredient({ title, category, userId });
  return redirect(`/ingredients/${ingredient.id}`);
};

export default function NewIngredientPage() {
  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Title: </span>
          <input
            name="title"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </label>
      </div>
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Category: </span>
          <select 
            name="category" 
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose">
                <option value="vegetable">Vegetable</option>
                <option value="meat-dairy">Meat / Dairy</option>
                <option selected value="pantry">Pantry</option>
                <option value="other">Other</option>
            </select>
        </label>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
