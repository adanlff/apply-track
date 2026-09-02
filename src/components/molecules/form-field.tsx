import type { ReactNode, ChangeEventHandler } from 'react';
import { AppInput } from '../atoms/app-input';
import { AppSelect } from '../atoms/app-select';
import { AppTextarea } from '../atoms/app-textarea';

interface BaseFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
}

interface InputFieldProps extends BaseFieldProps {
  as?: 'input';
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: () => void;
  type?: string;
  placeholder?: string;
  min?: string | number;
  max?: string | number;
}

interface TextareaFieldProps extends BaseFieldProps {
  as: 'textarea';
  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  rows?: number;
}

interface SelectFieldProps extends BaseFieldProps {
  as: 'select';
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  children: ReactNode;
}

type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

export function FormField(props: FormFieldProps) {
  const { id, label, required, error, hint } = props;

  const ariaProps = {
    'aria-describedby': error ? `${id}-error` : hint ? `${id}-hint` : undefined,
    'aria-invalid': error ? (true as const) : undefined,
    'aria-required': required,
  };

  let control: ReactNode;

  if (props.as === 'textarea') {
    control = (
      <AppTextarea
        id={id}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        rows={props.rows}
        hasError={!!error}
        {...ariaProps}
      />
    );
  } else if (props.as === 'select') {
    control = (
      <AppSelect
        id={id}
        value={props.value}
        onChange={props.onChange}
        hasError={!!error}
        {...ariaProps}
      >
        {props.children}
      </AppSelect>
    );
  } else {
    control = (
      <AppInput
        id={id}
        type={props.type}
        value={props.value as string | undefined}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        min={props.min}
        max={props.max}
        hasError={!!error}
        {...ariaProps}
      />
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-golden-sm font-semibold text-slate-700 flex items-center gap-1"
      >
        {label}
        {required && (
          <span className="text-red-500 text-golden-xs" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {control}

      {hint && !error && (
        <p id={`${id}-hint`} className="text-golden-sm text-slate-400">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-golden-sm text-red-600 flex items-center gap-1"
        >
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}
