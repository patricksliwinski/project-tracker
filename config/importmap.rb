# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "session-timer"
pin "echarts", to: "echarts.min.js"
pin "echarts/theme/dark", to: "echarts/theme/dark.js"
pin "popper", to: 'popper.js', preload: true
pin "bootstrap", to: 'bootstrap.min.js', preload: true

