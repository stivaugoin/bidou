import { Group, Loader } from "@mantine/core";
import { inferRouterOutputs } from "@trpc/server";
import { createContext } from "react";
import AlertFetchError from "../components/AlertFetchError";
import { trpc } from "../lib/trpc";
import { CategoriesRouter } from "../server/trpc/categories";

type Categories = inferRouterOutputs<CategoriesRouter>["getAll"];

export const CategoriesContext = createContext<Categories | undefined>(
  undefined
);

interface Props {
  children: React.ReactNode;
}

export function CategoriesProvider({ children }: Props) {
  const { data, isLoading, error } = trpc.categories.getAll.useQuery();

  if (error) return <AlertFetchError />;

  if (isLoading)
    return (
      <Group align="center" justify="center" h="100vh">
        <Loader />
      </Group>
    );

  return (
    <CategoriesContext.Provider value={data}>
      {children}
    </CategoriesContext.Provider>
  );
}
