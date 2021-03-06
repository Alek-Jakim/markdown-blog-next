import Layout from "@/components/Layout"
import Post from "@/components/Post"
import { getPosts } from "@/lib/posts"
import Link from "next/link"

export default function HomePage({posts}) {

  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Latest Articles</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>

      <Link href="/blog">
          <a className="block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full">All Articles</a>
      </Link>
    </Layout>
  )
}

export async function getStaticProps() {
  //NOTE: fs module works only if you use it here with server side, otherwise it will throw an error if you try to use it client side
  return {
    props: {
      posts: getPosts().slice(0, 6)
    }
  }
}