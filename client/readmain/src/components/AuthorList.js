import AuthorShow from "./AuthorShow.js";
import EmptyAuthorList from "./EmptyAuthorList.js";

export default function AuthorList({ authors }) {
  let renderedAuthors = [];
  if (authors.length !== 0) {
    renderedAuthors = authors.map((author) => {
      return <AuthorShow key={author.id} author={author} />;
    });
  }

  return (
    <div>
      {renderedAuthors.length === 0 ? (
        <EmptyAuthorList />
      ) : (
        <div className="grid grid-cols-3 gap-2 bg-gray-800 mt-3 mx-1">
          {renderedAuthors}
        </div>
      )}
    </div>
  );
}
