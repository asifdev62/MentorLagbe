
import {
  getBookmarks,
} from "@/lib/actions/student";

import BookmarksClient from "./BookmarksClient";


export default async function BookmarksPage() {
  const result = await getBookmarks();

  return (
    <BookmarksClient
      initialBookmarks={result.bookmarks || []}
      initialError={result.success ? "" : result.message || "Failed to load bookmarks"}
      isPro={result.isPro || false}
      limit={result.limit ?? 5}
    />
  );
}
