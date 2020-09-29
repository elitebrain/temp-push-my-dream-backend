import React, { useState, useEffect, useMemo } from "react";
import Swiper from "swiper/js/swiper";

const CustomSwiper = React.forwardRef(
  (
    {
      isFullscreen,
      children,
      index,
      containerClass,
      subSlideClass,
      direction = "horizontal",
      initialSlide = 0,
      allowSlidePrev = true,
      allowSlideNext = true,
      loop = false,
      callbackSlidePrev,
      callbackSlideNext,
      callbackTouchMove,
      callbackTouchEnd,
      callbackSlidePrevEndTransition,
      callbackSlideNextEndTransition,
      floating,
    },
    ref
  ) => {
    /**
     * 스와이프 초기화
     */
    useEffect(() => {
      /**
       * swiper가 정의되지 않았고 el은 정의 되어있을 때
       */
      if (!ref.current) {
        ref.current = new Swiper(
          `.swiper-container${containerClass ? `.${containerClass}` : ""}`,
          {
            direction,
            initialSlide,
            allowSlidePrev,
            allowSlideNext,
            loop: loop,
          }
        );
      }
    }, []);

    const _handleExitFullscreen = () => {
      document.exitFullscreen();
    };
    /**
     * 스와이프 이동 제어
     */
    useEffect(() => {
      ref.current.allowSlidePrev = allowSlidePrev && !isFullscreen;
      ref.current.allowSlideNext = allowSlideNext && !isFullscreen;
      if (callbackSlidePrev) {
        ref.current.off("slidePrevTransitionStart");
        ref.current.on("slidePrevTransitionStart", callbackSlidePrev);
      }

      if (callbackSlidePrevEndTransition) {
        ref.current.off("slidePrevTransitionEnd");
        ref.current.on(
          "slidePrevTransitionEnd",
          callbackSlidePrevEndTransition
        );
      }

      if (callbackSlideNext) {
        ref.current.off("slideNextTransitionStart");
        ref.current.on("slideNextTransitionStart", callbackSlideNext);
      }

      if (callbackSlideNextEndTransition) {
        ref.current.off("slideNextTransitionEnd");
        ref.current.on(
          "slideNextTransitionEnd",
          callbackSlideNextEndTransition
        );
      }

      if (callbackTouchMove) {
        ref.current.off("touchMove");
        ref.current.on("touchMove", callbackTouchMove);
      }

      if (callbackTouchEnd) {
        ref.current.off("touchEnd");
        ref.current.on("touchEnd", callbackTouchEnd);
      }
    }, [
      isFullscreen,
      allowSlidePrev,
      allowSlideNext,
      callbackSlidePrev,
      callbackSlideNext,
      callbackTouchMove,
      callbackTouchEnd,
      callbackSlideNextEndTransition,
      ref.current,
    ]);

    /**
     * 슬라이드가 동적으로 추가하면 DOM에 반영하는 이벤트
     */
    useEffect(() => {
      if (ref.current) {
        ref.current.update();
      }
    }, [children && children.length]);

    const swiperClass = useMemo(
      () => `swiper-container${containerClass ? ` ${containerClass}` : ""}`,
      [containerClass]
    );

    const swiperSlideClass = useMemo(
      () => `swiper-wrapper${ref.current ? "" : " hide"}`,
      [ref.current]
    );

    return (
      <div className={swiperClass}>
        <div className={swiperSlideClass}>
          {React.Children.map(
            children,
            (item) =>
              item && (
                <div
                  className={`swiper-slide${
                    subSlideClass ? ` ${subSlideClass}` : ""
                  }`}
                >
                  {item}
                </div>
              )
          )}
        </div>
        {floating}
        <style jsx>{`
          .swiper-wrapper.hide {
            visibility: hidden;
          }
        `}</style>
      </div>
    );
  }
);

export default CustomSwiper;
