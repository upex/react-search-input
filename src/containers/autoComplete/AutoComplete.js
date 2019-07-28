/* eslint-disable react/prop-types, react/jsx-handler-names */
import React, { useState, useEffect } from 'react';
import './AutoComplete.css';
import AutoInput from '../../components/autoInput/AutoInput';
import Card from '../../components/card/Card';

const  AutoComplete = ({ inputRef, suggestions }) => {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [autoInput, setAutoInput] = useState('');
  const [allRefs, seRef] = useState({});

  useEffect(() => {
    setFilteredSuggestions(suggestions);
  }, [suggestions]);

  useEffect(() => {
    selectUser();
  }, [activeSuggestion]);

  useEffect(() => {
    const refs = filteredSuggestions.reduce((acc, value) => {
      acc[value.id] = React.createRef();
      return acc;
    }, {});
    seRef(refs);
  }, [filteredSuggestions]);

  function getFilteredSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const filterArray = suggestions.filter(obj => Object.keys(obj).some(key => {
      let text = obj[key];
      if (typeof obj[key] !== 'string') {
        text = obj[key].join(',');
      }
      return text.toLowerCase().indexOf(inputValue) !== -1;
    }));
    return inputLength === 0 ? [] : filterArray;
  };

  function handleOnClick(id) {
    const selecetdUser = filteredSuggestions.find(item=> item.id === id);
    setShowSuggestions(false);
    if (selecetdUser && allRefs[selecetdUser.id] && allRefs[selecetdUser.id].current) {
      const index = filteredSuggestions.findIndex(item=> item.id === id)
      if(index > -1) {
        setActiveSuggestion(index);
      }
      allRefs[selecetdUser.id].current.scrollIntoView({behavior: "smooth", block: "nearest"});
    }
  }
  function handleOnChange(e) {
    const autoInput = e.target.value || '';
    let filteredSuggestions
    if(autoInput) {
      filteredSuggestions = getFilteredSuggestions(autoInput);
      setShowSuggestions(true);
    } else {
      setActiveSuggestion('');
      filteredSuggestions = suggestions;
      setShowSuggestions(false);
    }
    setFilteredSuggestions(filteredSuggestions);
    setAutoInput(autoInput);
  }
  function handleOnFocus(e) {
    setActiveSuggestion('');
    handleOnChange(e);
  }
  function clearText() {
    setActiveSuggestion('');
    setAutoInput('');
  }
  function handleOnBlur() {
    setActiveSuggestion('');
    setShowSuggestions(false);
  }
  function selectUser() {
    const selecetdUser = filteredSuggestions[activeSuggestion];
    if(selecetdUser && autoInput) {
      setAutoInput(selecetdUser.name);
      if(allRefs[selecetdUser.id] && allRefs[selecetdUser.id].current) {
        allRefs[selecetdUser.id].current.scrollIntoView({behavior: "smooth", block: "nearest"});
      }
    }
  }
  function handleOnMouseOver(id) {
    const selecetdUser = filteredSuggestions.find(item=> item.id === id);
    if (selecetdUser && allRefs[selecetdUser.id] && allRefs[selecetdUser.id].current) {
      const index = filteredSuggestions.findIndex(item=> item.id === id)
      if(index > -1) {
        setActiveSuggestion(index);
      }
      allRefs[selecetdUser.id].current.scrollIntoView({behavior: "smooth", block: "nearest"});
    }
  }
  
  function handleOnMouseOut() {
    setActiveSuggestion('');
  }
  function handleOnKeyDown(e) {
    if(!autoInput) return;
    if (e.keyCode === 13) {
      setActiveSuggestion(activeSuggestion);
      setShowSuggestions(false);
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        setActiveSuggestion(filteredSuggestions.length - 1);
        return;
      }
      if (activeSuggestion === '') {
        setActiveSuggestion(filteredSuggestions.length - 1);
      } else {
        setActiveSuggestion(activeSuggestion - 1);
      }
    } else if (e.keyCode === 40) {
      if (activeSuggestion === filteredSuggestions.length - 1) {
        setActiveSuggestion(0);
        return;
      }
      if (activeSuggestion === '') {
        setActiveSuggestion(0);
      } else {
        setActiveSuggestion(activeSuggestion + 1);
      }
    }
    if (activeSuggestion > suggestions.length -1) setActiveSuggestion(0);
  }

  function renderUI() {
    let suggestionsListComponent;
    if (showSuggestions) {
      if (filteredSuggestions.length) {
        suggestionsListComponent =(<>
          {filteredSuggestions.map((item, index) => (
            <Card
            key={item.id}
            activeSuggestion={activeSuggestion===index ? true : false}
            handleOnClick={handleOnClick}
            handleOnMouseOut={handleOnMouseOut}
            handleOnMouseOver={handleOnMouseOver}
            ref={allRefs[item.id]}
            item={item} />
          ))
          }
           </>);
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            No User Found
          </div>
        );
      }
    }
    return  suggestionsListComponent;
  }
  return (
    <div className="auto-suggest-wrapper">
       { autoInput && <span className="clearText" onClick={clearText}>X</span> }
      <AutoInput
      placeholder="Search users by ID, address, name..."
      handleOnChange={handleOnChange}
      handleOnFocus={handleOnFocus}
      handleOnBlur={handleOnBlur}
      handleOnKeyDown={handleOnKeyDown}
      value={autoInput}
      inputRef={inputRef}/>
      <div className="suggestion-options">
      {renderUI()}
      </div>
    </div>
  );
}

export default AutoComplete;