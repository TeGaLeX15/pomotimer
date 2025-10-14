import { Tabs, TabsList, TabsTrigger } from '../tabs';

type Period = 'week' | 'month' | 'year';

interface PeriodSelectorProps {
  value: Period;
  onChange: (value: Period) => void;
  translations: {
    week: string;
    month: string;
    year: string;
  };
}

export function PeriodSelector({ value, onChange, translations }: PeriodSelectorProps) {
  return (
    <Tabs value={value} onValueChange={(v: string) => onChange(v as Period)} className="mb-6">
      <TabsList className="grid w-full grid-cols-3 rounded-2xl">
        <TabsTrigger value="week" className="rounded-xl">{translations.week}</TabsTrigger>
        <TabsTrigger value="month" className="rounded-xl">{translations.month}</TabsTrigger>
        <TabsTrigger value="year" className="rounded-xl">{translations.year}</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
