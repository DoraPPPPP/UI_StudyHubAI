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

function Intro({ onOpenLogin, onOpenRegister }) {
  return <main className="intro-shell">
    <nav className="intro-nav">
      <div className="brand"><span>✦</span> AI Study Hub</div>
      <div className="intro-nav-actions"><button className="intro-register" onClick={onOpenRegister}>Đăng ký</button><button className="intro-login" onClick={onOpenLogin}>Đăng nhập <span>→</span></button></div>
    </nav>
    <section className="intro-hero">
      <div className="intro-copy">
        <span className="eyebrow purple">HỌC TẬP THÔNG MINH HƠN</span>
        <h1>Biến mọi tài liệu thành <em>tri thức của bạn.</em></h1>
        <p>Lưu trữ, tổ chức và trò chuyện với tài liệu học tập trong một không gian duy nhất, được hỗ trợ bởi AI.</p>
        <div className="intro-actions">
          <button className="primary" onClick={onOpenRegister}>Tạo tài khoản miễn phí <span>→</span></button>
          <span>Miễn phí · Không cần thẻ ngân hàng</span>
        </div>
      </div>
      <div className="intro-visual" aria-label="Minh họa không gian học tập AI">
        <div className="intro-glow" />
        <article className="intro-document"><span>PDF</span><div><b>Machine Learning Notes</b><small>42 trang · Đã phân tích</small></div><i>✓</i></article>
        <article className="intro-ai"><span>✦</span><small>AI SUMMARY</small><h3>Nội dung chính</h3><p>Supervised learning sử dụng dữ liệu đã gắn nhãn để huấn luyện mô hình...</p><div><i/><i/><i/></div></article>
        <article className="intro-note"><b>12</b><span>Tài liệu<br/><small>tuần này</small></span></article>
      </div>
    </section>
    <section className="intro-features">
      <article><span>▱</span><div><b>Lưu trữ tập trung</b><small>Mọi tài liệu trong một workspace</small></div></article>
      <article><span>✦</span><div><b>Trợ lý AI</b><small>Tóm tắt và giải thích tức thì</small></div></article>
      <article><span>♧</span><div><b>Học tập cộng tác</b><small>Chia sẻ kiến thức cùng bạn bè</small></div></article>
    </section>
  </main>;
}

function Login({ onLogin, onBack, initialMode = 'login' }) {
  const [email, setEmail] = useState(initialMode === 'register' ? '' : 'minh@student.edu.vn');
  const [password, setPassword] = useState(initialMode === 'register' ? '' : '12345678');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const login = (event) => { event.preventDefault(); if (!email || !password) return setError('Vui lòng nhập email và mật khẩu.'); onLogin(email.toLowerCase() === 'admin@aistudyhub.vn' ? 'admin' : 'user'); };
  const register = (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); if (data.get('newPassword') !== data.get('confirmPassword')) return setError('Mật khẩu xác nhận chưa khớp.'); setError(''); onLogin('user'); };
  return <main className="auth-page">
    <header className="auth-header"><button className="brand" onClick={onBack}><span>✦</span> AI Study Hub</button><button onClick={onBack}>← Trang chủ</button></header>
    <div className="auth-dual">
      <section className="auth-login-panel">
        <div className="auth-panel-copy"><span className="auth-orb">✦</span><h1>Chào mừng trở lại!</h1><p>Đăng nhập để tiếp tục quản lý tài liệu và học tập thông minh với AI.</p></div>
        <form className="auth-clean-form" onSubmit={login}>
          <h2>Đăng nhập</h2><p>Truy cập không gian học tập của bạn.</p>
          <label>Email hoặc tên đăng nhập<input type="email" value={email} onChange={e=>{setEmail(e.target.value);setError('')}} placeholder="Nhập email hoặc tên đăng nhập" required/></label>
          <label>Mật khẩu<div className="password-field"><input type={showPassword?'text':'password'} value={password} onChange={e=>{setPassword(e.target.value);setError('')}} placeholder="Nhập mật khẩu" required/><button type="button" onClick={()=>setShowPassword(!showPassword)}>{showPassword?'Ẩn':'Hiện'}</button></div></label>
          <button type="button" className="forgot-link">Quên mật khẩu?</button>{error&&<p className="auth-error">{error}</p>}
          <button className="primary wide" type="submit">Đăng nhập</button><div className="divider"><span>Hoặc đăng nhập với</span></div>
          <div className="social-row"><button type="button" onClick={()=>onLogin('user')}><b>G</b> Google</button><button type="button" onClick={()=>onLogin('user')}><b>▦</b> Microsoft</button></div>
          <small className="demo-hint">Admin: admin@aistudyhub.vn / admin123</small>
        </form>
      </section>
      <section className="auth-register-panel">
        <form className="auth-clean-form register-form" onSubmit={register}>
          <span className="eyebrow purple">BẮT ĐẦU MIỄN PHÍ</span><h2>Tạo tài khoản mới</h2><p>Đăng ký để bắt đầu hành trình học tập thông minh cùng AI Study Hub.</p>
          <label>Họ và tên<input name="fullName" placeholder="Nhập họ và tên" required/></label>
          <label>Email<input name="newEmail" type="email" placeholder="Nhập email của bạn" required/></label>
          <label>Tên đăng nhập<input name="username" placeholder="Chọn tên đăng nhập" required/></label>
          <label>Mật khẩu<input name="newPassword" type="password" minLength="8" placeholder="Tạo mật khẩu (tối thiểu 8 ký tự)" required/></label>
          <label>Xác nhận mật khẩu<input name="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" required/></label>
          <label className="terms-check"><input type="checkbox" required/><span>Tôi đồng ý với <button type="button">Điều khoản sử dụng</button> và <button type="button">Chính sách bảo mật</button>.</span></label>
          <button className="primary wide" type="submit">Đăng ký <span>→</span></button>
        </form>
      </section>
    </div>
  </main>;
}

function Sidebar({ page, setPage, logout, role }) {
  const items = role === 'admin' ? [
    ['admin', '⌂', 'Trang chủ'], ['admin-users', '♧', 'Người dùng'], ['admin-documents', '▱', 'Tài liệu'],
    ['admin-groups', '◎', 'Nhóm học tập'], ['admin-plans', '₫', 'Gói lưu trữ'], ['admin-logs', '◷', 'Nhật ký hệ thống']
  ] : nav.filter(x=>x[0] !== 'admin');
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
  const today = new Intl.DateTimeFormat('vi-VN', { weekday: 'long', day: '2-digit', month: 'long' }).format(new Date()).toUpperCase();
  return <div className="page fade">
    <section className="welcome"><div><span className="eyebrow purple">{today}</span><h1>Chào buổi sáng, Minh 👋</h1><p>Sẵn sàng tiếp tục hành trình học tập hôm nay?</p></div><button className="primary" onClick={onUpload}>＋ Tải tài liệu mới</button></section>
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
  const [picker,setPicker]=useState(false);
  const [citations,setCitations]=useState(true);
  const [selectedDocs,setSelectedDocs]=useState(documents.slice(0,3));
  const toggleDoc=(doc)=>setSelectedDocs(list=>list.some(d=>d.name===doc.name)?list.filter(d=>d.name!==doc.name):[...list,doc]);
  const send = () => { if(!input.trim()) return; const q=input; setInput(''); setMessages(m=>[...m,{from:'me',text:q},{from:'ai',text:'Dựa trên “Machine Learning Notes.pdf”, supervised learning là phương pháp huấn luyện mô hình bằng dữ liệu đã được gắn nhãn. Mô hình học mối quan hệ giữa đầu vào và kết quả mong muốn để dự đoán cho dữ liệu mới.'}]); };
  return <div className="rag-layout fade"><aside className="rag-sources"><div className="rag-title"><div><h3>Nguồn dữ liệu cho AI (RAG)</h3><p>AI chỉ trả lời dựa trên các tài liệu bạn chọn.</p></div><span>ⓘ</span></div><button className="add-source" onClick={()=>setPicker(!picker)}>＋ Thêm từ kho tài liệu</button><div className="selected-title"><b>Đã chọn ({selectedDocs.length})</b><button onClick={()=>setSelectedDocs([])}>Xóa tất cả</button></div><div className="selected-docs">{selectedDocs.map(d=><article key={d.name}><i style={{background:d.color}}>{d.type[0]}</i><span><b>{d.name}</b><small>{d.type} · {d.size}</small></span><button onClick={()=>toggleDoc(d)}>×</button></article>)}</div><section className="rag-safe"><b>♢ An toàn & bảo mật</b><p>✓ AI chỉ truy cập tài liệu bạn chọn</p><p>✓ Không dùng dữ liệu ngoài phạm vi cho phép</p><p>✓ Câu trả lời được tạo theo cơ chế RAG</p><button>Tìm hiểu thêm về RAG</button></section><label className="rag-select">Chế độ trả lời<select><option>Cân bằng (khuyến nghị)</option><option>Ngắn gọn</option><option>Chuyên sâu</option></select><small>Trả lời chính xác, đầy đủ và rõ ràng.</small></label><label className="rag-select">Ngôn ngữ trả lời<select><option>Tiếng Việt</option><option>English</option></select></label><label className="citation-toggle">Hiển thị nguồn trích dẫn<button className={citations?'on':''} onClick={()=>setCitations(!citations)}><i/></button></label>{picker&&<div className="doc-picker"><h3>Chọn tài liệu từ kho của bạn</h3><input placeholder="⌕  Tìm kiếm tài liệu..."/>{documents.map(d=><label key={d.name}><input type="checkbox" checked={selectedDocs.some(x=>x.name===d.name)} onChange={()=>toggleDoc(d)}/><i style={{background:d.color}}>{d.type[0]}</i><span><b>{d.name}</b><small>{d.type} · {d.size}</small></span></label>)}<button className="primary" onClick={()=>setPicker(false)}>Xong ({selectedDocs.length})</button></div>}</aside><section className="rag-chat"><header><div><Icon tone="red">P</Icon><span><b>{selectedDocs[0]?.name||'Chưa chọn tài liệu'}</b><small>{selectedDocs.length?`Đang dùng ${selectedDocs.length} tài liệu làm nguồn kiến thức`:'Hãy thêm tài liệu để bắt đầu'}</small></span></div><button onClick={()=>setPicker(true)}>Đổi tài liệu</button></header><div className="rag-messages">{messages.map((m,i)=><div className={`rag-message ${m.from}`} key={i}><span>{m.from==='ai'?'✦':'MT'}</span><p>{m.text}{m.from==='ai'&&citations&&i>0&&<small>▱ Nguồn: Machine Learning Notes.pdf · Trang 12</small>}</p></div>)}</div><div className="rag-composer"><div><textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Hỏi về tài liệu của bạn..."/><button onClick={send}>↑</button></div><button onClick={()=>setPicker(true)}>＋ Thêm từ kho tài liệu</button><small>AI có thể mắc lỗi. Hãy kiểm tra lại thông tin quan trọng.</small></div></section></div>
}

function GroupDetail({ group, onBack }) {
  const [tab,setTab]=useState('overview');
  const members=[['NA','Nguyễn Văn A','Trưởng nhóm','Đang hoạt động'],['TB','Trần Thị B','Thành viên','Đang hoạt động'],['LC','Lê Văn C','Thành viên','Vừa mới truy cập'],['PD','Phạm Thị D','Thành viên','Đang hoạt động'],['HE','Hoàng Văn E','Thành viên','Ngoại tuyến']];
  return <div className="group-detail page fade">
    <button className="detail-back" onClick={onBack}>← Nhóm học tập</button>
    <section className="group-detail-head"><div className="group-logo">{group.name.split(' ').slice(0,2).map(x=>x[0]).join('')}</div><div><div className="detail-title"><h1>{group.name}</h1><span>Đang hoạt động</span></div><p>Nhóm học phần SWP391&nbsp; · &nbsp;Tạo ngày 01/06/2026</p><small>♧ {group.members} thành viên&nbsp;&nbsp; ▱ {group.files} tài liệu&nbsp;&nbsp; ◷ Hoạt động {group.activity}</small></div><div className="group-head-actions"><button>⌯ Chia sẻ nhóm</button><button>⚙ Cài đặt nhóm</button><button className="primary">＋ Mời thành viên</button></div></section>
    <nav className="group-tabs">{[['overview','Tổng quan'],['docs','Tài liệu'],['discuss','Thảo luận'],['tasks','Nhiệm vụ'],['calendar','Lịch hoạt động'],['members','Thành viên'],['settings','Cài đặt']].map(([id,label])=><button className={tab===id?'active':''} onClick={()=>setTab(id)} key={id}>{label}</button>)}</nav>
    {tab==='overview'?<div className="group-detail-grid"><div>
      <section className="panel group-about"><div><h3>Giới thiệu nhóm</h3><p>Nhóm học và trao đổi tài liệu cho học phần SWP391 - Software Requirements. Mục tiêu: hoàn thành dự án cuối kỳ với chất lượng tốt nhất.</p><button>Chỉnh sửa</button></div><aside><small>Mã nhóm</small><b>SWP391-T4&nbsp; ▢</b><small>Quyền của bạn</small><em>Trưởng nhóm</em></aside></section>
      <section className="panel recent-group"><h3>Hoạt động gần đây</h3>{[['↑','Nguyễn Văn A','đã tải lên tài liệu','SRS_Final.docx','5 phút trước'],['▢','Trần Thị B','đã tạo cuộc thảo luận mới','Thảo luận về Use Case Diagram','15 phút trước'],['✓','Lê Văn C','đã hoàn thành nhiệm vụ','Review chương 2 - Overall Description','1 giờ trước'],['↑','Phạm Thị D','đã tải lên tài liệu','Database_Design.pdf','2 giờ trước']].map((a,i)=><div className="group-activity" key={a[3]}><i className={`tone-${i}`}>{a[0]}</i><span className="mini-avatar">{a[1].split(' ').slice(-2).map(x=>x[0]).join('')}</span><p><b>{a[1]}</b> {a[2]}<small>{a[3]}</small></p><time>{a[4]}</time></div>)}</section>
    </div><div><section className="panel group-members"><div className="panel-head"><h3>Thành viên ({group.members})</h3><button onClick={()=>setTab('members')}>Xem tất cả</button></div>{members.map((m,i)=><div key={m[1]}><span className="mini-avatar">{m[0]}</span><b>{m[1]}</b><em>{m[2]}</em><small className={i===4?'offline':''}>● {m[3]}</small><button>•••</button></div>)}</section><section className="panel group-stats"><h3>Thống kê nhóm</h3><div><article><b>▱ <strong>{group.files}</strong></b><small>Tài liệu</small></article><article><b>▢ <strong>18</strong></b><small>Cuộc thảo luận</small></article><article><b>✓ <strong>6</strong></b><small>Nhiệm vụ</small></article><article><b>▣ <strong>12</strong></b><small>Ngày hoạt động</small></article></div><p><b>Dung lượng nhóm</b><span>3.4 GB / 5 GB (68%)</span></p><progress value="68" max="100"/></section></div></div>:<section className="panel group-tab-content"><Icon tone="violet">{tab==='docs'?'▱':tab==='members'?'♧':'✦'}</Icon><h2>{[['docs','Tài liệu của nhóm'],['discuss','Thảo luận nhóm'],['tasks','Nhiệm vụ nhóm'],['calendar','Lịch hoạt động'],['members','Danh sách thành viên'],['settings','Cài đặt nhóm']].find(x=>x[0]===tab)?.[1]}</h2><p>Khu vực này đã sẵn sàng để kết nối dữ liệu và chức năng tương ứng.</p></section>}
  </div>;
}

function Groups() {
  const [joined, setJoined] = useState(false);
  const [selectedGroup,setSelectedGroup]=useState(null);
  if(selectedGroup) return <GroupDetail group={selectedGroup} onBack={()=>setSelectedGroup(null)}/>;
  return <div className="page fade"><section className="page-title"><div><span className="eyebrow purple">CỘNG TÁC</span><h1>Nhóm học tập</h1><p>Học cùng nhau, chia sẻ tài liệu và trao đổi kiến thức.</p></div><button className="primary" onClick={()=>setJoined(true)}>＋ Tạo nhóm mới</button></section>{joined&&<div className="toast">✓ Đã tạo nhóm demo thành công</div>}<div className="group-grid">{groups.map((g,i)=><article key={g.name}><div className={`group-cover ${g.tone}`}><span>{g.name.split(' ').slice(0,2).map(x=>x[0]).join('')}</span><small>{i===0?'Đang hoạt động':'Nhóm công khai'}</small></div><div className="group-info"><h3>{g.name}</h3><p>♧ {g.members} thành viên&nbsp;&nbsp; ▱ {g.files} tài liệu</p><div className="member-stack"><i>MT</i><i>LA</i><i>HN</i><span>+{g.members-3}</span></div><small>Hoạt động {g.activity}</small><button onClick={()=>setSelectedGroup(g)}>Xem nhóm →</button></div></article>)}</div></div>
}

function Storage() {
  const [plan, setPlan] = useState('Student');
  return <div className="page fade"><section className="page-title"><div><span className="eyebrow purple">GÓI DỊCH VỤ</span><h1>Dung lượng lưu trữ</h1><p>Theo dõi dung lượng và lựa chọn gói phù hợp.</p></div></section><section className="storage-hero"><div><span className="ai-orb">◫</span><div><h3>Gói hiện tại: {plan}</h3><p>3.4 GB trong tổng số {plan==='Student'?'5 GB':'20 GB'} đã được sử dụng</p></div></div><strong>68%</strong><progress value="68" max="100"/><div className="legend"><span><i className="purple-dot"/>Tài liệu 2.6 GB</span><span><i className="blue-dot"/>Ảnh 0.5 GB</span><span><i className="gray-dot"/>Khác 0.3 GB</span></div></section><div className="plans"><article><span>MIỄN PHÍ</span><h2>Starter</h2><h3>0đ <small>/ mãi mãi</small></h3><p>500 MB lưu trữ</p><p>✓ Quản lý tài liệu cơ bản</p><p>✓ 10 câu hỏi AI mỗi ngày</p><button>Gói cơ bản</button></article><article className="recommended"><div className="tag">PHỔ BIẾN NHẤT</div><span>SINH VIÊN</span><h2>Student</h2><h3>49.000đ <small>/ tháng</small></h3><p>5 GB lưu trữ</p><p>✓ Trợ lý AI không giới hạn</p><p>✓ Nhóm học tập và chia sẻ</p><button className="primary">Gói hiện tại</button></article><article><span>NÂNG CAO</span><h2>Pro</h2><h3>99.000đ <small>/ tháng</small></h3><p>20 GB lưu trữ</p><p>✓ Tất cả tính năng Student</p><p>✓ Ưu tiên xử lý tài liệu</p><button onClick={()=>setPlan('Pro')}>{plan==='Pro'?'Đã chọn':'Nâng cấp lên Pro'}</button></article></div></div>
}

function Profile() {
  const [saved,setSaved]=useState(false);
  return <div className="page fade"><section className="page-title"><div><span className="eyebrow purple">TÀI KHOẢN</span><h1>Hồ sơ cá nhân</h1><p>Quản lý thông tin và cài đặt tài khoản.</p></div></section>{saved&&<div className="toast">✓ Đã lưu thay đổi</div>}<div className="profile-grid"><section className="panel profile-card"><div className="profile-avatar">MT</div><h2>Minh Trần</h2><p>minh@student.edu.vn</p><span>STUDENT PLAN</span><hr/><div><b>128</b><small>Tài liệu</small><b>5</b><small>Nhóm</small></div></section><section className="panel profile-form"><h3>Thông tin cá nhân</h3><div className="form-grid"><label>Họ và tên<input defaultValue="Minh Trần"/></label><label>Tên đăng nhập<input defaultValue="minhtth5"/></label><label>Email<input defaultValue="minh@student.edu.vn"/></label><label>Trường học<input defaultValue="FPT University"/></label></div><label>Giới thiệu<textarea defaultValue="Sinh viên ngành Kỹ thuật phần mềm, yêu thích AI và phát triển sản phẩm."/></label><button className="primary" onClick={()=>setSaved(true)}>Lưu thay đổi</button></section></div></div>
}

function Admin({ section = 'admin', onSectionChange }) {
  const updatedAt = new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date());
  const sectionMap = { 'admin-users':'users', 'admin-documents':'documents', 'admin-groups':'groups', 'admin-plans':'plans', 'admin-logs':'logs' };
  const [localTab, setLocalTab] = useState('users');
  const tab = sectionMap[section] || localTab;
  const setTab = (next) => { setLocalTab(next); onSectionChange?.(`admin-${next}`); };
  const [users, setUsers] = useState([
    { name: 'Nguyễn Hoàng Minh', email: 'minh@student.edu.vn', role: 'USER', plan: 'Student', status: 'Hoạt động', joined: '03/07/2026', avatar: 'NM' },
    { name: 'Trần Ngọc Lan', email: 'lan.tran@student.edu.vn', role: 'USER', plan: 'Pro', status: 'Hoạt động', joined: '01/07/2026', avatar: 'TL' },
    { name: 'Lê Gia Huy', email: 'huy.le@student.edu.vn', role: 'USER', plan: 'Starter', status: 'Đã khóa', joined: '29/06/2026', avatar: 'LH' },
    { name: 'Phạm Anh Thư', email: 'thu.pham@student.edu.vn', role: 'USER', plan: 'Student', status: 'Hoạt động', joined: '27/06/2026', avatar: 'PT' },
  ]);
  const adminGroups = [
    { name: 'SWP391 - Team 4', owner: 'Nguyễn Hoàng Minh', members: 5, files: 24, status: 'Đang hoạt động' },
    { name: 'Machine Learning Club', owner: 'Trần Ngọc Lan', members: 18, files: 42, status: 'Đang hoạt động' },
    { name: 'Database Study Group', owner: 'Phạm Anh Thư', members: 8, files: 16, status: 'Chờ duyệt' },
  ];
  const adminPlans = [
    { name: 'Starter', price: '0đ', users: '426', revenue: '0đ', tone: 'gray' },
    { name: 'Student', price: '49.000đ', users: '703', revenue: '18.6M', tone: 'violet' },
    { name: 'Pro', price: '99.000đ', users: '155', revenue: '6.2M', tone: 'orange' },
  ];
  const toggle = (email) => setUsers(list => list.map(u => u.email === email ? {...u, status: u.status === 'Đã khóa' ? 'Hoạt động' : 'Đã khóa'} : u));
  return <div className="page admin-page fade">
    <section className="page-title"><div><span className="eyebrow purple">ADMIN CONSOLE</span><h1>Trung tâm quản trị</h1><p>Theo dõi hoạt động và quản lý toàn bộ hệ thống.</p></div><div className="admin-date">◷ Cập nhật · {updatedAt}</div></section>
    <section className="stats admin-stats">
      <button className={tab==='users'?'selected':''} onClick={()=>setTab('users')}><Icon tone="blue">♧</Icon><div><span>Người dùng</span><strong>1,284</strong><small>↑ 12.4% tháng này</small></div><i>Quản lý →</i></button>
      <button className={tab==='documents'?'selected':''} onClick={()=>setTab('documents')}><Icon tone="violet">▱</Icon><div><span>Tài liệu</span><strong>8,642</strong><small>↑ 18.7% tháng này</small></div><i>Kiểm duyệt →</i></button>
      <button className={tab==='groups'?'selected':''} onClick={()=>setTab('groups')}><Icon tone="green">◎</Icon><div><span>Nhóm hoạt động</span><strong>186</strong><small>↑ 7.2% tháng này</small></div><i>Xem nhóm →</i></button>
      <button className={tab==='plans'?'selected':''} onClick={()=>setTab('plans')}><Icon tone="orange">₫</Icon><div><span>Doanh thu</span><strong>24.8M</strong><small>↑ 9.5% tháng này</small></div><i>Gói dịch vụ →</i></button>
    </section>
    <div className="admin-insights">
      <section className="panel admin-chart"><div className="panel-head"><div><h3>Tăng trưởng người dùng</h3><p>Số tài khoản mới trong 7 tháng gần nhất</p></div><button>7 tháng⌄</button></div><div className="chart-area"><div className="y-axis"><span>400</span><span>300</span><span>200</span><span>100</span><span>0</span></div><div className="bars">{[['T1',130],['T2',185],['T3',160],['T4',245],['T5',275],['T6',320],['T7',372]].map(([m,v])=><div key={m}><span style={{height:`${v/4}px`}}><i>{v}</i></span><small>{m}</small></div>)}</div></div></section>
      <section className="panel system-health"><div className="panel-head"><div><h3>Trạng thái hệ thống</h3><p>Tổng quan các dịch vụ</p></div><span className="healthy">● Ổn định</span></div>{[['REST API','99.98%'],['Cloud Storage','99.95%'],['AI Service','99.72%'],['Email Service','99.91%']].map(([x,v])=><div className="health-row" key={x}><span><i/> {x}</span><b>{v}</b></div>)}<div className="health-note">Không có sự cố nghiêm trọng trong 24 giờ qua.</div></section>
    </div>
    <section className="panel admin-management">
      <div className="admin-tabs"><button className={tab==='users'?'active':''} onClick={()=>setTab('users')}>Người dùng</button><button className={tab==='documents'?'active':''} onClick={()=>setTab('documents')}>Tài liệu</button><button className={tab==='groups'?'active':''} onClick={()=>setTab('groups')}>Nhóm học tập</button><button className={tab==='plans'?'active':''} onClick={()=>setTab('plans')}>Gói dịch vụ</button><button className={tab==='logs'?'active':''} onClick={()=>setTab('logs')}>Nhật ký</button><div className="search-input">⌕ <input placeholder="Tìm trong mục này..."/></div></div>
      {tab==='users' && <div className="admin-table"><div className="admin-tr header"><span>NGƯỜI DÙNG</span><span>VAI TRÒ</span><span>GÓI</span><span>NGÀY THAM GIA</span><span>TRẠNG THÁI</span><span></span></div>{users.map(u=><div className="admin-tr" key={u.email}><span className="admin-user"><i>{u.avatar}</i><b>{u.name}<small>{u.email}</small></b></span><span>{u.role}</span><span><em className={`plan-${u.plan.toLowerCase()}`}>{u.plan}</em></span><span>{u.joined}</span><span><em className={u.status==='Hoạt động'?'status-active':'status-locked'}>● {u.status}</em></span><span><button className="row-action" onClick={()=>toggle(u.email)}>{u.status==='Đã khóa'?'Mở khóa':'Khóa'}</button></span></div>)}</div>}
      {tab==='documents' && <div className="admin-content-list"><div className="admin-list-head"><span>TÀI LIỆU</span><span>CHỦ SỞ HỮU</span><span>DUNG LƯỢNG</span><span>TRẠNG THÁI</span><span></span></div>{documents.map(d=><div className="admin-list-row" key={d.name}><span className="admin-doc"><i style={{background:d.color}}>{d.type[0]}</i><b>{d.name}<small>{d.type}</small></b></span><span>minh@student.edu.vn</span><span>{d.size}</span><em className="status-active">● An toàn</em><button className="row-action">Xem chi tiết</button></div>)}</div>}
      {tab==='groups' && <div className="admin-content-list"><div className="admin-list-head"><span>NHÓM HỌC TẬP</span><span>TRƯỞNG NHÓM</span><span>THÀNH VIÊN</span><span>TÀI LIỆU</span><span>TRẠNG THÁI</span></div>{adminGroups.map(g=><div className="admin-list-row" key={g.name}><span className="admin-doc"><i className="group-mark">{g.name.split(' ').slice(0,2).map(x=>x[0]).join('')}</i><b>{g.name}<small>Nhóm học tập</small></b></span><span>{g.owner}</span><strong>{g.members}</strong><span>{g.files} tệp</span><em className={g.status==='Chờ duyệt'?'plan-pro':'status-active'}>● {g.status}</em></div>)}</div>}
      {tab==='plans' && <div className="admin-plan-grid">{adminPlans.map(p=><article key={p.name} className={p.tone}><span>GÓI DỊCH VỤ</span><h3>{p.name}</h3><strong>{p.price}<small>/tháng</small></strong><div><p><b>{p.users}</b><small>người dùng</small></p><p><b>{p.revenue}</b><small>doanh thu</small></p></div><button>Chỉnh sửa gói →</button></article>)}</div>}
      {tab==='logs' && <div className="log-list"><p><b>ADMIN_LOGIN</b><span><strong>Đăng nhập quản trị</strong>admin@aistudyhub.vn đã đăng nhập hệ thống</span><em className="status-active">Thành công</em><small>10:42</small></p><p><b>USER_LOCKED</b><span><strong>Cập nhật người dùng</strong>Tài khoản huy.le@student.edu.vn đã bị khóa</span><em className="plan-pro">Cảnh báo</em><small>09:18</small></p><p><b>PLAN_UPDATED</b><span><strong>Cập nhật dịch vụ</strong>Gói Student được cập nhật dung lượng</span><em className="status-active">Thành công</em><small>Hôm qua</small></p><p><b>DOCUMENT_SCAN</b><span><strong>Kiểm duyệt tài liệu</strong>Hệ thống đã quét 186 tài liệu mới</span><em className="plan-student">Tự động</em><small>Hôm qua</small></p></div>}
      <div className="table-footer"><span>Đang hiển thị dữ liệu mới nhất của hệ thống</span><div><button>‹</button><button className="current">1</button><button>2</button><button>3</button><button>›</button></div></div>
    </section>
  </div>
}

function UploadModal({ close }) {
  const [done,setDone]=useState(false);
  return <div className="modal-backdrop" onMouseDown={close}><div className="modal" onMouseDown={e=>e.stopPropagation()}><button className="modal-close" onClick={close}>×</button>{done?<div className="upload-success"><span>✓</span><h2>Tải lên thành công!</h2><p>Mockup_SWP391.pdf đã được thêm vào thư viện.</p><button className="primary" onClick={close}>Hoàn tất</button></div>:<><span className="eyebrow purple">THÊM TÀI LIỆU</span><h2>Tải tài liệu mới</h2><p>Hỗ trợ PDF, DOCX, PPTX, TXT, ảnh và video.</p><div className="drop-zone"><span>↑</span><b>Kéo thả tệp vào đây</b><small>hoặc nhấn để chọn tệp từ máy tính</small></div><label>Tên tài liệu<input defaultValue="Mockup_SWP391.pdf"/></label><label>Thư mục<select><option>SWP391</option><option>Machine Learning</option><option>Database</option></select></label><div className="modal-actions"><button onClick={close}>Hủy</button><button className="primary" onClick={()=>setDone(true)}>Tải lên</button></div></>}</div></div>
}

export default function App() {
  const [authMode,setAuthMode]=useState(null);
  const [loggedIn,setLoggedIn]=useState(false);
  const [role,setRole]=useState('user');
  const [page,setPage]=useState(null);
  const [upload,setUpload]=useState(false);
  const title=useMemo(()=>nav.find(x=>x[0]===page)?.[2]||'AI Study Hub',[page]);
  const login = (nextRole) => { setRole(nextRole); setPage(nextRole === 'admin' ? 'admin' : 'dashboard'); setLoggedIn(true); };
  if(!loggedIn && !authMode) return <Intro onOpenLogin={()=>setAuthMode('login')} onOpenRegister={()=>setAuthMode('register')}/>;
  if(!loggedIn) return <Login key={authMode} initialMode={authMode} onLogin={login} onBack={()=>setAuthMode(null)}/>;
  const pages={dashboard:<Dashboard setPage={setPage} onUpload={()=>setUpload(true)}/>,documents:<Documents onUpload={()=>setUpload(true)}/>,assistant:<Assistant/>,groups:<Groups/>,storage:<Storage/>,profile:<Profile/>};
  return <div className={`app ${role === 'admin' ? 'admin-app' : ''}`}><Sidebar page={page} setPage={setPage} role={role} logout={()=>{setLoggedIn(false);setAuthMode('login')}}/><main><Topbar title={role === 'admin' ? 'Quản trị hệ thống' : title} role={role} onUpload={()=>setUpload(true)}/>{role === 'admin' ? <Admin section={page} onSectionChange={setPage}/> : pages[page]}</main>{role !== 'admin'&&upload&&<UploadModal close={()=>setUpload(false)}/>}</div>;
}
