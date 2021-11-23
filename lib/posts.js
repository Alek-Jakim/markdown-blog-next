import fs from "fs"
import path from "path"
import matter from "gray-matter"
import {sortByDate} from "@/utils/index"


const postFiles = fs.readdirSync(path.join("posts"));


export function getPosts() {
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

      return posts.sort(sortByDate)
}