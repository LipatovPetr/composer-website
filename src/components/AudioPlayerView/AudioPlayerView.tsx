import styles from "./AudioPlayerView.module.css";
import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  RefObject,
  useContext,
} from "react";
import playSrc from "../../assets/images/play-button.svg";
import pauseSrc from "../../assets/images/pause-icon.svg";
import { formatTime } from "../../utils/formatTime";
import { AudioPlayerViewProps } from "./types";
import { PlayerContext } from "../../pages/Albums/Mobile/PortfolioMobile";
import PlayerLoader from "./AudioPlayerViewPreloader/AudioPlayerPreloader";

const AudioPlayerView = forwardRef(
  (props: AudioPlayerViewProps, ref: RefObject<HTMLAudioElement>) => {
    1;

    const [isPlaying, setIsPlaying] = useState(false);
    const [trackViewDuration, setTrackViewDuration] = useState(0);
    const [trackViewElapsedTime, setTrackViewElapsedTime] = useState(0);

    const { index, link, isAudioTrackSelected, setSelectedAudioTrack } = props;
    const { duration, elapsedTime, isLoading, setIsLoading } =
      useContext(PlayerContext);

    const currentAudioTrack = ref.current;
    const progressBarRef = useRef<HTMLInputElement>();
    const progressBar = progressBarRef.current;

    // if (currentAudioTrack?.duration > 0) {
    //   console.log(currentAudioTrack?.buffered.end(0));
    //   console.log(currentAudioTrack?.duration);
    // }

    useEffect(
      function activateOrDeactivateCurrentView() {
        if (isAudioTrackSelected) {
          setTrackViewDuration(duration);
          setTrackViewElapsedTime(elapsedTime);
        } else {
          setTrackViewDuration(0);
          setTrackViewElapsedTime(0);
        }
      },
      [isAudioTrackSelected, duration, elapsedTime]
    );

    useEffect(
      function clearCurrentViewControllers() {
        if (!isAudioTrackSelected && isPlaying) {
          setIsPlaying(false);
          if (progressBar) {
            progressBar.style.backgroundSize = "0";
          }
        }
      },
      [isAudioTrackSelected, isPlaying]
    );

    useEffect(
      function updateCurrentViewElapsedProgress() {
        if (progressBar && isAudioTrackSelected) {
          const max = progressBar.max;
          const progressValue = trackViewElapsedTime;
          const relativeProgressVal = ((progressValue / +max) * 100).toFixed(1);
          progressBar.style.backgroundSize = `${relativeProgressVal}% 100%`;
        }
      },
      [trackViewElapsedTime, isAudioTrackSelected]
    );

    const togglePlaying = () => {
      if (!isAudioTrackSelected) {
        setIsLoading(true);
        currentAudioTrack.src = link;
        currentAudioTrack.load();
        setSelectedAudioTrack(index);
      }
      setIsPlaying(!isPlaying);

      isPlaying ? ref.current.pause() : ref.current.play();
    };

    const onScrubberChange = (event) => {
      if (isAudioTrackSelected) {
        const newTime = event.target.value;
        currentAudioTrack.currentTime = newTime;
      }
    };

    return (
      <div className={styles.playerContainer}>
        <button className={styles.playButton} onClick={togglePlaying}>
          <img
            className={styles.playIcon}
            src={pauseSrc}
            alt="pause-button"
            style={isPlaying ? {} : { display: "none" }}
          />

          <img
            className={styles.playIcon}
            src={playSrc}
            alt="play-button"
            style={isPlaying ? { display: "none" } : {}}
          />
        </button>

        {isLoading && isPlaying ? (
          <PlayerLoader />
        ) : (
          <input
            className={styles.timeScrubber}
            type="range"
            value={trackViewElapsedTime}
            min={0}
            max={trackViewDuration}
            onChange={onScrubberChange}
            ref={progressBarRef}
          />
        )}

        <div className={styles.timeValue}>
          {formatTime(trackViewElapsedTime)}
        </div>
      </div>
    );
  }
);

export default AudioPlayerView;
