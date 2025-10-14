import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '../card';
import { Separator } from '../separator';

interface SettingsSectionProps {
  title: string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  description?: string;
  children: ReactNode;
}

export function SettingsSection({ 
  title, 
  icon: Icon, 
  iconColor, 
  iconBgColor,
  description,
  children 
}: SettingsSectionProps) {
  return (
    <Card className="p-4 md:p-6 rounded-3xl mb-4 border-neutral-200 dark:border-neutral-700">
      <div className="flex items-center gap-2 mb-2">
        <div 
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: iconBgColor }}
        >
          <Icon className="w-4 h-4" style={{ color: iconColor }} />
        </div>
        <h3 className="text-neutral-900 dark:text-white">{title}</h3>
      </div>
      {description && (
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">{description}</p>
      )}
      
      <Separator className="mb-4" />

      {children}
    </Card>
  );
}
