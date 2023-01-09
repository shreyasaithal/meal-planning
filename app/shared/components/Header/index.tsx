import { Link } from "@remix-run/react";
import { useUser } from "~/utils";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

export default function Header() {
    const user = useUser();
    return (
      <header className="bg-slate-800 text-white py-8">
        <div class="grid grid-cols-12 gap-6 align-middle">
          <div class="col-span-4 px-4">
            <Link to="/meals">Meal Plan</Link>
          </div>
          <div class="col-span-4 px-4">
            <Link to="/ingredients">Ingredients</Link>
          </div>
          <div class="justify-items-end col-span-4 px-6">
            <Form action="/logout" method="post">
            <button
              type="submit"
              className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
            >
              Logout
            </button>
            </Form>
          </div>
          </div>
      </header>
    );
  }