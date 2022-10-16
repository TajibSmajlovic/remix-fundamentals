import { Link } from "@remix-run/react";

import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requiredAdminUser } from "~/session.server";
export async function loader({ request }: LoaderArgs) {
  await requiredAdminUser(request);

  return json({});
}

export default function AdminIndex() {
  return (
    <p>
      <Link to="new" className="text-blue-600 underline">
        Create a New Post
      </Link>
    </p>
  );
}
