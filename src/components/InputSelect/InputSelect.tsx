import { useId } from 'react';
import s from './InputSelect.module.scss';
import Typo from '@/components/Typo';
import Icon from '@/components/Icon';
import { arrowAngleDown } from '@/assets/icons';

export type SelectOption = {
  value: string;
  label: string;
};

interface IInputSelect {
  id?: string;
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
}

const InputSelect = (props: IInputSelect) => {
  const { id, label, options, value, onChange } = props;
  const generatedId = useId();
  const selectId = id || generatedId;

  const renderLabel = () => {
    if (!label) return null;
    return <Typo text={label} color={'light'} />;
  };

  const renderSelect = () => {
    return (
      <select
        className={s.select}
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className={s.wrapper}>
      {renderLabel()}
      <div className={s.wrapSelect}>
        {renderSelect()}
        <Icon
          className={s.icon}
          src={arrowAngleDown}
          size={1}
          color={'light'}
        />
      </div>
    </div>
  );
};

export default InputSelect;
