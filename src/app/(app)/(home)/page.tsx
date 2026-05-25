import { trpc } from "@/modules/trpc/server";

export default async function HomePage() {
  const res = await trpc.auth.session();
  return <div>{`${JSON.stringify(res.user, null, 2)}`}</div>;
}
