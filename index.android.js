
/**
 * Dependencies
 */

var ReactNative = require('react-native');
var App = require('./lib/views/app');
var React = require('react');

const TestFairy = require('react-native-testfairy');

var {
  UIManager,
  AppRegistry
} = ReactNative;

class AndroidApp extends React.Component {
  render() {
    return <App/>;
  }
}

// layout-animations are turned off on android by default
UIManager.setLayoutAnimationEnabledExperimental(true);

TestFairy.begin('79f84031feb1f2859326d1cedb5689a9b16933a8');
AppRegistry.registerComponent('Magnet', () => AndroidApp);
