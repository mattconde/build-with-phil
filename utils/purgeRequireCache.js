const purgeRequireCache = compiler => {
  let prevAssets;

  compiler.hooks.afterEmit.tapAsync(
    "PurgeServerRequireCachePlugin",
    (compilation, callback) => {
      const { assets } = compilation;

      if (prevAssets !== undefined) {
        for (const assetKey in assets) {
          if (assets.hasOwnProperty(assetKey)) {
            const { existsAt } = assets[assetKey];
            delete require.cache[existsAt];
          }
        }

        for (const assetKey in prevAssets) {
          if (
            prevAssets.hasOwnProperty(assetKey) &&
            !assets.hasOwnProperty(assetKey)
          ) {
            const { existsAt } = prevAssets[assetKey];
            delete require.cache[existsAt];
          }
        }
      }

      prevAssets = assets;
      callback();
    }
  );
};

module.exports = { purgeRequireCache };
