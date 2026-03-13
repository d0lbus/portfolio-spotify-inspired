import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { topServices } from "../data/personal";

function ServiceDetails() {
  const { slug } = useParams<{ slug: string }>();

  const service = useMemo(
    () => topServices.find((item) => item.slug === slug),
    [slug],
  );

  if (!service) {
    return (
      <main className="app-page">
        <div className="panel panel--scrollable" style={{ padding: "2rem" }}>
          <h1>Service not found</h1>
          <Link to="/">Back to home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="app-page">
      <section className="panel panel--scrollable" style={{ padding: "2rem" }}>
        <Link to="/">← Back</Link>

        <div style={{ marginTop: "1.5rem" }}>
          <img
            src={service.image}
            alt={service.title}
            style={{
              width: "100%",
              maxWidth: "420px",
              borderRadius: "18px",
              display: "block",
              marginBottom: "1.5rem",
            }}
          />

          <h1>{service.title}</h1>
          <p>{service.subtitle}</p>
        </div>
      </section>
    </main>
  );
}

export default ServiceDetails;
