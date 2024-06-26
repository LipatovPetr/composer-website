import { useState, useRef, useMemo, createContext, useEffect } from "react";

import AudioPlayer from "./Sections/AudioPlayer/AudioPlayer";
import Header from "../../components/Header/Header";
import HTMLAudioTag from "../../components/HTMLAudioTag/HTMLAudioTag";
import VideoPopup from "../../components/VideoPopup/VideoPopup";

import Tags from "./Sections/Tags/Tags";
import AudioTracks from "./Sections/AudioTracks/AudioTracks";

import { PIECES, DEFAULT_CONTEXT } from "./_constants";

import { AudioTrackData, ContextTypes, currentAudioData } from "./_types";

import s from "./Pieces.module.css";
import { PAGES } from "../../utils/constants";

export const PiecesContext = createContext<ContextTypes>(DEFAULT_CONTEXT);

function Pieces() {
  const [videoID, setVideoID] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentAudioData, setCurrentAudioData] = useState<currentAudioData>();
  const [filteredPieces, setFilteredPieces] = useState<AudioTrackData[]>([]);
  const [isPlayerOpened, setIsPlayerOpened] = useState(false);
  const [isVideoPopupOpened, setIsVideoPopupOpened] = useState(false);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number>(null);

  const audioPlayerRef = useRef<HTMLAudioElement>();

  const contextValue = useMemo(
    () => ({
      videoID,
      selectedTags,
      filteredPieces,
      currentAudioData,
      isPlayerOpened,
      isVideoPopupOpened,
      audioPlayerRef,
      selectedTrackIndex,
      setVideoID,
      setSelectedTags,
      setCurrentAudioData,
      setIsPlayerOpened,
      setIsVideoPopupOpened,
      setSelectedTrackIndex,
    }),
    [
      videoID,
      selectedTags,
      filteredPieces,
      currentAudioData,
      isPlayerOpened,
      isVideoPopupOpened,
      selectedTrackIndex,
      setVideoID,
      setSelectedTags,
      setCurrentAudioData,
      setIsPlayerOpened,
      setIsVideoPopupOpened,
      setSelectedTrackIndex,
    ]
  );

  useEffect(
    function filterPiecesByTags() {
      const filteredPieces = PIECES.filter((piece) =>
        selectedTags.every((tag) => piece.tags.includes(tag))
      );
      setFilteredPieces(filteredPieces);
    },
    [selectedTags]
  );

  return (
    <PiecesContext.Provider value={contextValue}>
      <div className={s.page}>
        <div className={s.content}>
          <Header>{PAGES.pieces}</Header>
          <Tags />
          <AudioTracks />
        </div>

        {isPlayerOpened && <AudioPlayer />}

        {isVideoPopupOpened && (
          <VideoPopup
            videoID={videoID}
            setIsVideoPopupOpened={setIsVideoPopupOpened}
          />
        )}
        <HTMLAudioTag ref={audioPlayerRef} />
      </div>
    </PiecesContext.Provider>
  );
}

export default Pieces;
