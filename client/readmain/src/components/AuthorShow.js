export default function AuthorShow({ author }) {
  return (
    <div className="border-4 border-gray-600 rounded-lg bg-gray-700 px-4 py-3 text-white max-h-[135px] relative">
      <div className="mb-4">
        <span className="font-bold">Author Name</span> {author.name}
      </div>
    </div>

    // <Link
    //   className="absolute bottom-4 right-4 px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-full inline-block"
    //   to={`/book/${book.id}`}
    // >
    //   View Book
    // </Link>
  );
}
