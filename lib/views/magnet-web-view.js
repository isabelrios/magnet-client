'use strict';

/**
 * Dependencies
 */

var debug = require('../debug')('MagnetWebView');
var ReactNative = require('react-native');
var SpinnerView = require('./spinner');
var React = require('react');

var {
  requireNativeComponent,
  WebView,
  View,
  StyleSheet
} = ReactNative;

class MagnetWebView extends WebView {
  constructor() {
    super(...arguments);
    this.state = {
      loaded: false
    };
  }

  render() {
    debug('render');

    return (
      <View style={[styles.root, this.props.style]}>
        <RCTMagnetWebView
          source={this.props.source}
          scrollEnabled={this.props.scrollEnabled}
          onMagnetWebViewLoaded={this._onLoaded.bind(this)}
          style={this.getWebviewStyle()}
        />
        {this.renderSpinnerView()}
      </View>
    );
  }

  renderSpinnerView() {
    debug('render spinner view');
    if (this.state.loaded) return null;
    return <SpinnerView style={styles.spinner}/>
  }

  getWebviewStyle() {
    var result = [styles.webview];
    if (!this.state.loaded) result.push(styles.hidden);
    return result;
  }

  _onLoaded({ nativeEvent: { height }}) {
    debug('loading finish');
    if (!this.props.onLoaded) return;
    this.props.onLoaded({ height });
    this.setState({ loaded: true });
  }
}

MagnetWebView.propTypes = {
  source: React.PropTypes.object,
  onLoaded: React.PropTypes.func,
  scrollEnabled: React.PropTypes.bool,
  ...View.propTypes
};

var styles = StyleSheet.create({
  root: {
    position: 'relative',
    flex: 1
  },

  webview: {
    flex: 1,
    opacity: 1
  },

  hidden: {
    height: 1,
    flex: 0,
    opacity: 0
  },

  spinner: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: 'white'
  }
});

var RCTMagnetWebView = requireNativeComponent('MagnetWebView', MagnetWebView, {
  nativeOnly: { onMagnetWebViewLoaded: true }
});

/**
 * Exports
 */

module.exports = MagnetWebView;
