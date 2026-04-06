import "@/styles/globals.scss";
import "@/styles/pages/index.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    let lenis;
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    });
    return () => lenis?.destroy();
  }, []);

  return <Component {...pageProps} />;
}
