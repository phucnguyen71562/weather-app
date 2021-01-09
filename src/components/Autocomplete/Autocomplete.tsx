import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface Props {
  suggestions?: {
    id?: number;
    name?: string;
    state?: string;
    country?: string;
    coord?: {
      lon?: number;
      lat?: number;
    };
  }[];
  setShowModal: (params: boolean) => void;
  onChooseCity: (city: any) => void;
}

function Autocomplete({ suggestions, setShowModal, onChooseCity }: Props) {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;

    const data: any = suggestions!
      .filter(
        (suggestion) =>
          suggestion.name!.toLowerCase().indexOf(value.toLowerCase()) > -1
      )
      .slice(0, 10);

    setFilteredSuggestions(data);
    setShowSuggestions(true);
    setUserInput(value);
  };

  const handleClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ): void => {
    const data = filteredSuggestions.find(
      (suggestion: any) => (suggestion.id = e.currentTarget.value)
    );

    setUserInput(e.currentTarget.innerText);
    onChooseCity(data);
    setShowSuggestions(false);
  };

  const renderSuggestionsListComponent = () => {
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        return (
          <ul
            role="listbox"
            className="max-h-40 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
          >
            {filteredSuggestions.map(
              ({ id, name, country, coord: { lat, lon } }) => {
                return (
                  <li
                    className="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-blue-300"
                    key={id}
                    value={id}
                    onClick={handleClick}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="font-bold block truncate">
                        {id}{' '}
                        <span className="font-normal">
                          {name} - {country}{' '}
                        </span>
                        <span className="italic">{`(${lon} - ${lat})`}</span>
                      </span>
                    </div>
                  </li>
                );
              }
            )}
          </ul>
        );
      } else {
        return (
          <div className="rounded-md py-1 text-base leading-6 shadow-xs focus:outline-none sm:text-sm sm:leading-5">
            <em className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
              No suggestions
            </em>
          </div>
        );
      }
    }
  };

  return (
    <div className="bg-white px-4 p-4 sm:p-6 relative">
      <button
        className="absolute top-0 right-0 p-3 focus:outline-none"
        onClick={() => setShowModal(false)}
      >
        <FaTimes />
      </button>

      <div className="space-y-2">
        <label
          htmlFor="search"
          className="block text-sm leading-5 font-medium text-gray-700"
        >
          Search
        </label>
        <div className="relative mt-4">
          <span className="inline-block w-full rounded-md shadow-sm">
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm sm:leading-5">
                  <FaSearch />
                </span>
              </div>
              <input
                id="search"
                className="form-input block w-full pl-8 sm:text-sm sm:leading-5"
                placeholder="Type to search..."
                type="search"
                autoComplete="off"
                autoFocus
                onChange={handleChange}
                value={userInput}
              />
            </div>
          </span>

          <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
            {renderSuggestionsListComponent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Autocomplete;
