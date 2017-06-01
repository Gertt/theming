const React = require('react');
const channel = require('./channel');
const createThemeListener = require('./create-theme-listener');

const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component';

function createWithTheme(CHANNEL = channel) {
  const themeListener = createThemeListener(CHANNEL);
  return Component =>
    class WithTheme extends React.Component {
      static displayName = `WithTheme(${getDisplayName(Component)})`;
      static contextTypes = themeListener.contextTypes;

      constructor(props) {
        super(props);
        this.state = { theme: {} };
        this.setTheme = theme => this.setState({ theme });

        this.themeListenerInit = themeListener.init.bind(this);
        this.themeListenerSubscribe = themeListener.subscribe.bind(this);
        this.themeListenerUnsubscribe = themeListener.unsubscribe.bind(this);
      }
      componentWillMount() {
        this.themeListenerInit(this.setTheme);
      }
      componentDidMount() {
        this.themeListenerSubscribe(this.setTheme);
      }
      componentWillUnmount() {
        this.themeListenerUnsubscribe();
      }
      render() {
        const { theme } = this.state;

        return <Component theme={theme} {...this.props} />;
      }
    };
}

module.exports = createWithTheme;
