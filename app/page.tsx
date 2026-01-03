import { prisma } from "@/prisma";

export default async function Home() {
  const data = await prisma.user.findMany();

  return (
    <div>
      <h1>{data[0].name}</h1>
    </div>
  );
}
