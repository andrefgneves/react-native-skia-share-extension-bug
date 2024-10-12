const { getDefaultConfig } = require('expo/metro-config');

// Add 'share.js' as a recognized extension
function withShareExtension(config) {
  config.transformer.getTransformOptions = () => ({
    resolver: { sourceExts: [...config.resolver.sourceExts, 'share.js'] },
  });

  return config;
}

module.exports = withShareExtension(getDefaultConfig(__dirname), {});
