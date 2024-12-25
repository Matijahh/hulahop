import contact from './contact';
import forgotPassword from './forgot-password';

const templates = {
  contact,
  forgotPassword,
};

export { templates };
export { default as layout } from './layout';
export type Template = keyof typeof templates;
