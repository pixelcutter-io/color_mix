import { useContext } from 'react';

import { BreakpointsContext } from '@/providers/BreakpointsProvider';

const useBreakpoints = () => {
  const context = useContext(BreakpointsContext);
  if (!context)
    throw new Error('useBreakpoints must be used within a BreakpointsProvider');
  return context;
};

export default useBreakpoints;
