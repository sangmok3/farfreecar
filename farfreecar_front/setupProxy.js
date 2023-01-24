// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const { createProxyMiddleware } = require('http-proxy-middleware')
// eslint-disable-next-line no-undef
module.exports = function (app) {
	
	
	app.use(
		createProxyMiddleware("/", {
		  target: "http://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getFlightOpratInfoList",
		  changeOrigin: true,
		})
	  );

}