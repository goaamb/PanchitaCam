// WEBREC.OCX 2.1.7.35
// FIRMWARE 2.608.0000.6.R

// EDIT BY RORY KNOWLES
// BAHAMASSECURITY.COM
// CREATED: JANUARY 05, 2012
// Updated: Aug 21, 2012

var gdomready = 0;
var gopenall = 0;
var gsld;
var gslda;
var gsldb;
var gsldc;
var gsldd;
var gca = 0;
var gcb = 0;
var gcc = 0;
var gcd = 0;
var gwid = 0;
var gcid = -1;
var gptz = 0;
var gxh = 0;
var gxz = 0;
var gxs = 0;
var gxj = 0;
var gdj = 0;
var gdg = 0;
var gfmu1 = 0;
var gfmu2 = 0;
var gfmnudj = 0;
var gomnudj = null;
var gfmnuopen = 0;
var gomnuopen = null;
var i = 0;
var j = 0;
var glhight = 0;
var grhight = 287;
var gcam = -1;
var hh = 600;
var m32 = false;
var cnum = 0;
var glin = false;
var chAry = new Array();
var HashCookie = new Hash.Cookie('DhWebCookie', {
	duration : 30
});
var settings = {
	username : '',
	talktype : '1',
	logintype : '0',
	openall : '1'
}
function iniocx() {;}
function showlogin() {
	$('l').style.top = "0px";
}
function showabout() {
	ocx.AboutBox();
}
function ld() {

	// var ip ='10.6.13.32';
	// var ip = location.hostname;
	var ip = $("ip").value;

	// added aug 21, 2012
	var port = $("port").value;

	var username = $("username").value;
	var password = $("password").value;
	var logintype = $("logintype").value;

	if (gcam == -1) {

		// updated aug 21, 2012 - added port
		var r = ocx.LoginDeviceEx(ip, port, username, password, logintype);

		if (r == 1) {
			chkdev();
			getcl();
			resize();
			getdjl();
			ocx.SetDeviceMode(0, settings['talktype']);
			$('password').value = "";
			$('l').style.display = "none";
			$('m').style.top = "0px";
			settings['username'] = username;
			settings['logintype'] = logintype;
			glin = true;
			savesetting();
			if (chAry.length > 0) {
				chAry.each(function(item, index) {
					var oc = $('c' + item);
					oc.removeClass(oc.className);
					oc.addClass('cl2');
				})
			}
		}
	} else {

		// updated aug 21, 2012 - added port
		var r = ocx.LoginDeviceEx(ip, port, 'op', '1234', logintype);

		if (r == 1) {
			chkdev();
			getcl();
			resize();
			getdjl();
			ocx.SetDeviceMode(0, settings['talktype']);
			$('l').style.display = "none";
			$('m').style.top = "0px";
			ca($('c' + gcam), gcam);
			return true;
		}
	}
	return false;
}
function lo() {
	if (ocx.LogoutDevice() >= 0) {
		loeft();
	}
}
function loeft() {
	if (m32)
		$('up1').click();
	$('m').style.top = "-10000px";
	$('l').style.display = "";
	glin = false;
	closemu();
	closemnudj();
	if (gdj == 1) {
		gdj = 0;
		$('xdj').innerText = tl('AudioTalk');
	}
	if (gopenall == 1) {
		gopenall = 0;
		$('xac').innerText = tl('W_ACO');
	}
	$('cl').empty();
	if (chAry.length > 0) {
		chAry = [];
	}
	ocx.CloseLocalPlay();
}
function ca(o, ch) {
	if ($(o).hasClass('cl1')) {
		if (ocx.ConnectRealVideo(ch, 1)) {
			;
		}
	} else {
		if (!ocx.DisConnectRealVideo(ch)) {
			;
		}
	}
	closemu();
}
function cptz() {
	if (gptz == 0) {
		gptz = 1;
		ocx.ControlPtz(51, 0, 0, 0, 0);
	} else {
		gptz = 0;
		ocx.ControlPtz(51, 0, 0, 0, 1);
	}
	setptzs();
}
function setptzs() {
	if (gdomready == 1) {
		if (gptz == 0) {
			if ($('cptz').hasClass('y51')) {
				$('cptz').removeClass($('cptz').className);
				$('cptz').addClass('y5');
			}
		} else {
			$('cptz').removeClass($('cptz').className);
			$('cptz').addClass('y51');
		}
	}
}
function cxh(o, ts, tb0, tb1, tb2, tb3) {
	if (gxh == 0) {
		if (gxz == 1) {
			if (ocx.ControlPtz(40, 0, 0, 0, 0)) {
				gxz = 0;
				$('xspxz').innerText = tb1;
			}
		}
		if (gxs == 1) {
			if (ocx.ControlPtz(44, 0, 0, 0, 0)) {
				gxs = 0;
				$('xxs').innerText = tb2;
			}
		}
		if (gxj == 1) {
			if (ocx.ControlPtz(48, $('pv').value, 0, 0, 0)) {
				gxj = 0;
				$('xxuj').innerText = tb3;
			}
		}
		if (ocx.ControlPtz(13, $('pv').value, 0, 76, 0)) {
			gxh = 1;
			o.innerText = ts;
		}
	} else {
		if (ocx.ControlPtz(13, $('pv').value, 0, 96, 0)) {
			gxh = 0;
			o.innerText = tb0;
		}
	}
}
function cxz(o, ts, tb0, tb1, tb2, tb3) {
	if (gxz == 0) {
		if (gxh == 1) {
			if (ocx.ControlPtz(13, $('pv').value, 0, 96, 0)) {
				gxh = 0;
				$('xdjxh').innerText = tb0;
			}
		}
		if (gxs == 1) {
			if (ocx.ControlPtz(44, 0, 0, 0, 0)) {
				gxs = 0;
				$('xxs').innerText = tb2;
			}
		}
		if (gxj == 1) {
			if (ocx.ControlPtz(48, $('pv').value, 0, 0, 0)) {
				gxj = 0;
				$('xxuj').innerText = tb3;
			}
		}
		if (ocx.ControlPtz(39, 0, 0, 0, 0)) {
			gxz = 1;
			o.innerText = ts;
		}
	} else {
		if (ocx.ControlPtz(40, 0, 0, 0, 0)) {
			gxz = 0;
			o.innerText = tb1;
		}
	}
}
function cxs(o, ts, tb0, tb1, tb2, tb3) {
	if (gxs == 0) {
		if (gxh == 1) {
			if (ocx.ControlPtz(13, $('pv').value, 0, 96, 0)) {
				gxh = 0;
				$('xdjxh').innerText = tb0;
			}
		}
		if (gxz == 1) {
			if (ocx.ControlPtz(40, 0, 0, 0, 0)) {
				gxz = 0;
				$('xspxz').innerText = tb1;
			}
		}
		if (gxj == 1) {
			if (ocx.ControlPtz(48, $('pv').value, 0, 0, 0)) {
				gxj = 0;
				$('xxuj').innerText = tb3;
			}
		}
		if (ocx.ControlPtz(43, 0, 0, 0, 0)) {
			gxs = 1;
			o.innerText = ts;
		}
	} else {
		if (ocx.ControlPtz(44, 0, 0, 0, 0)) {
			gxs = 0;
			o.innerText = tb2;
		}
	}
}
function cxj(o, ts, tb0, tb1, tb2, tb3) {
	if (gxj == 0) {
		if (gxh == 1) {
			if (ocx.ControlPtz(13, $('pv').value, 0, 96, 0)) {
				gxh = 0;
				$('xdjxh').innerText = tb0;
			}
		}
		if (gxz == 1) {
			if (ocx.ControlPtz(40, 0, 0, 0, 0)) {
				gxz = 0;
				$('xspxz').innerText = tb1;
			}
		}
		if (gxs == 1) {
			if (ocx.ControlPtz(44, 0, 0, 0, 0)) {
				gxs = 0;
				$('xxs').innerText = tb2;
			}
		}
		if (ocx.ControlPtz(47, $('pv').value, 0, 0, 0)) {
			gxj = 1;
			o.innerText = ts;
		}
	} else {
		if (ocx.ControlPtz(48, $('pv').value, 0, 0, 0)) {
			gxj = 0;
			o.innerText = tb3;
		}
	}
}
function cdj(o, ts, tb) {
	var ret;
	if (gdj == 0) {
		if (ocx.ControlTalking(1)) {
			gdj = 1;
			o.innerText = ts;
		}
	} else {
		if (ocx.ControlTalking(0)) {
			gdj = 0;
			o.innerText = tb;
		}
	}
}
function cdg(o, ts, tb) {
	if (gdg == 0) {
		if (ocx.ControlPtz(14, 1, 0, 0, 0)) {
			gdg = 1;
			o.innerText = ts;
		}
	} else {
		if (ocx.ControlPtz(14, 0, 0, 0, 0)) {
			gdg = 0;
			o.innerText = tb;
		}
	}
}
function sldtopos(sld, step) {
	sld.knob.setStyle('left', sld.toPosition(step));
}
function txreset(step) {
	setcolorsv(1, step);
	setcolorsv(2, step);
	setcolorsv(3, step);
	setcolorsv(4, step);
	sldtopos(gslda, step);
	sldtopos(gsldb, step);
	sldtopos(gsldc, step);
	sldtopos(gsldd, step);
	setcolors();
}
function getcolors() {
	var colors = "";
	colors = ocx.GetColor();
	var t = new Array();
	if (colors != "")
		t = colors.split(',');
	sldtopos(gslda, parseInt(t[0]));
	sldtopos(gsldb, parseInt(t[1]));
	sldtopos(gsldc, parseInt(t[2]));
	sldtopos(gsldd, parseInt(t[3]));
	setcolorsv(1, parseInt(t[0]));
	setcolorsv(2, parseInt(t[1]));
	setcolorsv(3, parseInt(t[2]));
	setcolorsv(4, parseInt(t[3]));
}
function setcolorsv(f, v) {
	switch (f) {
	case 1:
		gca = v;
		$('ska').title = v;
		break;
	case 2:
		gcb = v;
		$('skb').title = v;
		break;
	case 3:
		gcc = v;
		$('skc').title = v;
		break;
	case 4:
		gcd = v;
		$('skd').title = v;
		break;
	}
}
function setcolors() {
	ocx.SetColor(0, gca, gcb, gcc, gcd);
}

function showmu(o, cid) {
	if (gcid == cid) {
		closemu();
	} else {
		gcid = cid;
		$('cmu').setProperty('title', cid);
		$('cmu').injectAfter($(o).getParent());
		$('cmu').setStyle('height', 35);
		if (m32) {
			var h = parseInt($('dcl').style.height);
			if (h != 387 && h != 739)
				$('dcl').setStyle('height', h + 35);
		}
	}
}
function closemu() {
	gcid = -1;
	$('cmu').injectAfter($('cl'));
	$('cmu').setStyle('height', '0');
	if (m32) {
		var h = parseInt($('dcl').style.height);
		if (h != 352 && h != 704)
			$('dcl').setStyle('height', h - 35);
	}
}
function onmu(f) {
	var cid = $('cmu').getProperty('title');
	ocx.ConnectRealVideo(parseInt(cid), f)
	closemu();
}
function tl(s) {
	var ret;
	ret = ocx.Translate(s);
	return ret;
}
function chkdev() {
	var strhtm = "";
	var strhtmopen = "";
	var sret = "";
	sret = ocx.GetDevConfig(1);
	strhtm = "<a id='xzml' href='javascript:;' onclick='onmu(1)' >" + tl('MainStream') + "</a>";
	strhtmopen = "<li><a href='javascript:;'  class='cdj1' onclick='onmnuopen(this,1)'>" + tl('MainStream') + "</a></li>";
	if (sret.substring(1, 2) == "1") {
		strhtm = strhtm + "<a id='xfml' href='javascript:;' onclick='onmu(2)'>" + tl('SecondStream') + "</a>";
		strhtmopen = strhtmopen + "<li><a href='javascript:;'  class='cdj1' onclick='onmnuopen(this,2)'>" + tl('SecondStream') + "</a></li>";
	}
	$('cmu').setHTML(strhtm);
	$("mnuopenl").innerHTML = strhtmopen;
	sret = ocx.GetDevConfig(2);
	if (sret == '1') {
		$('xkl').style.display = "";
	}
	sret = ocx.GetDevConfig(7);
	if (sret == '1') {
		$('xhf').style.display = "";
	}
	sret = ocx.GetDevConfig(8);
	if (sret == '1') {
		$('xfmq').style.display = "";
	}
}
function savesetting() {
	HashCookie.extend(settings);
}
function getsetting() {
	if (HashCookie.get('username')) {
		settings['username'] = HashCookie.get('username');
	} else {
		settings['username'] = '';
	}
	if (HashCookie.get('talktype')) {
		settings['talktype'] = HashCookie.get('talktype');
	} else {
		settings['talktype'] = '1';
	}
	if (HashCookie.get('logintype')) {
		settings['logintype'] = HashCookie.get('logintype');
	} else {
		settings['logintype'] = '0';
	}
	if (HashCookie.get('openall')) {
		settings['openall'] = HashCookie.get('openall');
	} else {
		settings['openall'] = '1';
	}
	$('username').setProperty('value', settings['username']);
	$('logintype').setProperty('value', settings['logintype']);
}
function reps(str) {
	var strReg1 = /"/g;
	var strReg2 = /'/g;
	var strReg3 = /</g;
	var strReg4 = />/g;
	var strReg5 = /&/g;
	var ret = str.replace(strReg5, "&amp;");
	ret = ret.replace(strReg1, "&quot;");
	ret = ret.replace(strReg2, "&acute;");
	ret = ret.replace(strReg3, "&lt;");
	ret = ret.replace(strReg4, "&gt;");
	return ret;
}
function showmu1() {
	if (gfmu1 == 0) {
		gfmu1 = 1;
		$('smu1').style.display = "";
	} else {
		closemu1();
	}
}
function closemu1() {
	gfmu1 = 0;
	$('smu1').style.display = "none";
}
function showmu2() {
	if (gfmu2 == 0) {
		var i = $('smu2').getParent();
		gfmu2 = 1;
		$('smu2').style.display = "";
	} else {
		closemu2();
	}
}
function closemu2() {
	gfmu2 = 0;
	$('smu2').style.display = "none";
}
function onmu1(v) {
	$('ps').value = v;
	closemu1();
}
function onmu2(v) {
	if (0 == v) {
		str = 'DAV';
		ocx.SetRecordExtension('dav');
	} else if (1 == v) {
		str = 'ASF';
		ocx.SetRecordExtension('asf');
	}
	$('rtys').value = str;
	closemu2();
}
function showmnudj() {
	if (gfmnudj == 0) {
		gfmnudj = 1;
		$('mnudj').style.display = "";
	} else {
		closemnudj();
	}
}
function closemnudj() {
	gfmnudj = 0;
	$('mnudj').style.display = "none";
}
function onmnudj(o, v) {
	if (gomnudj != null) {
		gomnudj.removeClass(gomnudj.className);
		gomnudj.addClass('cdj1');
	}
	gomnudj = $(o);
	gomnudj.removeClass(gomnudj.className);
	gomnudj.addClass('cdj2');
	if (v == '0')
		v = '1';
	ocx.SetDeviceMode(0, v);
	cdj($('xdj'), tl('StopTalk'), tl('AudioTalk'));
	closemnudj();
	settings['talktype'] = v;
	savesetting();
}
function showmnuopen() {
	if (gfmnuopen == 0) {
		gfmnuopen = 1;
		$('mnuopen').style.display = "";
	} else {
		closemnuopen();
	}
}
function closemnuopen() {
	gfmnuopen = 0;
	$('mnuopen').style.display = "none";
}
function onmnuopen(o, v) {
	if (gomnuopen != null) {
		gomnuopen.removeClass(gomnuopen.className);
		gomnuopen.addClass('cdj1');
	}
	gomnuopen = $(o);
	gomnuopen.removeClass(gomnuopen.className);
	gomnuopen.addClass('cdj2');
	closemnuopen();
	settings['openall'] = v;
	savesetting();
	gopenall = 0;
	openall($('xac'), tl('W_ACC'), tl('W_ACO'))
}
function getcl() {
	var t = new Array();
	var ts = new Array();
	var shtml = "";
	var strsplita = String.fromCharCode(9);
	var strsplitb = String.fromCharCode(16);
	var sc;
	sc = ocx.GetChannelName();
	if (sc != "") {
		sc = sc.substr(0, sc.length - 1);
		t = sc.split(strsplita);
		var num = t.length;
		cnum = num;
		for ( var i = 0; i < t.length; i++) {
			ts = t[i].split(strsplitb);
			ts[1] = reps(ts[1]);
			shtml += "<li title='" + ts[1] + "' ><div id='c" + ts[0] + "' class='cl1' onclick='ca(this," + ts[0] + ")' >" + ts[1] + "</div><a class='ca1' href='javascript:;' onclick='showmu(this," + ts[0] + ")'></a></li>"
			t[i] = ts;
		}
		$("cl").innerHTML = shtml;
		var maxH = screen.height - 207;
		if (num > 19 && (maxH + 63) < 800) {
			m32 = true;
			hh = maxH + 63;
			$('cup').style.display = '';
			$('cdw').style.display = '';
			$('dcl').style.height = '352px';
			$('dcl').style.overflow = 'hidden';
			var myFx = new Fx.Style('dcl', 'margin-top', {
				duration : 500
			});
			var myFx1 = new Fx.Style('dcl', 'height', {
				duration : 500
			});
			$('up1').addEvent('click', function(e) {
				if (parseInt($('dcl').style.height) == 704 && gcid == -1) {
					myFx.start(-352, 0);
					myFx1.start(704, 352);
				} else if (parseInt($('dcl').style.height) == 739 && gcid != -1) {
					myFx.start(-352, 0);
					myFx1.start(739, 387);
				}
			});
			$('dw1').addEvent('click', function(e) {
				if (parseInt($('dcl').style.height) == 352 && gcid == -1) {
					myFx.start(0, -352);
					myFx1.start(352, 704);
				} else if (parseInt($('dcl').style.height) == 387 && gcid != -1) {
					myFx.start(0, -352);
					myFx1.start(387, 739);
				}
			});
		} else if (num > 24 && (maxH + 63) >= 840) {
			hh = 880;
			if (maxH < 830) {
				$('mnudj').style.left = '78px';
				$('mnudj').style.top = '10px';
			}
		} else
			hh = 600;
		var ls = $$('#cl li');
		ls.each(function(element) {
			var fx = new Fx.Styles(element, {
				duration : 100,
				wait : false
			});
			browserDetectSetOpacity(element, 0);
			element.addEvent('mouseenter', function() {
				if (navigator.userAgent.match(/\bMSIE\b/) && (!document.documentMode || document.documentMode < 9))
					fx.start({
						'opacity' : 1
					});
				else
					element.style.opacity = 1;
			});
			element.addEvent('mouseleave', function() {
				if (navigator.userAgent.match(/\bMSIE\b/) && (!document.documentMode || document.documentMode < 9))
					fx.start({
						'opacity' : 0.001
					});
				else
					element.style.opacity = 0.001;
			});
		});
	}
}
function getdjl() {
	var t = new Array();
	var ts = new Array();
	var shtml = "";
	var strsplita = String.fromCharCode(9);
	var strsplitb = String.fromCharCode(16);
	var sc = "";
	sc = ocx.GetDevConfig(3);
	if (sc != "") {
		sc = sc.substr(0, sc.length - 1);
		t = sc.split(strsplita);
		if (t.length == 1) {
			var tmp = t[0].split(strsplitb);
			tmp[1] = reps(tmp[1]);
			if (tmp[1].toLowerCase() == 'default') {
				$('xdj0').style.display = 'none';
				return;
			}
		}
		for ( var i = 0; i < t.length; i++) {
			ts = t[i].split(strsplitb);
			ts[1] = reps(ts[1]);
			shtml += "<li><a href='javascript:;'  class='cdj1' onclick='onmnudj(this," + ts[0] + ")'>" + ts[1] + "</a></li>";
			t[i] = ts;
		}
		$("mnudjl").innerHTML = shtml;
	}
}
function rfc() {
	var t = new Array();
	var ts = new Array();
	var shtml = "";
	var strsplita = String.fromCharCode(9);
	var strsplitb = String.fromCharCode(16);
	var sc;
	sc = ocx.GetChannelName();
	if (sc != "") {
		sc = sc.substr(0, sc.length - 1);
		t = sc.split(strsplita);
		for ( var i = 0; i < t.length; i++) {
			ts = t[i].split(strsplitb);
			var temp = 'c' + ts[0];
			$(temp).setText(ts[1]);
			var pr = $(temp).getParent();
			pr.title = ts[1];
			t[i] = ts;
		}
	}
}
function reboot() {
	var ret;
	var ret1 = false;
	try {
		ret1 = ocx.ConfirmReboot();
	} catch (e) {
		ret1 = confirm(tl('w_rebootconfirm'));
	}
	if (ret1) {
		ret = ocx.Restart();
		if (ret == 0) {
		} else {
			ocx.LogoutDevice();
			loeft();
		}
	}
}
function openall(o, ts, tb) {
	var ret;
	if (gopenall == 0) {
		if (ocx.ConnectAllChannelEx(settings['openall'])) {
			gopenall = 1;
			o.innerText = ts;
		}
	} else {
		if (ocx.DisConnectAllChannel()) {
			gopenall = 0;
			o.innerText = tb;
		}
	}
}
function toggleDisplay(obj) {
	if (obj.getStyle('display') == 'none') {
		obj.setStyle('display', '');
	} else {
		obj.setStyle('display', 'none');
	}
}
function closebeep() {
	ocx.BeepAlarmControl(0);
}
function limitPs() {
	var inpt = $('ps').value;
	$('ps').value = inpt.replace(/[^\d]/g, '');
	if (inpt == '0')
		$('ps').value = 1;
	else if (inpt == '9')
		$('ps').value = 8;
}
function limitPv() {
	$('pv').value = $('pv').value.replace(/[^\d]/g, '');
	var inpt = $('pv').value;
	if (inpt.length >= 3 && (inpt - 0) > 255)
		$('pv').value = 255;
	else if (inpt != '')
		$('pv').value = inpt - 0;
}
function inilanguage() {
	$('xyhm').setText(tl('User Name') + ":");
	$('xmm').setText(tl('Password') + ":");
	$('lbt').setText(tl('Login'));
	showlogin();
	$('xtc').setText(tl('Logout'));
	$('xdj').setText(tl('AudioTalk'));
	$('xhf').setText(tl('OpenRec'));
	$('xbb').setText(tl('Zoom'));
	$('xbj').setText(tl('Focus'));
	$('xgq').setText(tl('Iris'));
	$('xbc').setText(tl('w_Step'));
	$('xz').setText(tl('w_SetValue'));
	$('xtld').setProperty('title', tl('Bright'));
	$('xtdbd').setProperty('title', tl('Cont'));
	$('xtbhd').setProperty('title', tl('Sat'));
	$('xtsd').setProperty('title', tl('Hue'));
	$('xcz').setText(tl('Reset'));
	$('xztlj').setText(tl('PicturePath'));
	$('xlxlj').setText(tl('RecordPath'));
	$('xztlj').setProperty('title', tl('SetPicturePath'));
	$('xlxlj').setProperty('title', tl('SetRecordPath'));
	$('taba1').setText(tl('Img Config'));
	$('taba2').setText(tl('Other Config'));
	$('xyzd').setText(tl('Preset'));
	$('xdjxh').setText(tl('Auto-Tour'));
	$('xspxz').setText(tl('Auto-Pan'));
	$('xxs').setText(tl('Auto-Scan'));
	$('xxuj').setText(tl('Pattern'));
	$('xfzk').setText(tl('AUX ON'));
	$('xfzg').setText(tl('AUX OFF'));
	$('xytsz').setText(tl('w_PTZsetting'));
	$('xkl').setText(tl('W_Burning'));
	$('xsxt').setText(tl('w_refresh'));
	$('xsxt').setProperty('title', tl('w_trefresh'));
	$('xcqsb').setText(tl('w_reboot'));
	$('xcqsb').setProperty('title', tl('w_reboottitle'));
	$('xac').setText(tl('W_ACO'));
	$('xac').setProperty('title', tl('W_ACO_T'));
	$('xp1').setProperty('title', tl('W_P1'));
	$('xp2').setProperty('title', tl('W_P2'));
	$('xp3').setProperty('title', tl('W_P3'));
	$('xp4').setProperty('title', tl('W_P4'));
	$('xp5').setProperty('title', tl('W_P5'));
	$('xdlfs').setText(tl('type'));
	$('xdlfszb').setText(tl('w_muticast'));
	$('xladv').setText(tl('C_ADVANCED.'));
	$('xfmq').setText(tl('W_CLOSEBEEP'));
	$('rdty').setText(tl('RecordFormat'));
	$('xxtpz').setText(tl('SysConfig'));
	$('xlxcx').setText(tl('RecQuery'));
	$('xbjsz').setText(tl('w_AlarmConfig'));
	$('xgy').setText(tl('About'));
}
function resize() {
	var mbbw;
	var mbbh;
	wwidth = document.documentElement.clientWidth;
	wheight = document.documentElement.clientHeight;
	if (wheight < hh)
		wheight = hh;
	mbbh = wheight - (31 + 18 + 33 + 24 + 3 + 8);
	glhight = mbbh + 33;
	grhight = mbbh + 33 - 263 - $('yt21').offsetHeight;
	mbbw = mbbh * 64 / 51;
	if (wwidth < 904)
		$('m').style.width = 904;
	else
		$('m').style.width = "100%";
	$('mb').setStyle('width', mbbw + (145 * 2 + 8));
	$('mbb').setStyle('width', mbbw);// yzt 0508
	$('mbb').setStyle('height', mbbh);
	$('mbal').setStyle('height', glhight);
	$('yt3').setStyle('height', grhight);
}
function browserDetectSetOpacity(el, value) {
	value = Math.min(1, Math.max(value, 0));
	if (navigator.userAgent.match(/\bMSIE\b/) && (!document.documentMode || document.documentMode < 9))
		el.style.filter = "alpha(opacity=" + (value * 100) + ")";
}
window.addEvent('resize', function() {
	resize();
});
window.addEvent('domready', function() {
	gsld = new Slider($('sa'), $('sk'), {
		steps : 1000,
		onComplete : function(step) {
			ocx.SetPlayPos(step);
		}
	});
	gslda = new Slider($('saa'), $('ska'), {
		steps : 128,
		onChange : function(step) {
			setcolorsv(1, step);
			setcolors();
		}
	});
	gsldb = new Slider($('sab'), $('skb'), {
		steps : 128,
		onChange : function(step) {
			setcolorsv(2, step);
			setcolors();
		}
	});
	gsldc = new Slider($('sac'), $('skc'), {
		steps : 128,
		onChange : function(step) {
			setcolorsv(3, step);
			setcolors();
		}
	});
	gsldd = new Slider($('sad'), $('skd'), {
		steps : 128,
		onChange : function(step) {
			setcolorsv(4, step);
			setcolors();
		}
	});
	var kwicks = $$('#kwick .kwick');
	var fx = new Fx.Elements(kwicks, {
		wait : false,
		duration : 300,
		transition : Fx.Transitions.Back.easeOut
	});
	kwicks.each(function(kwick, i) {
		kwick.addEvent('mouseenter', function(e) {
			var obj = {};
			obj[i] = {
				'width' : [ kwick.getStyle('width').toInt(), 155 ]
			};
			kwicks.each(function(other, j) {
				if (other != kwick) {
					var w = other.getStyle('width').toInt();
					if (w != 80)
						obj[j] = {
							'width' : [ w, 80 ]
						};
				}
			});
			fx.start(obj);
		});
	});
	$('kwick').addEvent('mouseleave', function(e) {
		var obj = {};
		kwicks.each(function(other, j) {
			obj[j] = {
				'width' : [ other.getStyle('width').toInt(), 95 ]
			};
		});
		fx.start(obj);
	});
	var container = $('mb');
	var drop = $('drb');
	var mba = $('mba');
	var mbb = $('mbb');
	var mbc = $('mbc');
	var dropFx = drop.effect('opacity', {
		wait : false
	});
	var bedra = $('dra');
	var bedrc = $('drc');
	/*
	 * bedra.addEvent('mousedown', function(e) { e = new Event(e).stop(); var
	 * clone = this.clone() .setStyles(this.getCoordinates())
	 * .setStyles({'opacity': 0.7, 'position': 'absolute'})
	 * .addEvent('emptydrop', function() {this.remove();drop.removeEvents();})
	 * .inject(document.body); drop.addEvents({ 'drop': function() {
	 * drop.removeEvents(); clone.remove(); dropFx.start('1'); if
	 * (mbc.getStyle('left') !='0px') { mbc.setStyle('left','0');
	 * mbc.injectBefore(mba); mbb.injectBefore(mba); } else {
	 * mbc.setStyle('left','120'); mba.injectBefore(mbc); mbb.injectBefore(mbc); } },
	 * 'over': function() { dropFx.start('0.7'); }, 'leave': function() {
	 * dropFx.start('1'); } }); var drag = clone.makeDraggable({
	 * 'container':container, 'droppables': [drop] }); drag.start(e); });
	 * bedrc.addEvent('mousedown', function(e) { e = new Event(e).stop(); var
	 * clone = this.clone() .setStyles(this.getCoordinates())
	 * .setStyles({'opacity': 0.7, 'position': 'absolute'})
	 * .addEvent('emptydrop', function() {this.remove();drop.removeEvents();})
	 * .inject(document.body); drop.addEvents({ 'drop': function() {
	 * drop.removeEvents(); clone.remove(); dropFx.start('1'); if
	 * (mbc.getStyle('left') !='0px') { mbc.setStyle('left','0');
	 * mbc.injectBefore(mba); mbb.injectBefore(mba); } else {
	 * mbc.setStyle('left','120'); mba.injectBefore(mbc); mbb.injectBefore(mbc); } },
	 * 'over': function() { dropFx.start('0.7'); }, 'leave': function() {
	 * dropFx.start('1'); } }); var drag = clone.makeDraggable({
	 * 'container':container, 'droppables': [drop] }); drag.start(e); });
	 */
	var hCyt21 = new Fx.Style('yt21', 'height', {
		duration : 500
	});
	var hCyt3 = new Fx.Style('yt3', 'height', {
		duration : 500
	});
	$('ayt22').addEvent('click', function(e) {
		new Event(e).stop();
		if (this.hasClass('y1')) {
			this.removeClass(this.className);
			this.addClass('y2');
			hCyt21.start(0, 160);
			hCyt3.start(grhight, grhight - 160);
			grhight = grhight - 160
		} else {
			this.removeClass(this.className);
			this.addClass('y1');
			hCyt21.start(160, 0);
			hCyt3.start(grhight, grhight + 160);
			grhight = grhight + 160
		}
	});
	var taba1 = $('taba1');
	var taba2 = $('taba2');
	taba1.addEvent('click', function(e) {
		new Event(e).stop();
		if (this.hasClass('t3')) {
			this.removeClass(this.className);
			this.addClass('t1');
			taba2.removeClass(taba2.className);
			taba2.addClass('t2');
			$('yt3t1').style.display = "";
			$('yt3t2').style.display = "none";
		}
	});
	taba2.addEvent('click', function(e) {
		new Event(e).stop();
		if (this.hasClass('t2')) {
			taba1.removeClass(taba2.className);
			taba1.addClass('t3');
			this.removeClass(this.className);
			this.addClass('t4');
			$('yt3t1').style.display = "none";
			$('yt3t2').style.display = "";
		}
	});
	document.addEvent('keydown', function(event) {
		event = new Event(event);
		if (glin) {
			if (event.key == 'up')
				ocx.ControlPtz(0, 0, $('ps').value, 0, 0);
			if (event.key == 'left')
				ocx.ControlPtz(2, 0, $('ps').value, 0, 0);
			if (event.key == 'right')
				ocx.ControlPtz(3, 0, $('ps').value, 0, 0);
			if (event.key == 'down')
				ocx.ControlPtz(1, 0, $('ps').value, 0, 0);
		}
	});
	document.addEvent('keyup', function(event) {
		event = new Event(event);
		if (glin) {
			if (event.key == 'up')
				ocx.ControlPtz(0, 0, $('ps').value, 0, 1);
			if (event.key == 'left')
				ocx.ControlPtz(2, 0, $('ps').value, 0, 1);
			if (event.key == 'right')
				ocx.ControlPtz(3, 0, $('ps').value, 0, 1);
			if (event.key == 'down')
				ocx.ControlPtz(1, 0, $('ps').value, 0, 1);
		}
	});
	inilanguage();
	getsetting();
	var ls = $$('div div.mpad');
	ls.each(function(element) {
		browserDetectSetOpacity(element, 0.35);
		if (navigator.userAgent.match(/\bMSIE\b/) && (!document.documentMode || document.documentMode < 9))
			element.style.background = "#555";
	});
	gdomready = 1;
});