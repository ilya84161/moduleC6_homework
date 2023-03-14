const log = document.querySelector('.log');
const input_mes = document.getElementById('input_mes');
const btn_send = document.getElementById('btn_send');
const btn_position = document.getElementById('btn_position');
const bot_status = document.getElementById ('bot_status');
const srv_url = 'wss://echo-ws-service.herokuapp.com/';
const websocket = new WebSocket (srv_url);
let var_coords = '';
websocket.onopen = ()=> {
	bot_status.innerHTML = 'В сети';
	bot_status.style = 'color: green'

};
websocket.onclose = ()=> {
	bot_status.innerHTML = 'Не в сети';
	bot_status.style = 'color: red'
};
websocket.onmessage = function(evt) {
	if (!(String (evt.data) ==(var_coords))) {
		log.insertAdjacentHTML("afterbegin", `<div class="mesin"><strong>${evt.data}</strong></div><br> <div class='probel'></div>`);
	}
};
function send_getposition (){
	if ("geolocation" in navigator) {
  		/* местоположение доступно */
  		//alert('ok');
  		navigator.geolocation.getCurrentPosition(async (position) => {
    		const { coords } = await position;
    		//console.log(coords.latitude, coords.longitude);
    		log.insertAdjacentHTML("afterbegin", `<div class="alert"><strong> Ваши координаты:<br></strong>${coords.latitude} ${coords.longitude}<br> 
    			<a href="http://www.openstreetmap.org/?&mlat=${coords.latitude}&mlon=${coords.longitude}">показать на карте геопозицию</a> </div> <br> <div class='probel'></div>`);
    		websocket.send(`${coords.latitude} ${coords.longitude}`);
    		var_coords = `${coords.latitude} ${coords.longitude}`;
  		});
	} 
	else {
  		/* местоположение недоступно */
  		alert('schlecht :-(');
	}
}
function sendLog () {
	const mes= input_mes.value;
	websocket.send(mes);
	log.insertAdjacentHTML("afterbegin", `<div class="alert"><strong>${mes}</strong></div> <br> <div class='probel'></div>`);
}
btn_send.addEventListener ('click', sendLog);
btn_position.addEventListener('click', send_getposition);