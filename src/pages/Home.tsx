import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Home as HomeIcon,
  Search,
  Library,
  Plus,
  Heart,
  Settings,
  MoreHorizontal,
  Link as LinkIcon,
  ListMusic,
  Mic2,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  MonitorPlay,
  Maximize2,
  Briefcase,
  Code2,
  FolderGit2,
  Mail,
  Github,
  Linkedin,
  User,
  Pause,
} from "lucide-react";
import {
  personalInfo,
  sidebarLibrary,
  topServices,
  topTechStacks,
  projectsPlaylists,
  experienceCompanies,
  currentlyLearning,
} from "../data/personal";
import { songs } from "../data/songs";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const orderedSongs = useMemo(() => {
    return [...songs].sort((a, b) => a.id - b.id);
  }, []);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentSong = orderedSongs[currentSongIndex];

  const formatTime = (time: number) => {
    if (!Number.isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Playback failed:", error);
      setIsPlaying(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
  };

  const handleNext = () => {
    if (!orderedSongs.length) return;

    setCurrentTime(0);

    if (isShuffle && orderedSongs.length > 1) {
      let randomIndex = currentSongIndex;

      while (randomIndex === currentSongIndex) {
        randomIndex = Math.floor(Math.random() * orderedSongs.length);
      }

      setCurrentSongIndex(randomIndex);
      setIsPlaying(true);
      return;
    }

    setCurrentSongIndex((prev) => {
      if (prev >= orderedSongs.length - 1) {
        return 0;
      }

      return prev + 1;
    });

    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (!orderedSongs.length) return;

    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      return;
    }

    setCurrentTime(0);

    setCurrentSongIndex((prev) => {
      if (prev <= 0) {
        return orderedSongs.length - 1;
      }

      return prev - 1;
    });

    setIsPlaying(true);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong?.audio) return;

    audio.src = currentSong.audio;
    audio.load();
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong?.audio) return;

    if (isPlaying) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Playback failed:", error);
          setIsPlaying(false);
        });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handleEnded = () => {
      if (!orderedSongs.length) return;

      setCurrentTime(0);

      if (isShuffle && orderedSongs.length > 1) {
        let randomIndex = currentSongIndex;

        while (randomIndex === currentSongIndex) {
          randomIndex = Math.floor(Math.random() * orderedSongs.length);
        }

        setCurrentSongIndex(randomIndex);
        setIsPlaying(true);
        return;
      }

      if (currentSongIndex >= orderedSongs.length - 1) {
        setCurrentSongIndex(0);
        setIsPlaying(true);
        return;
      }

      setCurrentSongIndex((prev) => prev + 1);
      setIsPlaying(true);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSongIndex, isShuffle, orderedSongs.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
  }, [volume]);

  return (
    <main className="app-page">
      <audio ref={audioRef} preload="metadata" />

      <div className="spotify-app-shell">
        <header className="topbar">
          <div className="topbar__nav">
            <button className="icon-button" aria-label="Previous" type="button">
              <ChevronLeft size={18} />
            </button>

            <button className="icon-button" aria-label="Next" type="button">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="topbar__center">
            <button className="topbar__home" aria-label="Home" type="button">
              <HomeIcon size={18} />
            </button>

            <div className="topbar__search">
              <Search size={18} />
              <input type="text" placeholder="What do you want to know?" />
              <span className="topbar__search-divider" />
              <Library size={18} />
            </div>
          </div>

          <div className="topbar__actions">
            <button
              className="icon-button"
              aria-label="Notifications"
              type="button"
            >
              <Bell size={18} />
            </button>

            <button className="icon-button" aria-label="Profile" type="button">
              <User size={18} />
            </button>

            <div className="topbar__avatar">
              <img src={personalInfo.image} alt={personalInfo.name} />
            </div>
          </div>
        </header>

        <div
          className={`spotify-layout ${
            isLeftCollapsed ? "spotify-layout--left-collapsed" : ""
          } ${isRightCollapsed ? "spotify-layout--right-collapsed" : ""}`}
        >
          <aside
            className={`left-sidebar panel ${
              isLeftCollapsed ? "left-sidebar--collapsed" : ""
            }`}
          >
            <div className="left-sidebar__topbar">
              <button
                className="library-toggle-button"
                aria-label="Toggle left sidebar"
                onClick={() => setIsLeftCollapsed((prev) => !prev)}
                type="button"
              >
                <Library size={18} />
                {!isLeftCollapsed && <span> My Library</span>}
              </button>

              {!isLeftCollapsed && (
                <button
                  className="sidebar-expand-button"
                  aria-label="Collapse left sidebar"
                  onClick={() => setIsLeftCollapsed((prev) => !prev)}
                  type="button"
                >
                  <ChevronLeft size={18} />
                </button>
              )}
            </div>

            {!isLeftCollapsed && (
              <>
                <div className="left-sidebar__filters">
                  <button className="filter-pill" type="button">
                    Playlists
                  </button>
                  <button className="filter-pill" type="button">
                    Projects
                  </button>
                  <button className="filter-pill" type="button">
                    Stacks
                  </button>
                  <button className="filter-pill" type="button">
                    Certificates
                  </button>
                </div>

                <div className="left-sidebar__subhead">
                  <Search size={16} />
                  <span>Recents</span>
                </div>
              </>
            )}

            <div className="library-list">
              {sidebarLibrary.map((item) => (
                <article
                  key={item.title}
                  className={`library-item ${
                    isLeftCollapsed ? "library-item--collapsed" : ""
                  }`}
                >
                  <div className={`library-item__thumb ${item.variant}`}>
                    {item.type === "featured" ? (
                      <Heart size={18} fill="currentColor" />
                    ) : (
                      <img src={item.image} alt={item.title} />
                    )}
                  </div>

                  {!isLeftCollapsed && (
                    <div className="library-item__content">
                      <h3>{item.title}</h3>
                      <p>{item.subtitle}</p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </aside>

          <section className="center-panel panel panel--scrollable">
            <div className="profile-hero">
              <div className="profile-hero__content">
                <div className="profile-hero__image-wrap">
                  <img
                    src={personalInfo.image}
                    alt={personalInfo.name}
                    className="profile-hero__image"
                  />
                </div>

                <div className="profile-hero__text">
                  <p className="profile-hero__label">Profile</p>
                  <h1 className="profile-hero__name">
                    {personalInfo.displayName}
                  </h1>
                  <p className="profile-hero__stats">
                    {personalInfo.profileStats}
                  </p>
                </div>
              </div>
            </div>

            <div className="profile-toolbar">
              <button
                className="toolbar-icon-button"
                aria-label="Settings"
                type="button"
              >
                <Settings size={22} />
              </button>

              <button
                className="toolbar-icon-button"
                aria-label="More"
                type="button"
              >
                <MoreHorizontal size={22} />
              </button>
            </div>

            <section className="content-section">
              <div className="section-heading">
                <div>
                  <h2>Top Services</h2>
                </div>

                <button className="show-all-button" type="button">
                  Show all
                </button>
              </div>

              <div className="services-grid">
                {topServices.map((service) => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="service-card service-card--link"
                  >
                    <div className="service-card__image-wrap">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="service-card__image"
                      />
                    </div>

                    <span className="service-card__play" aria-hidden="true">
                      <Play size={18} fill="currentColor" />
                    </span>

                    <div className="service-card__content">
                      <h3>{service.title}</h3>
                      <p>{service.subtitle}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="content-section">
              <div className="section-heading">
                <div>
                  <h2>Top Tech Stacks</h2>
                </div>

                <button className="show-all-button" type="button">
                  Show all
                </button>
              </div>

              <div className="stack-table">
                {topTechStacks.map((stack, index) => (
                  <article key={stack.title} className="stack-row">
                    <div className="stack-row__main">
                      <span className="stack-row__rank">{index + 1}</span>

                      <div className="stack-row__cover">
                        <img src={stack.image} alt={stack.title} />
                      </div>

                      <div className="stack-row__meta">
                        <h3>{stack.title}</h3>
                        <p>{stack.subtitle}</p>
                      </div>
                    </div>

                    <span className="stack-row__project">{stack.project}</span>
                    <span className="stack-row__time">{stack.length}</span>
                  </article>
                ))}
              </div>
            </section>

            <section className="content-section">
              <div className="section-heading">
                <div>
                  <h2>Projects &amp; Work</h2>
                </div>

                <button className="show-all-button" type="button">
                  Show all
                </button>
              </div>

              <div className="playlist-grid">
                {projectsPlaylists.map((project) => (
                  <article key={project.title} className="playlist-card">
                    <div className="playlist-card__image-wrap">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="playlist-card__image"
                      />
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.subtitle}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="content-section">
              <div className="section-heading">
                <div>
                  <h2>Experience</h2>
                  <p>Companies and roles</p>
                </div>

                <button className="show-all-button" type="button">
                  Show all
                </button>
              </div>

              <div className="circle-grid">
                {experienceCompanies.map((company) => (
                  <article key={company.title} className="circle-card">
                    <div className="circle-card__image-wrap">
                      <img
                        src={company.image}
                        alt={company.title}
                        className="circle-card__image"
                      />
                    </div>
                    <h3>{company.title}</h3>
                    <p>{company.subtitle}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="content-section content-section--last">
              <div className="section-heading">
                <div>
                  <h2>Currently Learning</h2>
                </div>

                <button className="show-all-button" type="button">
                  Show all
                </button>
              </div>

              <div className="circle-grid">
                {currentlyLearning.map((item) => (
                  <article key={item.title} className="circle-card">
                    <div className="circle-card__image-wrap">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="circle-card__image"
                      />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                  </article>
                ))}
              </div>
            </section>
          </section>

          <aside
            className={`right-sidebar panel ${
              isRightCollapsed ? "right-sidebar--collapsed" : ""
            }`}
          >
            <div className="right-sidebar__header">
              <button
                className="toolbar-icon-button"
                onClick={() => setIsRightCollapsed((prev) => !prev)}
                aria-label="Toggle right sidebar"
                type="button"
              >
                {isRightCollapsed ? (
                  <ChevronLeft size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>
            </div>

            {!isRightCollapsed && (
              <>
                <div className="right-sidebar__cover-card">
                  <img
                    src={personalInfo.coverImage}
                    alt={currentSong?.title || personalInfo.name}
                  />
                </div>

                <div className="right-sidebar__identity">
                  <div>
                    <h3>{personalInfo.name}</h3>
                    <p>{personalInfo.role}</p>
                  </div>

                  <button
                    className="toolbar-icon-button toolbar-icon-button--small"
                    aria-label="Add item"
                    type="button"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <div className="info-card">
                  <div className="info-card__header">
                    <h4>Quick Links</h4>
                  </div>

                  <div className="quick-links">
                    <a href="#projects" className="quick-link-item">
                      <Briefcase size={16} />
                      <span>Projects</span>
                    </a>
                    <a href="#skills" className="quick-link-item">
                      <Code2 size={16} />
                      <span>Skills</span>
                    </a>
                    <a href="#experience" className="quick-link-item">
                      <FolderGit2 size={16} />
                      <span>Experience</span>
                    </a>
                    <a href="#contact" className="quick-link-item">
                      <Mail size={16} />
                      <span>Contact</span>
                    </a>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-card__header">
                    <h4>Socials</h4>
                    <span>Connect</span>
                  </div>

                  <div className="social-list">
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noreferrer"
                      className="social-item"
                    >
                      <Github size={18} />
                      <div>
                        <strong>GitHub</strong>
                        <span>See code and repositories</span>
                      </div>
                    </a>

                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="social-item"
                    >
                      <Linkedin size={18} />
                      <div>
                        <strong>LinkedIn</strong>
                        <span>View profile and experience</span>
                      </div>
                    </a>
                  </div>
                </div>
              </>
            )}
          </aside>
        </div>

        <footer className="player-bar">
          <div className="player-bar__track">
            <img
              src={currentSong?.cover || personalInfo.coverImage}
              alt={currentSong?.title || personalInfo.name}
            />

            <div>
              <strong>{currentSong?.title || personalInfo.currentFocus}</strong>
              <span>{currentSong?.artist || personalInfo.role}</span>
            </div>

            <button
              className="toolbar-icon-button toolbar-icon-button--small"
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              onClick={() => setIsFavorite((prev) => !prev)}
              type="button"
            >
              <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="player-bar__center">
            <div className="player-controls">
              <button
                className={`player-control ${isShuffle ? "is-active" : ""}`}
                aria-label="Shuffle"
                onClick={() => setIsShuffle((prev) => !prev)}
                type="button"
              >
                <Shuffle size={16} />
              </button>

              <button
                className="player-control"
                aria-label="Previous"
                onClick={handlePrevious}
                type="button"
              >
                <SkipBack size={18} fill="currentColor" />
              </button>

              <button
                className="player-control player-control--play"
                aria-label={isPlaying ? "Pause" : "Play"}
                onClick={togglePlay}
                type="button"
              >
                {isPlaying ? (
                  <Pause size={18} fill="currentColor" />
                ) : (
                  <Play size={18} fill="currentColor" />
                )}
              </button>

              <button
                className="player-control"
                aria-label="Next"
                onClick={handleNext}
                type="button"
              >
                <SkipForward size={18} fill="currentColor" />
              </button>

              <button
                className={`player-control ${isRepeat ? "is-active" : ""}`}
                aria-label="Repeat"
                onClick={() => setIsRepeat((prev) => !prev)}
                type="button"
              >
                <Repeat size={16} />
              </button>
            </div>

            <div className="player-progress">
              <span>{formatTime(currentTime)}</span>

              <input
                className="player-progress__slider"
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                aria-label="Seek track"
              />

              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="player-bar__actions">
            <button
              className="player-control"
              aria-label="Microphone"
              type="button"
            >
              <Mic2 size={16} />
            </button>

            <button className="player-control" aria-label="Queue" type="button">
              <ListMusic size={16} />
            </button>

            <button
              className="player-control"
              aria-label="Connect"
              type="button"
            >
              <MonitorPlay size={16} />
            </button>

            <button className="player-control" aria-label="Link" type="button">
              <LinkIcon size={16} />
            </button>

            <div className="volume-wrap">
              <Volume2 size={16} />

              <input
                className="volume-bar"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                aria-label="Volume"
              />
            </div>

            <button
              className="player-control"
              aria-label="Expand"
              type="button"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default Home;
