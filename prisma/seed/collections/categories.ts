import { PrismaClient } from "@prisma/client";
import logUpdate from "log-update";
import data from "../data";

export default async function seedCategories(prisma: PrismaClient) {
  logUpdate("🌱 Seeding categories...");

  for await (const category of data.categories) {
    const { id, name, type } = category;
    await prisma.category.create({
      data: {
        id,
        name,
        type,
        ...(category.subCategories && {
          Children: {
            create: category.subCategories.map(({ id, name, type }) => ({
              id,
              name,
              type,
            })),
          },
        }),
      },
    });
  }

  logUpdate("✅ Categories seeded");
  logUpdate.done();
}
