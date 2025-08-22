import clsx from 'clsx';
import * as yup from 'yup';
import css from './BookingForm.module.css';
import inputCss from '../ui/InputGroup/InputGroup.module.css';
import { useForm } from 'react-hook-form';
import InputGroup from '../ui/InputGroup/InputGroup';
import Button from '../ui/Button/Button';
import DatePicker, { type ISODateString } from '../DatePicker/DatePicker';
import { yupResolver } from '@hookform/resolvers/yup';
import { useId } from 'react';

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Too short')
    .max(50, 'Too long'),
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email')
    .matches(/@[^.]+\.[^.]{2,}$/, 'Enter a valid email'),
  date: yup
    .string()
    .required('Date is required')
    .test('is-yyyy-mm--dd', 'Enter a date in yyyy-mm-dd format', value =>
      isValidDate(value)
    ),
});

const isValidDate = (date: string | undefined) => {
  console.log('isValidDate runs...');
  console.log({ date });
  if (!date) return;
  console.log({ matchesRegExp: !/^\d{4}-\d{2}-\d{2}$/.test(date) });

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;

  const [yyyy, mm, dd] = date.split('-');
  const dateObj = new Date(date);

  return (
    dateObj.getFullYear() === +yyyy &&
    dateObj.getMonth() === +mm - 1 &&
    dateObj.getDate() === +dd
  );
};

function BookingForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', email: '', date: '' },
    resolver: yupResolver(validationSchema),
  });
  const textareaId = useId();

  const selectedDate = watch('date');
  const validSelectedDate = isValidDate(selectedDate)
    ? (selectedDate as ISODateString)
    : undefined;

  console.log({ selectedDate, validSelectedDate });

  const onSubmit = () => {
    reset();
  };

  const onPickDate = (date: ISODateString) =>
    setValue('date', date, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <h2 className='text-h3'>Book your campervan now</h2>

      <p className={clsx('text-body', css.desc)}>
        Stay connected! We are always ready to help you.
      </p>

      <div className={css.inputsBox}>
        <InputGroup
          inputName='name'
          label='Name*'
          register={register}
          type='text'
          placeholder='Name*'
          errors={errors}
        />

        <InputGroup
          inputName='email'
          label='Email*'
          register={register}
          type='email'
          placeholder='Email*'
          errors={errors}
        />

        <div className={css.inputDateGroup}>
          <InputGroup
            inputName='date'
            register={register}
            label='Booking date*'
            type='text'
            pattern='\d{4}-\d{2}-\d{2}'
            placeholder='Booking date*'
            errors={errors}
            autocomplete='off'
            className={css.inputDate}
          />

          <div className={css.datePicker}>
            <DatePicker
              onPickDate={onPickDate}
              selectedDate={validSelectedDate}
            />
          </div>
        </div>

        <div className={inputCss.box}>
          <label
            htmlFor={textareaId}
            className='sr-only'
          >
            Comment
          </label>

          <textarea
            id={textareaId}
            {...register}
            placeholder='Comment'
            className={clsx(inputCss.input, css.textarea)}
          ></textarea>
        </div>
      </div>

      <Button
        type='submit'
        className={css.submit}
      >
        Send
      </Button>
    </form>
  );
}

export default BookingForm;
