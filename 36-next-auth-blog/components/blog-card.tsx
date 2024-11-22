import moment from "moment";
import Link from "next/link";
import Image from "next/image";

import { urls } from "@/utils/urls";
import { classNames } from "@/utils/classname";

export const BlogCardSkeleton: React.FC = () => {
  return (
    <div
      className={classNames(
        "border-t-4 border-t-teal-500 py-5 transition ease-in-out delay-150",
        "border-b border-b-gray-300 hover:scale-105 cursor-pointer"
      )}
    >
      <div className="relative w-full h-60 mb-5">
        <div className="w-full h-full bg-gray-300 animate-pulse"></div>
      </div>
      <div className="w-full max-w-[200px] mt-4 rounded-md h-6 bg-gray-300 animate-pulse"></div>
      <div className="w-full max-w-[280px] mt-4 rounded-md h-5 bg-gray-300 animate-pulse"></div>
      <div className="w-full max-w-[50px] mt-4 rounded-md h-4 bg-gray-300 animate-pulse"></div>
    </div>
  );
};

export const BlogCard: React.FC<IBlog> = ({
  id,
  title,
  created,
  thumbnail,
  description,
  collectionId,
}) => {
  return (
    <Link className="block" href={`/blog/${id}`}>
      <div
        className={classNames(
          "border-t-4 border-t-teal-500 py-5 transition ease-in-out delay-150",
          "border-b border-b-gray-300 hover:scale-105 cursor-pointer"
        )}
      >
        <div className="relative w-full h-60 mb-5">
          {!!thumbnail && (
            <Image
              fill={true}
              alt={thumbnail}
              className="object-cover object-center"
              src={urls.files.storage(collectionId, id, thumbnail)}
            />
          )}
          {!thumbnail && (
            <div className="w-full h-full bg-gray-300 animate-pulse"></div>
          )}
        </div>
        <p
          title={title}
          className="text-teal-500 font-medium text-xl line-clamp-1"
        >
          {title}
        </p>
        <p className="text-gray-400 line-clamp-4 mt-3">{description}</p>
        <p className="text-teal-500 text-sm mt-5">
          {moment(created).format("MMM Do YY")}
        </p>
      </div>
    </Link>
  );
};
