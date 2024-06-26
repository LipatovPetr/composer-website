import { useMemo, useRef, useState, createContext, useEffect } from "react";
import cn from "classnames";

import AudioPlayer from "./Sections/AudioPlayer/AudioPlayer";
import Tags from "./Sections/Tags/Tags";
import HTMLAudioTag from "../../components/HTMLAudioTag/HTMLAudioTag";
import Header from "../../components/Header/Header";
import VideoPopup from "../../components/VideoPopup/VideoPopup";

import useIsMobile from "../../utils/hooks/useIsMobile";

import { DEFAULT_CONTEXT, PROJECTS } from "./_constants";
import { ContextTypes, ProjectData } from "./_types";

import s from "./FeaturedWork.module.css";
import Projects from "./Sections/Projects/Projects";
import { PAGES } from "../../utils/constants";

export const FeaturedWorkContext = createContext<ContextTypes>(DEFAULT_CONTEXT);

function FeaturedWork() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
  const [videoID, setVideoID] = useState<string>("");
  const [currentProject, setCurrentProject] = useState<ProjectData>(null);

  const [isVideoPopupOpened, setIsVideoPopupOpened] = useState(false);
  const [isPlayerOpened, setIsPlayerOpened] = useState(false);

  const [selectedTrackIndex, setSelectedTrackIndex] = useState(null);
  const [selectedProjectIndex, setSelectedProjectIndex] =
    useState<number>(null);

  const audioPlayerRef = useRef<HTMLAudioElement>();
  const isMobile = useIsMobile();

  const contextValue = useMemo(
    () => ({
      videoID,
      currentProject,
      isPlayerOpened,
      selectedTags,
      filteredProjects,
      audioPlayerRef,
      selectedProjectIndex,
      selectedTrackIndex,
      setSelectedTags,
      setCurrentProject,
      setIsPlayerOpened,
      setIsVideoPopupOpened,
      setVideoID,
      setSelectedProjectIndex,
      setSelectedTrackIndex,
    }),
    [
      videoID,
      isPlayerOpened,
      selectedTags,
      currentProject,
      filteredProjects,
      selectedProjectIndex,
      selectedTrackIndex,
      setSelectedTags,
      setCurrentProject,
      setIsPlayerOpened,
      setIsVideoPopupOpened,
      setVideoID,
      setSelectedProjectIndex,
      setSelectedTrackIndex,
    ]
  );

  useEffect(
    function filterProjectsByTags() {
      const filteredProjects = PROJECTS.filter((project) =>
        selectedTags.every((tag) => project.tags.includes(tag))
      );
      setFilteredProjects(filteredProjects);
    },
    [selectedTags]
  );

  const content = cn(
    s.content,
    isPlayerOpened && isMobile ? s.mobilePlayerOpened : "",
    isPlayerOpened && !isMobile ? s.desktopPlayerOpened : ""
  );

  return (
    <FeaturedWorkContext.Provider value={contextValue}>
      <div className={s.page}>
        <div className={content}>
          <Header>{PAGES.featured}</Header>
          <Tags />
          <Projects />
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
    </FeaturedWorkContext.Provider>
  );
}

export default FeaturedWork;
