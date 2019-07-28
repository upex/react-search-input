import React from 'react';
import './Card.css';

const CardList = React.forwardRef((props, ref) => {
  const activeClass = props.activeSuggestion ? 'active-suggestion' : '';
  return (
    <>
      <div
      ref={ref}
      className={`suggestion-card ${activeClass}`}
      onMouseOver={()=>props.handleOnMouseOver(props.item.id)}
      onMouseOut={()=>props.handleOnMouseOut()}
      onMouseDown={()=>props.handleOnClick(props.item.id)}>
        <label><strong>{props.item.id}</strong></label>
        <p className="list-name">{props.item.name}</p>
        <address>{props.item.address},  {props.item.pincode}, {props.item.items.join(', ')}</address>
      </div>
    </>
  );
})

export default CardList;