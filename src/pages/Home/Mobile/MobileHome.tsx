import s from "./MobileHome.module.css";
import React, {
  useRef,
  RefObject,
  useEffect,
  useState,
  Suspense,
  useLayoutEffect,
} from "react";
import background_image_1_src from "../../../assets/images/background_big_blue.png";
import background_image_2_src from "../../../assets/images/background_big_pink.png";
import background_image_3_src from "../../../assets/images/background_small_blue.png";
import background_image_4_src from "../../../assets/images/background_small_pink.png";

import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import Modal from "../../../components/Modal/Modal";
import Preloader from "../../../components/Preloader/Preloader";
// import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const YouTubePlayer = React.lazy(
  () => import("../../../components/YoutubePlayer/YoutubePlayer")
);

gsap.registerPlugin(ScrollTrigger, Observer);

function MobileHome() {
  const [isPopupOpened, setPopupState] = useState(false);

  const pageRef: RefObject<HTMLDivElement> = useRef(null);

  // function openPopup() {
  //   setPopupState(true);
  // }

  return (
    <div className={s.page} ref={pageRef}>
      <div
        className={s.image}
        style={{ backgroundImage: `url(${background_image_1_src})` }}
      />
      <div
        className={s.image}
        style={{ backgroundImage: `url(${background_image_3_src})` }}
      />
      <div
        className={s.image}
        style={{ backgroundImage: `url(${background_image_2_src})` }}
      />
      <div
        className={s.image}
        style={{ backgroundImage: `url(${background_image_4_src})` }}
      />
      {isPopupOpened && (
        <Modal setPopupState={setPopupState}>
          <Suspense fallback={<Preloader content={"🐥"} />}>
            <YouTubePlayer videoId="u0dBG0AL3Cs" />
          </Suspense>
        </Modal>
      )}
    </div>
  );
}

export default MobileHome;
