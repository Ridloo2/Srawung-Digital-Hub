const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const storeKey = "srawungHubV1";
const defaultData = { identity:null, journal:[], aspirations:[], completed:[], evaluation:null };
let data = loadData();
let currentPage = "home";
let selectedScenario = 0;

function loadData(){ try{return {...defaultData,...JSON.parse(localStorage.getItem(storeKey)||"{}")}}catch(e){return {...defaultData}} }
function saveData(){ localStorage.setItem(storeKey, JSON.stringify(data)); updateProgress(); }
function toast(msg){ const el=$("#toast"); el.textContent=msg; el.classList.add("show"); clearTimeout(window.__toastTimer); window.__toastTimer=setTimeout(()=>el.classList.remove("show"),2600); }
function safe(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function today(){return new Intl.DateTimeFormat("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"}).format(new Date())}
$("#todayLabel").textContent=today();

const pages = {
 home:{crumb:"Dashboard",render:home},
 sluman:{crumb:"SLUMAN",render:sluman},
 slumun:{crumb:"SLUMUN",render:slumun},
 slamet:{crumb:"SLAMET",render:slamet},
 hub:{crumb:"Digital Hub",render:hub},
 evaluation:{crumb:"Evaluasi Program",render:evaluation}
};
function navigate(page){
 if(!pages[page])return;
 currentPage=page; $("#crumb").textContent=pages[page].crumb;
 $$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
 $("#sidebar").classList.remove("open");
 $("#appContent").innerHTML=pages[page].render();
 window.scrollTo({top:0,behavior:"smooth"});
}
function updateProgress(){
 const n=data.completed.length; const p=Math.round(n/6*100);
 const fill=$("#homeProgress"); if(fill)fill.style.width=p+"%";
 const label=$("#homeProgressLabel");if(label)label.textContent=p+"%";
}
function markDone(id){
 if(!data.completed.includes(id))data.completed.push(id);saveData();toast("Aktivitas ditandai selesai.");
}
function header(kicker,title,subtitle){
 return `<div class="eyebrow">${kicker}</div><h1 class="page-title">${title}</h1><p class="page-subtitle">${subtitle}</p>`;
}
function home(){
 const journalCount=data.journal.length, aspCount=data.aspirations.length;
 return `${`<section class="hero"><div class="hero-copy"><div class="hero-kicker">RUANG BERTUMBUH • RUANG BERSAMA</div><h1>Kenali dirimu.<br>Temukan arahmu. Bertumbuh bersama.</h1><p>SRAWUNG DIGITAL HUB mendampingi remaja mengenali potensi, mengambil keputusan secara bijak, dan membangun lingkungan pertemanan yang aman serta saling mendukung.</p><div class="hero-actions"><button class="btn btn-primary" data-page="sluman">Mulai perjalanan →</button><button class="btn btn-light" data-page="hub">Jelajahi materi</button></div></div><div class="hero-art">S</div></section>`}
 <div class="section-head"><div><h2>Perjalanan pengembangan diri</h2><p>Empat minggu sebagai siklus awal pelaksanaan program.</p></div><span class="pill gold">PROGRAM 4 MINGGU</span></div>
 <div class="grid grid-4">
  <div class="card stat-card"><div class="stat-top"><span class="stat-icon">◉</span><span class="pill">SLUMAN</span></div><div class="stat-value">${data.identity?"01":"—"}</div><div class="stat-label">Peta identitas diri</div><div class="stat-note">${data.identity?"Sudah mulai mengenali diri":"Mulai dari mengenali potensi"}</div></div>
  <div class="card stat-card"><div class="stat-top"><span class="stat-icon">◇</span><span class="pill">SLUMUN</span></div><div class="stat-value">${data.completed.includes("decision")?"✓":"—"}</div><div class="stat-label">Latihan mengambil keputusan</div><div class="stat-note">Berpikir kritis dan asertif</div></div>
  <div class="card stat-card"><div class="stat-top"><span class="stat-icon">♡</span><span class="pill">SLAMET</span></div><div class="stat-value">${data.completed.includes("support")?"✓":"—"}</div><div class="stat-label">Lingkungan suportif</div><div class="stat-note">Saling menghargai dan menolong</div></div>
  <div class="card stat-card"><div class="stat-top"><span class="stat-icon">✎</span><span class="pill">REFLEKSI</span></div><div class="stat-value">${journalCount}</div><div class="stat-label">Catatan refleksi</div><div class="stat-note">${aspCount} aspirasi tersimpan di perangkat ini</div></div>
 </div>
 <div class="section-head"><div><h2>Tiga tahapan SRAWUNG-RESILIENCE</h2><p>Bergerak dari pengenalan diri menuju dukungan sosial.</p></div></div>
 <div class="grid grid-3">
  <article class="card stage-card"><span class="stage-no">01</span><span class="stage-tag">Minggu pertama · Self-awareness</span><h3>SLUMAN</h3><p>Mengenali minat, bakat, kelebihan, kekurangan, dan cita-cita melalui pemetaan serta refleksi diri.</p><a href="#" class="card-link" data-page="sluman">Buka tahapan →</a></article>
  <article class="card stage-card"><span class="stage-no">02</span><span class="stage-tag">Minggu kedua · Decision-making</span><h3>SLUMUN</h3><p>Melatih kemampuan memilah pengaruh, berkomunikasi asertif, dan menentukan keputusan bertanggung jawab.</p><a href="#" class="card-link" data-page="slumun">Buka tahapan →</a></article>
  <article class="card stage-card"><span class="stage-no">03</span><span class="stage-tag">Minggu ketiga · Social resilience</span><h3>SLAMET</h3><p>Membangun kelompok pertemanan yang aman, menghargai perbedaan, dan membiasakan ta’awun.</p><a href="#" class="card-link" data-page="slamet">Buka tahapan →</a></article>
 </div>
 <div class="section-head"><div><h2>Progres aktivitas program</h2><p>Contoh indikator aktivitas yang dapat ditandai setelah dilakukan.</p></div></div>
 <div class="card"><div class="progress-meta"><b>Aktivitas yang ditandai selesai</b><strong id="homeProgressLabel">0%</strong></div><div class="progress-wrap"><div class="progress-fill" id="homeProgress"></div></div><div class="progress-meta"><span>0 aktivitas</span><span>6 aktivitas contoh</span></div><div class="divider"></div><div class="grid grid-3">
  ${activityButton("identity","Mengisi Identity Mapping","sluman")}
  ${activityButton("reflection","Menulis refleksi diri","sluman")}
  ${activityButton("decision","Menyelesaikan Decision Compass","slumun")}
  ${activityButton("assertive","Mempelajari komunikasi asertif","slumun")}
  ${activityButton("support","Mempelajari lingkungan suportif","slamet")}
  ${activityButton("evaluation","Mengisi evaluasi program","evaluation")}
 </div></div>
 <div class="notice" style="margin-top:17px"><strong>Catatan penting:</strong> Web ini merupakan media edukasi dan refleksi, bukan alat diagnosis psikologis atau pengganti konseling profesional. Data demo disimpan di browser/perangkat yang digunakan.</div>`;
}
function activityButton(id,label,page){
 const done=data.completed.includes(id);
 return `<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:5px 0"><span style="font-size:11px;color:#586b61">${done?"✓":"○"} ${label}</span><button class="btn btn-small ${done?"btn-soft":"btn-outline"}" data-done="${id}" ${done?"disabled":""}>${done?"Selesai":"Tandai"}</button></div>`;
}
function sluman(){
 const v=data.identity||{};
 return `${header("TAHAP 01 · SELF-AWARENESS AND IDENTITY DISCOVERY","SLUMAN — Mulai dengan mengenali diri","Tahap pengenalan identitas melalui pemetaan potensi, ruang refleksi, pengembangan kekuatan, dan nilai muhasabah.")}
 <div class="grid grid-2">
  <section class="card"><div class="section-head" style="margin-top:0"><div><h2>Identity Mapping</h2><p>Petakan dirimu tanpa membandingkan dengan orang lain.</p></div><span class="pill">PETA DIRI</span></div>
   <form id="identityForm" class="form-grid">
    <div class="field"><label for="interests">Minat yang ingin dieksplorasi</label><input id="interests" name="interests" placeholder="Contoh: sains, seni, olahraga" value="${safe(v.interests||"")}"></div>
    <div class="field"><label for="talents">Bakat atau kemampuan</label><input id="talents" name="talents" placeholder="Hal yang cukup kamu kuasai" value="${safe(v.talents||"")}"></div>
    <div class="field"><label for="strengths">Kelebihan diri</label><input id="strengths" name="strengths" placeholder="Contoh: teliti, tekun, komunikatif" value="${safe(v.strengths||"")}"></div>
    <div class="field"><label for="growth">Hal yang ingin dikembangkan</label><input id="growth" name="growth" placeholder="Kemampuan yang ingin dilatih" value="${safe(v.growth||"")}"></div>
    <div class="field full"><label for="dreams">Cita-cita atau tujuan sementara</label><textarea id="dreams" name="dreams" placeholder="Tidak harus sudah pasti. Tulis arah yang ingin kamu coba.">${safe(v.dreams||"")}</textarea></div>
    <div class="field full"><label for="steps">Langkah kecil yang bisa dilakukan</label><textarea id="steps" name="steps" placeholder="Satu tindakan realistis yang bisa dimulai minggu ini.">${safe(v.steps||"")}</textarea></div>
    <div class="field full form-actions"><button class="btn btn-primary" type="submit">Simpan peta diri</button><span class="mini-label">Tersimpan di browser perangkat ini.</span></div>
   </form>
  </section>
  <div class="grid">
   <section class="soft-panel"><h3>Self-Reflection Circle</h3><p>Diskusi kelompok kecil untuk berbagi pengalaman tentang tekanan teman sebaya tanpa menghakimi. Peserta boleh memilih untuk mendengarkan tanpa harus menceritakan hal pribadi.</p><ul class="list-clean" style="margin-top:13px"><li><span class="check-dot">1</span> Dengarkan tanpa memotong pembicaraan.</li><li><span class="check-dot">2</span> Hindari mengejek atau membandingkan.</li><li><span class="check-dot">3</span> Jaga privasi dan batasan setiap anggota.</li></ul></section>
   <section class="card"><span class="pill gold">STRENGTH-BASED DEVELOPMENT</span><h3 style="font:700 14px Manrope;color:var(--forest);margin:13px 0 7px">Kembangkan kekuatanmu</h3><p class="page-subtitle" style="margin:0 0 12px;font-size:11px">Pilih ruang eksplorasi yang sesuai minat. Tidak perlu langsung ahli—proses belajar juga merupakan pencapaian.</p><div class="choice-list" id="strengthChoices">${["Seni dan budaya","Olahraga dan kesehatan","Penelitian dan sains","Kewirausahaan dan proyek sosial"].map(x=>`<button class="choice" data-strength="${x}">${x} <span style="float:right">＋</span></button>`).join("")}</div><div class="result-box" id="strengthResult">Pilih bidang untuk melihat contoh langkah pengembangan.</div></section>
   <section class="notice"><strong>Muhasabah — evaluasi diri.</strong><br>Luangkan waktu untuk menilai proses: hal baik apa yang sudah dilakukan, apa yang perlu diperbaiki, dan langkah apa yang ingin dicoba berikutnya. Fokus pada perkembangan diri, bukan kesempurnaan.</section>
  </div>
 </div>`;
}
function slumun(){
 return `${header("TAHAP 02 · SOCIAL WISDOM AND DECISION-MAKING","SLUMUN — Bijak menentukan pilihan","Latihan menghadapi tekanan pertemanan dengan berpikir kritis, komunikasi asertif, dan pertimbangan yang bertanggung jawab.")}
 <div class="grid grid-2">
  <section class="card"><div class="section-head" style="margin-top:0"><div><h2>Peer Pressure Simulation</h2><p>Pilih respons yang paling sehat untuk situasi berikut.</p></div><span class="pill gold">SIMULASI</span></div>
   <div class="mini-label">SITUASI 01 · PENGARUH TEMAN</div><div class="soft-panel"><h3>Teman-teman mengajakmu melakukan sesuatu yang bertentangan dengan prinsip dan kenyamananmu. Mereka berkata, “Kalau tidak ikut, berarti kamu tidak kompak.”</h3><p>Respons mana yang paling tepat?</p></div>
   <div class="choice-list" id="scenarioChoices" style="margin-top:13px">
    <button class="choice" data-answer="0">A. Mengikuti ajakan agar tidak dijauhi.</button>
    <button class="choice" data-answer="1">B. Menolak dengan tegas dan tetap menghargai teman.</button>
    <button class="choice" data-answer="2">C. Membalas dengan ejekan agar mereka berhenti.</button>
   </div><div id="scenarioFeedback" class="result-box" aria-live="polite">Pilih jawaban untuk melihat pembahasan. Tidak ada penilaian terhadap dirimu—ini latihan memahami pilihan.</div>
  </section>
  <div class="grid">
   <section class="card"><span class="pill">ASSERTIVE COMMUNICATION TRAINING</span><h3 style="font:700 14px Manrope;color:var(--forest);margin:12px 0 7px">Latihan komunikasi asertif</h3><p class="page-subtitle" style="font-size:11px;margin:0 0 13px">Gunakan kalimat yang jelas, tenang, dan tetap menghormati orang lain.</p><div class="soft-panel"><b style="font-size:12px;color:var(--forest)">Pola sederhana: Saya + perasaan/pendapat + batasan.</b><p style="margin-top:7px">“Aku paham kalian ingin bersama, tetapi aku tidak nyaman melakukan itu. Aku memilih tidak ikut.”</p></div><button class="btn btn-outline btn-small" style="margin-top:12px" id="assertiveDone">Tandai sudah dipelajari</button></section>
   <section class="card"><span class="pill gold">DECISION COMPASS</span><h3 style="font:700 14px Manrope;color:var(--forest);margin:12px 0 7px">Kompas pengambilan keputusan</h3><div class="list-clean"><li><span class="check-dot">1</span> Apa masalah atau pilihan yang sedang dihadapi?</li><li><span class="check-dot">2</span> Apa konsekuensi dari setiap pilihan?</li><li><span class="check-dot">3</span> Apakah pilihan ini sesuai nilai dan keselamatan diri?</li><li><span class="check-dot">4</span> Siapa orang tepercaya yang bisa dimintai pertimbangan?</li><li><span class="check-dot">5</span> Apa keputusan yang paling bertanggung jawab?</li></div><button class="btn btn-outline btn-small" style="margin-top:14px" id="decisionDone">Tandai kompas dipelajari</button></section>
  </div>
 </div>
 <div class="grid grid-2" style="margin-top:16px">
  <section class="soft-panel"><h3>Literasi digital</h3><p>Periksa sumber, konteks, tanggal, dan tujuan sebuah unggahan. Jangan mengukur nilai diri hanya dari jumlah suka, komentar, atau tren media sosial.</p></section>
  <section class="soft-panel"><h3>Tabayyun — periksa sebelum percaya</h3><p>Biasakan memeriksa kebenaran informasi sebelum mempercayai atau menyebarkannya. Tunda berbagi jika sumber belum jelas atau berpotensi merugikan orang lain.</p></section>
 </div>`;
}
function slamet(){
 return `${header("TAHAP 03 · SOCIAL RESILIENCE AND PROTECTIVE ECOSYSTEM","SLAMET — Tumbuh dalam lingkungan suportif","Tahap membangun hubungan yang aman, saling menghargai, dan saling menolong melalui kelompok sebaya serta aksi sosial.")}
 <div class="grid grid-2">
  <section class="card"><span class="pill">SARWUNG PEER CIRCLE</span><h2 style="font:700 17px Manrope;color:var(--forest);margin:12px 0 7px">Ruang berbagi dan saling mendukung</h2><p class="page-subtitle" style="font-size:11px;margin:0 0 15px">Gunakan prinsip berikut ketika membuat kelompok sebaya di sekolah atau komunitas.</p>
   <ul class="list-clean"><li><span class="check-dot">✓</span><span><b>Tanpa penghakiman</b><br>Setiap anggota dihargai, termasuk yang memilih diam.</span></li><li><span class="check-dot">✓</span><span><b>Anti-perundungan</b><br>Tidak membenarkan ejekan, intimidasi, atau pengucilan.</span></li><li><span class="check-dot">✓</span><span><b>Menjaga privasi</b><br>Tidak menyebarkan cerita pribadi atau tangkapan layar tanpa izin.</span></li><li><span class="check-dot">✓</span><span><b>Menghargai perbedaan</b><br>Memberi ruang bagi latar belakang dan pendapat yang beragam.</span></li><li><span class="check-dot">✓</span><span><b>Ta’awun</b><br>Saling membantu tanpa merendahkan atau memaksa.</span></li></ul>
   <button class="btn btn-primary" style="margin-top:17px" id="supportDone">Saya memahami prinsip ruang aman</button>
  </section>
  <div class="grid">
   <section class="soft-panel"><h3>Ta’awun Social Action</h3><p>Aksi sederhana untuk menumbuhkan kepedulian sosial. Pilih satu kegiatan yang dapat dilakukan bersama sekolah atau komunitas.</p><div class="choice-list" style="margin-top:12px" id="actionChoices">${["Kampanye anti-perundungan","Edukasi kesehatan mental dan dukungan teman sebaya","Kegiatan sosial dan gotong royong","Gerakan menghargai perbedaan"].map(x=>`<button class="choice" data-action="${x}">${x}</button>`).join("")}</div><div id="actionResult" class="result-box">Pilih aksi untuk melihat contoh pelaksanaannya.</div></section>
   <section class="card"><span class="pill rose">BUTUH BANTUAN?</span><h3 style="font:700 14px Manrope;color:var(--forest);margin:12px 0 7px">Dukungan dari pihak tepercaya</h3><p class="page-subtitle" style="font-size:11px;margin:0 0 12px">Jika masalah terasa berat, berlangsung terus-menerus, atau mengganggu aktivitas, kamu tidak harus menghadapinya sendiri.</p><div class="list-clean"><li><span class="check-dot">1</span><span><b>Guru BK</b><br>Tempat awal untuk berdiskusi dan mencari dukungan di sekolah.</span></li><li><span class="check-dot">2</span><span><b>Psikolog atau tenaga profesional</b><br>Untuk konsultasi dan bantuan sesuai kebutuhan.</span></li><li><span class="check-dot">3</span><span><b>Puskesmas atau fasilitas kesehatan</b><br>Untuk mendapatkan informasi layanan dan rujukan.</span></li></div><div class="notice" style="margin-top:14px">Jika kamu merasa tidak aman atau berada dalam situasi darurat, segera hubungi orang dewasa tepercaya dan layanan darurat setempat.</div></section>
  </div>
 </div>`;
}
function hub(){
 const materials=[
  ["◉","Mengenali identitas diri","Latihan mengenali minat, nilai, kekuatan, dan tujuan pribadi.","SLUMAN"],
  ["◇","Menghadapi tekanan teman sebaya","Memahami pengaruh sosial dan menyusun pilihan yang sehat.","SLUMUN"],
  ["✦","Komunikasi asertif","Menyampaikan pendapat dan batasan dengan jelas serta hormat.","SLUMUN"],
  ["♡","Pertemanan yang suportif","Membangun empati, menghargai perbedaan, dan mencegah perundungan.","SLAMET"],
  ["▤","Literasi digital dan tabayyun","Memeriksa informasi, konteks, dan sumber sebelum membagikan.","SLUMUN"]
 ];
 return `${header("PUSAT EDUKASI · REFLEKSI · KOMUNIKASI","SRAWUNG DIGITAL HUB","Ruang digital pendukung kegiatan: materi pengembangan diri, jurnal refleksi, kalender program, informasi bantuan, dan kanal aspirasi.")}
 <div class="grid grid-2">
  <section class="card"><div class="section-head" style="margin-top:0"><div><h2>Materi edukasi</h2><p>Topik ringkas yang terhubung dengan tiga tahapan program.</p></div><span class="pill">5 MATERI</span></div><div class="grid">${materials.map(m=>`<div class="material-card"><div class="material-icon">${m[0]}</div><div><h3>${m[1]}</h3><p>${m[2]}</p><span class="pill">${m[3]}</span></div></div>`).join("")}</div></section>
  <div class="grid">
   <section class="card"><div class="section-head" style="margin-top:0"><div><h2>Jurnal refleksi</h2><p>Tulis pemikiranmu secara pribadi.</p></div></div><form id="journalForm" class="grid"><div class="field"><label for="journalMood">Apa yang ingin kamu refleksikan?</label><select id="journalMood"><option>Hal yang saya pelajari</option><option>Tantangan yang saya hadapi</option><option>Hal yang saya syukuri</option><option>Langkah kecil berikutnya</option></select></div><div class="field"><label for="journalText">Catatan refleksi</label><textarea id="journalText" required placeholder="Tuliskan secukupnya. Hindari memasukkan informasi pribadi yang sangat sensitif."></textarea></div><button class="btn btn-primary" type="submit">Simpan jurnal</button></form><div class="divider"></div><div id="journalList">${journalList()}</div></section>
   <section class="card"><div class="section-head" style="margin-top:0"><div><h2>Kalender kegiatan</h2><p>Contoh siklus empat minggu program.</p></div></div>
    ${calendarItem("01","Minggu 1","SLUMAN · Pengenalan identitas dan refleksi diri")}
    ${calendarItem("02","Minggu 2","SLUMUN · Simulasi dan latihan keputusan")}
    ${calendarItem("03","Minggu 3","SLAMET · Peer circle dan aksi ta’awun")}
    ${calendarItem("04","Minggu 4","Evaluasi, wawancara, dan refleksi program")}
   </section>
  </div>
 </div>
 <div class="grid grid-2" style="margin-top:16px">
  <section class="card"><div class="section-head" style="margin-top:0"><div><h2>Kanal aspirasi</h2><p>Sampaikan ide untuk pengembangan kegiatan.</p></div></div><form id="aspirationForm" class="grid"><div class="field"><label for="aspCategory">Kategori</label><select id="aspCategory"><option>Ide kegiatan</option><option>Materi yang dibutuhkan</option><option>Saran pelaksanaan</option><option>Apresiasi</option></select></div><div class="field"><label for="aspText">Aspirasi</label><textarea id="aspText" required placeholder="Tuliskan saran secara santun. Jangan mencantumkan data pribadi orang lain."></textarea></div><button class="btn btn-primary" type="submit">Simpan aspirasi di perangkat</button></form><div id="aspList" style="margin-top:12px">${aspirationList()}</div></section>
  <section class="soft-panel"><h3>Informasi privasi dan keamanan</h3><p>Versi demo ini tidak memakai akun, server, atau pengiriman data ke pengelola. Jurnal, peta diri, dan aspirasi tersimpan secara lokal pada browser perangkat ini. Jangan gunakan perangkat bersama untuk menyimpan catatan pribadi. Hapus data browser jika ingin mengosongkan data demo. Untuk implementasi sekolah, diperlukan kebijakan privasi, persetujuan, pengamanan akses, dan pengelolaan data yang jelas.</p><div class="divider"></div><h3>Peran platform</h3><p>Platform ini merupakan media edukasi dan komunikasi. Platform bukan alat diagnosis psikologis dan tidak menggantikan guru BK, psikolog, atau tenaga kesehatan.</p></section>
 </div>`;
}
function calendarItem(num,title,desc){return `<div class="calendar-item"><div class="calendar-date">${num}</div><div><b>${title}</b><small>${desc}</small></div></div>`}
function journalList(){
 if(!data.journal.length)return `<div class="empty-state"><b>Belum ada catatan</b>Catatan refleksimu akan muncul di sini.</div>`;
 return data.journal.slice(0,4).map(x=>`<div class="journal-entry"><b>${safe(x.topic)} · ${safe(x.date)}</b><p>${safe(x.text)}</p></div>`).join("");
}
function aspirationList(){
 if(!data.aspirations.length)return `<div class="empty-state">Belum ada aspirasi yang disimpan.</div>`;
 return data.aspirations.slice(0,3).map(x=>`<div class="journal-entry"><b>${safe(x.category)}</b><p>${safe(x.text)}</p></div>`).join("");
}
function evaluation(){
 const e=data.evaluation||{};
 return `${header("PEMANTAUAN DAN PERBAIKAN","Evaluasi Program","Evaluasi membantu melihat perubahan pemahaman, sikap, dan perilaku. Pengisian ini merupakan refleksi mandiri, bukan tes psikologis atau penilaian klinis.")}
 <div class="grid grid-2">
  <section class="card"><div class="section-head" style="margin-top:0"><div><h2>Refleksi perkembangan</h2><p>Nilai kondisi pemahamanmu saat ini.</p></div><span class="pill">SKALA 1–5</span></div>
   <form id="evaluationForm" class="grid">
    ${evalQuestion("q1","SLUMAN · Saya dapat menyebutkan minat, kekuatan, dan hal yang ingin saya kembangkan.",e.q1)}
    ${evalQuestion("q2","SLUMUN · Saya mampu mempertimbangkan konsekuensi sebelum mengambil keputusan.",e.q2)}
    ${evalQuestion("q3","SLAMET · Saya berusaha menghargai perbedaan dan mendukung teman.",e.q3)}
    ${evalQuestion("q4","Saya mengetahui kepada siapa harus meminta bantuan ketika menghadapi masalah.",e.q4)}
    <div class="field"><label for="evalNote">Refleksi singkat (opsional)</label><textarea id="evalNote" placeholder="Apa yang ingin kamu tingkatkan?">${safe(e.note||"")}</textarea></div>
    <button class="btn btn-primary" type="submit">Simpan refleksi evaluasi</button>
   </form>
  </section>
  <div class="grid">
   <section class="soft-panel"><h3>Metode evaluasi dalam esai</h3><p>Pelaksanaan program dapat dievaluasi melalui kuesioner sebelum dan sesudah kegiatan, wawancara, serta pengamatan. Indikator mencakup pengenalan diri (SLUMAN), kemandirian mengambil keputusan (SLUMUN), dan empati serta kepedulian sosial (SLAMET).</p></section>
   <section class="card"><h3 style="font:700 14px Manrope;color:var(--forest);margin:0 0 10px">Prinsip membaca hasil</h3><ul class="list-clean"><li><span class="check-dot">1</span> Perubahan skor adalah gambaran awal, bukan bukti sebab-akibat.</li><li><span class="check-dot">2</span> Gabungkan hasil kuesioner dengan wawancara dan observasi.</li><li><span class="check-dot">3</span> Gunakan temuan untuk memperbaiki program, bukan memberi label pada peserta.</li></ul></section>
   <section class="notice"><strong>Skala refleksi:</strong> 1 = belum sesuai dengan kondisi saya; 2 = sedikit sesuai; 3 = cukup sesuai; 4 = sesuai; 5 = sangat sesuai. Jawablah dengan jujur dan tidak perlu membandingkan diri dengan orang lain.</section>
  </div>
 </div>`;
}
function evalQuestion(id,label,value){return `<div class="field"><label>${label}</label><select name="${id}" required><option value="">Pilih skala</option>${[1,2,3,4,5].map(n=>`<option value="${n}" ${String(value||"")===String(n)?"selected":""}>${n} — ${["","Belum sesuai","Sedikit sesuai","Cukup sesuai","Sesuai","Sangat sesuai"][n]}</option>`).join("")}</select></div>`}

$("#appContent").addEventListener("click",e=>{
 const page=e.target.closest("[data-page]");if(page){e.preventDefault();navigate(page.dataset.page);return}
 const done=e.target.closest("[data-done]");if(done){markDone(done.dataset.done);navigate(currentPage);return}
 const strength=e.target.closest("[data-strength]");if(strength){
  $$("#strengthChoices .choice").forEach(x=>x.classList.remove("selected"));strength.classList.add("selected");
  const map={"Seni dan budaya":"Coba ikut latihan seni, membuat karya, atau terlibat dalam kegiatan budaya sekolah.","Olahraga dan kesehatan":"Mulai dengan latihan rutin yang aman, bergabung dalam klub, atau belajar menjaga kebugaran.","Penelitian dan sains":"Mulai dari pertanyaan sederhana, membaca sumber tepercaya, dan membuat proyek kecil.","Kewirausahaan dan proyek sosial":"Amati kebutuhan sekitar, susun ide sederhana, lalu uji melalui kegiatan kolaboratif."};
  $("#strengthResult").textContent=map[strength.dataset.strength];return;
 }
 const answer=e.target.closest("[data-answer]");if(answer){
  $$("#scenarioChoices .choice").forEach(x=>x.classList.remove("selected"));answer.classList.add("selected");
  const n=Number(answer.dataset.answer);$("#scenarioFeedback").textContent=n===1?"Pilihan ini paling sehat: kamu menyampaikan batasan dengan tegas tanpa merendahkan orang lain. Menolak ajakan yang tidak sesuai prinsip bukan berarti tidak menghargai pertemanan.":n===0?"Mengikuti ajakan hanya karena takut dijauhi dapat membuatmu mengabaikan batasan diri. Coba pertimbangkan kembali konsekuensinya.":"Membalas dengan ejekan berisiko memperbesar konflik. Komunikasi asertif membantu menyampaikan penolakan tanpa menyerang orang lain.";return;
 }
 const action=e.target.closest("[data-action]");if(action){
  $$("#actionChoices .choice").forEach(x=>x.classList.remove("selected"));action.classList.add("selected");
  $("#actionResult").textContent=action.dataset.action+": bentuk tim kecil, sepakati tujuan, tentukan kegiatan yang aman dan realistis, lalu refleksikan hasilnya bersama.";return;
 }
});
$("#appContent").addEventListener("submit",e=>{
 e.preventDefault();
 if(e.target.id==="identityForm"){
  const f=new FormData(e.target);data.identity=Object.fromEntries(f.entries());saveData();toast("Peta identitas diri berhasil disimpan.");return;
 }
 if(e.target.id==="journalForm"){
  const text=$("#journalText").value.trim();if(!text)return;
  data.journal.unshift({topic:$("#journalMood").value,text,date:new Date().toLocaleDateString("id-ID")});saveData();navigate("hub");toast("Jurnal refleksi tersimpan di perangkat.");return;
 }
 if(e.target.id==="aspirationForm"){
  const text=$("#aspText").value.trim();if(!text)return;
  data.aspirations.unshift({category:$("#aspCategory").value,text});saveData();navigate("hub");toast("Aspirasi tersimpan di perangkat.");return;
 }
 if(e.target.id==="evaluationForm"){
  const fd=new FormData(e.target);data.evaluation={q1:fd.get("q1"),q2:fd.get("q2"),q3:fd.get("q3"),q4:fd.get("q4"),note:$("#evalNote").value};markDone("evaluation");navigate("evaluation");toast("Refleksi evaluasi tersimpan.");return;
 }
});
$("#appContent").addEventListener("click",e=>{
 if(e.target.id==="assertiveDone"){markDone("assertive");return}
 if(e.target.id==="decisionDone"){markDone("decision");return}
 if(e.target.id==="supportDone"){markDone("support");return}
});
$("#menuToggle").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
navigate("home");
