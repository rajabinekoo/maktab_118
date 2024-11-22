import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa6";

import { urls } from "@/utils/urls";
import { BlogInfoController } from "@/components/blog-info-control";

export const BlogInfo: React.FC<IBlog> = ({
  id,
  text,
  title,
  created,
  thumbnail,
  collectionId,
}) => {
  return (
    <section className="mx-auto container px-2 sm:px-5 pb-10 pt-navbar">
      <div className="relative w-full h-96">
        {!!thumbnail && (
          <Image
            fill={true}
            alt={thumbnail}
            className="object-cover object-center rounded-md"
            src={urls.files.storage(collectionId, id, thumbnail)}
          />
        )}
        {!thumbnail && (
          <div className="w-full h-full bg-gray-300 animate-pulse"></div>
        )}
      </div>
      <div className="mt-8 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Link href={"/"} className="block">
            <button>
              <FaArrowLeft className="w-4 h-4" />
            </button>
          </Link>
          <div className="space-y-2">
            <p className="text-teal-600 font-semibold text-2xl">{title}</p>
            <p className="text-teal-600 font-semibold text-sm">
              {moment(created).format("MMM Do YY")}
            </p>
          </div>
        </div>
        <BlogInfoController />
      </div>
      <div className="mt-5" dangerouslySetInnerHTML={{ __html: text }}></div>
    </section>
  );
};
