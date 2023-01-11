import { DataGrid } from "@mui/x-data-grid";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Meal } from "~/models/meal.server";
import { getMeals } from "~/models/meal.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import Header from "../shared/components/Header";
import Sidebar from "../shared/components/Sidebar";

type LoaderData = {
  mealItems: Meal[];
};

const getWeekday = (dateFormat) => {
  // split date in non-digit chaarcters
  let [y, m, d] = dateFormat.split(/\D/);

  //put them in Date method
  const date = new Date(y, m -1 , d)
  //and return weekday in long format
  const weekday = date.toLocaleString("default", { weekday: "long" })
  
  return weekday
}

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
        day: getWeekday(meal.date),
        lunch: meal.lunch,
        dinner: meal.dinner,
    }
})
  let columns = [
    {field: 'date', headerName: 'Date', flex: 1},
    {field: 'day', headerName: 'Day', flex: 1},
    {field: 'lunch', headerName: 'Lunch', flex: 2, editable: true},
    {field: 'dinner', headerName: 'Dinner', flex: 2, editable: true},
  ];


  //const handleProcessRowUpdateError = React.useCallback((error: Error) => {console.log(error);});
 return (
    <div class="grid grid-cols-6 gap-4">
        <Sidebar />
        <div class="col-span-3">
        <section id="DataGrid" style={{ height: '90%' }}>
            <DataGrid 
            rows={rows} 
            columns={columns} 
            experimentalFeatures={{ newEditingApi: true }}
            processRowUpdate={(props, event) => {
              console.log(props);
            }}
            onProcessRowUpdateError={console.log("error")}
            sx={{ m: 2 }}/>
        </section>
        </div>    

    </div>
  )
}
