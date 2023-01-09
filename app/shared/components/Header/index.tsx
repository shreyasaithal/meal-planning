import { Link } from "@remix-run/react";
import { useUser } from "~/utils";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

export default function Header() {
    const user = useUser();
    return (
      <header className="flex items-left bg-slate-800 p-4 text-white">
        <Link to="/meals">Meal Plan</Link>
        <Link to="/ingredients">Ingredients</Link>

        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>
    );
  }