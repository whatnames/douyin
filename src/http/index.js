import axios from 'axios'
let APIKEY = '41432c0a0cc28fdf5fa0de53112da044';
export default function getVideo() {
	return axios({
		method: 'get',
		url: `https://api.tianapi.com/txapi/dyvideohot/index?key=${APIKEY}`
	})
}
