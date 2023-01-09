import { DataGrid } from "@mui/x-data-grid";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Meal } from "~/models/meal.server";
import { getMeals } from "~/models/meal.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import Header from "../shared/components/Header";

type LoaderData = {
  mealItems: Meal[];
};

export async function loader ({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const mealItems = await getMeals({ userId });
  return json({ mealItems });
};

export default function Index() {
  const data = useLoaderData<typeof loader>() as LoaderData;
  
  let rows = data.mealItems.map((meal) => {
    return {
        id: meal.id,
        date: meal.date,
        lunch: meal.lunch,
        dinner: meal.dinner,
    }
})
  let columns = [
    {field: 'date', headerName: 'Date', flex: 1},
    {field: 'lunch', headerName: 'Lunch', flex: 1},
    {field: 'dinner', headerName: 'Dinner', flex: 1},
  ];


 return (
    <div>
        <Header />
        <section id="DataGrid" style={{ height: 350, width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
            <DataGrid rows={rows} columns={columns} />
        </section>

    </div>
  )
}
