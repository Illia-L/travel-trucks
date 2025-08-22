import { useEffect, useState } from 'react';
import Icon from '../ui/Icon/Icon';
import css from './DatePicker.module.css';
import clsx from 'clsx';

export type ISODateString = `${number}-${number}-${number}`;

type DatePickerProps = {
  selectedDate: ISODateString | undefined;
  onPickDate: (date: ISODateString) => void;
};

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'say', 'sun'];
const displayedDaysSlots = Array.from({ length: 35 }).fill(0);
const DAY = 1000 * 60 * 60 * 24;

const monthInitialDate = new Date().setDate(1);

function DatePicker({ selectedDate, onPickDate }: DatePickerProps) {
  const [monthDate, setMonthDate] = useState<number>(monthInitialDate);

  useEffect(() => {
    if (!selectedDate) return;

    setMonthDate(new Date(selectedDate).setDate(1));
  }, [selectedDate]);

  const formatedMonthDate = new Date(monthDate);
  const currentMonthNumber = formatedMonthDate.getMonth();
  const displayedMonth = formatedMonthDate.toLocaleString('en-US', {
    month: 'long',
  });
  const displayedYear = formatedMonthDate.getFullYear();
  const weekdayMonthStartswith = formatedMonthDate.getDay();
  const displayedDatesStartShift = weekdayMonthStartswith - 1;
  const firstDisplayedDate = monthDate - displayedDatesStartShift * DAY;

  const displayedDatesArr: ISODateString[] = displayedDaysSlots.map(
    (_, i) =>
      new Date(firstDisplayedDate + i * DAY)
        .toISOString()
        .split('T')[0] as ISODateString
  );

  const changeMonth = (direction: number) => {
    const updatedMonthNumber = currentMonthNumber + direction;

    setMonthDate(formatedMonthDate.setMonth(updatedMonthNumber));
  };

  return (
    <div className={css.box}>
      <div className={css.header}>
        <div className={css.monthRow}>
          <button
            type='button'
            onClick={() => changeMonth(-1)}
            className={css.monthButton}
          >
            <Icon
              id='arrow-left'
              width={24}
              height={24}
            />
          </button>
          <div
            className={css.month}
          >{`${displayedMonth} ${displayedYear}`}</div>
          <button
            type='button'
            onClick={() => changeMonth(1)}
            className={css.monthButton}
          >
            <Icon
              id='arrow-right'
              width={24}
              height={24}
            />
          </button>
        </div>
        <div className={css.weekdays}>
          {weekdays.map(day => (
            <span
              className={css.weekday}
              key={day}
            >
              {day}
            </span>
          ))}
        </div>
      </div>
      <div className={css.dates}>
        {displayedDatesArr.map(dateStr => (
          <button
            className={clsx(
              css.dateButton,
              dateStr === selectedDate && css.selected,
              (+dateStr.split('-')[1] !== currentMonthNumber + 1) && css.otherMonthDate
              // todo Style dates of not current month according to design
            )}
            type='button'
            key={dateStr}
            onClick={() => onPickDate(dateStr)}
          >
            {+dateStr.split('-')[2]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DatePicker;
