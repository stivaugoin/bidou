import { Badge, Box, Grid, Paper, SimpleGrid, Text } from "@mantine/core";
import displayAmount from "../utils/displayAmount";

interface Props {
  difference?: number;
  months: {
    title: string;
    amount: number;
  }[];
  title: string;
}

export default function StatsIncomeLastThreeMonths({
  difference,
  months,
  title,
}: Props) {
  return (
    <Paper withBorder p="md" radius="md">
      <Grid align="center">
        <Grid.Col span="auto">
          <Text size="xl" weight={700}>
            {title}
          </Text>
        </Grid.Col>
        <Grid.Col span="content">
          {Boolean(difference && difference < 0) && (
            <Badge color="red" variant="light">
              {displayAmount(difference || 0)}
            </Badge>
          )}
        </Grid.Col>
      </Grid>

      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "xs", cols: 1 }]} mt="xl">
        {months.map((month) => (
          <Box key={month.title}>
            <Text transform="uppercase" size="xs" color="dimmed" weight={700}>
              {month.title}
            </Text>
            <Text weight={700}>{displayAmount(month.amount)}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Paper>
  );
}
