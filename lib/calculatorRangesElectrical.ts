import type { CalculatorServiceConfig } from './calculatorRangesPestControl';

export const CALCULATOR_CONFIG: Record<string, CalculatorServiceConfig> = {
  'electrician-quote': {
    kind: 'single',
    label: 'Type of electrical work',
    options: [
      { label: 'Outlet / switch installation', value: 'outlet',  min: 150, max: 400 },
      { label: 'Wiring repair',                value: 'wiring',  min: 200, max: 800 },
      { label: 'Ceiling fan installation',      value: 'fan',     min: 75,  max: 350 },
      { label: 'Circuit addition',              value: 'circuit', min: 300, max: 800 },
    ],
  },
  'panel-upgrade': {
    kind: 'single',
    label: 'Panel upgrade type',
    options: [
      { label: '100A to 200A upgrade',              value: '100-200',  min: 1500, max: 3000 },
      { label: '200A to 400A upgrade',              value: '200-400',  min: 2500, max: 4500 },
      { label: 'Subpanel installation',             value: 'subpanel', min: 500,  max: 1500 },
      { label: 'Panel replacement (same amperage)', value: 'replace',  min: 1000, max: 2500 },
    ],
  },
  'electrical-inspection': {
    kind: 'single',
    label: 'Inspection type',
    options: [
      { label: 'Free inspection (no obligation)', value: 'free',        min: 0,   max: 0   },
      { label: 'Independent third-party report',  value: 'independent', min: 150, max: 400 },
    ],
  },
  'outlet-installation': {
    kind: 'single',
    label: 'Outlet type needed',
    options: [
      { label: 'GFCI outlet replacement',         value: 'gfci',         min: 75,  max: 150 },
      { label: 'New outlet (existing circuit)',    value: 'new-existing', min: 150, max: 300 },
      { label: 'New outlet (new circuit needed)',  value: 'new-circuit',  min: 300, max: 600 },
      { label: '240V dedicated circuit',           value: '240v',         min: 400, max: 900 },
    ],
  },
  'ceiling-fan-installation': {
    kind: 'single',
    label: 'Installation situation',
    options: [
      { label: 'Like-for-like replacement',    value: 'replace',     min: 75,  max: 150 },
      { label: 'Fan-rated box upgrade needed', value: 'box-upgrade', min: 150, max: 250 },
      { label: 'New wiring required',          value: 'new-wiring',  min: 250, max: 500 },
      { label: 'Smart / remote wiring',        value: 'smart',       min: 150, max: 300 },
    ],
  },
  'ev-charger-installation': {
    kind: 'single',
    label: 'EV charger installation scope',
    options: [
      { label: 'Basic Level 2 circuit',        value: 'basic',      min: 500,  max: 900  },
      { label: 'Outdoor weatherproof install', value: 'outdoor',    min: 600,  max: 1200 },
      { label: 'With panel upgrade',           value: 'with-panel', min: 2000, max: 4500 },
    ],
  },
  'generator-installation': {
    kind: 'single',
    label: 'Generator type',
    options: [
      { label: 'Manual transfer switch (portable gen)', value: 'manual',  min: 400,  max: 900  },
      { label: 'Automatic transfer switch',             value: 'auto',    min: 1000, max: 2500 },
      { label: 'Whole-home standby generator',          value: 'standby', min: 3000, max: 8000 },
    ],
  },
  'emergency-electrician': {
    kind: 'single',
    label: 'Emergency type',
    options: [
      { label: 'Sparking / smoking outlet or panel', value: 'spark',   min: 150, max: 600  },
      { label: 'Breaker that will not reset',        value: 'breaker', min: 150, max: 400  },
      { label: 'Complete power loss',                value: 'outage',  min: 150, max: 400  },
      { label: 'Storm / surge damage',               value: 'storm',   min: 200, max: 1500 },
    ],
  },
};
