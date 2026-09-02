import { motion, AnimatePresence } from 'framer-motion';
import { type Dispatch, type SetStateAction, useState, useEffect, useRef, type ReactNode } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface DropdownItem {
  text: string;
  icon?: any;
  value: string;
}

interface StaggeredDropDownProps {
  items: DropdownItem[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  className?: string;
  hasError?: boolean;
  id?: string;
  'aria-label'?: string;
}

export const StaggeredDropDown = ({
  items,
  selectedValue,
  onSelect,
  placeholder = 'Pilih opsi',
  className,
  hasError = false,
  id,
  'aria-label': ariaLabel,
}: StaggeredDropDownProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedItem = items.find((item) => item.value === selectedValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <motion.div animate={open ? 'open' : 'closed'} className="relative">
        <button
          type="button"
          id={id}
          aria-label={ariaLabel || placeholder}
          aria-expanded={open}
          aria-haspopup="listbox"
          onClick={() => setOpen((pv) => !pv)}
          className={cn(
            'flex h-11 w-full items-center justify-between gap-2 rounded-md bg-white px-3 py-2 text-slate-800 border border-neutral-300 transition-all hover:bg-neutral-50 hover:border-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
            hasError && 'border-red-400 focus-visible:ring-red-400',
            open && 'border-neutral-400'
          )}
        >
          <span className="text-sm font-medium truncate text-left">
            {selectedItem ? selectedItem.text : placeholder}
          </span>
          <motion.span variants={iconVariants} className="shrink-0 text-slate-400">
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </motion.span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              role="listbox"
              initial="closed"
              animate="open"
              exit="closed"
              variants={wrapperVariants}
              style={{ originY: 'top' }}
              className="absolute left-0 top-[115%] z-50 flex max-h-60 w-full flex-col gap-1 overflow-y-auto rounded-md bg-white p-1.5 border border-neutral-300 transition-all duration-200 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {items.map((item) => (
                <Option
                  key={item.value}
                  setOpen={setOpen}
                  Icon={item.icon}
                  text={item.text}
                  onClick={() => onSelect(item.value)}
                  isSelected={selectedValue === item.value}
                />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const Option = ({
  text,
  Icon,
  setOpen,
  onClick,
  isSelected,
}: {
  text: string;
  Icon?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClick: () => void;
  isSelected: boolean;
}) => {
  return (
    <motion.li
      role="option"
      aria-selected={isSelected}
      variants={itemVariants}
      onClick={() => {
        onClick();
        setOpen(false);
      }}
      className={cn(
        'flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-xs font-medium transition-colors',
        isSelected
          ? 'bg-neutral-100 text-neutral-900 font-semibold'
          : 'text-slate-700 hover:bg-neutral-100 hover:text-neutral-900'
      )}
    >
      <div className="flex items-center gap-2 truncate">
        {Icon && (
          <motion.span variants={actionIconVariants} className="shrink-0">
            <Icon size={14} />
          </motion.span>
        )}
        <span className="truncate">{text}</span>
      </div>
      {isSelected && <Check size={14} className="shrink-0 text-brand-500" />}
    </motion.li>
  );
};

export default StaggeredDropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.05,
      duration: 0.15,
    },
  },
  closed: {
    scaleY: 0,
    opacity: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.03,
      duration: 0.12,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
      duration: 0.15,
    },
  },
  closed: {
    opacity: 0,
    y: -8,
    transition: {
      when: 'afterChildren',
      duration: 0.1,
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
