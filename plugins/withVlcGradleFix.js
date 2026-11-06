// Conserta a biblioteca react-native-vlc-media-player para o Android novo.
// O arquivo build.gradle dela usa "proguard-android.txt", que o Android atual
// não aceita mais. Este plugin troca para "proguard-android-optimize.txt"
// automaticamente a cada build (inclusive no EAS, que reinstala o node_modules).

const { withDangerousMod } = require('expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = function withVlcGradleFix(config) {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const arquivo = path.join(
        config.modRequest.projectRoot,
        'node_modules',
        'react-native-vlc-media-player',
        'android',
        'build.gradle',
      );

      if (fs.existsSync(arquivo)) {
        const antes = fs.readFileSync(arquivo, 'utf8');
        const depois = antes.replace(
          /proguard-android\.txt/g,
          'proguard-android-optimize.txt',
        );
        if (depois !== antes) {
          fs.writeFileSync(arquivo, depois);
        }
      }

      return config;
    },
  ]);
};