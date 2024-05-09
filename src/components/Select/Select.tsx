import classNames from 'classnames';
import { useState } from 'react';
import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Select.scss';
import "../../styles/components/reset-btn.scss";


type Props = {
  label: string,
  properties: string[],
  searchName: string,
  propertyList?: any[],
  setSearchWith: (key: string, value: string | number) => void,

};

export const Select: React.FC<Props> = ({
  label, properties, searchName, setSearchWith
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdown = useRef<HTMLUListElement>(null);
  const selectBtnIcon = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState('');

  const onSelectBtnBlur = () => {
    if (dropdown) {
      dropdown.current?.classList.remove('select__dropdown--visible');
    }

    if (selectBtnIcon) {
      selectBtnIcon.current?.classList.remove('select__icon--active');
    }
  };

  const onSelectBtnClick = () => {
    if (dropdown) {
      dropdown.current?.classList.toggle('select__dropdown--visible');
    }

    if (selectBtnIcon) {
      selectBtnIcon.current?.classList.toggle('select__icon--active');
    }
  };

  return (
    <div className="select__wrapper">
      <button
        type="button"
        aria-label="select-button"
        name="sortBy"
        id="sortBy"
        className="select__button"
        onClick={onSelectBtnClick}
        onBlur={onSelectBtnBlur}
      >
        <>
          {searchParams.has(searchName)
            ? searchParams.get(searchName)
            : label
          }
          <span
            className="select__icon"
            ref={selectBtnIcon}
          ></span>
        </>
      </button>
      <ul className="select__dropdown" ref={dropdown}>
        {properties?.length
          && (
            <>
              {properties.map(prop => (
                <li key={prop} className="select__li">
                  <button
                    type="button"
                    className={classNames(
                      "select__option",
                      { "select__option--active": prop === active }
                    )}
                    onMouseDown={() => {
                      setSearchWith(searchName, prop);
                      setActive(prop)
                    }}
                  >
                    {prop}
                  </button>
                </li>
              ))}
            </>
          )}
      </ul>
      {searchParams.has(searchName) && (
        <button
          className="reset-btn"
          onClick={() => {
            searchParams.delete(searchName); setSearchParams(searchParams)
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
};
