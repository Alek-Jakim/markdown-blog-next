import Layout from "@/components/Layout"
import Post from "@/components/Post"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import {sortByDate} from "@/utils/index"

export default function HomePage({posts}) {

  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Latest Posts</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>

      <Link href="/blog">
          <a className="block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full">All Posts</a>
      </Link>
    </Layout>
  )
}

export async function getStaticProps() {
  //NOTE: fs module works only if you use it here with server side, otherwise it will throw an error if you try to use it client side

  const postFiles = fs.readdirSync(path.join("posts"));

  const posts = postFiles.map(filename => {
    //this is to remove the .md extension
    const slug = filename.replace(".md", "")

    const markdownWithMeta = fs.readFileSync(path.join("posts", filename), "utf-8");

    const {data: frontmatter} = matter(markdownWithMeta);

    return {
      slug,
      frontmatter
    }
  });

  return {
    props: {
      posts: posts.sort(sortByDate).slice(0, 6)
    }
  }
}