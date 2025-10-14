import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  date: string;
  day: string;
  sessions: number;
  minutes: number;
}

interface StatsChartProps {
  data: ChartData[];
  color: string;
  isDark: boolean;
}

export function StatsChart({ data, color, isDark }: StatsChartProps) {
  return (
    <div className="w-full overflow-x-auto -mx-2 px-2">
      <div className="min-w-[300px]">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={isDark ? '#404040' : '#e5e5e5'}
              vertical={false}
            />
            <XAxis 
              dataKey="day" 
              stroke={isDark ? '#737373' : '#a3a3a3'}
              style={{ fontSize: '12px' }}
              tick={{ fill: isDark ? '#737373' : '#a3a3a3' }}
            />
            <YAxis 
              stroke={isDark ? '#737373' : '#a3a3a3'}
              style={{ fontSize: '12px' }}
              tick={{ fill: isDark ? '#737373' : '#a3a3a3' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: isDark ? '#262626' : '#ffffff',
                border: '1px solid',
                borderColor: isDark ? '#404040' : '#e5e5e5',
                borderRadius: '12px',
                color: isDark ? '#ffffff' : '#171717',
              }}
            />
            <Area 
              type="monotone"
              dataKey="sessions" 
              stroke={color}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSessions)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
