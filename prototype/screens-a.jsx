/* 사이 screens — Home · Create · Invite */
const { Button, BottomCTA, Badge, Border, ListRow, ListHeader, Asset, Paragraph,
        NavigationBar, TopBar, TextField, Switch, Chip, Avatar, AvatarStack,
        Icon, ICON_NAMES } = window.TDSDesignSystem_58842e;

const TONE_FG = {
  primary: "var(--primary)", positive: "var(--green-600)", negative: "var(--red-600)",
  warning: "#B77900", neutral: "var(--grey-700)",
};

// tappable icon with an edit affordance → opens the icon picker
function EditableIcon({ icon, tone = "primary", size = 44, onEdit }) {
  return (
    <button type="button" onClick={(e) => { e.stopPropagation(); onEdit(); }}
      style={{ position: "relative", border: "none", background: "transparent", padding: 0, cursor: "pointer", WebkitTapHighlightColor: "transparent" }}>
      <Asset tone={tone} size={size} shape="squircle">
        <Icon name={icon} color={TONE_FG[tone]} size={Math.round(size * 0.5)} />
      </Asset>
      <span style={{ position: "absolute", right: -3, bottom: -3, width: 19, height: 19, borderRadius: "50%", background: "var(--grey-800)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--surface-card)" }}>
        <Icon name="edit" size={10} color="#fff" strokeWidth={2.4} />
      </span>
    </button>
  );
}

// ── April 2026 range calendar (from ~ to) ──────────────────
function RangeCalendar({ range, onPick }) {
  const M = window.SAI_MONTH;
  const cells = [];
  for (let i = 0; i < M.firstDow; i++) cells.push(null);
  for (let d = 1; d <= M.days; d++) cells.push(d);
  const from = range.from, to = range.to;
  const lo = to != null ? Math.min(from, to) : from;
  const hi = to != null ? Math.max(from, to) : from;
  const band = (d) => from != null && d >= lo && d <= hi;
  const isEnd = (d) => d === from || d === to || (to == null && d === from);
  const r = "var(--radius-full)";
  return (
    <div style={{ padding: "4px 20px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 4 }}>
        {window.SAI_DOW.map((w, i) => (
          <span key={w} style={{ textAlign: "center", padding: "4px 0", font: "var(--font-caption-2)", color: i === 0 ? "var(--negative)" : "var(--text-weak)" }}>{w}</span>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", rowGap: 2 }}>
        {cells.map((d, idx) => {
          if (d == null) return <span key={"b" + idx} />;
          const on = band(d), end = isEnd(d);
          return (
            <div key={d} style={{
              display: "flex", justifyContent: "center", alignItems: "center", height: 40,
              background: on ? "var(--available-bg)" : "transparent",
              borderTopLeftRadius: d === lo ? r : 0, borderBottomLeftRadius: d === lo ? r : 0,
              borderTopRightRadius: d === hi ? r : 0, borderBottomRightRadius: d === hi ? r : 0,
            }}>
              <button type="button" onClick={() => onPick(d)} style={{
                width: 38, height: 38, borderRadius: "50%", border: "none", cursor: "pointer",
                background: end ? "var(--primary)" : "transparent",
                color: end ? "#fff" : (on ? "var(--primary-weak-fg)" : "var(--text-body)"),
                font: end ? "var(--font-label)" : "var(--font-body-2)",
                WebkitTapHighlightColor: "transparent",
              }}>{d}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── HOME ────────────────────────────────────────────────────
function MeetingsScreen({ go, openThread, empty, live, notifSeen, onNotifSeen }) {
  const [notifOpen, setNotifOpen] = React.useState(false);
  const openNotif = () => { setNotifOpen(true); onNotifSeen && onNotifSeen(); };
  const M = window.SAI_MEETINGS;
  const liveM = live || M.live;
  const chat = window.SAI_CHAT_BY_ID;
  const MeetingCard = window.MeetingCard;
  const open = (id) => { if (chat[id]) openThread(chat[id]); };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--surface-page)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px 4px" }}>
        <span style={{ font: "var(--font-title-1)", color: "var(--text-strong)", letterSpacing: "var(--tracking-tight)" }}>회의</span>
        <window.BellButton onClick={openNotif} dot={!empty && !notifSeen} />
      </div>

      {empty ? (
        <window.EmptyState emoji="🗓️" title="진행 중인 회의가 없어요"
          desc={<>참석자는 싫은 시간만 지우면 돼요.<br />첫 회의를 만들어보세요.</>}
          action={<Button variant="primary" size="lg" fullWidth onClick={() => go("create")}>회의 만들기</Button>} />
      ) : (
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 20px 96px" }}>
        {liveM.status === "collecting" ? (
          <>
        <ListHeader title="진행 중인 회의" style={{ padding: "16px 0 8px" }} />
        <MeetingCard m={liveM} onOpen={() => go("detail")} />

        <ListHeader title="예정된 회의" style={{ padding: "26px 0 8px" }} />
        <MeetingCard m={M.q} onOpen={() => open("q")} />
          </>
        ) : (
          <>
        <ListHeader title="예정된 회의" style={{ padding: "16px 0 8px" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <MeetingCard m={liveM} onOpen={() => go("detail")} />
          <MeetingCard m={M.q} onOpen={() => open("q")} />
        </div>
          </>
        )}

        <ListHeader title="지난 회의" style={{ padding: "26px 0 8px" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <MeetingCard m={M.retro} onOpen={() => open("retro")} />
          <MeetingCard m={M.onboard} onOpen={() => openThread({ id: "onboard", name: M.onboard.name, people: M.onboard.total })} />
        </div>
      </div>
      )}

      {!empty && <window.Fab onClick={() => go("create")} />}

      <window.NotifSheet open={notifOpen} onClose={() => setNotifOpen(false)} go={go} openThread={openThread} empty={empty} />
    </div>
  );
}

// ── Location map picker ─────────────────────────────────────
const SAI_POIS = [
  { x: 28, y: 32, name: "브릿지 회의실" },
  { x: 71, y: 26, name: "센터필드 라운지" },
  { x: 45, y: 66, name: "카페 사이 미팅룸" },
  { x: 80, y: 73, name: "역삼 스테이션" },
];
function LocationMap({ pin, onPick }) {
  const handle = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    let best = null, bd = 1e9;
    SAI_POIS.forEach((p) => { const d = Math.hypot(p.x - x, p.y - y); if (d < bd) { bd = d; best = p; } });
    if (best && bd < 13) onPick({ x: best.x, y: best.y }, best.name);
    else onPick({ x, y }, "지도에서 선택한 위치");
  };
  return (
    <div style={{ position: "relative", height: 220, borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-sm)" }}>
      <div onClick={handle} style={{
        position: "absolute", inset: 0, cursor: "crosshair",
        background: "repeating-linear-gradient(0deg, transparent 0 30px, rgba(255,255,255,.85) 30px 35px), repeating-linear-gradient(90deg, transparent 0 38px, rgba(255,255,255,.85) 38px 43px), #E6ECE3",
      }}>
        <div style={{ position: "absolute", left: "5%", top: "55%", width: "32%", height: "36%", background: "#D6E8C9", borderRadius: 12 }} />
        <div style={{ position: "absolute", right: "-10%", top: "-12%", width: "48%", height: "44%", background: "#CFE3F5", borderRadius: "0 0 0 70px", transform: "rotate(-8deg)" }} />
        <div style={{ position: "absolute", left: "-10%", top: "40%", width: "130%", height: 13, background: "#fff", transform: "rotate(-14deg)" }} />
      </div>
      {SAI_POIS.map((p) => (
        <button key={p.name} type="button" onClick={() => onPick({ x: p.x, y: p.y }, p.name)}
          style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%,-50%)",
            display: "flex", alignItems: "center", gap: 5, padding: "3px 9px 3px 6px",
            background: "rgba(255,255,255,.94)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-full)",
            boxShadow: "var(--shadow-sm)", cursor: "pointer", WebkitTapHighlightColor: "transparent" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)", flexShrink: 0 }} />
          <span style={{ font: "var(--font-caption-2)", color: "var(--text-strong)", whiteSpace: "nowrap" }}>{p.name}</span>
        </button>
      ))}
      {pin && (
        <div style={{ position: "absolute", left: `${pin.x}%`, top: `${pin.y}%`, transform: "translate(-50%,-100%)", pointerEvents: "none", filter: "drop-shadow(0 3px 4px rgba(23,31,40,.28))" }}>
          <Icon name="pin" size={34} color="var(--primary)" />
        </div>
      )}
      <div style={{ position: "absolute", left: 12, bottom: 12, padding: "5px 11px", borderRadius: "var(--radius-full)", background: "rgba(23,31,40,.72)", color: "#fff", font: "var(--font-caption-2)", pointerEvents: "none" }}>지도를 눌러 위치를 지정하세요</div>
    </div>
  );
}

// ── Swipe-to-delete row (reveal on left swipe; hidden otherwise) ──
function SwipeRow({ children, onDelete, onTap }) {
  const REVEAL = 92;
  const [x, setX] = React.useState(0);
  const r = React.useRef({ startX: 0, base: 0, drag: false, moved: false, x: 0 });
  const set = (v) => { r.current.x = v; setX(v); };
  const down = (e) => { r.current.startX = e.clientX; r.current.base = r.current.x; r.current.drag = true; r.current.moved = false; e.currentTarget.setPointerCapture?.(e.pointerId); };
  const move = (e) => {
    if (!r.current.drag) return;
    const d = e.clientX - r.current.startX;
    if (Math.abs(d) > 4) r.current.moved = true;
    set(Math.max(-REVEAL, Math.min(0, r.current.base + d)));
  };
  const up = () => { if (!r.current.drag) return; r.current.drag = false; set(r.current.x < -REVEAL / 2 ? -REVEAL : 0); };
  const tap = () => { if (r.current.moved) return; if (r.current.x < 0) { set(0); return; } onTap && onTap(); };
  return (
    <div style={{ position: "relative", overflow: "hidden", background: "var(--negative)" }}>
      <button type="button" onClick={() => { set(0); onDelete(); }}
        style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: REVEAL, border: "none", background: "var(--negative)", color: "#fff",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, cursor: "pointer", WebkitTapHighlightColor: "transparent" }}>
        <Icon name="trash" size={20} color="#fff" />
        <span style={{ font: "var(--font-caption-2)", color: "#fff" }}>삭제</span>
      </button>
      <div onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onClick={tap}
        style={{ position: "relative", transform: `translateX(${x}px)`, transition: r.current.drag ? "none" : "transform var(--dur-base) var(--ease-standard)",
          background: "var(--surface-card)", touchAction: "pan-y", cursor: onTap ? "pointer" : "default" }}>
        {children}
      </div>
    </div>
  );
}

// ── CREATE ──────────────────────────────────────────────────
const SAI_CONTACTS = [
  { name: "박민서", sub: "디자인팀" },
  { name: "최수아", sub: "프로덕트" },
  { name: "정하준", sub: "엔지니어링" },
  { name: "윤도윤", sub: "마케팅" },
  { name: "강서연", sub: "디자인팀" },
  { name: "임채원", sub: "리서치" },
];
function CreateScreen({ go, back, state, setState }) {
  const { name, range, days, times, location, participants } = state;
  const [mapOpen, setMapOpen] = React.useState(false);
  const [pin, setPin] = React.useState(null);
  const [inviteOpen, setInviteOpen] = React.useState(false);
  const [linkCopied, setLinkCopied] = React.useState(false);
  const [statusIdx, setStatusIdx] = React.useState(null);
  const toggleTime = (k) => setState((s) => ({ ...s, times: s.times.includes(k) ? s.times.filter((t) => t !== k) : [...s.times, k] }));
  const toggleReq = (i) => setState((s) => ({ ...s, participants: s.participants.map((p, idx) => idx === i ? { ...p, required: !p.required } : p) }));
  const invite = (c) => setState((s) => (s.participants.some((p) => p.name === c.name) ? s
    : { ...s, participants: [...s.participants, { name: c.name, required: false, status: "pending" }] }));
  const markResponded = (i) => { setState((s) => ({ ...s, participants: s.participants.map((p, idx) => idx === i ? { ...p, status: "responded" } : p) })); setStatusIdx(null); };
  const removeParticipant = (i) => setState((s) => ({ ...s, participants: s.participants.filter((_, idx) => idx !== i) }));
  const pickLocation = (p, label) => { setPin(p); setState((s) => ({ ...s, location: label })); };
  const pickDate = (d) => setState((s) => {
    let { from, to } = s.range;
    if (from == null || to != null) { from = d; to = null; }
    else { to = d; }
    if (to != null) {
      const lo = Math.min(from, to), hi = Math.max(from, to);
      return { ...s, range: { from: lo, to: hi }, days: window.saiDaysInRange(lo, hi) };
    }
    return { ...s, range: { from, to: null }, days: [window.saiDay(from)] };
  });
  const rangeText = range.from == null ? "날짜를 골라요"
    : range.to != null ? `4월 ${range.from}일 ~ 4월 ${range.to}일 · ${days.length}일간`
    : `4월 ${range.from}일 · 종료일을 골라요`;
  const canNext = name.trim() && days.length && times.length && range.to != null;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--surface-card)" }}>
      <NavigationBar backIcon="✕" onBack={back} title="회의 만들기" titleVisible={false} />
      <div style={{ flex: 1, overflowY: "auto" }}>
        <TopBar title="어떤 회의인가요?" description="기간과 시간대만 열어두면, 나머지는 사이가 정리해요." />
        <div style={{ padding: "8px 20px 0" }}>
          <TextField label="회의 이름" value={name} onChange={(v) => setState((s) => ({ ...s, name: v }))} maxLength={20} />
        </div>

        <ListHeader title="기간" description="언제부터 언제까지 잡을까요?" />
        <RangeCalendar range={range} onPick={pickDate} />
        <div style={{ padding: "10px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 14px", background: "var(--surface-sunken)", borderRadius: "var(--radius-md)" }}>
            <Icon name="calendar" size={18} color="var(--primary)" />
            <span style={{ font: "var(--font-body-2)", color: range.from == null ? "var(--text-weak)" : "var(--text-strong)", letterSpacing: "var(--tracking-normal)" }}>{rangeText}</span>
          </div>
        </div>

        <ListHeader title="시간대" description="회의를 열 수 있는 시간만 남겨요" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, padding: "0 20px" }}>
          {window.SAI_ALL_TIMES.map((t) => (
            <Chip key={t.key} tone="primary" selected={times.includes(t.key)} onClick={() => toggleTime(t.key)}
              style={{ width: "100%", padding: "0 4px", justifyContent: "center" }}>{t.label}</Chip>
          ))}
        </div>

        <ListHeader title="위치" description="온라인 회의면 비워둬도 돼요"
          action={<Button variant="ghost" size="sm" onClick={() => setMapOpen((o) => !o)}>{mapOpen ? "지도 닫기" : "지도에서 찾기"}</Button>} />
        <div style={{ padding: "0 20px", display: "flex", alignItems: "flex-end", gap: 10 }}>
          <button type="button" onClick={() => setMapOpen((o) => !o)} aria-label="지도 열기"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: "var(--radius-md)", flexShrink: 0, cursor: "pointer",
              border: mapOpen ? "1.5px solid var(--primary)" : "1.5px solid transparent",
              background: mapOpen ? "var(--primary-weak-bg)" : "var(--fill-weak)",
              color: mapOpen ? "var(--primary)" : "var(--grey-600)", WebkitTapHighlightColor: "transparent" }}>
            <Icon name="pin" size={22} />
          </button>
          <TextField label="회의 장소" placeholder="회의실 이름이나 주소" value={location} onChange={(v) => setState((s) => ({ ...s, location: v }))} style={{ flex: 1 }} />
        </div>
        {mapOpen && (
          <div style={{ padding: "12px 20px 0", animation: "sai-pop var(--dur-base) var(--ease-out)" }}>
            <LocationMap pin={pin} onPick={pickLocation} />
          </div>
        )}

        <ListHeader title="참석자" description={`응답 ${participants.filter((p) => p.status === "responded").length}/${participants.length}명 · 필수 ${participants.filter((p) => p.required).length}명`}
          action={<Button variant="ghost" size="sm" onClick={() => setInviteOpen(true)}>초대</Button>} />
        <div style={{ background: "var(--surface-card)" }}>
          {participants.map((p, i) => {
            const pending = p.status === "pending";
            return (
              <div key={p.name}>
                {/* 개인별 응답 여부는 비공개 — 응답 상태 + 집계 변화의 타이밍 조합으로
                    누가 무엇을 지웠는지 특정되는 것을 막는다. 응답은 집계(n/m)로만 보인다. */}
                <SwipeRow onDelete={() => removeParticipant(i)}>
                  <ListRow
                    left={<span style={{ display: "flex" }}><Avatar name={p.name} index={i} size={40} /></span>}
                    title={p.name}
                    description="초대함 · 응답 여부는 사이만 알아요"
                    right={<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ font: "var(--font-caption-2)", color: p.required ? "var(--primary)" : "var(--text-weak)" }}>필수</span>
                      <Switch checked={p.required} onChange={() => toggleReq(i)} />
                    </div>}
                  />
                </SwipeRow>
                {i < participants.length - 1 && <Border inset={20} />}
              </div>
            );
          })}
        </div>
        <div style={{ padding: "8px 20px 0", font: "var(--font-caption-1)", color: "var(--text-weak)" }}>← 삭제하려면 왼쪽으로 밀어요</div>
        <div style={{ height: 16 }} />
      </div>
      <BottomCTA>
        <Button variant="primary" size="lg" fullWidth disabled={!canNext} onClick={() => go("invite")}>다음</Button>
      </BottomCTA>

      <window.BottomSheet open={inviteOpen} onClose={() => setInviteOpen(false)} title="참석자 초대">
        <Paragraph typography="body-2" color="sub" style={{ margin: "-8px 0 8px" }}>
          초대하면 각자 링크로 들어와 싫은 시간을 지워요. 응답은 여기로 모여요.
        </Paragraph>
        <div style={{ maxHeight: 296, overflowY: "auto", margin: "0 -20px" }}>
          {SAI_CONTACTS.map((c, i) => {
            const added = participants.some((p) => p.name === c.name);
            return (
              <ListRow key={c.name}
                left={<Avatar name={c.name} index={i + 3} size={40} />}
                title={c.name} description={c.sub}
                onClick={added ? undefined : () => invite(c)}
                right={added
                  ? <span style={{ display: "inline-flex", alignItems: "center", gap: 4, font: "var(--font-caption-1)", color: "var(--primary)" }}><Icon name="check" size={16} color="var(--primary)" />초대함</span>
                  : <Button variant="weak" size="sm" onClick={() => invite(c)}>초대</Button>} />
            );
          })}
        </div>
        <div style={{ paddingTop: 12 }}>
          <Button variant="ghost" size="md" fullWidth onClick={() => { setLinkCopied(true); setTimeout(() => setLinkCopied(false), 1600); }}>{linkCopied ? "복사했어요 ✓" : "초대 링크 복사하기"}</Button>
        </div>
      </window.BottomSheet>

      {/* 개인별 응답 상태 시트는 제거됨 — 응답 여부는 개인 단위로 노출하지 않는다 */}
    </div>
  );
}

// ── 브랜드 벡터 아이콘 (초대 화면 전용) ──────────────────────
// 유리 질감 링크 — 하늘색 × 블루 two-tone, S2 로고와 같은 재질
function GlassLinkIcon({ size = 92 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" style={{ display: "block", overflow: "visible" }} aria-label="링크">
      <defs>
        <linearGradient id="glkSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9CCEFF"/><stop offset="1" stopColor="#5FA4FB"/></linearGradient>
        <linearGradient id="glkBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5D8BF5"/><stop offset="1" stopColor="#3560DC"/></linearGradient>
        <filter id="glkSh" x="-25%" y="-25%" width="150%" height="175%"><feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#2F55C4" floodOpacity=".3"/></filter>
        <filter id="glkBl" x="-35%" y="-35%" width="170%" height="170%"><feGaussianBlur stdDeviation="1.7"/></filter>
      </defs>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#glkSh)">
        <path d="M64 49.6 71.2 42.4A13.6 13.6 0 0 0 52 23.2L44.8 30.4" stroke="url(#glkSky)" strokeWidth="11"/>
        <path d="M32 46.4 24.8 53.6A13.6 13.6 0 0 0 44 72.8L51.2 65.6" stroke="url(#glkBlue)" strokeWidth="11"/>
        <path d="M38.4 57.6 57.6 38.4" stroke="url(#glkBlue)" strokeWidth="11"/>
        <g stroke="#E6F1FF" strokeOpacity=".45" strokeWidth="3.6" filter="url(#glkBl)" transform="translate(-.5 -1.8)">
          <path d="M64 49.6 71.2 42.4A13.6 13.6 0 0 0 52 23.2L44.8 30.4"/>
          <path d="M32 46.4 24.8 53.6A13.6 13.6 0 0 0 44 72.8L51.2 65.6"/>
          <path d="M38.4 57.6 57.6 38.4"/>
        </g>
      </g>
    </svg>
  );
}
// 실제 공유 대상 앱 아이콘 (카카오톡 · 메시지 · 더보기)
const SHARE_ICON_SHADOW = { display: "block", filter: "drop-shadow(0 5px 10px rgba(23,31,40,.16))" };
function KakaoIcon({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" style={SHARE_ICON_SHADOW} aria-label="카카오톡">
      <rect width="52" height="52" rx="12.5" fill="#FEE500"/>
      <path fill="#3A1D1D" d="M26 13C17.2 13 10 18.4 10 25.1C10 29.4 12.9 33.2 17.3 35.4C17 36.5 16.1 39.8 15.9 40.6C15.7 41.5 16.3 41.8 16.9 41.4C17.5 41 21.2 38.5 22.7 37.4C23.8 37.6 24.9 37.7 26 37.7C34.8 37.7 42 32.2 42 25.4C42 18.5 34.8 13 26 13Z"/>
      <text x="26" y="28.8" textAnchor="middle" fontFamily="Arial, 'Malgun Gothic', sans-serif" fontWeight="900" fontSize="9" fill="#FEE500" letterSpacing=".4">TALK</text>
    </svg>
  );
}
function MessageAppIcon({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" style={SHARE_ICON_SHADOW} aria-label="메시지">
      <defs><linearGradient id="imsgG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6BE977"/><stop offset="1" stopColor="#12BF2E"/></linearGradient></defs>
      <rect width="52" height="52" rx="12.5" fill="url(#imsgG)"/>
      <path fill="#fff" d="M26 13.4C34.4 13.4 41.2 18.95 41.2 25.8C41.2 32.65 34.4 38.2 26 38.2C24.3 38.2 22.7 38 21.2 37.6C19.6 38.75 17.1 40 14.2 40.3C13.7 40.35 13.4 39.75 13.8 39.35C15.25 37.9 16.2 36 16.5 34.3C13 32.15 10.8 29.2 10.8 25.8C10.8 18.95 17.6 13.4 26 13.4Z"/>
    </svg>
  );
}
function MoreAppIcon({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" style={SHARE_ICON_SHADOW} aria-label="더보기">
      <rect width="52" height="52" rx="12.5" fill="#EEF1F4"/>
      <circle cx="17" cy="26" r="2.7" fill="#7A8694"/><circle cx="26" cy="26" r="2.7" fill="#7A8694"/><circle cx="35" cy="26" r="2.7" fill="#7A8694"/>
    </svg>
  );
}

// ── INVITE ──────────────────────────────────────────────────
function InviteScreen({ go, back, state }) {
  const [copied, setCopied] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const toastRef = React.useRef(null);
  const share = (msg) => { setToast(msg); clearTimeout(toastRef.current); toastRef.current = setTimeout(() => setToast(null), 1800); };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--surface-card)" }}>
      <NavigationBar onBack={back} title="" titleVisible={false} />
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ marginTop: 24, animation: "sai-pop var(--dur-slow) var(--ease-out)" }}>
          <GlassLinkIcon size={92} />
        </div>
        <Paragraph typography="title-1" color="strong" align="center" style={{ marginTop: 24 }}>링크가 준비됐어요</Paragraph>
        <Paragraph typography="body-2" color="sub" align="center" style={{ marginTop: 8 }}>
          참석자에게 링크를 보내면{"\n"}각자 싫은 시간만 지우면 돼요.
        </Paragraph>

        <div style={{ width: "100%", boxSizing: "border-box", marginTop: 28, display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", background: "var(--surface-sunken)", borderRadius: "var(--radius-md)" }}>
          <span style={{ flex: 1, minWidth: 0, textAlign: "left", font: "var(--font-body-2)", color: "var(--text-sub)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>sai.im/j/{(state.name || "회의").length ? "x7f2k9" : ""}</span>
          <Button variant="weak" size="sm" onClick={() => setCopied(true)}>{copied ? "복사됨" : "복사"}</Button>
        </div>

        <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
          {[
            { l: "카톡", icon: <KakaoIcon />, msg: "카톡으로 링크를 보냈어요" },
            { l: "문자", icon: <MessageAppIcon />, msg: "문자로 링크를 보냈어요" },
            { l: "더보기", icon: <MoreAppIcon />, msg: "링크를 공유했어요" },
          ].map((s) => (
            <button key={s.l} type="button" onClick={() => share(s.msg)}
              style={{ border: "none", background: "transparent", padding: 0, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 7, WebkitTapHighlightColor: "transparent" }}>
              {s.icon}
              <span style={{ font: "var(--font-caption-1)", color: "var(--text-sub)" }}>{s.l}</span>
            </button>
          ))}
        </div>
      </div>
      <BottomCTA>
        <Button variant="primary" size="lg" fullWidth onClick={() => go("veto")}>내가 먼저 지울게요</Button>
      </BottomCTA>

      <window.Toast show={!!toast}>{toast}</window.Toast>
    </div>
  );
}

Object.assign(window, { MeetingsScreen, CreateScreen, InviteScreen });
