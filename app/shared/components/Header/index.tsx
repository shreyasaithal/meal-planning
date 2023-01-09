import { Link } from "@remix-run/react";
import { useUser } from "~/utils";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

export default function Header() {
    const user = useUser();
    return (
      <header className="flex bg-slate-800 p-4 text-white">
        <div class="grid grid-cols-12 gap-4">
          <div>
            <Link to="/meals">Meal Plan</Link>
          </div>
          <div>
            <Link to="/ingredients">Ingredients</Link>
          </div>
          <div class="grow col-span-4">
            <p>{user.email}</p>
          </div>
          <div class="col-span-4">
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