import { Link } from "@remix-run/react";

export default function IngredientIndexPage() {
  return (
    <p>
      No ingredient selected. Select an ingredient on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new ingredient!.
      </Link>
    </p>
  );
}
