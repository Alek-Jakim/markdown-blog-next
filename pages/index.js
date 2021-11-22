import Layout from "../components/Layout"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

export default function HomePage({posts}) {

  console.log(posts)

  return (
    <Layout>
      <h1>Hello World</h1>
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
      posts
    }
  }
}