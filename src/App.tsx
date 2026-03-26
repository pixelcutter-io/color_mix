import { useState } from 'react';
import { ColorPreview } from './components/ColorPreview/ColorPreview';
import InputSelect, { type SelectOption } from './components/InputSelect';
import type { AppState, ColorSpace } from './types/data.ts';
import { colorMix } from './utils/colorMix';
import Flex from '@/components/Flex';
import Typo from '@/components/Typo';
import InputColor from '@/components/InputColor';
import InputPercentage from '@/components/InputPercentage';
import s from './App.module.scss';
import Result from '@/components/Result';

const initialState: AppState = {
  colorSpace: 'oklch',
  primaryColor: '#3b82f6',
  secondaryColor: '#ffffff',
  backgroundColor: '#f5f5f5',
  primaryPercentage: 100,
  secondaryPercentage: 50,
};

function App() {
  const [state, setState] = useState(initialState);

  const set = <K extends keyof AppState>(key: K, value: AppState[K]) => {
    setState((s) => ({ ...s, [key]: value }));
  };

  const resultColor = colorMix(
    state.colorSpace,
    state.primaryColor,
    state.secondaryColor,
    state.primaryPercentage,
    state.secondaryPercentage,
  );

  const renderHeader = () => {
    return (
      <Flex direction={'column'} align={'center'} gap={1}>
        <Typo
          text={'ColorMix'}
          tag={'h1'}
          weight={'black'}
          size={['db', 'sp']}
          color={'light'}
        />
        <Typo
          text={'CSS color-mix() simulator'}
          tag={'p'}
          weight={'regular'}
          size={['df', 'lg']}
          color={'light'}
        />
      </Flex>
    );
  };

  const renderColorSpace = () => {
    const COLOR_SPACES: SelectOption[] = [
      { value: 'oklch', label: 'OKLCH' },
      { value: 'oklab', label: 'OKLAB' },
      { value: 'srgb', label: 'sRGB' },
      { value: 'hsl', label: 'HSL' },
    ];

    return (
      <InputSelect
        label="Color Space"
        options={COLOR_SPACES}
        value={state.colorSpace}
        onChange={(v) => set('colorSpace', v as ColorSpace)}
      />
    );
  };

  const renderColorToMix = (type: 'primary' | 'secondary') => {
    const colorKey = `${type}Color` as 'primaryColor' | 'secondaryColor';
    const percentageKey = `${type}Percentage` as
      | 'primaryPercentage'
      | 'secondaryPercentage';

    return (
      <Flex direction={'column'} gap={0.5}>
        <Typo text={type} color={'light'} />
        <Flex gap={1}>
          <InputColor
            value={state[colorKey]}
            onChange={(v) => set(colorKey, v)}
            hint={`--c-${type}`}
          />
          <InputPercentage
            value={state[percentageKey]}
            onChange={(v) => set(percentageKey, v)}
          />
        </Flex>
      </Flex>
    );
  };

  const renderForm = () => {
    return (
      <Flex direction={'column'} align={'stretch'} gap={1}>
        {renderColorSpace()}
        {renderColorToMix('primary')}
        {renderColorToMix('secondary')}
        <InputColor
          label="Background"
          value={state.backgroundColor}
          onChange={(v) => set('backgroundColor', v)}
        />
      </Flex>
    );
  };

  const renderPreview = () => {
    return (
      <Flex direction={'column'} align={'stretch'} gap={1}>
        <Result
          colorSpace={state.colorSpace}
          primaryColor={state.primaryColor}
          secondaryColor={state.secondaryColor}
          resultColor={resultColor}
          primaryPercentage={state.primaryPercentage}
          secondaryPercentage={state.secondaryPercentage}
        />

        <ColorPreview
          backgroundColor={state.backgroundColor}
          primaryColor={state.primaryColor}
          resultColor={resultColor}
        />
      </Flex>
    );
  };

  return (
    <main className={s.main}>
      {renderHeader()}
      <div className={s.content}>
        {renderForm()}
        {renderPreview()}
      </div>
    </main>
  );
}

export default App;
