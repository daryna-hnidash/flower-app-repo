export const QuantityHandler = () => {
  return (
    <div className="quantity">
      Quantity
      <div className="quantity__buttons">
        <button
          className='quantity__min-btn'
        >
          -
        </button>
        1
        <button
          className='quantity__plus-btn'
        >
          +
        </button>
      </div>
    </div>
  )
}
