import useSWR, { Fetcher } from "swr";
import { ApiGetAllCategories } from "../pages/api/categories";

const fetcher: Fetcher<ApiGetAllCategories, string> = (...args) =>
  fetch(...args).then((res) => res.json());

export default function useCategories(): [
  ApiGetAllCategories | undefined,
  boolean,
  Error
] {
  const { data, error } = useSWR("/api/categories", fetcher);
  const loading = !data && !error;

  return [data, loading, error];
}
