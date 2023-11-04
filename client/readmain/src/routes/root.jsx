import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <div className="overflow-hidden bg-pink-600">
        <Link
          className="mx-3 bg-pink-700 hover:bg-pink-900 float-left block text-white text-center p-3.5 no-underline"
          to="addbooks"
        >
          Add a Book
        </Link>
        <Link
          className="mx-3 bg-pink-700 hover:bg-pink-900 float-left block text-white text-center p-3.5 no-underline"
          to="viewbooks"
        >
          View Books
        </Link>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
}
