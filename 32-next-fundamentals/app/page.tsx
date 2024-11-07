import Image from "next/image";
import styles from "./home.module.css";

export default function Home() {
  return (
    <>
      <p className={styles.title}>Home</p>
      <div className="flex justify-center">
        <div className="relative w-full h-96 sm:w-11/12 md:w-9/12 lg:w-7/12 xl:w-6/12">
          <Image
            src="https://wallpapercat.com/w/middle-retina/4/c/2/17001-3840x2160-desktop-4k-mountain-wallpaper.jpg"
            alt="mountain image"
            className="rounded-xl object-cover"
            fill
          />
        </div>
      </div>
    </>
  );
}
