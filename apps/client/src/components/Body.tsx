/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Card from "./Card";
import Loading from "./Loading";
import { Book } from "../interfaces/mixin";
import { fetchBooks } from "../services/bookService";

function Body() {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetchBooks(page)
      .then((newBooks) => {
        setBooks((prevBooks) => [...prevBooks, ...newBooks]);
        setLoading(false);
        setHasMore(newBooks.length > 0);
      })
      .catch((_error) => {
        setLoading(false);
      });
  }, [page]);

  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (!loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, [handleInfiniteScroll]);

  const handleRefresh = () => {
    setBooks([]);
    setPage(1);
    setHasMore(true);
    fetchBooks(1);
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 0 && !loading) {
        handleRefresh();
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [loading]);

  return (
    <div>
      <div className="grid grid-cols-2">
        {books ? (
          books.map((book) => <Card key={book.id} book={book} />)
        ) : (
          <Loading />
        )}
      </div>
      {loading && <Loading />}
      {!hasMore && (
        <div className="text-center mt-4 text-gray-500 font-medium p-4">
          No more books to load.
        </div>
      )}
    </div>
  );
}

export default Body;
