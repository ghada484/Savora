import { Link } from "react-router-dom";

import "./About.css";

function About() {
  return (
    <main className="about-page">

      <section className="about-hero">
        <div className="container">

          <span className="eyebrow">
            OUR STORY
          </span>

          <h1>
            Good food deserves
            <br />
            a beautiful table.
          </h1>

          <p>
            Savora is a modern restaurant experience
            built around thoughtful food, simple ordering
            and moments worth sharing.
          </p>

        </div>
      </section>

      <section className="about-story section">

        <div className="container about-story-grid">

          <div className="about-story-heading">

            <span className="eyebrow">
              WHY SAVORA
            </span>

            <h2 className="section-title">
              Food made for
              <br />
              everyday moments.
            </h2>

          </div>

          <div className="about-story-content">

            <p>
              We believe ordering food should feel as
              enjoyable as eating it.
            </p>

            <p>
              From discovering a new dish to placing an
              order, Savora brings everything together in
              one simple and thoughtful experience.
            </p>

            <p>
              Our menu combines familiar favorites with
              dishes inspired by different cuisines,
              giving everyone something worth coming back for.
            </p>

          </div>

        </div>

      </section>

      <section className="about-values section">

        <div className="container">

          <div className="about-values-header">

            <span className="eyebrow">
              OUR VALUES
            </span>

            <h2 className="section-title">
              What matters to us.
            </h2>

          </div>

          <div className="about-values-grid">

            <article className="about-value-card">

              <span>
                01
              </span>

              <h3>
                Quality
              </h3>

              <p>
                Every dish should feel carefully chosen,
                thoughtfully prepared and worth ordering.
              </p>

            </article>

            <article className="about-value-card">

              <span>
                02
              </span>

              <h3>
                Simplicity
              </h3>

              <p>
                Finding your favorite meal and placing an
                order should never feel complicated.
              </p>

            </article>

            <article className="about-value-card">

              <span>
                03
              </span>

              <h3>
                Experience
              </h3>

              <p>
                From the first click to the final bite,
                every part of Savora is designed with care.
              </p>

            </article>

          </div>

        </div>

      </section>

      <section className="about-cta section">

        <div className="container about-cta-inner">

          <div>

            <span className="eyebrow">
              READY TO EAT?
            </span>

            <h2>
              Discover your next favorite dish.
            </h2>

          </div>

          <Link
            to="/menu"
            className="primary-btn"
          >
            Explore Menu
          </Link>

        </div>

      </section>

    </main>
  );
}

export default About;