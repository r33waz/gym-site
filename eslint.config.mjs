// gym-site/eslint.config.mjs
import frontendConfig from './frontend/eslint.config.mjs';
import serverConfig from './server/eslint.config.mjs';

export default [...frontendConfig, ...serverConfig];