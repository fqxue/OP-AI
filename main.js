var e = ["空", "荧", "派蒙", "纳西妲", "阿贝多", "温迪", "枫原万叶", "钟离", "荒泷一斗", "八重神子", "艾尔海森", "提纳里", "迪希雅", "卡维", "宵宫", "莱依拉",
		"赛诺", "诺艾尔", "托马", "凝光", "莫娜", "北斗", "神里绫华", "雷电将军", "芭芭拉", "鹿野院平藏", "五郎", "迪奥娜", "凯亚", "安柏", "班尼特", "琴", "柯莱",
		"夜兰", "妮露", "辛焱", "珐露珊", "魈", "香菱", "达达利亚", "砂糖", "早柚", "云堇", "刻晴", "丽莎", "迪卢克", "烟绯", "重云", "珊瑚宫心海", "胡桃",
		"可莉", "流浪者", "久岐忍", "神里绫人", "甘雨", "戴因斯雷布", "优菈", "菲谢尔", "行秋", "白术", "九条裟罗", "雷泽", "申鹤", "迪娜泽黛", "凯瑟琳", "多莉",
		"坎蒂丝", "萍姥姥", "罗莎莉亚", "留云借风真君", "绮良良", "瑶瑶", "七七", "奥兹", "米卡", "夏洛蒂", "埃洛伊", "博士", "女士", "大慈树王", "三月七", "娜塔莎",
		"希露瓦", "虎克", "克拉拉", "丹恒", "希儿", "布洛妮娅", "瓦尔特", "杰帕德", "佩拉", "姬子", "艾丝妲", "白露", "星", "穹", "桑博", "伦纳德", "停云",
		"罗刹", "卡芙卡", "彦卿", "史瓦罗", "螺丝咕姆", "阿兰", "银狼", "素裳", "丹枢", "黑塔", "景元", "帕姆", "可可利亚", "半夏", "符玄", "公输师傅", "奥列格",
		"青雀", "大毫", "青镞", "费斯曼", "绿芙蓉", "镜流", "信使", "丽塔", "失落迷迭", "缭乱星棘", "伊甸", "伏特加女孩", "狂热蓝调", "莉莉娅", "萝莎莉娅", "八重樱",
		"八重霞", "卡莲", "第六夜想曲", "卡萝尔", "姬子", "极地战刃", "布洛妮娅", "次生银翼", "理之律者", "真理之律者", "迷城骇兔", "希儿", "魇夜星渊", "黑希儿",
		"帕朵菲莉丝", "天元骑英", "幽兰黛尔", "德丽莎", "月下初拥", "朔夜观星", "暮光骑士", "明日香", "李素裳", "格蕾修", "梅比乌斯", "渡鸦", "人之律者", "爱莉希雅", "爱衣",
		"天穹游侠", "琪亚娜", "空之律者", "终焉之律者", "薪炎之律者", "云墨丹心", "符华", "识之律者", "维尔薇", "始源之律者", "芽衣", "雷之律者", "苏莎娜", "阿波尼亚",
		"陆景和", "莫弈", "夏彦", "左然"
	],
	t = document.getElementById("speaker");
for (i = 0; i < e.length; i++) {
	var n = document.createElement("option");
	n.value = e[i],
		n.innerHTML = e[i],
		t.appendChild(n)
}

function setLoading(isLoading) {
	document.getElementById('loading').style.display = isLoading ? 'block' : 'none';
	document.getElementById('response').style.display = isLoading ? 'none' : 'block';
}

function sendMessage() {
	var message = document.getElementById('message').value;
	var selectedApi = document.getElementById('speaker').value;
	var apiUrl = 'https://api.lolimi.cn/API/AI/ys3.5.php?msg=';

	// 根据所选API调整URL
	apiUrl += `${encodeURIComponent(message)}&speaker=${selectedApi}`;

	if (message) { // 确保消息非空
		// 禁用发送按钮并显示加载提示
		document.getElementById('sendButton').disabled = true;
		setLoading(true);

		// 发送GET请求到API
		fetch(apiUrl)
			.then(response => response.json())
			.then(data => {
				if (data.code === 1) {
					var outputText = data.msg;
					document.getElementById('response').innerText = `${outputText}`;
					document.getElementById("audioPlayer").src = data.music;

				} else {
					document.getElementById('response').textContent = '错误: ' + data.code;
				}
			})
			.catch(error => {
				document.getElementById('response').textContent = '请求出错: ' + error;
			})
			.finally(() => {
				// 启用发送按钮并隐藏加载提示
				document.getElementById('sendButton').disabled = false;
				setLoading(false);
			});
	} else {
		alert('请输入消息。');
	}
}