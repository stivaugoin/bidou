import { Group, Title } from "@mantine/core";
import Head from "next/head";

interface Props {
  children?: React.ReactNode;
  title: string;
}

export default function PageHeader({ children, title, ...props }: Props) {
  return (
    <>
      <Head>
        <title>{`${title} - Bidou`}</title>
      </Head>
      <Group mb="xl" justify="space-between">
        <Title size="h2">{title}</Title>
        {children}
      </Group>
    </>
  );
}
