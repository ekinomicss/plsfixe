const algoliasearch = require('algoliasearch');  // Use CommonJS require
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');

const md = new MarkdownIt();

// Initialize Algolia client with environment variables
const client = algoliasearch(
  "xx",
  "xx"
);

// Initialize the index
const index = client.initIndex("plsfixe");

const postsDirectory = '../posts'; // Adjust as necessary

function getPosts() {
  const files = fs.readdirSync(postsDirectory);
  const posts = files.map(file => {
    const filePath = path.join(postsDirectory, file);
    const content = fs.readFileSync(filePath, 'utf8');
    try {
      const parsed = matter(content);
      const htmlContent = md.render(parsed.content);

      const post = {
        title: parsed.data.title || 'Untitled',
        slug: parsed.data.slug || 'Untitled',
        category: parsed.data.category || ' ',
        neighborhood: parsed.data.neighborhood || ' ', 
        date: parsed.data.date || new Date().toISOString(),
        content: htmlContent,
        objectID: path.parse(file).name, // Use filename as unique ID
      };
      return post;
    } catch (error) {
      console.error(`Error parsing file ${file}:`, error);
      return null;
    }
  }).filter(Boolean);
  return posts;
}

// Read posts and push to Algolia
const posts = getPosts();

index.saveObjects(posts)
  .then(({ objectIDs }) => {
    console.log('Posts successfully uploaded to Algolia:', objectIDs);
  })
  .catch(error => {
    console.error('Error uploading posts to Algolia:', error);
  });