const DEV = process.env.NODE_ENV !== 'production';

const NODE =
  typeof 'process' !== 'undefined' &&
  process &&
  process.versions &&
  Boolean(process.versions.node);

const BROWSER = typeof window !== undefined;

export default {
  DEV,
  NODE,
  BROWSER
};
