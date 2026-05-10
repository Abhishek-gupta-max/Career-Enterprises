import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { JobFilter } from './JobFilter';

export const JobFilterDrawer = ({ isOpen, onClose, filters, setFilters, onClear }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-midnight/60 backdrop-blur-sm z-[60]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-off-white dark:bg-dark-surface shadow-2xl z-[70] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-midnight dark:text-white font-outfit">Filters</h3>
                <button 
                  onClick={onClose}
                  className="p-2 bg-slate-100 dark:bg-dark-card rounded-xl text-slate-500 hover:text-midnight dark:hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>
              
              <JobFilter 
                filters={filters} 
                setFilters={setFilters} 
                onClear={onClear} 
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
