<h2>CHZZK Scheduled report</h2>
<br><br>

## install
```zsh
git clone https://github.com/oyajiDev/chzzk-reporter.git
# or download from git page as zip

cd chzzk-reporter
npm init
```

<br>

## configuration
```js
{
    "interval": {interval(hour)}, // if not set, 1 used
    "keyword": "{keyword}", // if not set, "talk" used
    "reportDir": "{report directory}", // if not set, "./reports" used
    "reportType": "{report type}", // if not set, "json" used
    "nidAuth": "{nid auth}",
    "nidSession": "{nid session}"
}
```

<br>

### how to get nidAuth, nidSession
open devtools from chzzk.naver.com

- in Safari,
  - Storage > Cookies
- in Chromium-based,
  - Application > Cookies > https://chzzk.naver.com

- Matching Keys
  - nidAuth == NID_AUT
  - nidSession == NID_SES

<br>

## start
```zsh
npm run update:console
```