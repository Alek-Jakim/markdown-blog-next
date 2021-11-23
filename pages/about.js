import Layout from "@/components/Layout"

const AboutPage = () => {
    return (
        <Layout title="About DevSpace">
            <h1 className="text-5xl border-b-4 pb-5 font-bold">About this blog</h1>


            <div className="bg-white shadow-md rounded-lg px-10 py-6 mt-6">
                <h3 className="text-2xl mb-5">
                    Martial Planet Blog
                </h3>

                <p className="mb-3">This is a blog built with Next.js, Markdown and Tailwind for learning purposes. I do not own any of the images presented here.</p>

                <p>
                    <span className="font-bold">Version 1.2.0</span>
                </p>
            </div>
        </Layout>
    )
}

export default AboutPage
