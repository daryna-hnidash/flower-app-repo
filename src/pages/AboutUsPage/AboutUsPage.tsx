import "./AboutUsPage.scss";

export function AboutUsPage() {
  return (
    <div className="about-us-page">
      <article className="about-us-page__article">
        <h2 className="about-us-page__title about-us-page__title--main">About Us</h2>
        <div className="about-us-page__content">
          <div>
            <p>
              Lily Love Store blossomed from a deep love for the delicate marvels of nature, creating a sanctuary where the elegance of flowers serves as a source of inspiration and joy. Every flower showcased in our store undergoes a rigorous selection process, guaranteeing that only the freshest and most vibrant blooms make it into our arrangements.
            </p>
            <br />
            <p>
              Our dedicated florists meticulously hand-select the freshest blossoms, expertly crafting enchanting arrangements that symbolize love, happiness, and the splendor of life's special moments. Whether you're seeking to surprise a cherished one or adorn an event, Lily Love Store is your ideal destination.
            </p>
          </div>

          <img
            src="./img/about-us-1.jpg"
            alt="Women with fresh flowers in the shop"
            className="about-us-page__img"
          />
        </div>
      </article>

      <article className="about-us-page__article about-us-page__article--2">
        <div className="about-us-page__content">
          <img
            src="./img/about-us-2.jpg"
            alt="Fresh flowers in the shop"
            className="about-us-page__img"
          />
          <div>
            <h3 className="about-us-page__title about-us-page__title--h3">
              Making Every Day Special
            </h3>
            <p className="about-us-page__text">
              Our goal is straightforward: to ensure each day is extraordinary and unforgettable for our valued customers. We are committed to delivering top-tier flowers, outstanding customer service, and a hassle-free online journey that instills confidence and satisfaction in your purchase. Thank you for selecting Lily Love Store. We eagerly anticipate enriching your life with our stunning bouquets and gifts, bringing joy and happiness to every moment
            </p>
          </div>
        </div>
      </article>
      <article className="about-us-page__article">
        <h2 className="about-us-page__title">Why choose us?</h2>
        <ul className="about-us-page__benefits-list">
          <li className="about-us-page__benefits-item">
            <span className="about-us-page__benefit">Stylish Bouquets: </span> Elevate any occasion with our stunning and stylish floral arrangements, meticulously crafted to impress and delight.
          </li>
          <li className="about-us-page__benefits-item">
            <span className="about-us-page__benefit">On-Time Delivery: </span> Count on us for prompt and reliable delivery, ensuring that your flowers arrive fresh and beautiful exactly when you need them.
          </li>
          <li className="about-us-page__benefits-item">
            <span className="about-us-page__benefit">Safe Payment: </span>
            Enjoy peace of mind with our secure payment options, providing a hassle-free and trustworthy transaction experience.
          </li>
          <li className="about-us-page__benefits-item">
            <span className="about-us-page__benefit">Subscription Tailored to Your Needs: </span>Simplify your life with our customizable subscription service, designed to meet your specific preferences and schedule.
          </li>
        </ul>
      </article>
    </div>
  )
}
