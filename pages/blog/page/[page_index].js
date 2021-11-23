import Layout from "@/components/Layout"
import Post from "@/components/Post"
import fs from "fs"
import path from "path"
import { POSTS_PER_PAGE } from "@/config/index"
import Pagination from "../../../components/Pagination"
import { getPosts } from "@/lib/posts"
import CategoryList from "@/components/CategoryList"


export default function BlogPage({posts, numPages, currentPage, categories}) {

  return (
    <Layout>

      <div className="flex justify-between">

        <div className="w-3/4 mr-10">
        <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </div>
      <Pagination currentPage={currentPage} numPages={numPages} />
        </div>
        <div className="w-1/4">
              <CategoryList categories={categories} />
        </div>
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


export async function getStaticProps({params}) {
  //NOTE: fs module works only if you use it here with server side, otherwise it will throw an error if you try to use it client side

  const page = parseInt((params && params.page_index) || 1);


  const postFiles = fs.readdirSync(path.join("posts"));

  const posts = getPosts();

  //Get categories for sidebar
  const categories = posts.map(post => post.frontmatter.category);
  const uniqueCategories = [...new Set(categories)];

  const numPages = Math.ceil(postFiles.length / POSTS_PER_PAGE);
  
  const pageIndex = page - 1;

  const orderedPosts = posts.slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) *  POSTS_PER_PAGE)

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
      categories: uniqueCategories
    }
  }
}