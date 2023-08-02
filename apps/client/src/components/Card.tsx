import React from "react";
import { Book } from "../interfaces/mixin";

interface CardProps {
  book: Book;
}

const Card: React.FC<CardProps> = ({ book }) => {
  return (
    <div
      className="h-[257px] w-[187px] sm:w-[260px] md:w-[300px] lg:w-[350px] xl:w-[400px] 
      bg-white  rounded-md p-2">
      <div
        className="h-[187px] w-[187px] sm:w-[260px] md:w-[300px] lg:w-[350px] xl:w-[400px] 
      flex justify-center">
        <img
          className="h-[100%] w-[100%] object-contain"
          src={book.image}
          alt={book.title}
        />
      </div>
      <div className="px-3 py-1">
        <p className="text-sm font-medium">
          {book.title.length > 17
            ? `${book.title.substr(0, 15)}.. .`
            : book.title.substr(0, 17)}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-red-500 font-bold text-sm">{book.discount}%</p>
          <p className="font-bold text-lg">{book.price}$</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
