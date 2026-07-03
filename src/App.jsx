import { useMemo, useState } from 'react';

const nav = [
  ['dashboard', '⌂', 'Tổng quan'],
  ['documents', '▱', 'Tài liệu'],
  ['assistant', '✦', 'Trợ lý AI'],
  ['groups', '♧', 'Nhóm học tập'],
  ['storage', '◫', 'Dung lượng'],
  ['profile', '○', 'Hồ sơ'],
  ['admin', '⚙', 'Quản trị'],
];

const documents = [
  { name: 'Machine Learning Notes.pdf', type: 'PDF', size: '8.4 MB', date: 'Hôm nay, 09:42', color: '#f97373' },
  { name: 'Database Design.docx', type: 'DOCX', size: '2.1 MB', date: '02/07/2026', color: '#4f8ef7' },
  { name: 'SE Project Slides.pptx', type: 'PPTX', size: '12.7 MB', date: '30/06/2026', color: '#f59e5b' },
  { name: 'Research Summary.txt', type: 'TXT', size: '38 KB', date: '28/06/2026', color: '#7b879b' },
];

const groups = [
  { name: 'SWP391 - Team 4', members: 5, files: 24, activity: '5 phút trước', tone: 'violet' },
  { name: 'Machine Learning Club', members: 18, files: 42, activity: '1 giờ trước', tone: 'blue' },
  { name: 'Database Study Group', members: 8, files: 16, activity: 'Hôm qua', tone: 'green' },
];

function Icon({ children, tone = '' }) {
  return <span className={`icon ${tone}`}>{children}</span>;
}

function Login({ onLogin }) {
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState('minh@student.edu.vn');
  const [password, setPassword] = useState('12345678');
  const submit = () => onLogin(email.trim().toLowerCase() === 'admin@aistudyhub.vn' ? 'admin' : 'user');
  return <div className="auth-shell">
    <section className="auth-art">
      <div className="brand light"><span>✦</span> AI Study Hub</div>
      <div className="art-copy">
        <span className="eyebrow">HỌC TẬP THÔNG MINH HƠN</span>
        <h1>Biến tài liệu của bạn thành tri thức.</h1>
        <p>Lưu trữ, tổ chức và trò chuyện với mọi tài liệu học tập trong một không gian duy nhất.</p>
        <div className="art-cards"><div>PDF</div><div>AI<br/><small>Summary ready</small></div><div>DOC</div></div>
      </div>
      <span className="auth-note">Prototype · Mock data · Không kết nối backend</span>
    </section>
    <section className="auth-form">
      <div className="mobile-brand brand"><span>✦</span> AI Study Hub</div>
      <div className="form-card">
        <span className="eyebrow purple">CHÀO MỪNG BẠN</span>
        <h2>{register ? 'Tạo tài khoản' : 'Đăng nhập'}</h2>
        <p>{register ? 'Bắt đầu xây dựng thư viện học tập của riêng bạn.' : 'Tiếp tục hành trình học tập của bạn.'}</p>
        {register && <label>Họ và tên<input placeholder="Nguyễn Văn A" /></label>}
        <label>Email hoặc tên đăng nhập<input value={email} onChange={e=>setEmail(e.target.value)} /></label>
        <label>Mật khẩu<input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></label>
        <button className="primary wide" onClick={submit}>{register ? 'Tạo tài khoản' : 'Đăng nhập'} <span>→</span></button>
        <div className="divider"><span>hoặc</span></div>
        <button className="google" onClick={()=>onLogin('user')}><b>G</b> Tiếp tục với Google</button>
        {!register && <div className="demo-accounts"><span>Tài khoản demo</span><button onClick={()=>{setEmail('minh@student.edu.vn');setPassword('12345678')}}><b>User</b> minh@student.edu.vn</button><button onClick={()=>{setEmail('admin@aistudyhub.vn');setPassword('admin123')}}><b>Admin</b> admin@aistudyhub.vn</button></div>}
        <p className="switch">{register ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'} <button onClick={() => setRegister(!register)}>{register ? 'Đăng nhập' : 'Đăng ký ngay'}</button></p>
      </div>
    </section>
  </div>
}

function Sidebar({ page, setPage, logout, role }) {
  const items = role === 'admin' ? [['admin', '▦', 'Tổng quan quản trị']] : nav.filter(x=>x[0] !== 'admin');
  return <aside className="sidebar">
    <div className="brand"><span>✦</span> {role === 'admin' ? 'AI Hub Admin' : 'AI Study Hub'}</div>
    {role === 'admin' && <div className="admin-role-badge">ADMINISTRATOR</div>}
    <nav>{items.map(([id, icon, label]) => <button key={id} className={page === id ? 'active' : ''} onClick={() => setPage(id)}><b>{icon}</b>{label}</button>)}</nav>
    <div className="side-bottom">
      {role !== 'admin' && <div className="storage-mini"><div><span>Dung lượng</span><strong>68%</strong></div><progress value="68" max="100"/><small>3.4 GB / 5 GB</small></div>}
      <button className="logout" onClick={logout}>↪ Đăng xuất</button>
    </div>
  </aside>
}

function Topbar({ title, onUpload, role }) {
  return <header className="topbar"><div><span className="crumb">{role === 'admin' ? 'Admin Console /' : 'Workspace /'}</span><h2>{title}</h2></div><div className="top-actions"><button className="search">⌕ <span>Tìm kiếm...</span><kbd>⌘ K</kbd></button><button className="bell">♢<i>3</i></button><button className="avatar">{role === 'admin' ? 'AD' : 'MT'}</button>{role === 'admin' ? <button className="admin-export">↓ Xuất báo cáo</button> : <button className="primary" onClick={onUpload}>＋ Tải tài liệu</button>}</div></header>
}

function Dashboard({ setPage, onUpload }) {
  return <div className="page fade">
    <section className="welcome"><div><span className="eyebrow purple">THỨ SÁU, 03 THÁNG 7</span><h1>Chào buổi sáng, Minh 👋</h1><p>Sẵn sàng tiếp tục hành trình học tập hôm nay?</p></div><button className="primary" onClick={onUpload}>＋ Tải tài liệu mới</button></section>
    <section className="stats">
      <article><Icon tone="blue">▱</Icon><div><span>Tổng tài liệu</span><strong>128</strong><small>+12 tháng này</small></div></article>
      <article><Icon tone="violet">✦</Icon><div><span>Cuộc trò chuyện AI</span><strong>46</strong><small>+8 tuần này</small></div></article>
      <article><Icon tone="green">♧</Icon><div><span>Nhóm học tập</span><strong>5</strong><small>24 thành viên</small></div></article>
      <article><Icon tone="orange">◫</Icon><div><span>Dung lượng đã dùng</span><strong>3.4 GB</strong><small>trên tổng 5 GB</small></div></article>
    </section>
    <div className="grid-main">
      <section className="panel"><div className="panel-head"><div><h3>Tài liệu gần đây</h3><p>Tiếp tục công việc bạn đang làm</p></div><button onClick={() => setPage('documents')}>Xem tất cả →</button></div><DocumentTable compact /></section>
      <section className="panel ai-prompt"><span className="ai-orb">✦</span><h3>Hỏi tài liệu của bạn</h3><p>AI có thể tóm tắt, giải thích và giúp bạn ôn tập nhanh hơn.</p><div className="prompt-box">Hỏi bất cứ điều gì...<button onClick={() => setPage('assistant')}>↑</button></div><div className="chips"><span>Tóm tắt bài học</span><span>Tạo câu hỏi ôn tập</span></div></section>
    </div>
    <section className="panel activity"><div className="panel-head"><div><h3>Hoạt động gần đây</h3><p>Cập nhật mới nhất trong workspace</p></div></div><div className="activity-row"><Icon tone="blue">↑</Icon><p><b>Bạn đã tải lên Machine Learning Notes.pdf</b><span>Hôm nay lúc 09:42</span></p><Icon tone="violet">✦</Icon><p><b>AI đã hoàn thành bản tóm tắt</b><span>Hôm qua lúc 21:16</span></p><Icon tone="green">♧</Icon><p><b>Lan đã tham gia SWP391 - Team 4</b><span>Hôm qua lúc 15:03</span></p></div></section>
  </div>
}

function DocumentTable({ compact = false }) {
  return <div className="doc-table">{documents.slice(0, compact ? 4 : 4).map((d, i) => <div className="doc-row" key={d.name}><span className="file-icon" style={{background:d.color}}>{d.type.slice(0,1)}</span><div><b>{d.name}</b><small>{d.type} · {d.size}</small></div><span>{d.date}</span><button>•••</button></div>)}</div>
}

function Documents({ onUpload }) {
  const [view, setView] = useState('grid');
  return <div className="page fade"><section className="page-title"><div><span className="eyebrow purple">THƯ VIỆN CÁ NHÂN</span><h1>Tài liệu của tôi</h1><p>Tổ chức và quản lý toàn bộ tài liệu học tập.</p></div><button className="primary" onClick={onUpload}>＋ Tải tài liệu</button></section><div className="toolbar"><div className="search-input">⌕ <input placeholder="Tìm kiếm tài liệu..." /></div><button>Loại tệp⌄</button><button>Ngày tải lên⌄</button><div className="view-toggle"><button className={view==='grid'?'selected':''} onClick={()=>setView('grid')}>▦</button><button className={view==='list'?'selected':''} onClick={()=>setView('list')}>☷</button></div></div><div className="folder-row"><article><Icon tone="violet">▰</Icon><div><b>SWP391</b><small>24 tài liệu</small></div><button>•••</button></article><article><Icon tone="blue">▰</Icon><div><b>Machine Learning</b><small>18 tài liệu</small></div><button>•••</button></article><article><Icon tone="green">▰</Icon><div><b>Database</b><small>12 tài liệu</small></div><button>•••</button></article></div>{view==='grid'?<div className="document-grid">{documents.map(d=><article key={d.name}><div className="doc-preview"><span className="file-icon big" style={{background:d.color}}>{d.type[0]}</span><button>•••</button></div><b>{d.name}</b><small>{d.type} · {d.size}</small><span>{d.date}</span></article>)}</div>:<section className="panel"><DocumentTable /></section>}</div>
}

function Assistant() {
  const [messages, setMessages] = useState([{from:'ai', text:'Xin chào Minh! Mình đã sẵn sàng hỗ trợ bạn học từ tài liệu. Bạn muốn tìm hiểu điều gì?'}]);
  const [input, setInput] = useState('');
  const send = () => { if(!input.trim()) return; const q=input; setInput(''); setMessages(m=>[...m,{from:'me',text:q},{from:'ai',text:'Dựa trên “Machine Learning Notes.pdf”, supervised learning là phương pháp huấn luyện mô hình bằng dữ liệu đã được gắn nhãn. Mô hình học mối quan hệ giữa đầu vào và kết quả mong muốn để dự đoán cho dữ liệu mới.'}]); };
  return <div className="chat-layout fade"><aside className="chat-history"><button className="new-chat">＋ Cuộc trò chuyện mới</button><h4>Gần đây</h4>{['Giải thích supervised learning','Tóm tắt chương 3','Câu hỏi ôn tập Database'].map((x,i)=><button className={i===0?'selected':''} key={x}>◌ <span>{x}<small>{i?'Hôm qua':'10 phút trước'}</small></span></button>)}</aside><section className="chat-main"><div className="chat-context"><div><Icon tone="red">P</Icon><span><b>Machine Learning Notes.pdf</b><small>Đang dùng làm nguồn kiến thức</small></span></div><button>Đổi tài liệu</button></div><div className="messages">{messages.map((m,i)=><div className={`message ${m.from}`} key={i}><span>{m.from==='ai'?'✦':'MT'}</span><p>{m.text}{m.from==='ai'&&i>0&&<small>Nguồn: Machine Learning Notes.pdf · Trang 12</small>}</p></div>)}</div><div className="composer"><div><textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Hỏi về tài liệu của bạn..."/><button onClick={send}>↑</button></div><small>AI có thể mắc lỗi. Hãy kiểm tra lại thông tin quan trọng.</small></div></section></div>
}

function Groups() {
  const [joined, setJoined] = useState(false);
  return <div className="page fade"><section className="page-title"><div><span className="eyebrow purple">CỘNG TÁC</span><h1>Nhóm học tập</h1><p>Học cùng nhau, chia sẻ tài liệu và trao đổi kiến thức.</p></div><button className="primary" onClick={()=>setJoined(true)}>＋ Tạo nhóm mới</button></section>{joined&&<div className="toast">✓ Đã tạo nhóm demo thành công</div>}<div className="group-grid">{groups.map((g,i)=><article key={g.name}><div className={`group-cover ${g.tone}`}><span>{g.name.split(' ').slice(0,2).map(x=>x[0]).join('')}</span><small>{i===0?'Đang hoạt động':'Nhóm công khai'}</small></div><div className="group-info"><h3>{g.name}</h3><p>♧ {g.members} thành viên&nbsp;&nbsp; ▱ {g.files} tài liệu</p><div className="member-stack"><i>MT</i><i>LA</i><i>HN</i><span>+{g.members-3}</span></div><small>Hoạt động {g.activity}</small><button>Xem nhóm →</button></div></article>)}</div></div>
}

function Storage() {
  const [plan, setPlan] = useState('Student');
  return <div className="page fade"><section className="page-title"><div><span className="eyebrow purple">GÓI DỊCH VỤ</span><h1>Dung lượng lưu trữ</h1><p>Theo dõi dung lượng và lựa chọn gói phù hợp.</p></div></section><section className="storage-hero"><div><span className="ai-orb">◫</span><div><h3>Gói hiện tại: {plan}</h3><p>3.4 GB trong tổng số {plan==='Student'?'5 GB':'20 GB'} đã được sử dụng</p></div></div><strong>68%</strong><progress value="68" max="100"/><div className="legend"><span><i className="purple-dot"/>Tài liệu 2.6 GB</span><span><i className="blue-dot"/>Ảnh 0.5 GB</span><span><i className="gray-dot"/>Khác 0.3 GB</span></div></section><div className="plans"><article><span>MIỄN PHÍ</span><h2>Starter</h2><h3>0đ <small>/ mãi mãi</small></h3><p>500 MB lưu trữ</p><p>✓ Quản lý tài liệu cơ bản</p><p>✓ 10 câu hỏi AI mỗi ngày</p><button>Gói cơ bản</button></article><article className="recommended"><div className="tag">PHỔ BIẾN NHẤT</div><span>SINH VIÊN</span><h2>Student</h2><h3>49.000đ <small>/ tháng</small></h3><p>5 GB lưu trữ</p><p>✓ Trợ lý AI không giới hạn</p><p>✓ Nhóm học tập và chia sẻ</p><button className="primary">Gói hiện tại</button></article><article><span>NÂNG CAO</span><h2>Pro</h2><h3>99.000đ <small>/ tháng</small></h3><p>20 GB lưu trữ</p><p>✓ Tất cả tính năng Student</p><p>✓ Ưu tiên xử lý tài liệu</p><button onClick={()=>setPlan('Pro')}>{plan==='Pro'?'Đã chọn':'Nâng cấp lên Pro'}</button></article></div></div>
}

function Profile() {
  const [saved,setSaved]=useState(false);
  return <div className="page fade"><section className="page-title"><div><span className="eyebrow purple">TÀI KHOẢN</span><h1>Hồ sơ cá nhân</h1><p>Quản lý thông tin và cài đặt tài khoản.</p></div></section>{saved&&<div className="toast">✓ Đã lưu thay đổi</div>}<div className="profile-grid"><section className="panel profile-card"><div className="profile-avatar">MT</div><h2>Minh Trần</h2><p>minh@student.edu.vn</p><span>STUDENT PLAN</span><hr/><div><b>128</b><small>Tài liệu</small><b>5</b><small>Nhóm</small></div></section><section className="panel profile-form"><h3>Thông tin cá nhân</h3><div className="form-grid"><label>Họ và tên<input defaultValue="Minh Trần"/></label><label>Tên đăng nhập<input defaultValue="minhtth5"/></label><label>Email<input defaultValue="minh@student.edu.vn"/></label><label>Trường học<input defaultValue="FPT University"/></label></div><label>Giới thiệu<textarea defaultValue="Sinh viên ngành Kỹ thuật phần mềm, yêu thích AI và phát triển sản phẩm."/></label><button className="primary" onClick={()=>setSaved(true)}>Lưu thay đổi</button></section></div></div>
}

function Admin() {
  const [tab, setTab] = useState('users');
  const [users, setUsers] = useState([
    { name: 'Nguyễn Hoàng Minh', email: 'minh@student.edu.vn', role: 'USER', plan: 'Student', status: 'Hoạt động', joined: '03/07/2026', avatar: 'NM' },
    { name: 'Trần Ngọc Lan', email: 'lan.tran@student.edu.vn', role: 'USER', plan: 'Pro', status: 'Hoạt động', joined: '01/07/2026', avatar: 'TL' },
    { name: 'Lê Gia Huy', email: 'huy.le@student.edu.vn', role: 'USER', plan: 'Starter', status: 'Đã khóa', joined: '29/06/2026', avatar: 'LH' },
    { name: 'Phạm Anh Thư', email: 'thu.pham@student.edu.vn', role: 'USER', plan: 'Student', status: 'Hoạt động', joined: '27/06/2026', avatar: 'PT' },
  ]);
  const toggle = (email) => setUsers(list => list.map(u => u.email === email ? {...u, status: u.status === 'Đã khóa' ? 'Hoạt động' : 'Đã khóa'} : u));
  return <div className="page admin-page fade">
    <section className="page-title"><div><span className="eyebrow purple">ADMIN CONSOLE</span><h1>Trung tâm quản trị</h1><p>Theo dõi hoạt động và quản lý toàn bộ hệ thống.</p></div><div className="admin-date">◷ Dữ liệu mock · 03/07/2026</div></section>
    <section className="stats admin-stats">
      <article><Icon tone="blue">♧</Icon><div><span>Người dùng</span><strong>1,284</strong><small>↑ 12.4% tháng này</small></div></article>
      <article><Icon tone="violet">▱</Icon><div><span>Tài liệu</span><strong>8,642</strong><small>↑ 18.7% tháng này</small></div></article>
      <article><Icon tone="green">◎</Icon><div><span>Nhóm hoạt động</span><strong>186</strong><small>↑ 7.2% tháng này</small></div></article>
      <article><Icon tone="orange">₫</Icon><div><span>Doanh thu</span><strong>24.8M</strong><small>↑ 9.5% tháng này</small></div></article>
    </section>
    <div className="admin-insights">
      <section className="panel admin-chart"><div className="panel-head"><div><h3>Tăng trưởng người dùng</h3><p>Số tài khoản mới trong 7 tháng gần nhất</p></div><button>7 tháng⌄</button></div><div className="chart-area"><div className="y-axis"><span>400</span><span>300</span><span>200</span><span>100</span><span>0</span></div><div className="bars">{[['T1',130],['T2',185],['T3',160],['T4',245],['T5',275],['T6',320],['T7',372]].map(([m,v])=><div key={m}><span style={{height:`${v/4}px`}}><i>{v}</i></span><small>{m}</small></div>)}</div></div></section>
      <section className="panel system-health"><div className="panel-head"><div><h3>Trạng thái hệ thống</h3><p>Tổng quan các dịch vụ</p></div><span className="healthy">● Ổn định</span></div>{[['REST API','99.98%'],['Cloud Storage','99.95%'],['AI Service','99.72%'],['Email Service','99.91%']].map(([x,v])=><div className="health-row" key={x}><span><i/> {x}</span><b>{v}</b></div>)}<div className="health-note">Không có sự cố nghiêm trọng trong 24 giờ qua.</div></section>
    </div>
    <section className="panel admin-management">
      <div className="admin-tabs"><button className={tab==='users'?'active':''} onClick={()=>setTab('users')}>Người dùng</button><button className={tab==='groups'?'active':''} onClick={()=>setTab('groups')}>Nhóm học tập</button><button className={tab==='plans'?'active':''} onClick={()=>setTab('plans')}>Gói dịch vụ</button><button className={tab==='logs'?'active':''} onClick={()=>setTab('logs')}>System Logs</button><div className="search-input">⌕ <input placeholder="Tìm kiếm..."/></div></div>
      {tab==='users' && <div className="admin-table"><div className="admin-tr header"><span>NGƯỜI DÙNG</span><span>VAI TRÒ</span><span>GÓI</span><span>NGÀY THAM GIA</span><span>TRẠNG THÁI</span><span></span></div>{users.map(u=><div className="admin-tr" key={u.email}><span className="admin-user"><i>{u.avatar}</i><b>{u.name}<small>{u.email}</small></b></span><span>{u.role}</span><span><em className={`plan-${u.plan.toLowerCase()}`}>{u.plan}</em></span><span>{u.joined}</span><span><em className={u.status==='Hoạt động'?'status-active':'status-locked'}>● {u.status}</em></span><span><button className="row-action" onClick={()=>toggle(u.email)}>{u.status==='Đã khóa'?'Mở khóa':'Khóa'}</button></span></div>)}</div>}
      {tab==='groups' && <div className="empty-tab"><Icon tone="green">♧</Icon><h3>186 nhóm học tập</h3><p>Danh sách nhóm, thành viên và trạng thái kiểm duyệt sẽ hiển thị tại đây.</p></div>}
      {tab==='plans' && <div className="empty-tab"><Icon tone="orange">₫</Icon><h3>3 gói dịch vụ</h3><p>Starter, Student và Pro đang được cung cấp cho người dùng.</p></div>}
      {tab==='logs' && <div className="log-list"><p><b>ADMIN_LOGIN</b><span>admin@aistudyhub.vn đăng nhập hệ thống</span><small>10:42</small></p><p><b>USER_LOCKED</b><span>Tài khoản huy.le@student.edu.vn đã bị khóa</span><small>09:18</small></p><p><b>PLAN_UPDATED</b><span>Gói Student được cập nhật dung lượng</span><small>Hôm qua</small></p></div>}
      <div className="table-footer"><span>Hiển thị 1–4 trong 1,284 người dùng</span><div><button>‹</button><button className="current">1</button><button>2</button><button>3</button><button>›</button></div></div>
    </section>
  </div>
}

function UploadModal({ close }) {
  const [done,setDone]=useState(false);
  return <div className="modal-backdrop" onMouseDown={close}><div className="modal" onMouseDown={e=>e.stopPropagation()}><button className="modal-close" onClick={close}>×</button>{done?<div className="upload-success"><span>✓</span><h2>Tải lên thành công!</h2><p>Mockup_SWP391.pdf đã được thêm vào thư viện.</p><button className="primary" onClick={close}>Hoàn tất</button></div>:<><span className="eyebrow purple">THÊM TÀI LIỆU</span><h2>Tải tài liệu mới</h2><p>Hỗ trợ PDF, DOCX, PPTX, TXT, ảnh và video.</p><div className="drop-zone"><span>↑</span><b>Kéo thả tệp vào đây</b><small>hoặc nhấn để chọn tệp từ máy tính</small></div><label>Tên tài liệu<input defaultValue="Mockup_SWP391.pdf"/></label><label>Thư mục<select><option>SWP391</option><option>Machine Learning</option><option>Database</option></select></label><div className="modal-actions"><button onClick={close}>Hủy</button><button className="primary" onClick={()=>setDone(true)}>Tải lên</button></div></>}</div></div>
}

export default function App() {
  const [loggedIn,setLoggedIn]=useState(false);
  const [role,setRole]=useState('user');
  const [page,setPage]=useState('dashboard');
  const [upload,setUpload]=useState(false);
  const title=useMemo(()=>nav.find(x=>x[0]===page)?.[2]||'AI Study Hub',[page]);
  const login = (nextRole) => { setRole(nextRole); setPage(nextRole === 'admin' ? 'admin' : 'dashboard'); setLoggedIn(true); };
  if(!loggedIn) return <Login onLogin={login}/>;
  const pages={dashboard:<Dashboard setPage={setPage} onUpload={()=>setUpload(true)}/>,documents:<Documents onUpload={()=>setUpload(true)}/>,assistant:<Assistant/>,groups:<Groups/>,storage:<Storage/>,profile:<Profile/>,admin:<Admin/>};
  return <div className={`app ${role === 'admin' ? 'admin-app' : ''}`}><Sidebar page={page} setPage={setPage} role={role} logout={()=>setLoggedIn(false)}/><main><Topbar title={role === 'admin' ? 'Tổng quan quản trị' : title} role={role} onUpload={()=>setUpload(true)}/>{role === 'admin' ? <Admin/> : pages[page]}</main>{role !== 'admin'&&upload&&<UploadModal close={()=>setUpload(false)}/>}</div>;
}
