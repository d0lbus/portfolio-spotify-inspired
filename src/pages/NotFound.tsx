import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

function NotFound() {
  return (
    <main className="app-page">
      <section className="panel panel--scrollable not-found-page">
        <div className="not-found-page__content">
          <p className="not-found-page__eyebrow">404 Error</p>

          <h1 className="not-found-page__title">Page not found</h1>

          <p className="not-found-page__description">
            The page you are trying to open does not exist or may have been
            moved.
          </p>

          <div className="not-found-page__actions">
            <Link
              to="/"
              className="not-found-page__button not-found-page__button--primary"
            >
              <Home size={18} />
              <span>Back to Home</span>
            </Link>

            <button
              type="button"
              className="not-found-page__button not-found-page__button--secondary"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={18} />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
