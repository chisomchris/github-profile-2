import { searchGithubUser } from "~/lib/fetchers";
import type { Route } from "../+types/root";
// keep track of the previous query to avoid re-fetching the same data
let prevQuery = "";
let prevResult: any;

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const query = formData.get("q") as string;
  if (query === prevQuery) {
    return prevResult;
  }
  prevQuery = query;
  const result = await searchGithubUser(query);
  prevResult = result;
  return result;
}
