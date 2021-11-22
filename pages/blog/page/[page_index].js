import Layout from "../../../components/Layout"
import Post from "../../../components/Post"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import {sortByDate} from "../../../utils"
import { POSTS_PER_PAGE } from "../../../config"

export default function BlogPage({posts}) {

  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </Layout>
  )
}


export async function getStaticPaths() {

    const postFiles = fs.readdirSync(path.join("posts"));

    const numPages = Math.ceil(postFiles.length / POSTS_PER_PAGE);

    let paths = [];

    for(let i = 1; i <= numPages; i++) {
        paths.push({
            params: {page_index: i.toString()}
        })
    }

    return {
        paths,
        fallback: false
    }
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
      posts: posts.sort(sortByDate)
    }
  }
}