import React from 'react';

interface Props {
  title: string;
  subtitle: string;
}

const Tile = ({ title, subtitle }: Props) => {
  return (
    <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
      <div className="relative mb-6 flex min-w-0 flex-col rounded-lg bg-white break-words shadow-lg xl:mb-0">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full max-w-full flex-1 flex-grow pr-4">
              <h5 className="text-blueGray-400 text-xs font-bold uppercase">
                {title}
              </h5>

              <span className="text-xl font-bold">{subtitle}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tile;
