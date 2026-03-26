import { getContrastTextColor } from '@/utils/contrast';
import Typo from '@/components/Typo';
import s from './Preview.module.scss';

interface Box {
  key: string;
  outerColor: string;
  innerColor: string;
  outerLabel: string;
  innerLabel: string;
}

interface IPreview {
  backgroundColor: string;
  primaryColor: string;
  resultColor: string;
}

const Preview = ({ backgroundColor, primaryColor, resultColor }: IPreview) => {
  const boxes: Box[] = [
    {
      key: 'primary-result',
      outerColor: primaryColor,
      innerColor: resultColor,
      outerLabel: 'Primary',
      innerLabel: 'Result',
    },
    {
      key: 'result-primary',
      outerColor: resultColor,
      innerColor: primaryColor,
      outerLabel: 'Result',
      innerLabel: 'Primary',
    },
    {
      key: 'bg-result',
      outerColor: backgroundColor,
      innerColor: resultColor,
      outerLabel: 'Background',
      innerLabel: 'Result',
    },
  ];

  const renderBox = ({
    key,
    outerColor,
    innerColor,
    outerLabel,
    innerLabel,
  }: Box) => (
    <div key={key} className={s.box} style={{ backgroundColor: outerColor }}>
      <Typo
        text={outerLabel}
        color={getContrastTextColor(outerColor)}
        size={'md'}
      />
      <div style={{ backgroundColor: innerColor }}>
        <Typo
          text={innerLabel}
          color={getContrastTextColor(innerColor)}
          size={'md'}
        />
      </div>
    </div>
  );

  return <div className={s.wrapper}>{boxes.map(renderBox)}</div>;
};

export default Preview;
