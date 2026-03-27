"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AdminCalendarProps {
  reservations: any[];
}

export default function AdminCalendar({ reservations }: AdminCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  const days = Array.from({ length: daysInMonth(year, month) }, (_, i) => i + 1);
  const startDay = firstDayOfMonth(year, month);
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const getReservationsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return reservations.filter(r => r.date === dateStr);
  };

  return (
    <div className="bg-surface-container rounded-md overflow-hidden shadow-sm border border-outline-variant/10">
      <header className="flex items-center justify-between p-6 border-b border-outline-variant/10 bg-surface">
        <h3 className="font-headline text-2xl text-on-surface">{monthName} <span className="text-on-surface-variant font-body font-light">{year}</span></h3>
        <div className="flex gap-2">
          <button title="Previous Month" onClick={prevMonth} className="p-2 hover:bg-surface-container rounded-full text-on-surface transition-colors"><ChevronLeft size={20} /></button>
          <button title="Next Month" onClick={nextMonth} className="p-2 hover:bg-surface-container rounded-full text-on-surface transition-colors"><ChevronRight size={20} /></button>
        </div>
      </header>

      <div className="grid grid-cols-7 border-b border-outline-variant/5">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
          <div key={d} className="p-3 text-center text-[10px] uppercase tracking-widest font-label text-on-surface-variant/60 font-bold border-r border-outline-variant/5 last:border-0">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {/* Fillers for previous month */}
        {[...Array(startDay)].map((_, i) => (
          <div key={`empty-${i}`} className="min-h-[120px] bg-surface-container-lowest/30 border-r border-b border-outline-variant/5"></div>
        ))}

        {/* Current month days */}
        {days.map(day => {
          const res = getReservationsForDay(day);
          const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
          
          return (
            <div key={day} className={`min-h-[120px] p-2 border-r border-b border-outline-variant/5 hover:bg-surface-container-high/20 transition-colors relative ${isToday ? 'bg-primary/5' : 'bg-surface'}`}>
              <span className={`text-xs font-label font-bold ${isToday ? 'bg-primary text-on-primary w-6 h-6 flex items-center justify-center rounded-full' : 'text-on-surface-variant/80'}`}>
                {day}
              </span>
              
              <div className="mt-2 space-y-1">
                {res.slice(0, 3).map(r => (
                  <div key={r.id} className="text-[9px] bg-primary-container/30 text-primary-container px-1.5 py-0.5 rounded-sm line-clamp-1 border border-primary/10">
                    <span className="font-bold">{r.time}</span> {r.guest_name}
                  </div>
                ))}
                {res.length > 3 && (
                  <div className="text-[8px] text-center text-on-surface-variant italic">
                    +{res.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
