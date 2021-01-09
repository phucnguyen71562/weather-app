import React, { useState } from 'react';
import suggestions from '../../assets/data/city.list.json';
import { Autocomplete } from '../Autocomplete';

interface Props {
  showModal: boolean;
  setShowModal: (params: boolean) => void;
  onAddCity: (city: any) => void;
}

function Modal({ showModal, setShowModal, onAddCity }: Props) {
  const [city, setCity] = useState({});

  const handleChooseCity = (params: any) => {
    setCity(params);
  };

  const handleClick = () => {
    setShowModal(false);
    onAddCity(city);
  };

  if (!showModal) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          onClick={() => setShowModal(false)}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <Autocomplete
            suggestions={suggestions}
            setShowModal={setShowModal}
            onChooseCity={handleChooseCity}
          />

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                onClick={handleClick}
              >
                Thêm
              </button>
            </span>
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                onClick={() => setShowModal(false)}
              >
                Hủy
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
