import { useId, type HTMLInputAutoCompleteAttribute, type HTMLInputTypeAttribute } from 'react';
import css from './InputGroup.module.css';
import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import clsx from 'clsx';

interface InputGroupProps<T extends FieldValues> {
  inputName: Path<T>;
  label:string;
  type?: HTMLInputTypeAttribute;
  pattern?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  className?: string;
  autocomplete?:HTMLInputAutoCompleteAttribute;
}

function InputGroup<T extends FieldValues>({
  inputName,
  label,
  type = 'text',
  pattern,
  placeholder,
  register,
  errors,
  className,
  autocomplete,
}: InputGroupProps<T>) {
  const id = useId();
  const errorMessageUnknown = errors[inputName]?.message || '';
  const errorMessage =
    typeof errorMessageUnknown === 'string' ? errorMessageUnknown : '';

  return (
    <div className={css.box}>
      <label htmlFor={id} className='sr-only'>{label}</label>

      <input
        id={id}
        type={type}
        pattern={pattern}
        {...register(inputName as Path<T>)}
        placeholder={placeholder}
        autoComplete={autocomplete}
        className={clsx('text-body', css.input, className)}
      />

      <p className={clsx(css.error, errorMessage && css.showError)}>
        {errorMessage}
      </p>
    </div>
  );
}

export default InputGroup;
