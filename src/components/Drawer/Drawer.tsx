import React, { ReactElement } from 'react';
import { useGlobal } from '../../contexts/GlobalProvider';

interface Props {
  children: ReactElement;
  visible: boolean;
  setVisible: (params: boolean) => void;
}

function Drawer({ children, visible, setVisible }: Props) {
  const { isDesktop } = useGlobal();

  if (isDesktop || !visible) return null;

  return (
    <div className="fixed inset-0 overflow-hidden z-10">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <section className="absolute inset-y-0 right-0 max-w-full flex">
          <div className="relative w-screen">
            <div className="absolute top-0 right-0 pt-4 pr-2">
              <button
                aria-label="Close panel"
                className="text-gray-300 hover:text-black transition ease-in-out duration-150"
                onClick={() => setVisible(false)}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="h-full bg-white overflow-y-scroll">{children}</div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Drawer;
