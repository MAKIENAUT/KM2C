"use client";

import Navbar from "@/components/Navbar";
import { getPosts } from "../../_actions/postAction";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Button } from "@/components/atoms/button";
import Link from "next/link";

export default function Home() {
  const [ref, inView, entry] = useInView({ threshold: 0.95 });

  // const res = await getPosts();
  // console.log("Response from getPosts:", res);

  return (
    <>
      <Navbar inView={inView} />
      <main>
        <section className="relative flex min-h-screen flex-col items-center justify-center bg-[url('/home.jpg')] bg-center p-16">
          <Image
            alt="KM2C hero section logo"
            src="/km2c-logo-red.svg"
            width={0}
            height={0}
            className={`w-5/6`}
          />

          <Button asChild variant="see-more">
            <Link href="#more-info">
              Scroll for more
              <Image
                alt="See more arrow"
                src="/see-more-arrow.svg"
                width={0}
                height={0}
                className={`h-4 w-4`}
              />
            </Link>
          </Button>
        </section>
        <section
          className="flex min-h-screen flex-col items-center justify-center bg-cream p-16"
          ref={ref}
          id="more-info"
        >
          <h2 className="mb-4 text-4xl">Welcome to Our Site</h2>
          <p className="text-xl">Explore our amazing features and services.</p>
        </section>
      </main>
    </>
  );
}
