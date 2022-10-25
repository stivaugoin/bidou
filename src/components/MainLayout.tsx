import { Container } from "@mantine/core";
import AppHeader from "./AppHeader";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <AppHeader />
      <Container>{children}</Container>
    </>
  );
}
