'use client';
import { Tabs } from '@/types/Tabs';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, { Fragment } from 'react';

interface Props {
  tabs: Tabs[];
}

export const TabGroup: React.FC<Props> = ({ tabs }) => {
  return (
    <Tab.Group as={Fragment}>
      <Tab.List className={'flex items-center justify-center gap-12'}>
        {tabs.map((tab) => {
          return (
            <Tab as={Fragment} key={tab.name}>
              {({ selected }) => (
                <button
                  className={clsx(
                    'relative text-2xl font-semibold px-4 py-3 rounded-t-md focus:outline-none',
                    selected ? 'text-white' : 'text-alpha-highlight-light',
                    `${tab.name}Tab`
                  )}
                >
                  {tab.name}
                  {selected && (
                    <motion.div
                      className="absolute w-full bottom-0 left-0 text-comBravo flex justify-center h-[2px] bg-alpha-light-800"
                      layoutId="highlight-desktop"
                      layout="position"
                      transition={{
                        type: 'spring',
                        duration: 0.05,
                        stiffness: 45,
                        damping: 10
                      }}
                    ></motion.div>
                  )}
                </button>
              )}
            </Tab>
          );
        })}
      </Tab.List>
      <Tab.Panels as={Fragment}>
        {tabs.map((tab) => (
          <Tab.Panel as={Fragment} key={tab.name}>
            {tab.content}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
