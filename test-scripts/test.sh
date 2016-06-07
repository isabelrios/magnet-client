#!/usr/bin/env bash
# Build release = 1 if the tests will be launched only with the release build
# Setting to 0 for the test setting up the environment
if [[ $BUILD_RELEASE == 0 ]]; then
    ./test-scripts/launch_tests.sh
else
    echo "Skipping ui tests, not a release build..."
fi