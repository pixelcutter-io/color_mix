import { type ChangeEvent, useId } from 'react';
import Typo from '@/components/Typo';
import s from './InputColor.module.scss';

const HEX_COLOR_REGEX = /^#[0-9A-Fa-f]{0,6}$/;

interface IInputColor {
  label?: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
}

const InputColor = (props: IInputColor) => {
  const { label, value, onChange, hint } = props;
  const inputId = useId();

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const newValue = raw.startsWith('#') ? raw : `#${raw}`;
    if (!HEX_COLOR_REGEX.test(newValue)) return;
    onChange(newValue);
  };

  const renderLabel = () => {
    if (!label) return null;
    return <Typo text={label} color={'light'} />;
  };

  const renderPicker = () => {
    return (
      <input
        className={s.picker}
        type="color"
        value={value}
        onChange={handleColorChange}
      />
    );
  };

  const renderInput = () => {
    return (
      <input
        className={s.input}
        id={inputId}
        type="text"
        value={value}
        onChange={handleTextChange}
        maxLength={7}
      />
    );
  };

  const renderHint = () => {
    if (!hint) return null;
    return <Typo text={hint} color={'light-2'} size={'md'} />;
  };

  return (
    <div className={s.wrapper}>
      {renderLabel()}
      <div className={s.wrapInput}>
        {renderPicker()}
        {renderInput()}
      </div>
      {renderHint()}
    </div>
  );
};

export default InputColor;
