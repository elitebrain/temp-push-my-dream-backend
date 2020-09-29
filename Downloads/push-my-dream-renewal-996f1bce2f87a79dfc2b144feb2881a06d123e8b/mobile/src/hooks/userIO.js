import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

/**
 * 참고
 * https://codesandbox.io/s/2vm9om4p7n?file=/src/LazyImage.js
 * https://medium.com/better-programming/image-lazy-loading-in-react-intersection-observer-a9ae912ddafe
 * https://y0c.github.io/2019/06/30/react-infinite-scroll/
 */
const useIO = (imageRef) => {
  const { agent } = useSelector((state) => state.common);
  const isAgent = useMemo(() => typeof agent === "string", [agent]);

  const [isLazied, setIsLazied] = useState(true);

  //   const { root, rootMargin, threshold } = options || {};

  // 크롬일시에만 레이지 로딩 적용
  useEffect(() => {
    let observer;
    if (isAgent) {
      observer = new IntersectionObserver((entries) => {
        const image = entries[0];

        if (image.isIntersecting) {
          setIsLazied(false);
          observer.disconnect();
        }
      });

      observer.observe(imageRef.current);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [imageRef.current, isAgent]);

  return [isLazied];
};

export default useIO;

// import React, { useState, useEffect, useMemo } from "react";
// import { useSelector } from "react-redux";
// import IntersectionObserver from "intersection-observer";

// /**
//  * 참고
//  * https://codesandbox.io/s/2vm9om4p7n?file=/src/LazyImage.js
//  * https://medium.com/better-programming/image-lazy-loading-in-react-intersection-observer-a9ae912ddafe
//  * https://y0c.github.io/2019/06/30/react-infinite-scroll/
//  */
// const useIO = (imageRef) => {
//   const { agent } = useSelector((state) => state.common);
//   const isAgent = useMemo(() => typeof agent === "string", [agent]);
//   const isChrome = useMemo(() => isAgent && agent.indexOf("Chrome") !== -1, [
//     isAgent,
//     agent,
//   ]);
//   const [isLazied, setIsLazied] = useState(true);

//   //   const { root, rootMargin, threshold } = options || {};

//   // 크롬일시에만 레이지 로딩 적용
//   useEffect(() => {
//     let observer;
//     if (isAgent) {
//       if (isChrome) {
//         observer = new IntersectionObserver((entries) => {
//           const image = entries[0];

//           if (image.isIntersecting) {
//             setIsLazied(false);
//             observer.disconnect();
//           }
//         });

//         observer.observe(imageRef.current);
//       } else {
//         setIsLazied(false);
//       }
//     }
//     return () => {
//       if (observer) {
//         observer.disconnect();
//       }
//     };
//   }, [imageRef.current, isAgent, isChrome]);

//   return [isLazied];
// };

// export default useIO;
