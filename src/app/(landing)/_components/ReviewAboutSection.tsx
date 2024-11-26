import { Facebook, Instagram, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ReviewAboutSection({ company }: { company?: Company }) {
  return (
    <section className="w-full py-12 font-dms_sans">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6 max-w-[506px]">
          <div className="space-y-4">
            <h2 className="text-[32px] font-semibold text-[#121417]">
              What is {company?.companyName}?
            </h2>
            <p className="text-[#717274] font-medium text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-[#717274] font-medium text-base">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href="#"
              className="rounded-full h-12 w-12 flex items-center justify-center bg-[#F6F6F6] hover:bg-muted"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              className="rounded-full h-12 w-12 flex items-center justify-center bg-[#F6F6F6] hover:bg-muted"
              aria-label="Facebook"
            >
              <Facebook className="h-6 w-6" />
            </Link>
          </div>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
          <Image
            src="/video.svg"
            alt="Video thumbnail"
            width={0}
            height={0}
            className="h-full w-full object-cover"
          />
          <button
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white px-4 py-2 font-medium shadow-lg"
            aria-label="Play video"
          >
            <Play className="h-4 w-4" />
            Play Video
          </button>
        </div>
      </div>
    </section>
  );
}
