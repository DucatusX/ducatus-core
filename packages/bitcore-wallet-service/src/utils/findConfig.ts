export function findConfig(customConfigFileName?: string, customConfigPaths?: []): any | undefined {
  let foundConfig;

  const configFileName = customConfigFileName ? customConfigFileName : 'config';
  let configPaths = customConfigPaths
    ? customConfigPaths
    : [`../../../../../${configFileName}`, `./../${configFileName}`];

  for (let path of configPaths) {
    if (!foundConfig) {
      try {
        const bitcoreConfig = require(path) as any;
        foundConfig = bitcoreConfig;
      } catch (e) {
        foundConfig = undefined;
      }
    }
  }
  return foundConfig;
}
