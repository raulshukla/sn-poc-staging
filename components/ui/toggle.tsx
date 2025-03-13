import { cn } from '@/lib/utils';
import React from 'react'

type ToggleSwitchProps = {
    checked: boolean;
    className?: string;
    onCheckedChange: (checked: boolean) => void;
    variant?: 'default' | 'dark';
    labels?: string[];
  };

const Toggle: React.FC<ToggleSwitchProps> = ({ checked, className, onCheckedChange, variant = 'default', labels }) => {
  return (
    <div className={cn('relative flex flex-row cursor-pointer transition-all h-9 rounded-full border p-0.5 min-w-16 text-[12px] font-[400] text-[#333333]', checked ? 'border-primary' : 'border-gray-400',  className)} onClick={() => onCheckedChange(!checked)}>
        <div className={cn('h-full rounded-full contain-content flex justify-center items-center px-4', !checked && 'bg-gray-400 text-secondary')}>
            <p>{labels && labels[0]}</p>
        </div>
        <div className={cn('h-full rounded-full flex justify-center items-center px-4', checked && 'bg-primary text-secondary')}>
            <p>{labels && labels[1]}</p>
        </div>
    </div>
  )
}

export default Toggle;