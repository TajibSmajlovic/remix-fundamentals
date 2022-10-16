import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";

const data = {
  posts: [
    {
      slug: "my-first-post",
      title: "My First Post",
    },
    {
      slug: "90s-mixtape",
      title: "A Mixtape I Made Just For You",
    },
  ],
};

export const loader = () => {
  return json({ posts: data.posts });
};

export default function Posts() {
  const { posts } = useLoaderData() ?? [];

  return (
    <main>
      <h1>Posts</h1>
      <ul>
        <ul>
          {posts?.map((post: any) => (
            <li key={post.slug}>
              <Link to={post.slug} className="text-blue-600 underline">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </ul>
    </main>
  );
}
