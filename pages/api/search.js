import fs from "fs"
import path from "path"
import matter from "gray-matter"

export default function handler(req, res) {
  let posts;

  if(process.env.NODE_ENV === "production") {
    //fetch from cache
  } else {
    const files = fs.readdirSync(path.join("posts"));

    posts = files.map(filename => {
      const markdownWithMetta = fs.readFileSync(path.join("posts", filename), "utf-8")

      const {data: frontmatter} = matter(markdownWithMetta);

      return {
        frontmatter
      }
    })
  }

  const results = posts.filter(({frontmatter: {title, excerpt, category}}) => title.toLowerCase().indexOf(req.query.q) !== -1 || 
  excerpt.toLowerCase().indexOf(req.query.q) !== -1 ||
  category.toLowerCase().indexOf(req.query.q) !== -1);

  res.status(200).json(JSON.stringify({results}))
}
