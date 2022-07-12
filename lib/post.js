import Path from "path"
import fs from "fs"
import matter from "gray-matter"
import {remark} from "remark"
import html from "remark-html"

const postsDirectory = Path.join(process.cwd(), "posts");

//mdファイルのデータを取り出す
export function getPostsData(){
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileNames) => {
        const id = fileNames.replace(/\.md$/, "");//ファイル名（id）

        //マークダウンファイルを文字列として読み取る
        const fullPath = Path.join(postsDirectory, fileNames);
        const fileContents = fs.readFileSync(fullPath, "utf-8");

        const matterResult = matter(fileContents);

        //idとデータを返す
        return{
            id,
            ...matterResult.data,
        }
    });

    return allPostsData;
}

//getStaticPathでreturnで使うpathを取得する。
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)
    return  fileNames.map((fileName) => {
        return{
            params: {
                id : fileName.replace(/\.md$/, ""),
            },
        };
    });
}


//idに基づいてブログ投稿データを返す
export async function getPostData(id) {
    const fullPath = Path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    const blogContent = await remark()
    .use(html)
    .process(matterResult.content);

    const blogContentHTML = blogContent.toString();

    return{
        id,
        blogContentHTML,
        ...matterResult.data,
    };
}