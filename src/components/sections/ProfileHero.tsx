import { motion } from "framer-motion";
import { personalInfo } from "../../data/personal";

function ProfileHero() {
  return (
    <section className="profile-hero">
      <div className="profile-hero__overlay" />

      <motion.div
        className="profile-hero__content"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="profile-hero__image-wrap">
          <img
            src={personalInfo.image}
            alt={personalInfo.name}
            className="profile-hero__image"
          />
        </div>

        <div className="profile-hero__text">
          <p className="profile-hero__label">{personalInfo.label}</p>

          <h1 className="profile-hero__name">{personalInfo.name}</h1>

          <p className="profile-hero__role">{personalInfo.role}</p>

          <div className="profile-hero__stats">
            {personalInfo.stats.map((stat) => (
              <span key={stat} className="profile-hero__stat">
                {stat}
              </span>
            ))}
          </div>

          <p className="profile-hero__description">
            {personalInfo.description}
          </p>

          <div className="profile-hero__actions">
            <a
              href="#projects"
              className="profile-hero__button profile-hero__button--primary"
            >
              {personalInfo.ctaPrimary}
            </a>

            <a
              href="/resume/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="profile-hero__button profile-hero__button--secondary"
            >
              {personalInfo.ctaSecondary}
            </a>

            <a
              href="#contact"
              className="profile-hero__button profile-hero__button--ghost"
            >
              {personalInfo.ctaTertiary}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default ProfileHero;
