import React, { useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import NoImg from '../../assets/images/no-img.png';
import { Modal } from '../Modal';
import { StyledContainer, StyledItem } from './Cities.style';

interface Props {
  cities: {
    data: {
      id: number;
      name: string;
      image?: string;
    }[];
    current: number;
  };
  onSetCurrentCity: (city: object) => void;
  onAddCity: (city: object) => void;
  onRemoveCity: (city: object) => void;
}

function Cities({ cities, onSetCurrentCity, onAddCity, onRemoveCity }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <StyledContainer className="grid gap-6 md:gap-12 h-40 md:h-64 mt-8">
        {cities.data.map((city) => (
          <StyledItem
            key={city.id}
            className={`flex flex-col md:justify-center md:items-center relative overflow-hidden cursor-pointer ${
              cities.current === city.id ? 'mt-0' : 'mt-7'
            }`}
          >
            <button
              className="absolute top-0 right-0 z-10 focus:outline-none lg:opacity-0 transition-opacity duration-300 ease-in-out"
              onClick={() => onRemoveCity(city)}
            >
              <FaTimesCircle className="text-red-600 bg-white rounded-full" />
            </button>

            <div
              className="block w-full h-full overflow-hidden rounded-xl md:rounded-3xl"
              onClick={() => onSetCurrentCity(city)}
            >
              <img
                src={city?.image || NoImg}
                alt={city.name}
                className="w-full h-full object-cover transform transition-transform duration-200 hover:scale-110"
              />
            </div>
            <p
              className="w-full text-xs md:text-sm text-center font-roboto font-medium mt-4 text-blue-900 truncate block"
              onClick={() => onSetCurrentCity(city)}
            >
              {city.name}
            </p>
          </StyledItem>
        ))}

        {cities.data.length < 4 && (
          <div
            className="flex flex-col justify-center items-center border-2 border-solid border-blue-900 rounded-xl md:rounded-3xl w-40 h-24 md:h-48 cursor-pointer text-blue-900 mt-7 mb-auto hover:border-blue-800 hover:text-blue-800"
            onClick={() => setShowModal(true)}
          >
            <p className="text-3xl md:text-4xl">+</p>
            <p className="md:mt-6 text-sm md:text-md font-medium text-center">
              Add city
            </p>
          </div>
        )}
      </StyledContainer>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        onAddCity={onAddCity}
      />
    </>
  );
}

export default Cities;
