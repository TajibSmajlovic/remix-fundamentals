// 🐨 implement the action function here.
// 1. accept the request object
// 2. get the formData from the request
// 3. get the title, slug, and markdown from the formData
// 4. call the createPost function from your post.model.ts
// 5. redirect to "/posts/admin".

import { redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createPost } from "~/models/post.server";
import invariant from "tiny-invariant";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title"),
    slug = formData.get("slug"),
    markdown = formData.get("markdown");

  invariant(title, "title is required");
  invariant(slug, "slug is required");
  invariant(markdown, "markdown is required");

  await createPost(title, slug, markdown);

  return redirect("/posts/admin");
}

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export default function NewPost() {
  const errors = useActionData();

  return (
    <Form method="post">
      <p>
        <label>
          Post Title:{" "}
          <input type="text" name="title" className={inputClassName} />
          {errors?.name ? (
            <em className="text-red-600">{errors.title}</em>
          ) : null}
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          <input type="text" name="slug" className={inputClassName} />
          {errors?.name ? (
            <em className="text-red-600">{errors.slug}</em>
          ) : null}
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown: </label>
        <br />
        <textarea
          id="markdown"
          rows={8}
          name="markdown"
          className={`${inputClassName} font-mono`}
        />
        {errors?.name ? (
          <em className="text-red-600">{errors.markdown}</em>
        ) : null}
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          Create Post
        </button>
      </p>
    </Form>
  );
}
