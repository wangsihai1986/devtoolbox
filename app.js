// ===== Tab 切换 =====
document.getElementById('tabs').addEventListener('click', e => {
    if (!e.target.classList.contains('tab')) return;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    e.target.classList.add('active');
    document.getElementById(e.target.dataset.target).classList.add('active');
});

function setOutput(id, text) { document.getElementById(id).textContent = text; }

function copyText(id) {
    const text = document.getElementById(id).textContent;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => alert('已复制到剪贴板'));
}

function clearText(...ids) { ids.forEach(i => document.getElementById(i).value = ''); }

// ===== JSON =====
function formatJson() {
    try {
        const obj = JSON.parse(document.getElementById('jsonInput').value);
        setOutput('jsonOutput', JSON.stringify(obj, null, 4));
    } catch (e) {
        setOutput('jsonOutput', '❌ JSON 解析失败：' + e.message);
    }
}
function minifyJson() {
    try {
        const obj = JSON.parse(document.getElementById('jsonInput').value);
        setOutput('jsonOutput', JSON.stringify(obj));
    } catch (e) {
        setOutput('jsonOutput', '❌ JSON 解析失败：' + e.message);
    }
}

// ===== 时间戳 =====
function tsToDate() {
    const v = document.getElementById('tsInput').value.trim();
    if (!v) return;
    let ms = Number(v);
    if (isNaN(ms)) { setOutput('tsOutput', '❌ 请输入数字时间戳'); return; }
    if (v.length <= 10) ms *= 1000; // 秒 -> 毫秒
    const d = new Date(ms);
    if (isNaN(d.getTime())) { setOutput('tsOutput', '❌ 时间戳无效'); return; }
    const pad = n => String(n).padStart(2, '0');
    const s = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    setOutput('tsOutput', s);
}
function setNowTs() {
    const now = Date.now();
    document.getElementById('tsInput').value = now;
    setOutput('tsOutput', '当前毫秒时间戳：' + now + '\n当前秒时间戳：' + Math.floor(now / 1000));
}
function dateToTs() {
    const v = document.getElementById('dateInput').value.trim();
    if (!v) return;
    const d = new Date(v.replace(' ', 'T'));
    if (isNaN(d.getTime())) { setOutput('tsOutput', '❌ 日期格式应为 yyyy-MM-dd HH:mm:ss'); return; }
    setOutput('tsOutput', '毫秒时间戳：' + d.getTime() + '\n秒时间戳：' + Math.floor(d.getTime() / 1000));
}

// ===== Base64 =====
function b64Encode() {
    const v = document.getElementById('b64Input').value;
    try { setOutput('b64Output', btoa(unescape(encodeURIComponent(v)))); }
    catch (e) { setOutput('b64Output', '❌ 编码失败'); }
}
function b64Decode() {
    const v = document.getElementById('b64Input').value.trim();
    try { setOutput('b64Output', decodeURIComponent(escape(atob(v)))); }
    catch (e) { setOutput('b64Output', '❌ 解码失败：不是合法的 Base64'); }
}

// ===== URL =====
function urlEncode() {
    const v = document.getElementById('urlInput').value;
    setOutput('urlOutput', encodeURIComponent(v));
}
function urlDecode() {
    const v = document.getElementById('urlInput').value.trim();
    try { setOutput('urlOutput', decodeURIComponent(v)); }
    catch (e) { setOutput('urlOutput', '❌ 解码失败'); }
}

// ===== UUID =====
function genUuid() {
    const n = Math.min(100, Math.max(1, Number(document.getElementById('uuidCount').value) || 1));
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        }));
    }
    setOutput('uuidOutput', arr.join('\n'));
}
