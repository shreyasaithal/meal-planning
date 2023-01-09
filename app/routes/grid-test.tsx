import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';

import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import Header from "../shared/components/Header";

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' }
];

const rows = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' }
];

export default function NotesPage() {
  return (
    <div>
      <Header />
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
}
