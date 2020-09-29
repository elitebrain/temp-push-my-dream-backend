import React, { Component } from "react";
import videojs from "video.js";

import { setControlBarPosition } from "shared/functions";

class Player extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.state = {
      muted: props.muted,
    };
  }

  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(
      this.videoRef.current,
      Object.assign({}, this.props.option, {
        // 여기서의 자동재생은 맨처음 이 비디오 페이지를 로딩했을 때, 맨처음 영상을 재생시키기 위해서 사용
        autoplay:
          Number(this.props.Router.query.video_no) ===
          this.props.currentVideo.video_no,
        controls: true,
        // controlBar: {
        //   children: {
        //     muteToggle: {
        //       handleClick: this.props._toggleMuted,
        //     },
        //   },
        // },
        preload: "auto",
      }),
      function onPlayerReady() {
        setControlBarPosition();
      }
    );

    const agent = navigator.userAgent.toLowerCase();
    if (
      agent.indexOf("naver") !== -1 &&
      agent.indexOf("mobile") !== -1 &&
      agent.indexOf("iphone") !== -1
    ) {
      const arrControl = document.querySelectorAll(
        ".video-js .vjs-control-bar"
      );

      for (let i = 0; i < arrControl.length; i++) {
        arrControl[i].style.padding = "0 60px";
      }
    }

    // const muteControlEl = document.querySelectorAll(
    //   ".vjs-volume-panel.vjs-control.vjs-volume-panel-horizontal"
    // );
    // for (let i = 0; i < muteControlEl.length; i++) {
    //   muteControlEl[i].addEventListener("click", function () {
    //     this.props._toggleMuted();
    //   });
    // }
  }

  componentDidUpdate() {
    let isIOS =
      /iPad|iPhone|iPod/.test(navigator.platform) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    // 현재 보고 있는 페이지의 비디오가 url 상의 비디오와 일치하고 ios가 아니면 재생!
    if (
      Number(this.props.Router.query.video_no) ===
        this.props.currentVideo.video_no &&
      !isIOS
    ) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }

  // props가 바뀌지 않는데 리랜더링이 되서 componentDidUpdate가 발생하여 비디오를 멈춰도 다시 실핸된다.
  // scu를 통해 리렌더링이 되지 않게 한다.
  shouldComponentUpdate(nextProps, nextState) {
    return (
      Number(this.props.Router.query.video_no) !==
      Number(nextProps.Router.query.video_no)
    );
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      console.log(this.player);
      this.player.dispose();
    }
  }

  componentWillReceiveProps() {
    this.setState({
      muted: this.props.muted,
    });
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    const { muted } = this.state;
    console.log("muted", muted);
    return (
      <>
        <div className="videoContainer" data-vjs-player>
          <video
            ref={this.videoRef}
            className="video-js"
            playsInline
            muted={muted}
          ></video>
          {/* <div
            className="cover"
            onClick={() => (document.querySelector("html").scrollTop = 0)}
          /> */}
        </div>
        <style jsx global>{`
          .videoContainer {
            display: flex;
            align-items: center;
            height: 100%;
          }
          .cover {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: green;
            opacity: 0.4;
            z-index: 10;
          }
          .swiper-slide-active .cover {
            background-color: red;
          }
          .video-js .vjs-control-bar {
            margin: auto;
            background-color: rgba(0, 0, 0, 0.5) !important;
          }
          .vjs-controls-disabled .vjs-control-bar {
            display: flex !important;
          }
          .video-js .vjs-control-bar {
            display: flex !important;
            opacity: 1 !important;
            height: 50px;
          }
        `}</style>
      </>
    );
  }
}

export default Player;
