/* 사이 screens — App shell (bottom tabs + FAB), Chat (list + anonymous thread),
   Meeting detail (진행 중인 회의), My. */
const { Button: CB, BottomCTA: CBottomCTA, Badge: CBadge, Border: CBorder, ListRow: CListRow,
        ListHeader: CListHeader, Asset: CAsset, Paragraph: CP, NavigationBar: CNav, TopBar: CTop,
        Chip: CChip, Switch: CSwitch, Avatar: CAvatar, AvatarStack: CAvatarStack,
        ProposalCard: CProposalCard, Icon: CIcon } = window.TDSDesignSystem_58842e;

// local message-bubble glyph (kept independent of bundle compile timing)
function MsgIcon({ size = 24, color = "currentColor", strokeWidth = 1.9 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", flexShrink: 0 }} aria-hidden="true">
      <path d="M20 13.4a2.6 2.6 0 0 1-2.6 2.6H10l-4.6 3.5V16H6.6A2.6 2.6 0 0 1 4 13.4V7.6A2.6 2.6 0 0 1 6.6 5h10.8A2.6 2.6 0 0 1 20 7.6Z" />
      <path d="M8.5 9.4h7" /><path d="M8.5 12.2h4.6" />
    </svg>
  );
}

// ── Bottom tab bar ──────────────────────────────────────────
function BottomTabBar({ active, onTab, unread = 0 }) {
  const tabs = [
    { key: "home", label: "홈", icon: "home" },
    { key: "meetings", label: "회의", icon: "calendar" },
    { key: "chat", label: "채팅", icon: "message", badge: unread },
    { key: "my", label: "마이", icon: "user" },
  ];
  return (
    <div style={{
      flexShrink: 0, display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
      background: "var(--surface-card)", borderTop: "1px solid var(--border-subtle)",
      paddingBottom: 18,
    }}>
      {tabs.map((t) => {
        const on = active === t.key;
        const col = on ? "var(--primary)" : "var(--grey-400)";
        return (
          <button key={t.key} type="button" onClick={() => onTab(t.key)}
            style={{ border: "none", background: "transparent", cursor: "pointer", padding: "9px 0 3px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3, WebkitTapHighlightColor: "transparent" }}>
            <div style={{ position: "relative" }}>
              {t.icon === "message"
                ? <MsgIcon size={25} color={col} strokeWidth={on ? 2.2 : 1.9} />
                : <CIcon name={t.icon} size={25} color={col} strokeWidth={on ? 2.2 : 1.9} />}
              {t.badge ? (
                <span style={{ position: "absolute", top: -3, right: -5, minWidth: 16, height: 16, padding: "0 4px",
                  borderRadius: 8, background: "var(--negative)", color: "#fff", font: "var(--font-caption-2)", fontSize: 10,
                  fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid var(--surface-card)" }}>{t.badge}</span>
              ) : null}
            </div>
            <span style={{ font: "var(--font-caption-2)", color: col, fontWeight: on ? 700 : 500, letterSpacing: "var(--tracking-normal)" }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function AppShell({ active, onTab, unread, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--surface-page)" }}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", position: "relative" }}>{children}</div>
      <BottomTabBar active={active} onTab={onTab} unread={unread} />
    </div>
  );
}

// ── Notifications (bell) ────────────────────────────────────────
function BellButton({ onClick, dot }) {
  return (
    <button type="button" onClick={onClick} aria-label="알림"
      style={{ position: "relative", width: 36, height: 36, border: "none", background: "transparent", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", WebkitTapHighlightColor: "transparent" }}>
      <CIcon name="bell" color="var(--grey-700)" size={22} />
      {dot && <span style={{ position: "absolute", top: 5, right: 7, width: 7, height: 7, borderRadius: "50%", background: "var(--negative)", border: "1.5px solid var(--surface-page)" }} />}
    </button>
  );
}

function NotifSheet({ open, onClose, go, openThread, empty }) {
  const items = [
    { emoji: "🕶️", title: "새 응답이 모여 집계에 반영됐어요", desc: "주간 디자인 리뷰", act: () => go && go("detail") },
    { emoji: "💬", title: "새 익명 메시지 2개", desc: "주간 디자인 리뷰 · 오후 2:16", act: () => openThread && openThread(window.SAI_CHAT_BY_ID.live) },
    { emoji: "🎉", title: "회의 시간이 정해졌어요", desc: "분기 플래닝 · 어제", act: () => openThread && openThread(window.SAI_CHAT_BY_ID.q) },
  ];
  return (
    <window.BottomSheet open={open} onClose={onClose} title="알림">
      {empty ? (
        <div style={{ padding: "8px 0 24px", textAlign: "center" }}>
          <div style={{ fontSize: 34 }}>🔕</div>
          <div style={{ font: "var(--font-body-2)", color: "var(--text-weak)", marginTop: 8 }}>새 알림이 없어요</div>
        </div>
      ) : (
        <div style={{ margin: "0 -20px" }}>
          {items.map((n, i) => (
            <div key={i}>
              <CListRow left={<CAsset emoji={n.emoji} tone="neutral" size={40} />}
                title={<span style={{ fontWeight: 400, fontSize: 15.5, color: "var(--text-body)" }}>{n.title}</span>}
                description={n.desc} chevron
                onClick={() => { onClose(); n.act(); }} />
              {i < items.length - 1 && <CBorder inset={20} />}
            </div>
          ))}
        </div>
      )}
    </window.BottomSheet>
  );
}

// ── Floating action button ──────────────────────────────────
function Fab({ onClick }) {
  const [p, setP] = React.useState(false);
  return (
    <button type="button" onClick={onClick}
      onPointerDown={() => setP(true)} onPointerUp={() => setP(false)} onPointerLeave={() => setP(false)}
      style={{ position: "absolute", right: 20, bottom: 20, height: 56, borderRadius: "var(--radius-full)",
        display: "flex", alignItems: "center", gap: 7, padding: "0 22px 0 18px", border: "none", cursor: "pointer",
        background: "var(--primary)", color: "#fff", boxShadow: "var(--shadow-fab)", zIndex: 20,
        transform: p ? "scale(0.97)" : "scale(1)", transition: "transform var(--dur-fast) var(--ease-standard)",
        WebkitTapHighlightColor: "transparent" }}>
      <CIcon name="plus" size={22} color="#fff" strokeWidth={2.4} />
      <span style={{ font: "var(--font-label)", color: "#fff", letterSpacing: "var(--tracking-normal)" }}>회의 만들기</span>
    </button>
  );
}

// ── Shared meeting card (one consistent card idiom everywhere) ──
function MeetingCard({ m, onOpen, footer, onIconClick }) {
  const tones = { primary: "var(--primary)", positive: "var(--green-600)", warning: "#B77900", neutral: "var(--grey-600)" };
  const iconColor = tones[m.iconTone] || tones.primary;
  const badge = m.status === "collecting" ? { tone: "primary", label: "응답 대기" }
    : m.status === "confirmed" ? { tone: "positive", label: "확정" } : null;
  const pct = m.total ? Math.round(((m.responded || 0) / m.total) * 100) : 0;
  const iconAsset = <CAsset tone={m.iconTone} size={44} shape="squircle"><CIcon name={m.icon} size={22} color={iconColor} /></CAsset>;
  return (
    <div style={{ background: "var(--surface-card)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-xs)", padding: "16px 18px" }}>
      <div onClick={onOpen} style={{ cursor: onOpen ? "pointer" : "default" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          {onIconClick ? (
            <button type="button" aria-label="회의 아이콘 바꾸기"
              onClick={(e) => { e.stopPropagation(); onIconClick(); }}
              style={{ position: "relative", border: "none", background: "transparent", padding: 0, cursor: "pointer", flexShrink: 0, WebkitTapHighlightColor: "transparent" }}>
              {iconAsset}
              <span style={{ position: "absolute", right: -3, bottom: -3, width: 18, height: 18, borderRadius: "50%", background: "var(--grey-800)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--surface-card)" }}>
                <CIcon name="edit" size={9} color="#fff" strokeWidth={2.4} />
              </span>
            </button>
          ) : iconAsset}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <span style={{ font: "var(--font-head)", color: "var(--text-strong)", letterSpacing: "var(--tracking-normal)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.name}</span>
              {badge ? <CBadge tone={badge.tone}>{badge.label}</CBadge> : null}
            </div>
            <div style={{ font: "var(--font-caption-1)", color: "var(--text-sub)", marginTop: 4 }}>{m.meta}</div>
          </div>
          {m.status === "past" && <CIcon name="chevron-right" size={20} color="var(--grey-300)" />}
        </div>

        {m.status === "collecting" && (
          <>
            <div style={{ height: 6, borderRadius: 3, background: "var(--grey-100)", marginTop: 14, overflow: "hidden" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: "var(--primary)", borderRadius: 3 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
              <CAvatarStack people={m.people} max={6} anonymous size={26} />
              <span style={{ font: "var(--font-caption-1)", color: "var(--text-weak)" }}>{m.total}명 중 {m.responded}명 응답</span>
            </div>
          </>
        )}
        {m.status === "confirmed" && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
            <CAvatarStack people={m.people} max={5} anonymous size={26} />
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, font: "var(--font-caption-1)", color: "var(--text-weak)" }}>
              <CIcon name="pin" size={14} color="var(--grey-400)" />{m.location}
            </span>
          </div>
        )}
      </div>
      {footer && <div style={{ marginTop: 14 }}>{footer}</div>}
    </div>
  );
}

// ── 회의 아이콘 선택 시트 — 색은 사이 블루 하나로 고정, 모양만 고른다 ──
const SAI_ICON_CHOICES = ["calendar", "flag", "star", "users", "clock", "message", "heart", "sparkle", "coffee", "briefcase", "video", "pin"];
function IconPickSheet({ open, onClose, current, onPick }) {
  return (
    <window.BottomSheet open={open} onClose={onClose} title="회의 아이콘 바꾸기">
      <CP typography="body-2" color="sub" style={{ margin: "-8px 0 16px" }}>회의를 대표하는 아이콘을 골라요.</CP>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 8 }}>
        {SAI_ICON_CHOICES.map((n) => (
          <button key={n} type="button" onClick={() => { onPick && onPick(n); onClose(); }}
            style={{ border: n === current ? "1.5px solid var(--primary)" : "1.5px solid transparent",
              background: n === current ? "var(--primary-weak-bg)" : "var(--surface-sunken)",
              borderRadius: "var(--radius-lg)", padding: "15px 0", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", WebkitTapHighlightColor: "transparent" }}>
            <CIcon name={n} size={24} color="var(--primary)" />
          </button>
        ))}
      </div>
    </window.BottomSheet>
  );
}

// ── HOME (dashboard tab) ────────────────────────────────────
// ── Shared empty state ───────────────────────────────────
function EmptyState({ emoji, title, desc, action }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 36px 60px", textAlign: "center" }}>
      <div style={{ width: 84, height: 84, borderRadius: 28, background: "var(--surface-sunken)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>{emoji}</div>
      <div style={{ font: "var(--font-title-3)", color: "var(--text-strong)", marginTop: 18, letterSpacing: "var(--tracking-normal)" }}>{title}</div>
      <div style={{ font: "var(--font-body-2)", color: "var(--text-sub)", marginTop: 6, lineHeight: 1.5 }}>{desc}</div>
      {action && <div style={{ marginTop: 20, width: "100%", maxWidth: 240 }}>{action}</div>}
    </div>
  );
}

function HomeScreen({ go, openThread, empty, live, meResponded, notifSeen, onNotifSeen, onChangeIcon }) {
  const [notifOpen, setNotifOpen] = React.useState(false);
  const [iconPick, setIconPick] = React.useState(false);
  const openNotif = () => { setNotifOpen(true); onNotifSeen && onNotifSeen(); };
  const liveM = live || window.SAI_MEETINGS.live;
  const next = window.SAI_MEETINGS.q;
  const nextChat = window.SAI_CHAT_BY_ID[next.id];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--surface-page)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px 4px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src="../assets/logo-s2.svg" alt="사이" style={{ width: 38, height: 28, objectFit: "contain", overflow: "visible" }} />
          <span style={{ font: "var(--font-title-2)", color: "var(--text-strong)", letterSpacing: "var(--tracking-tight)" }}>사이</span>
        </div>
        <BellButton onClick={openNotif} dot={!empty && !notifSeen} />
      </div>

      {empty ? (
        <EmptyState emoji="🗓️" title="아직 회의가 없어요"
          desc={<>좋은 시간을 찾지 말고, 싫은 시간을 지워보세요.<br />첫 회의를 만들면 여기에 모여요.</>}
          action={<CB variant="primary" size="lg" fullWidth onClick={() => go("create")}>첫 회의 만들기</CB>} />
      ) : (
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 20px 28px" }}>
        <button type="button" onClick={() => go("create")}
          style={{ width: "100%", border: "none", cursor: "pointer", textAlign: "left",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
            padding: "20px", borderRadius: "var(--radius-xl)", background: "var(--primary)", boxShadow: "var(--shadow-fab)", WebkitTapHighlightColor: "transparent" }}>
          <div>
            <div style={{ font: "var(--font-title-3)", color: "#fff", letterSpacing: "var(--tracking-normal)" }}>새 회의를 잡아요</div>
            <div style={{ font: "var(--font-caption-1)", color: "rgba(255,255,255,0.86)", marginTop: 4 }}>좋은 시간을 찾지 말고, 싫은 시간을 지워요</div>
          </div>
          <div style={{ width: 52, height: 52, borderRadius: "50%", flexShrink: 0, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>🗓️</div>
        </button>

        {liveM.status === "confirmed" ? (
          <>
            <CListHeader title="다가오는 회의" style={{ padding: "26px 0 8px" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <MeetingCard m={liveM} onOpen={() => go("detail")} onIconClick={onChangeIcon ? () => setIconPick(true) : undefined} />
              <MeetingCard m={next} onOpen={() => nextChat && openThread(nextChat)} />
            </div>
          </>
        ) : (
          <>
        <CListHeader title="지금 확인해요" style={{ padding: "26px 0 8px" }} />
        <MeetingCard m={liveM} onOpen={() => go("detail")} onIconClick={onChangeIcon ? () => setIconPick(true) : undefined}
          footer={<div style={{ display: "flex", gap: 8 }}>
            <CB variant="weak" size="md" onClick={() => go("detail")} style={{ flex: 1 }}>자세히</CB>
            {meResponded
              ? <CB variant="primary" size="md" onClick={() => go("result")} style={{ flex: 1 }}>결과 보기</CB>
              : <CB variant="primary" size="md" onClick={() => go("veto")} style={{ flex: 1 }}>싫은 시간 지우기</CB>}
          </div>} />

        <CListHeader title="다가오는 회의" style={{ padding: "26px 0 8px" }} />
        <MeetingCard m={next} onOpen={() => nextChat && openThread(nextChat)} />
          </>
        )}
      </div>
      )}

      <NotifSheet open={notifOpen} onClose={() => setNotifOpen(false)} go={go} openThread={openThread} empty={empty} />
      <IconPickSheet open={iconPick} onClose={() => setIconPick(false)} current={liveM.icon} onPick={onChangeIcon} />
    </div>
  );
}

// ── Anonymous avatar + helpers ──────────────────────────────
function AnonAvatar({ id, size = 38 }) {
  const a = window.SAI_ANON_MAP[id];
  if (!a) return null;
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: a.bg,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      fontSize: Math.round(size * 0.52) }}>{a.emoji}</div>
  );
}

// ── CHAT LIST (tab) ─────────────────────────────────────────
function ChatListScreen({ openThread, readChats = {}, empty }) {
  const [searching, setSearching] = React.useState(false);
  const [q, setQ] = React.useState("");
  const query = q.trim();
  const list = window.SAI_CHATS.filter((c) => !query || c.name.includes(query));
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--surface-page)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px 8px" }}>
        <span style={{ font: "var(--font-title-1)", color: "var(--text-strong)", letterSpacing: "var(--tracking-tight)" }}>채팅</span>
        <button type="button" aria-label="채팅 검색" onClick={() => setSearching((s) => { if (s) setQ(""); return !s; })}
          style={{ width: 36, height: 36, border: "none", background: searching ? "var(--fill-weak)" : "transparent", borderRadius: "var(--radius-full)",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", WebkitTapHighlightColor: "transparent" }}>
          <CIcon name="search" color="var(--grey-700)" size={22} />
        </button>
      </div>
      {searching && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "2px 20px 8px" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, height: 42, padding: "0 14px", borderRadius: "var(--radius-full)", background: "var(--surface-sunken)" }}>
            <CIcon name="search" size={17} color="var(--grey-500)" />
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="회의 이름으로 검색"
              style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", font: "var(--font-body-2)", color: "var(--text-strong)", letterSpacing: "var(--tracking-normal)" }} />
            {q && <button type="button" aria-label="지우기" onClick={() => setQ("")}
              style={{ border: "none", background: "var(--grey-200)", color: "var(--grey-600)", width: 18, height: 18, borderRadius: "50%", fontSize: 11, lineHeight: "18px", padding: 0, cursor: "pointer", flexShrink: 0 }}>✕</button>}
          </div>
          <button type="button" onClick={() => { setSearching(false); setQ(""); }}
            style={{ border: "none", background: "transparent", cursor: "pointer", font: "var(--font-body-2)", fontWeight: 600, color: "var(--primary)", padding: 2, WebkitTapHighlightColor: "transparent" }}>취소</button>
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "4px 20px 8px", padding: "10px 14px", background: "var(--surface-sunken)", borderRadius: "var(--radius-md)" }}>
        <span style={{ fontSize: 15 }}>🕶️</span>
        <span style={{ font: "var(--font-caption-1)", color: "var(--text-sub)", letterSpacing: "var(--tracking-normal)" }}>모든 채팅은 익명이에요. 이름은 보이지 않아요.</span>
      </div>

      {empty ? (
        <EmptyState emoji="💬" title="아직 채팅방이 없어요"
          desc={<>회의를 만들면 회의마다<br />익명 채팅방이 자동으로 열려요.</>} />
      ) : (
      <div style={{ flex: 1, overflowY: "auto", padding: "4px 0 12px" }}>
        {list.length === 0 && (
          <div style={{ padding: "48px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 30 }}>🔍</div>
            <div style={{ font: "var(--font-body-2)", color: "var(--text-weak)", marginTop: 8 }}>‘{query}’와 맞는 채팅이 없어요</div>
          </div>
        )}
        {list.map((c, i) => (
          <div key={c.id}>
            <button type="button" onClick={() => openThread(c)} style={{ width: "100%", border: "none", background: "transparent", cursor: "pointer", padding: "12px 20px", display: "flex", alignItems: "center", gap: 13, textAlign: "left", WebkitTapHighlightColor: "transparent" }}>
              <CAsset tone={c.tone} size={48} shape="squircle"><CIcon name={c.icon} size={24} color="var(--primary)" /></CAsset>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ font: "var(--font-head)", color: "var(--text-strong)", letterSpacing: "var(--tracking-normal)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
                  <span style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 3, height: 18, padding: "0 6px", borderRadius: "var(--radius-full)", background: "var(--fill-weak)", color: "var(--text-weak)", font: "var(--font-caption-2)", fontSize: 10 }}>
                    <CIcon name="lock" size={10} color="var(--grey-500)" strokeWidth={2} />익명
                  </span>
                </div>
                <div style={{ font: "var(--font-body-2)", color: "var(--text-weak)", marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.last}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                <span style={{ font: "var(--font-caption-2)", color: "var(--text-weak)" }}>{c.t}</span>
                {c.unread > 0 && !readChats[c.id]
                  ? <span style={{ minWidth: 18, height: 18, padding: "0 5px", borderRadius: 9, background: "var(--negative)", color: "#fff", font: "var(--font-caption-2)", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{c.unread}</span>
                  : <span style={{ height: 18 }} />}
              </div>
            </button>
            {i < list.length - 1 && <CBorder inset={20} />}
          </div>
        ))}
      </div>
      )}
    </div>
  );
}

// ── CHAT THREAD (anonymous) ─────────────────────────────────
function ChatThreadScreen({ back, go, chat, chosen }) {
  const finalNotice = chosen && chat && chat.live
    ? [{ kind: "system", text: `사이가 회의 시간을 정했어요 🎉 ${chosen.day.label} ${chosen.time.label}` }]
    : [];
  const base = chat && chat.id === "live"
    ? [...window.SAI_THREAD, ...finalNotice]
    : (chat && window.SAI_THREADS_BY_ID[chat.id]) || [
        { kind: "system", text: "사이가 회의 시간을 정했어요 🎉" },
        { from: "a", text: "다들 확인 감사해요!", t: "오후 5:20" },
        { from: "me", text: "네 그때 봬요 🙌", t: "오후 5:22" },
      ];
  const [msgs, setMsgs] = React.useState(base);
  const [text, setText] = React.useState("");
  const [anonInfo, setAnonInfo] = React.useState(false);
  const scrollRef = React.useRef(null);
  React.useEffect(() => { const el = scrollRef.current; if (el) el.scrollTop = el.scrollHeight; }, [msgs]);
  const send = () => { const v = text.trim(); if (!v) return; setMsgs((m) => [...m, { from: "me", text: v, t: "지금" }]); setText(""); };

  let prev = null;
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--surface-page)" }}>
      <div style={{ background: "var(--surface-card)", borderBottom: "1px solid var(--border-subtle)", flexShrink: 0 }}>
        <CNav onBack={back} title={chat ? chat.name : "익명 채팅"} right={
          <button type="button" onClick={() => setAnonInfo(true)} aria-label="익명 안내"
            style={{ width: 36, height: 36, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", WebkitTapHighlightColor: "transparent" }}>
            <CIcon name="lock" size={20} color="var(--grey-500)" />
          </button>
        } style={{ borderBottom: "none" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 20px 10px", marginTop: -4 }}>
          <span style={{ fontSize: 13 }}>🕶️</span>
          <span style={{ font: "var(--font-caption-1)", color: "var(--text-sub)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>익명 채팅 · {(chat && chat.people) || 6}명 · 이름은 보이지 않아요</span>
          {chat && chat.live && go && (
            <button type="button" onClick={() => go("detail")} style={{ border: "none", background: "var(--fill-weak)", cursor: "pointer", height: 28, padding: "0 12px", borderRadius: "var(--radius-full)", font: "var(--font-caption-1)", fontWeight: 600, color: "var(--primary)", whiteSpace: "nowrap", flexShrink: 0, WebkitTapHighlightColor: "transparent" }}>회의 보기</button>
          )}
        </div>
      </div>

      <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "16px 16px 8px", display: "flex", flexDirection: "column", gap: 3 }}>
        {msgs.map((m, i) => {
          if (m.kind === "system") {
            prev = null;
            return (
              <div key={i} style={{ alignSelf: "center", margin: "10px 0", padding: "7px 14px", borderRadius: "var(--radius-full)", background: "var(--fill-weak)", maxWidth: "84%", textAlign: "center" }}>
                <span style={{ font: "var(--font-caption-1)", color: "var(--text-weak)", letterSpacing: "var(--tracking-normal)" }}>{m.text}</span>
              </div>
            );
          }
          const mine = m.from === "me";
          const showHead = !mine && prev !== m.from;
          const a = window.SAI_ANON_MAP[m.from];
          prev = m.from;

          if (mine) {
            return (
              <div key={i} style={{ alignSelf: "flex-end", display: "flex", alignItems: "flex-end", gap: 6, maxWidth: "78%", marginTop: 3 }}>
                <span style={{ font: "var(--font-caption-2)", color: "var(--text-weak)", flexShrink: 0 }}>{m.t}</span>
                <div style={{ padding: "10px 13px", borderRadius: "16px 16px 4px 16px", background: "var(--primary)", color: "#fff", font: "var(--font-body-2)", letterSpacing: "var(--tracking-normal)", lineHeight: 1.45, wordBreak: "break-word" }}>{m.text}</div>
              </div>
            );
          }
          return (
            <div key={i} style={{ display: "flex", gap: 8, maxWidth: "86%", marginTop: showHead ? 12 : 3 }}>
              <div style={{ width: 38, flexShrink: 0 }}>{showHead && <AnonAvatar id={m.from} />}</div>
              <div style={{ minWidth: 0 }}>
                {showHead && <div style={{ display: "flex", alignItems: "center", gap: 4, margin: "0 0 4px 2px" }}><span style={{ font: "var(--font-caption-1)", color: a.tone, fontWeight: 600 }}>익명 {a.name}</span></div>}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
                  <div style={{ padding: "10px 13px", borderRadius: "16px 16px 16px 4px", background: "var(--surface-card)", border: "1px solid var(--border-subtle)", color: "var(--text-strong)", font: "var(--font-body-2)", letterSpacing: "var(--tracking-normal)", lineHeight: 1.45, wordBreak: "break-word" }}>
                    <div>{m.text}</div>
                  </div>
                  <span style={{ font: "var(--font-caption-2)", color: "var(--text-weak)", flexShrink: 0 }}>{m.t}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ flexShrink: 0, display: "flex", alignItems: "flex-end", gap: 8, padding: "10px 14px 20px", background: "var(--surface-card)", borderTop: "1px solid var(--border-subtle)" }}>
        <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") send(); }}
          placeholder="익명으로 메시지를 보내요" style={{ flex: 1, height: 44, border: "none", outline: "none", borderRadius: "var(--radius-full)", background: "var(--surface-sunken)", padding: "0 16px", font: "var(--font-body-2)", color: "var(--text-strong)", letterSpacing: "var(--tracking-normal)" }} />
        <button type="button" onClick={send} disabled={!text.trim()} style={{ width: 44, height: 44, borderRadius: "50%", border: "none", flexShrink: 0, cursor: text.trim() ? "pointer" : "default",
          background: text.trim() ? "var(--primary)" : "var(--grey-200)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background var(--dur-fast) var(--ease-standard)", WebkitTapHighlightColor: "transparent" }}>
          <CIcon name="send" size={20} color="#fff" />
        </button>
      </div>

      <window.BottomSheet open={anonInfo} onClose={() => setAnonInfo(false)} title="이 채팅은 익명이에요">
        {[
          ["🕶️", "이름 대신 동물로 보여요", "참여자마다 동물 이름이 무작위로 정해져요."],
          ["🔒", "끝나도 공개되지 않아요", "회의가 확정된 뒤에도 누가 누군지 알 수 없어요."],
          ["🧽", "지우기 응답도 익명이에요", "누가 어떤 시간을 지웠는지는 아무도 몰라요."],
        ].map(([e, t, d]) => (
          <div key={t} style={{ display: "flex", gap: 12, padding: "9px 0" }}>
            <span style={{ fontSize: 19 }}>{e}</span>
            <div>
              <div style={{ font: "var(--font-label)", color: "var(--text-strong)", letterSpacing: "var(--tracking-normal)" }}>{t}</div>
              <div style={{ font: "var(--font-caption-1)", color: "var(--text-sub)", marginTop: 2, lineHeight: 1.5 }}>{d}</div>
            </div>
          </div>
        ))}
        <div style={{ height: 12 }} />
        <CB variant="weak" size="md" fullWidth onClick={() => setAnonInfo(false)}>닫기</CB>
      </window.BottomSheet>
    </div>
  );
}

// ── MEETING DETAIL (진행 중인 회의) ─────────────────────────
function DetailScreen({ back, go, state, choose, openThread, anonymous = true, chosen }) {
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [remind, setRemind] = React.useState(true);
  const [calAdded, setCalAdded] = React.useState(false);
  const addCal = () => { if (calAdded) return; setCalAdded(true); setTimeout(() => go("home"), 1100); };
  const responded = state.participants.filter((p) => p.status === "responded").length;
  const total = state.participants.length;
  const meResponded = state.participants.some((p) => p.me && p.status === "responded");
  const pct = Math.round((responded / total) * 100);
  const slots = React.useMemo(() => window.computeSlots(state), [state]);
  const best = slots[0];
  const rangeText = state.range.to != null ? `4월 ${state.range.from}일 ~ 4월 ${state.range.to}일 · ${state.days.length}일간` : `4월 ${state.range.from}일`;
  const timeText = (() => {
    const sel = window.SAI_ALL_TIMES.filter((t) => state.times.includes(t.key));
    if (!sel.length) return "시간대 없음";
    return `${sel[0].label} ~ ${sel[sel.length - 1].label} 중 ${sel.length}개`;
  })();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--surface-page)" }}>
      <CNav onBack={back} title={state.name} titleVisible={false} right={
        <button type="button" onClick={() => setSettingsOpen(true)} aria-label="회의 설정"
          style={{ width: 36, height: 36, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", WebkitTapHighlightColor: "transparent" }}>
          <CIcon name="settings" size={22} color="var(--grey-600)" />
        </button>
      } />
      <div style={{ flex: 1, overflowY: "auto" }}>
        <CTop title={state.name} description={`${rangeText} · ${total}명`} />

        {/* Response status hero — flips to 확정 once a slot is chosen */}
        {chosen ? (
          <div style={{ margin: "4px 20px 0", padding: 18, background: "var(--surface-card)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-xs)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ font: "var(--font-head)", color: "var(--text-strong)", letterSpacing: "var(--tracking-normal)" }}>확정된 시간</span>
              <CBadge tone="positive">확정</CBadge>
            </div>
            <div style={{ font: "var(--font-caption-1)", color: "var(--text-sub)", marginTop: 12 }}>{chosen.day.label}</div>
            <div style={{ font: "var(--font-display-2)", color: "var(--text-strong)", letterSpacing: "var(--tracking-tight)", marginTop: 2 }}>{chosen.time.label}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
              <CAvatarStack people={["김","이","박","정","최","한"]} max={6} anonymous={anonymous} size={28} />
              <span style={{ font: "var(--font-caption-1)", color: "var(--text-weak)" }}>모두에게 공유됐어요</span>
            </div>
          </div>
        ) : (
        <div style={{ margin: "4px 20px 0", padding: 18, background: "var(--surface-card)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-xs)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ font: "var(--font-head)", color: "var(--text-strong)", letterSpacing: "var(--tracking-normal)" }}>응답 현황</span>
            <CBadge tone="primary">응답 대기</CBadge>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 12 }}>
            <span style={{ font: "var(--font-display-2)", color: "var(--primary)", letterSpacing: "var(--tracking-tight)" }}>{responded}</span>
            <span style={{ font: "var(--font-title-3)", color: "var(--text-weak)" }}>/ {total}명 응답</span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: "var(--grey-100)", marginTop: 12, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: "var(--primary)", borderRadius: 4, transition: "width var(--dur-slow) var(--ease-out)" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
            <CAvatarStack people={["김","이","박","정","최","한"]} max={6} anonymous size={28} />
            <span style={{ font: "var(--font-caption-1)", color: "var(--text-weak)" }}>{total - responded}명이 아직 안 지웠어요</span>
          </div>
        </div>
        )}

        {/* Current best time — hidden once confirmed */}
        {!chosen && (
        <>
        <CListHeader title="지금까지 좋은 시간" description="응답이 모일수록 더 정확해져요"
          action={<CB variant="ghost" size="sm" onClick={() => go("result")}>전체 보기</CB>} />
        <div style={{ padding: "0 20px" }}>
          {best && (
            <CProposalCard recommended date={best.day.label} time={best.time.label}
              vetoCount={best.vetoCount} reasons={best.reasons}
              confirmLabel="이 시간으로 정하기" onConfirm={() => { choose(best); go("confirm"); }} />
          )}
        </div>
        </>
        )}

        {/* Participants */}
        <CListHeader title="참석자" description={anonymous ? "익명 회의라 이름은 가려져요" : `응답 ${responded}/${total}명`} />
        <div style={{ margin: "0 20px", background: "var(--surface-card)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-xs)", overflow: "hidden" }}>
          {state.participants.map((p, i) => {
            const pending = p.status === "pending";
            const persona = window.SAI_ANON[i % window.SAI_ANON.length];
            return (
              <div key={p.name}>
                {/* 동물별 응답 상태도 비공개 — 상태 변화 시점과 집계 델타를 대조하면
                    동물 뒤의 실명이 특정될 수 있다. 응답 현황은 상단 집계(n/m)로만. */}
                <CListRow
                  left={anonymous
                    ? <div style={{ width: 40, height: 40, borderRadius: "50%", background: persona.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21 }}>{persona.emoji}</div>
                    : <span style={{ display: "flex" }}><CAvatar name={p.name} index={i} size={40} /></span>}
                  title={(anonymous ? `익명 ${persona.name}` : p.name) + (p.me ? " · 나" : "")}
                  description="익명으로 참여 중"
                  right={p.required ? <span style={{ font: "var(--font-caption-2)", color: "var(--primary)" }}>필수</span> : null}
                />
                {i < state.participants.length - 1 && <CBorder inset={52} />}
              </div>
            );
          })}
        </div>

        {/* Meeting info */}
        <CListHeader title="회의 정보" />
        <div style={{ margin: "0 20px", background: "var(--surface-card)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-xs)", overflow: "hidden" }}>
          <InfoRow icon="calendar" label="기간" value={rangeText} />
          <CBorder inset={52} />
          <InfoRow icon="clock" label="시간대" value={timeText} />
          <CBorder inset={52} />
          <InfoRow icon="pin" label="위치" value={state.location ? state.location : "온라인 · 장소 미정"} />
        </div>
        <div style={{ height: 16 }} />
      </div>

      <CBottomCTA gradient={false} style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <CB variant="weak" size="lg" onClick={() => openThread(window.SAI_CHAT_BY_ID.live)} style={{ flex: 1 }}>익명 채팅</CB>
        {chosen
          ? <CB variant="primary" size="lg" onClick={addCal} style={{ flex: 2 }}>{calAdded ? "추가했어요 ✓" : "캘린더에 추가"}</CB>
          : meResponded
            ? <CB variant="primary" size="lg" onClick={() => go("result")} style={{ flex: 2 }}>결과 보기</CB>
            : <CB variant="primary" size="lg" onClick={() => go("veto")} style={{ flex: 2 }}>싫은 시간 지우기</CB>}
      </CBottomCTA>

      <window.Toast show={calAdded}>캘린더에 추가했어요</window.Toast>

      <window.BottomSheet open={settingsOpen} onClose={() => setSettingsOpen(false)} title="회의 설정">
        <div style={{ margin: "0 -20px" }}>
          <CListRow left={<CAsset tone="neutral" size={40}><CIcon name="edit" size={19} color="var(--grey-600)" /></CAsset>}
            title="회의 정보 수정" description="이름 · 기간 · 시간대 · 참석자" chevron
            onClick={() => { setSettingsOpen(false); go("create"); }} />
          <CBorder inset={20} />
          <CListRow left={<CAsset emoji="🔗" tone="neutral" size={40} />}
            title="초대 링크 보내기" description="안 지운 사람에게는 사이가 대신 알려요" chevron
            onClick={() => { setSettingsOpen(false); go("invite"); }} />
          <CBorder inset={20} />
          <ToggleRow icon="bell" title="이 회의 알림" desc="응답과 확정 소식을 알려드려요" checked={remind} onChange={() => setRemind((v) => !v)} />
        </div>
      </window.BottomSheet>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "15px 18px" }}>
      <CAsset tone="neutral" size={28}><CIcon name={icon} size={18} color="var(--grey-600)" /></CAsset>
      <span style={{ font: "var(--font-body-2)", color: "var(--text-weak)", width: 52, flexShrink: 0 }}>{label}</span>
      <span style={{ flex: 1, textAlign: "right", font: "var(--font-body-2)", color: "var(--text-strong)", letterSpacing: "var(--tracking-normal)" }}>{value}</span>
    </div>
  );
}

// ── MY (tab) ────────────────────────────────────────────────
function MyScreen({ anonymous = true, setAnonymous }) {
  const [reveal, setReveal] = React.useState(false);
  const [about, setAbout] = React.useState(false);
  const [help, setHelp] = React.useState(false);
  const [nRes, setNRes] = React.useState(true);
  const [nChat, setNChat] = React.useState(true);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--surface-page)" }}>
      <div style={{ padding: "14px 20px 8px" }}>
        <span style={{ font: "var(--font-title-1)", color: "var(--text-strong)", letterSpacing: "var(--tracking-tight)" }}>마이</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 0 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 20px 8px" }}>
          <CAvatar name="지원" index={0} size={56} />
          <div>
            <div style={{ font: "var(--font-title-3)", color: "var(--text-strong)", letterSpacing: "var(--tracking-normal)" }}>지원님</div>
            <div style={{ font: "var(--font-caption-1)", color: "var(--text-sub)", marginTop: 2 }}>sai.im 계정으로 로그인했어요</div>
          </div>
        </div>

        <CListHeader title="익명" description="사이의 기본값이에요" />
        <div style={{ margin: "0 20px", background: "var(--surface-card)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-xs)", overflow: "hidden" }}>
          <ToggleRow icon="lock" title="익명으로 참여" desc="회의에서 내 이름을 숨겨요" checked={anonymous} onChange={() => setAnonymous && setAnonymous((v) => !v)} />
          <CBorder inset={52} />
          <ToggleRow icon="eye" title="실명 공개 요청 받기" desc="교착일 때만, 원하면 이름을 밝혀 직접 조율해요 (3단계)" checked={reveal} onChange={() => setReveal((v) => !v)} />
        </div>

        <CListHeader title="알림" />
        <div style={{ margin: "0 20px", background: "var(--surface-card)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-xs)", overflow: "hidden" }}>
          <ToggleRow icon="bell" title="응답 알림" desc="참석자가 시간을 지우면 알려드려요" checked={nRes} onChange={() => setNRes((v) => !v)} />
          <CBorder inset={52} />
          <ToggleRow icon="message" title="채팅 알림" desc="새 익명 메시지를 알려드려요" checked={nChat} onChange={() => setNChat((v) => !v)} />
        </div>

        <CListHeader title="사이" />
        <div style={{ margin: "0 20px", background: "var(--surface-card)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-xs)", overflow: "hidden" }}>
          <CListRow left={<CAsset tone="neutral" size={28}><CIcon name="heart" size={18} color="var(--grey-600)" /></CAsset>} title="사이 소개" chevron onClick={() => setAbout(true)} />
          <CBorder inset={52} />
          <CListRow left={<CAsset tone="neutral" size={28}><CIcon name="sparkle" size={18} color="var(--grey-600)" /></CAsset>} title="도움말" chevron onClick={() => setHelp(true)} />
        </div>
        <div style={{ height: 12 }} />
      </div>

      <window.BottomSheet open={about} onClose={() => setAbout(false)} title="사이 소개">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <img src="../assets/logo-s2.svg" alt="사이" style={{ width: 54, height: 40, objectFit: "contain" }} />
          <div>
            <div style={{ font: "var(--font-title-3)", color: "var(--text-strong)", letterSpacing: "var(--tracking-normal)" }}>사이</div>
            <div style={{ font: "var(--font-caption-1)", color: "var(--text-weak)", marginTop: 2 }}>버전 1.0.0 · 최신 버전이에요</div>
          </div>
        </div>
        <CP typography="body-2" color="sub">좋은 시간을 찾으려면 모두가 일정을 공개해야 해요. 사이는 반대로, 싫은 시간만 익명으로 지우면 남은 시간 중에서 회의를 정해줘요.</CP>
        <div style={{ height: 16 }} />
        <CB variant="weak" size="md" fullWidth onClick={() => setAbout(false)}>닫기</CB>
      </window.BottomSheet>

      <window.BottomSheet open={help} onClose={() => setHelp(false)} title="도움말">
        {[
          ["🧽", "왜 ‘지우기’인가요?", "가능한 시간을 고르는 대신, 안 되는 시간만 지워요. 남은 시간 중 하나로 확정돼요."],
          ["🕶️", "정말 익명인가요?", "누가 어떤 시간을 지웠는지는 아무도 볼 수 없어요. 사유는 숫자로만 모이고, 응답은 모아서 반영돼 시점으로도 특정할 수 없어요."],
          ["🎯", "확정은 누가 하나요?", "만든 사람이 추천 시간 중에서 확정해요. 확정되면 모두에게 알림이 가요."],
          ["🪜", "답이 안 나오면요?", "① 대부분 거부 0인 시간이 있어 여기서 끝나요. ② 완벽한 시간이 없으면 걸리는 사람에게만 익명으로 다시 물어요. ③ 그래도 막히면 원하는 사람만 이름·사유를 공개해 직접 조율해요."],
        ].map(([e, t, d]) => (
          <div key={t} style={{ display: "flex", gap: 12, padding: "9px 0" }}>
            <span style={{ fontSize: 19 }}>{e}</span>
            <div>
              <div style={{ font: "var(--font-label)", color: "var(--text-strong)", letterSpacing: "var(--tracking-normal)" }}>{t}</div>
              <div style={{ font: "var(--font-caption-1)", color: "var(--text-sub)", marginTop: 2, lineHeight: 1.5 }}>{d}</div>
            </div>
          </div>
        ))}
        <div style={{ height: 12 }} />
        <CB variant="weak" size="md" fullWidth onClick={() => setHelp(false)}>닫기</CB>
      </window.BottomSheet>
    </div>
  );
}

function ToggleRow({ icon, title, desc, checked, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 18px" }}>
      <CAsset tone="neutral" size={28}>{icon === "message" ? <MsgIcon size={18} color="var(--grey-600)" /> : <CIcon name={icon} size={18} color="var(--grey-600)" />}</CAsset>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: "var(--font-body-1)", color: "var(--text-strong)", letterSpacing: "var(--tracking-normal)" }}>{title}</div>
        <div style={{ font: "var(--font-caption-1)", color: "var(--text-weak)", marginTop: 1 }}>{desc}</div>
      </div>
      <CSwitch checked={checked} onChange={onChange} />
    </div>
  );
}

Object.assign(window, { AppShell, Fab, MeetingCard, EmptyState, MsgIcon, BellButton, NotifSheet, IconPickSheet, HomeScreen, ChatListScreen, ChatThreadScreen, DetailScreen, MyScreen });
