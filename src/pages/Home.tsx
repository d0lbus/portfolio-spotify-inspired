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
import { useState } from "react";

function Home() {
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);
  return (
    <main className="app-page">
      <div className="spotify-app-shell">
        <header className="topbar">
          <div className="topbar__nav">
            <button className="icon-button" aria-label="Previous">
              <ChevronLeft size={18} />
            </button>
            <button className="icon-button" aria-label="Next">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="topbar__center">
            <button className="topbar__home" aria-label="Home">
              <HomeIcon size={18} />
            </button>

            <div className="topbar__search">
              <Search size={18} />
              <input type="text" placeholder="What do you want to play?" />
              <span className="topbar__search-divider" />
              <Library size={18} />
            </div>
          </div>
          <div className="topbar__actions">
            <button className="icon-button" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <button className="icon-button" aria-label="Profile">
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
            <div className="left-sidebar__compact-top">
              <button
                className="compact-icon-button"
                aria-label="Toggle left sidebar"
                onClick={() => setIsLeftCollapsed((prev) => !prev)}
              >
                {isLeftCollapsed ? (
                  <ChevronRight size={18} />
                ) : (
                  <Library size={18} />
                )}
              </button>

              {!isLeftCollapsed && (
                <button className="compact-icon-button" aria-label="Add item">
                  <Plus size={18} />
                </button>
              )}
            </div>

            {!isLeftCollapsed && (
              <>
                <div className="left-sidebar__header">
                  <div>
                    <p className="sidebar-title">Your Library</p>
                  </div>

                  <button
                    className="pill-button pill-button--soft"
                    onClick={() => setIsLeftCollapsed((prev) => !prev)}
                    aria-label="Collapse left sidebar"
                  >
                    <ChevronLeft size={16} />
                    <span>Collapse</span>
                  </button>
                </div>

                <div className="left-sidebar__filters">
                  <button className="filter-pill">Playlists</button>
                  <button className="filter-pill">Projects</button>
                  <button className="filter-pill">Stacks</button>
                  <button className="filter-pill">Certificates</button>
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
              <button className="toolbar-icon-button" aria-label="Settings">
                <Settings size={22} />
              </button>
              <button className="toolbar-icon-button" aria-label="More">
                <MoreHorizontal size={22} />
              </button>
            </div>

            <section className="content-section">
              <div className="section-heading">
                <div>
                  <h2>Top Services</h2>
                </div>
                <button className="show-all-button">Show all</button>
              </div>

              <div className="services-grid">
                {topServices.map((service) => (
                  <article key={service.title} className="service-card">
                    <div className="service-card__image-wrap">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="service-card__image"
                      />
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.subtitle}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="content-section">
              <div className="section-heading">
                <div>
                  <h2>Top Tech Stacks</h2>
                  <p>Only visible to you</p>
                </div>
                <button className="show-all-button">Show all</button>
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
                <button className="show-all-button">Show all</button>
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
                <button className="show-all-button">Show all</button>
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
                <button className="show-all-button">Show all</button>
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
              {!isRightCollapsed}

              <button
                className="toolbar-icon-button"
                onClick={() => setIsRightCollapsed((prev) => !prev)}
                aria-label="Toggle right sidebar"
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
                  <img src={personalInfo.coverImage} />
                </div>

                <div className="right-sidebar__identity">
                  <div>
                    <h3>{personalInfo.name}</h3>
                    <p>{personalInfo.role}</p>
                  </div>
                  <button
                    className="toolbar-icon-button toolbar-icon-button--small"
                    aria-label="Add item"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <div className="info-card">
                  <div className="info-card__header">
                    <h4>Quick Links</h4>
                    <span>Open all</span>
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
            <img src={personalInfo.coverImage} alt={personalInfo.name} />
            <div>
              <strong>{personalInfo.currentFocus}</strong>
              <span>{personalInfo.role}</span>
            </div>
            <button
              className="toolbar-icon-button toolbar-icon-button--small"
              aria-label="Favorite"
            >
              <Heart size={16} />
            </button>
          </div>

          <div className="player-bar__center">
            <div className="player-controls">
              <button className="player-control" aria-label="Shuffle">
                <Shuffle size={16} />
              </button>
              <button className="player-control" aria-label="Previous">
                <SkipBack size={18} fill="currentColor" />
              </button>
              <button
                className="player-control player-control--play"
                aria-label="Play"
              >
                <Play size={18} fill="currentColor" />
              </button>
              <button className="player-control" aria-label="Next">
                <SkipForward size={18} fill="currentColor" />
              </button>
              <button className="player-control" aria-label="Repeat">
                <Repeat size={16} />
              </button>
            </div>
            <div className="player-progress">
              <span>3:20</span>
              <div className="player-progress__bar">
                <span className="player-progress__fill" />
              </div>
              <span>5:12</span>
            </div>
          </div>

          <div className="player-bar__actions">
            <button className="player-control" aria-label="Microphone">
              <Mic2 size={16} />
            </button>
            <button className="player-control" aria-label="Queue">
              <ListMusic size={16} />
            </button>
            <button className="player-control" aria-label="Connect">
              <MonitorPlay size={16} />
            </button>
            <button className="player-control" aria-label="Link">
              <LinkIcon size={16} />
            </button>
            <div className="volume-wrap">
              <Volume2 size={16} />
              <div className="volume-bar">
                <span className="volume-bar__fill" />
              </div>
            </div>
            <button className="player-control" aria-label="Expand">
              <Maximize2 size={16} />
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default Home;
