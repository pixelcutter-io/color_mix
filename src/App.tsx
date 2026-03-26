import { useState } from 'react';
import InputSelect, { type SelectOption } from './components/InputSelect';
import type { AppState, ColorSpace } from './types/data.ts';
import { colorMix } from './utils/colorMix';
import Flex from '@/components/Flex';
import Typo from '@/components/Typo';
import InputColor from '@/components/InputColor';
import InputPercentage from '@/components/InputPercentage';
import s from './App.module.scss';
import Result from '@/components/Result';
import Preview from '@/components/Preview';
import Logo from '@/components/Logo';
import { logo } from '@/assets/images';

const initialState: AppState = {
  colorSpace: 'oklch',
  primaryColor: '#dfeb57',
  secondaryColor: '#151515',
  backgroundColor: '#f5f5f5',
  primaryPercentage: 100,
  secondaryPercentage: 20,
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
        <Logo src={logo} maxHeight={3.5} />
        <Typo
          text={'CSS color-mix() simulator'}
          tag={'h1'}
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

  const renderColorToMix = (type: 'Primary' | 'Secondary') => {
    const colorKey = `${type.toLocaleLowerCase()}Color` as
      | 'primaryColor'
      | 'secondaryColor';
    const percentageKey = `${type.toLocaleLowerCase()}Percentage` as
      | 'primaryPercentage'
      | 'secondaryPercentage';

    return (
      <Flex direction={'column'} gap={0.5} align={'stretch'}>
        <Typo text={`${type} (--c-${type.toLowerCase()})`} color={'light'} />
        <div className={s.wrapInput}>
          <InputColor
            value={state[colorKey]}
            onChange={(v) => set(colorKey, v)}
          />
          <InputPercentage
            value={state[percentageKey]}
            onChange={(v) => set(percentageKey, v)}
          />
        </div>
      </Flex>
    );
  };

  const renderForm = () => {
    return (
      <Flex direction={'column'} align={'stretch'} gap={1}>
        {renderColorSpace()}
        {renderColorToMix('Primary')}
        {renderColorToMix('Secondary')}
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
      <Flex direction={'column'} align={'stretch'} gap={1.5}>
        <Result
          colorSpace={state.colorSpace}
          primaryColor={state.primaryColor}
          secondaryColor={state.secondaryColor}
          resultColor={resultColor}
          primaryPercentage={state.primaryPercentage}
          secondaryPercentage={state.secondaryPercentage}
        />

        <Preview
          backgroundColor={state.backgroundColor}
          primaryColor={state.primaryColor}
          resultColor={resultColor}
        />
      </Flex>
    );
  };

  const renderFooter = () => {
    const startYear = 2026;
    const currentYear = new Date().getFullYear();
    const yearDisplay =
      currentYear > startYear
        ? `${startYear}-${currentYear}`
        : `${currentYear}`;

    return (
      <Flex justify={'center'} align={'baseline'} gap={0.25}>
        <Typo
          text={`©${yearDisplay} Handcrafted `}
          color={'light'}
          size={'sm'}
        />
        <a
          href={'https://www.pixelcutter.io/'}
          target={'_blank'}
          rel="noopener"
        >
          <Typo
            text={'Pixelcutter'}
            color={'accent'}
            size={'sm'}
            decoration={'underline'}
          />
        </a>
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
      {renderFooter()}
    </main>
  );
}

export default App;
