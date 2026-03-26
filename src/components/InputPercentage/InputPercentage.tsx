import { type ChangeEvent, useId } from 'react';
import s from './InputPercentage.module.scss';
import Typo from '@/components/Typo';

interface IInputPercentage {
  label?: string;
  value: number;
  onChange: (value: number) => void;
}

const InputPercentage = (props: IInputPercentage) => {
  const { label, value, onChange } = props;
  const inputId = useId();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (!Number.isNaN(val) && val >= 0 && val <= 100) {
      onChange(val);
    }
  };

  const renderLabel = () => {
    if (!label) return null;
    return <Typo text={label} color={'light'} a11y={{ htmlFor: inputId }} />;
  };

  const renderInput = () => {
    return (
      <input
        id={inputId}
        className={s.input}
        type="number"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
      />
    );
  };

  return (
    <div className={s.wrapper}>
      {renderLabel()}
      <div className={s.wrapInput}>
        {renderInput()}
        <Typo text={'%'} color={'light'} size={'df'} />
      </div>
    </div>
  );
};
export default InputPercentage;
