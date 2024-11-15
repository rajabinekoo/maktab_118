import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa6";

import { urls } from "@/utils/urls";

export const BlogInfo: React.FC<IBlog> = ({
  id,
  text,
  title,
  created,
  thumbnail,
  collectionId,
}) => {
  return (
    <section className="mx-auto container px-2 sm:px-5 py-10">
      <div className="relative w-full h-96">
        <Image
          fill={true}
          alt={thumbnail}
          className="object-cover object-center"
          src={urls.files.storage(collectionId, id, thumbnail)}
        />
      </div>
      <div className="mt-8 flex items-center gap-4">
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
      <div className="mt-5" dangerouslySetInnerHTML={{ __html: text }}></div>
    </section>
  );
};
