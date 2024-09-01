import Link from 'next/link';

export default function PostCard({ post }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-4">{post.description}</p>
        <Link href={`/posts/${post.slug}`}>
          <a className="text-blue-500 hover:underline">Read more</a>
        </Link>
      </div>
    </div>
  );
}
