const createThemeProvider = require('./create-theme-provider');
const createWithTheme = require('./create-with-theme');
const createThemeListener = require('./create-theme-listener');
const channel = require('./channel');

module.exports = {
  channel,
  withTheme: createWithTheme(),
  ThemeProvider: createThemeProvider(),
  themeListener: createThemeListener(),
  createTheming: (customChannel = channel) => ({
    channel: customChannel,
    withTheme: createWithTheme(customChannel),
    ThemeProvider: createThemeProvider(customChannel),
    themeListener: createThemeListener(customChannel),
  }),
};
