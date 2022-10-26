import { Button } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CreateButton() {
  const { pathname } = useRouter();

  return (
    <Link href={`${pathname}/create`} passHref>
      <Button component="a" id="createBtn">
        Create
      </Button>
    </Link>
  );
}
