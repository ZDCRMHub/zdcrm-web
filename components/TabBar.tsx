import React from 'react';

interface TabBarProps {
  tabs: Array<{name: string; count: number}>;
  onTabClick: (tab: string) => void;
  activeTab: string;
}

const TabBar: React.FC<TabBarProps> = ({tabs, onTabClick, activeTab}) => {
  return (
    <div className='flex border-b border-gray-200'>
      {tabs.map(tab => (
        <button
          key={tab.name}
          className={`pb-2 font-medium text-sm transition-colors duration-300 focus:outline-none relative px-5 ${
            activeTab === tab.name
              ? 'text-custom-blue'
              : 'text-custom-grey hover:text-gray-700'
          }`}
          onClick={() => onTabClick(tab.name)}>
          {tab.name}
          <span className='ml-2 text-custom-grey px-2 py-0.5 rounded text-xs border-[0.5px] border-custom-grey'>
            {tab.count}
          </span>
          {activeTab === tab.name && (
            <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-custom-blue'></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
