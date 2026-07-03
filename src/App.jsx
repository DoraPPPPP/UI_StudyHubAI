import { useMemo, useState } from 'react';

const nav = [
  ['dashboard', '⌂', 'Tổng quan'],
  ['documents', '▱', 'Tài liệu'],
  ['assistant', '✦', 'Trợ lý AI'],
  ['groups', '♧', 'Nhóm học tập'],
  ['storage', '◫', 'Dung lượng'],
  ['profile', '○', 'Hồ sơ'],
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
        <label>Email hoặc tên đăng nhập<input defaultValue="minh@student.edu.vn" /></label>
        <label>Mật khẩu<input type="password" defaultValue="12345678" /></label>
        <button className="primary wide" onClick={onLogin}>{register ? 'Tạo tài khoản' : 'Đăng nhập'} <span>→</span></button>
        <div className="divider"><span>hoặc</span></div>
        <button className="google" onClick={onLogin}><b>G</b> Tiếp tục với Google</button>
        <p className="switch">{register ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'} <button onClick={() => setRegister(!register)}>{register ? 'Đăng nhập' : 'Đăng ký ngay'}</button></p>
      </div>
    </section>
  </div>
}

function Sidebar({ page, setPage, logout }) {
  return <aside className="sidebar">
    <div className="brand"><span>✦</span> AI Study Hub</div>
    <nav>{nav.map(([id, icon, label]) => <button key={id} className={page === id ? 'active' : ''} onClick={() => setPage(id)}><b>{icon}</b>{label}</button>)}</nav>
    <div className="side-bottom">
      <div className="storage-mini"><div><span>Dung lượng</span><strong>68%</strong></div><progress value="68" max="100"/><small>3.4 GB / 5 GB</small></div>
      <button className="logout" onClick={logout}>↪ Đăng xuất</button>
    </div>
  </aside>
}

function Topbar({ title, onUpload }) {
  return <header className="topbar"><div><span className="crumb">Workspace /</span><h2>{title}</h2></div><div className="top-actions"><button className="search">⌕ <span>Tìm kiếm...</span><kbd>⌘ K</kbd></button><button className="bell">♢<i>3</i></button><button className="avatar">MT</button><button className="primary" onClick={onUpload}>＋ Tải tài liệu</button></div></header>
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

function UploadModal({ close }) {
  const [done,setDone]=useState(false);
  return <div className="modal-backdrop" onMouseDown={close}><div className="modal" onMouseDown={e=>e.stopPropagation()}><button className="modal-close" onClick={close}>×</button>{done?<div className="upload-success"><span>✓</span><h2>Tải lên thành công!</h2><p>Mockup_SWP391.pdf đã được thêm vào thư viện.</p><button className="primary" onClick={close}>Hoàn tất</button></div>:<><span className="eyebrow purple">THÊM TÀI LIỆU</span><h2>Tải tài liệu mới</h2><p>Hỗ trợ PDF, DOCX, PPTX, TXT, ảnh và video.</p><div className="drop-zone"><span>↑</span><b>Kéo thả tệp vào đây</b><small>hoặc nhấn để chọn tệp từ máy tính</small></div><label>Tên tài liệu<input defaultValue="Mockup_SWP391.pdf"/></label><label>Thư mục<select><option>SWP391</option><option>Machine Learning</option><option>Database</option></select></label><div className="modal-actions"><button onClick={close}>Hủy</button><button className="primary" onClick={()=>setDone(true)}>Tải lên</button></div></>}</div></div>
}

export default function App() {
  const [loggedIn,setLoggedIn]=useState(false);
  const [page,setPage]=useState('dashboard');
  const [upload,setUpload]=useState(false);
  const title=useMemo(()=>nav.find(x=>x[0]===page)?.[2]||'AI Study Hub',[page]);
  if(!loggedIn) return <Login onLogin={()=>setLoggedIn(true)}/>;
  const pages={dashboard:<Dashboard setPage={setPage} onUpload={()=>setUpload(true)}/>,documents:<Documents onUpload={()=>setUpload(true)}/>,assistant:<Assistant/>,groups:<Groups/>,storage:<Storage/>,profile:<Profile/>};
  return <div className="app"><Sidebar page={page} setPage={setPage} logout={()=>setLoggedIn(false)}/><main><Topbar title={title} onUpload={()=>setUpload(true)}/>{pages[page]}</main>{upload&&<UploadModal close={()=>setUpload(false)}/>}</div>;
}
