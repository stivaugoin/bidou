import { Group, Loader, Table } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";
import Link from "next/link";
import useSWR, { Fetcher } from "swr";
import { ApiGetAllProviders } from "../pages/api/providers";

const fetcher: Fetcher<ApiGetAllProviders, string> = (url) =>
  fetch(url).then((res) => res.json());

export default function ProvidersList() {
  const { data, error } = useSWR("/api/providers", fetcher);
  const loading = !data && !error;

  if (error) {
    return (
      <div>
        <p>Failed to load</p>
        <pre>{error.message}</pre>
      </div>
    );
  }

  if (loading) return <Loader />;

  return (
    <Table fontSize="md" highlightOnHover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((provider) => (
          <Link href={`/providers/${provider.id}`} key={provider.id}>
            <tr style={{ cursor: "pointer" }}>
              <td style={{ width: "50%" }}>{provider.name}</td>
              <td style={{ width: "50%" }}>
                <Group position="apart">
                  {provider.Category.name} <IconChevronRight size={16} />
                </Group>
              </td>
            </tr>
          </Link>
        ))}
      </tbody>
    </Table>
  );
}
