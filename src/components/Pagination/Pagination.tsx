import classNames from 'classnames';
import "./Pagination.scss";

type Props = {
  currentPage: number,
  setSearchWith: (key: string, value: string | number) => void,
  productsAmount: number;
}

const ITEMS_PER_PAGE = 9;


export const Pagination: React.FC<Props> = ({ currentPage, productsAmount, setSearchWith }) => {
  function getPages() {
    const pagesAmount = Math.ceil(productsAmount / ITEMS_PER_PAGE);
    const pagesButtons = [];

    for (let number = 1; number <= pagesAmount; number++) {
      pagesButtons.push(number);
    }

    return pagesButtons;
  }

  return (
    <div className="pagination">
      <button
        onClick={() => setSearchWith('page', currentPage - 1)}
        disabled={currentPage === 1}
        className={classNames(
          "pagination__arrow-btn pagination__arrow-btn--prev",
          { 'pagination__arrow-btn--disabled': currentPage === 1 }
        )}
      >
        <div className="pagination__arrow-inside pagination__arrow-inside--prev"></div>
      </button>
      <div className="pagination__pages">
        {getPages().map(page => (
          <button
            key={page}
            className={classNames(
              "pagination__page",
              { "pagination__page--active": currentPage === page }
            )}
            onClick={() => setSearchWith('page', page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => setSearchWith('page', currentPage + 1)}
        className={classNames(
          "pagination__arrow-btn",
          { 'pagination__arrow-btn--disabled': currentPage === getPages().length }
        )}
      >
        <div className="pagination__arrow-inside"></div>
      </button>
    </div>
  );
}
