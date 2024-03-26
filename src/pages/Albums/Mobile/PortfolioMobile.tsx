import styles from "./PortfolioMobile.module.css";
import { Link } from "react-router-dom";
import nameSrc from "../../../assets/images/name.svg";
import titleSrc from "../../../assets/images/title.svg";
import logoSrc from "../../../assets/images/logo_vertical.png";
import Toggler from "./Toggler/Toggler";
import { useState, useRef, createContext } from "react";
import AudioTrack from "../../../components/AudioTrack/AudioTrack";
import mp3Src from "../../../assets/Theory-of-Light-Master.mp3";
import mp3Src2 from "../../../assets/Free_Test_Data_2MB_MP3.mp3";

export const PlayerContext = createContext(undefined);

function PortfolioMobile() {
  const [selectedAudioTrack, setSelectedAudioTrack] = useState(undefined);
  const [duration, setDuration] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const contextValues = {
    duration,
    elapsedTime,
    isLoading,
    setIsLoading,
  };

  const audioRef = useRef<HTMLAudioElement>();

  const onTimeUpdate = () => {
    setElapsedTime(audioRef.current.currentTime);
  };

  const onLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  return (
    <div className={styles.page}>
      <div className={styles.headerSection}>
        <Link to="/" className={styles.nameContainer}>
          <img className={styles.name} src={nameSrc} alt="name" />
          <img className={styles.title} src={titleSrc} alt="title" />
        </Link>
      </div>
      <div className={styles.togglerSection}>
        <Toggler />
      </div>

      <div className={styles.genresSection}>
        <div className={styles.genresContainer}>
          <div className={styles.genresList}>
            <button className={styles.genreButton}>Classic</button>
            <button className={styles.genreButton}>Contemporary</button>
            <button className={styles.genreButton}>Electro</button>
            <button className={styles.genreButton}>Dark</button>
            <button className={styles.genreButton}>Folk</button>
            <button className={styles.genreButton}>Chamber</button>
            <button className={styles.genreButton}>Borroque</button>
          </div>
          <img className={styles.logo} src={logoSrc} alt="logo" />
        </div>
      </div>

      <audio
        preload="none"
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onPlaying={() => setIsLoading(false)}
        onWaiting={() => setIsLoading(true)}
      >
        <source src="" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <PlayerContext.Provider value={contextValues}>
        <div className={styles.trackListSection}>
          <AudioTrack
            index={0}
            name={"Enumerating objects"}
            link={mp3Src}
            isAudioTrackSelected={0 === selectedAudioTrack}
            setSelectedAudioTrack={setSelectedAudioTrack}
            ref={audioRef}
          />

          <AudioTrack
            index={1}
            name={"Counting objects"}
            link={mp3Src2}
            isAudioTrackSelected={1 === selectedAudioTrack}
            setSelectedAudioTrack={setSelectedAudioTrack}
            ref={audioRef}
          />

          <AudioTrack
            index={1}
            name={"Writing objects"}
            link={mp3Src2}
            isAudioTrackSelected={1 === selectedAudioTrack}
            setSelectedAudioTrack={setSelectedAudioTrack}
            ref={audioRef}
          />

          <AudioTrack
            index={1}
            name={"Resolving deltas"}
            link={mp3Src2}
            isAudioTrackSelected={1 === selectedAudioTrack}
            setSelectedAudioTrack={setSelectedAudioTrack}
            ref={audioRef}
          />

          <AudioTrack
            index={1}
            name={"Delta"}
            link={mp3Src2}
            isAudioTrackSelected={1 === selectedAudioTrack}
            setSelectedAudioTrack={setSelectedAudioTrack}
            ref={audioRef}
          />

          <AudioTrack
            index={1}
            name={"Compressing"}
            link={mp3Src2}
            isAudioTrackSelected={1 === selectedAudioTrack}
            setSelectedAudioTrack={setSelectedAudioTrack}
            ref={audioRef}
          />

          <AudioTrack
            index={1}
            name={"Revival"}
            link={mp3Src2}
            isAudioTrackSelected={1 === selectedAudioTrack}
            setSelectedAudioTrack={setSelectedAudioTrack}
            ref={audioRef}
          />
        </div>
      </PlayerContext.Provider>
    </div>
  );
}

export default PortfolioMobile;
