import { CategoryPreview } from '../../components/CategoryPreview/CategoryPreview';
import { Product } from '../../helpers/types';
import "./HomePage.scss";

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="home-page__section">
        <CategoryPreview
          isFirstBlock={true}
          title='Our Popular Bouquet Collection'
          margin=''
          reverse={true}
        />
      </section>

      <section className="home-page__section">
        <CategoryPreview
          title='20% Off Your First Purchase at Our Store!'
          margin='--margin-left'
          reverse={false}
          filterFunc={(product: Product) => product.discount === 20}
        />
      </section>

      <section className="home-page__section">
        <CategoryPreview
          title='Greening Your Space, Plant for Your Home'
          margin='--margin-right'
          reverse={true}
          filterFunc={(product: Product) => product.type === "Potted"}
        />
      </section>
    </div>
  )
}
