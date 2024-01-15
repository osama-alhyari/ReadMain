import TagShow from "./TagShow.js";
import EmptyTagList from "./EmptyTagList.js";

export default function TagList({ tags }) {
  let renderedTags = [];
  if (tags.length !== 0) {
    renderedTags = tags.map((tag) => {
      return <TagShow key={tag.id} tag={tag} />;
    });
  }

  return (
    <div>
      {renderedTags.length === 0 ? (
        <EmptyTagList />
      ) : (
        <div className="grid grid-cols-3 gap-2 bg-gray-800 mt-3 mx-1">
          {renderedTags}
        </div>
      )}
    </div>
  );
}