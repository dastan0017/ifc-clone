export const YesNoEnum = Object.freeze({
  NOT_SPECIFIED: -1,
  YES: 0,
  NO: 1,
})

export const ZeroNonzeroEnum = Object.freeze({
  NOT_SPECIFIED: -1,
  ZERO: 0,
  NON_ZERO: 1,
})

export const LanguageCodeEnum = Object.freeze({
  en: 'en-US',
  kg: 'ky-KG',
  ru: 'ru-RU',
})

export const MeasurementUnitEnum = Object.freeze({
  // id = 1 --> Electricity
  1: 'electricity',
  // id = 2 --> Coal
  2: 'coal',
  // id = 3 --> Gas
  3: 'gas',
})

export const CurrencyCodeEnum = Object.freeze({
  KGS: <div style={{ textDecoration: 'underline' }}>C</div>,
  TJS: 'C.',
  USD: '$',
  RUB: '₽',
})

export const InputValidationEnum = Object.freeze({
  NO_SPACES: /^[a-zA-Z0-9]*$/,
  NO_SPACES_UPPERCASE: /^[A-Z]+$/,
  NO_SPACES_WITH_CHARACTERS: /^\S*$/,
  NO_ONLY_SPACES: /.*[^ ].*/,
  NO_ONLY_SPACES_CAN_BE_EMPTY: /(.*[^ ].*|^$)/,
})
