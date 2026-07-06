/* 사이 screens — Veto · Result · Confirm (the core loop) */
const { Button: SB, BottomCTA: SBottomCTA, Badge: SBadge, Border: SBorder, ListRow: SListRow,
        ListHeader: SListHeader, Asset: SAsset, Paragraph: SP, NavigationBar: SNav, TopBar: STop,
        Chip: SChip, VetoCell: SVetoCell, ProposalCard: SProposalCard, AvatarStack: SAvatarStack, Icon: SIcon } = window.TDSDesignSystem_58842e;

const slotKey = (d, t) => `${d}-${t}`;

// ── VETO (participant erases disliked times) ────────────────
function VetoScreen({ go, back, state, setState, openThread }) {
  const { days, times, myVetoes } = state;
  const [sheet, setSheet] = React.useState(null); // slot key awaiting a reason
  const count = Object.keys(myVetoes).length;
  const total = state.participants.length;
  const responded = state.participants.filter((p) => p.status === "responded").length;
  const rangeText = state.range.to != null ? `4월 ${state.range.from}일 ~ ${state.range.to}일` : `4월 ${state.range.from}일`;
  // 다 지웠어요 → 내 응답이 전역으로 반영되고 집계로 이동
  const done = () => {
    setState((s) => ({ ...s, participants: s.participants.map((p) => p.me ? { ...p, status: "responded" } : p) }));
    go("result");
  };

  const toggle = (key) => {
    setState((s) => {
      const next = { ...s.myVetoes };
      if (next[key]) { delete next[key]; return { ...s, myVetoes: next }; }
      next[key] = true; return { ...s, myVetoes: next };
    });
    if (!myVetoes[key]) setSheet(key);
  };
  const setReason = (reason) => {
    setState((s) => ({ ...s, myVetoes: { ...s.myVetoes, [sheet]: reason || true } }));
    setSheet(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--surface-card)" }}>
      <SNav onBack={back} title={state.name} titleVisible={false} right={
        openThread ? (
          <button type="button" onClick={() => openThread(window.SAI_CHAT_BY_ID.live)} aria-label="익명 채팅"
            style={{ width: 36, height: 36, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", WebkitTapHighlightColor: "transparent" }}>
            <window.MsgIcon size={22} color="var(--grey-600)" />
          </button>
        ) : null
      } />
      <div style={{ flex: 1, overflowY: "auto" }}>
        <STop title="싫은 시간을 지워요" description={`${state.name} · ${rangeText} · ${total}명`} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "0 20px 8px", padding: "10px 14px", background: "var(--surface-sunken)", borderRadius: "var(--radius-md)" }}>
          <span style={{ fontSize: 15 }}>🕶️</span>
          <span style={{ font: "var(--font-caption-1)", color: "var(--text-sub)", letterSpacing: "var(--tracking-normal)", flex: 1 }}>익명으로 집계돼요. 누가 몇 번째로 지웠는지는 아무도 몰라요.</span>
        </div>

        {days.map((d) => {
          const mineInDay = window.SAI_ALL_TIMES.filter((t) => times.includes(t.key)).filter((t) => myVetoes[slotKey(d.key, t.key)]).length;
          return (
          <div key={d.key}>
            <SListHeader title={d.label} description={mineInDay > 0 ? `${mineInDay}개 지웠어요` : null} style={{ padding: "16px 20px 8px" }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, padding: "0 20px" }}>
              {window.SAI_ALL_TIMES.filter((t) => times.includes(t.key)).map((t) => {
                const key = slotKey(d.key, t.key);
                return (
                  <SVetoCell key={key} label={t.label.replace(/(오전|오후|낮|저녁) /, "")} sublabel={t.label.split(" ")[0]}
                    vetoed={!!myVetoes[key]} onToggle={() => toggle(key)} />
                );
              })}
            </div>
          </div>
          );
        })}
        <div style={{ height: 24 }} />
      </div>

      <SBottomCTA>
        <SB variant="primary" size="lg" fullWidth onClick={done}>
          {count > 0 ? `다 지웠어요 · ${count}개` : "모든 시간 괜찮아요"}
        </SB>
      </SBottomCTA>

      <window.BottomSheet open={!!sheet} onClose={() => setSheet(null)} title="왜 부담스러운가요?">
        <SP typography="body-2" color="sub" style={{ margin: "-8px 0 16px" }}>사유는 숫자로만 모여요. 이름은 붙지 않아요. (선택)</SP>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          {window.SAI_REASONS.map((r) => (
            <SChip key={r} tone="negative" selected={sheet && state.myVetoes[sheet] === r} onClick={() => setReason(r)}>{r}</SChip>
          ))}
        </div>
        <SB variant="weak" size="md" fullWidth onClick={() => setReason(null)}>사유 없이 지우기</SB>
      </window.BottomSheet>
    </div>
  );
}

// ── RESULT (host reviews the tally) ─────────────────────────
function computeSlots(state) {
  const out = [];
  state.days.forEach((d) => {
    window.SAI_ALL_TIMES.filter((t) => state.times.includes(t.key)).forEach((t) => {
      const key = slotKey(d.key, t.key);
      const seed = window.SAI_SEED_VETOES[key] || [];
      const mine = state.myVetoes[key];
      const reasons = [...seed];
      if (mine && typeof mine === "string") reasons.push(mine);
      const vetoCount = seed.length + (mine ? 1 : 0);
      const requiredConflict = (window.SAI_REQUIRED_CONFLICTS || new Set()).has(key);
      const tally = {};
      reasons.forEach((r) => { tally[r] = (tally[r] || 0) + 1; });
      out.push({ key, day: d, time: t, vetoCount, requiredConflict, reasons: Object.entries(tally).map(([label, count]) => ({ label, count })) });
    });
  });
  // 필수 참석자가 걸린 슬롯은 거부 수가 적어도 후순위로 — "필수 전원 가능 + 거부 최소"
  return out.sort((a, b) => (a.requiredConflict - b.requiredConflict) || (a.vetoCount - b.vetoCount));
}

// 집계 리빌 스켈레톤 — "응답을 모아서 반영"하는 서사를 시각적으로 연결
function ResultSkeleton() {
  const bar = (w, h, mt) => <div style={{ width: w, height: h, marginTop: mt, borderRadius: 8, background: "var(--fill-weak)", animation: "sai-pulse 1.2s var(--ease-standard) infinite" }} />;
  return (
    <div style={{ padding: "8px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-weak)", font: "var(--font-caption-1)", marginBottom: 16 }}>
        <span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid var(--grey-200)", borderTopColor: "var(--primary)", animation: "sai-spin .7s linear infinite" }} />
        익명 응답을 모아 집계하는 중이에요…
      </div>
      {[0, 1].map((k) => (
        <div key={k} style={{ padding: 20, borderRadius: "var(--radius-xl)", background: "var(--surface-card)", border: "1px solid var(--border-subtle)", marginBottom: 12 }}>
          {bar("40%", 13, 0)}{bar("55%", 24, 8)}{bar("100%", 40, 16)}
        </div>
      ))}
    </div>
  );
}

function ResultScreen({ go, back, state, choose }) {
  const [view, setView] = React.useState("picks"); // picks | grid
  const [ready, setReady] = React.useState(false);   // 집계 스켈레톤 → 리빌
  const [escalate, setEscalate] = React.useState(null); // 뎁스2 핀포인트 대상 slot
  const [reveal, setReveal] = React.useState(false);    // 뎁스3 자발 공개 시트
  const [toast, setToast] = React.useState(null);
  const toastRef = React.useRef(null);
  const notify = (m) => { setToast(m); clearTimeout(toastRef.current); toastRef.current = setTimeout(() => setToast(null), 1800); };
  React.useEffect(() => { const t = setTimeout(() => setReady(true), 650); return () => clearTimeout(t); }, []);
  const slots = React.useMemo(() => computeSlots(state), [state]);
  const picks = slots.slice(0, 3);
  const best = picks[0];
  const total = state.participants.length;
  const responded = state.participants.filter((p) => p.status === "responded").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--surface-page)" }}>
      <SNav onBack={() => { if (view === "grid") setView("picks"); else back(); }} title="좋은 시간을 찾았어요" titleVisible={view === "grid"} />
      <div style={{ flex: 1, overflowY: "auto" }}>
        {view === "picks" ? (
          <>
            <STop title="좋은 시간을 찾았어요" description={best.vetoCount === 0 ? "아무도 부담스러워하지 않고, 필수 참석자도 전원 가능한 시간이에요." : "완벽한 시간이 없어요. 가장 적게 걸리는 시간부터 보여드려요."} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 20px 12px" }}>
              <SAvatarStack people={window.SAI_MEETINGS.live.people} max={6} anonymous size={26} />
              <span style={{ font: "var(--font-caption-1)", color: "var(--text-weak)" }}>
                {responded === total ? `${total}명 모두 응답했어요` : `${total}명 중 ${responded}명 응답 · 중간 집계예요`}
              </span>
            </div>
            {/* 배치 반영 — 개별 응답의 델타가 실시간으로 드러나면 마지막 응답자가 특정된다 */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "0 20px 12px", padding: "10px 14px", background: "var(--surface-sunken)", borderRadius: "var(--radius-md)" }}>
              <span style={{ fontSize: 15 }}>🕶️</span>
              <span style={{ font: "var(--font-caption-1)", color: "var(--text-sub)", flex: 1 }}>누가 지웠는지 특정할 수 없도록, 응답은 모아서 한 번에 반영돼요.</span>
            </div>
            {!ready ? <ResultSkeleton /> : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "0 20px" }}>
              {picks.map((s, i) => (
                <div key={s.key} style={{ animation: "sai-fade-up var(--dur-base) var(--ease-out) both", animationDelay: `${i * 70}ms` }}>
                  <SProposalCard recommended={i === 0}
                    date={`${s.day.label}`} time={s.time.label}
                    vetoCount={s.vetoCount} reasons={s.reasons}
                    confirmLabel={i === 0 && s.vetoCount === 0 ? "이 시간으로 확정하기" : "이 시간으로 정하기"}
                    onConfirm={() => { choose(s); go("confirm"); }} />
                  {s.vetoCount > 0 && (
                    /* 뎁스2 — 익명 유지 핀포인트 재요청 */
                    <button type="button" onClick={() => setEscalate(s)}
                      style={{ width: "100%", marginTop: 8, border: "none", background: "transparent", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "8px 0",
                        font: "var(--font-caption-1)", fontWeight: 600, color: "var(--primary)", WebkitTapHighlightColor: "transparent" }}>
                      🕶️ 이 시간에 걸리는 {s.vetoCount}명에게만 다시 물어보기
                    </button>
                  )}
                </div>
              ))}
            </div>
            )}
            <div style={{ padding: "18px 20px 8px" }}>
              <SB variant="ghost" size="md" fullWidth onClick={() => setView("grid")}>전체 시간 거부 현황 보기</SB>
            </div>
            <div style={{ height: 12 }} />
          </>
        ) : (
          <div style={{ padding: "8px 20px 24px" }}>
            <SP typography="body-2" color="sub" style={{ margin: "0 0 16px" }}>각 시간을 몇 명이 지웠는지, 사유까지 익명으로 모아서 보여드려요.</SP>
            {state.days.map((d) => (
              <div key={d.key} style={{ marginBottom: 20 }}>
                <div style={{ font: "var(--font-title-3)", color: "var(--text-strong)", marginBottom: 8, letterSpacing: "var(--tracking-normal)" }}>{d.label}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {window.SAI_ALL_TIMES.filter((t) => state.times.includes(t.key)).map((t) => {
                    const s = slots.find((x) => x.key === slotKey(d.key, t.key));
                    return <SVetoCell key={t.key} mode="aggregate" label={t.label.replace(/(오전|오후|낮|저녁) /, "")} sublabel={t.label.split(" ")[0]} vetoCount={s.vetoCount} totalPeople={window.SAI_TOTAL} reasons={s.reasons} />;
                  })}
                </div>
              </div>
            ))}
            <SB variant="weak" size="lg" fullWidth onClick={() => setView("picks")}>추천 시간으로 돌아가기</SB>
          </div>
        )}
      </div>

      {/* ── 뎁스2 · 익명 유지 핀포인트 재요청 ── */}
      <window.BottomSheet open={!!escalate} onClose={() => setEscalate(null)} title="걸리는 사람에게만 다시 물어볼게요">
        <SP typography="body-2" color="sub" style={{ margin: "-8px 0 14px" }}>
          완벽한 시간이 없을 때만 등장해요. {escalate ? `${escalate.day.label} ${escalate.time.label}에 ` : ""}부담을 느낀 {escalate ? escalate.vetoCount : 0}명에게만 익명으로 다시 물어요. 누구인지는 밝히지 않아요.
        </SP>
        {escalate && escalate.requiredConflict && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, padding: "10px 12px", borderRadius: "var(--radius-md)", background: "var(--warning-bg)", font: "var(--font-caption-1)", color: "#B77900" }}>
            ⚠️ 이 시간엔 필수 참석자가 걸려 있어요.
          </div>
        )}
        <SB variant="primary" size="md" fullWidth onClick={() => { setEscalate(null); notify("걸리는 분들께 익명으로 다시 물었어요"); }}>익명으로 다시 묻기</SB>
        <div style={{ height: 8 }} />
        <SB variant="ghost" size="md" fullWidth onClick={() => { setEscalate(null); setReveal(true); }}>그래도 막히면, 이름 공개하고 직접 조율</SB>
      </window.BottomSheet>

      {/* ── 뎁스3 · 자발적 공개(최후 수단, 옵트인) ── */}
      <window.BottomSheet open={reveal} onClose={() => setReveal(false)} title="밝혀도 괜찮다면, 직접 조율해요">
        <SP typography="body-2" color="sub" style={{ margin: "-8px 0 16px" }}>
          강제 공개가 아니라 선택적 커밍아웃이에요. 밝혀도 괜찮은 사람만 이름·사유를 열어 직접 조율하고, 끝까지 익명을 택한 사람은 드러나지 않아요.
        </SP>
        <SB variant="dark" size="md" fullWidth onClick={() => { setReveal(false); notify("공개한 사람끼리 조율을 시작했어요"); }}>공개하고 대화 시작</SB>
        <SP typography="caption-1" color="weak" align="center" style={{ marginTop: 10 }}>드문 예외 상황을 위한 안전판이에요</SP>
      </window.BottomSheet>

      <window.Toast show={!!toast}>{toast}</window.Toast>
    </div>
  );
}

// ── CONFIRM (done) ──────────────────────────────────────────
function ConfirmScreen({ go, chosen, state }) {
  const [calAdded, setCalAdded] = React.useState(false);
  const addCal = () => { if (calAdded) return; setCalAdded(true); setTimeout(() => go("home"), 1100); };
  const meetingName = (state && state.name) || "주간 디자인 리뷰";
  const location = state && state.location;
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--surface-card)" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ marginTop: 48, animation: "sai-pop var(--dur-slow) var(--ease-out)" }}>
          <SAsset emoji="🎉" tone="primary" size={92} shape="squircle" />
        </div>
        <SP typography="title-1" color="strong" align="center" style={{ marginTop: 24 }}>회의 시간을 정했어요</SP>
        <SP typography="body-2" color="sub" align="center" style={{ marginTop: 8 }}>참석자 모두에게 알림을 보냈어요.</SP>

        <div style={{ width: "100%", marginTop: 20, padding: "12px 14px", borderRadius: "var(--radius-lg)", background: "var(--surface-sunken)", display: "flex", alignItems: "center", gap: 10, textAlign: "left" }}>
          <span style={{ fontSize: 18 }}>🕶️</span>
          <span style={{ font: "var(--font-caption-1)", color: "var(--text-sub)", letterSpacing: "var(--tracking-normal)" }}>누가 어떤 시간을 지웠는지는 끝까지 비밀이에요. 정해진 시간만 모두에게 공유돼요.</span>
        </div>

        <div style={{ width: "100%", marginTop: 28, padding: 20, borderRadius: "var(--radius-xl)", background: "var(--surface-sunken)", textAlign: "left" }}>
          <div style={{ font: "var(--font-caption-1)", color: "var(--text-sub)" }}>{chosen ? chosen.day.label : "4월 2일 화요일"}</div>
          <div style={{ font: "var(--font-display-2)", color: "var(--text-strong)", letterSpacing: "var(--tracking-tight)", margin: "4px 0 14px" }}>{chosen ? chosen.time.label : "오전 10시"}</div>
          <SBorder />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
            <span style={{ font: "var(--font-body-2)", color: "var(--text-sub)" }}>{meetingName}</span>
            <SAvatarStack people={["김","이","박","정","최","한"]} max={5} anonymous size={28} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, font: "var(--font-body-2)", color: "var(--text-sub)" }}>
            <SIcon name="pin" size={16} color="var(--grey-500)" />
            <span>{location ? location : "장소 미정 · 온라인"}</span>
          </div>
          {chosen && chosen.vetoCount === 0 && (
            <div style={{ marginTop: 14, padding: "10px 12px", borderRadius: "var(--radius-md)", background: "var(--available-bg)", font: "var(--font-caption-1)", color: "var(--primary-weak-fg)" }}>
              🙆 아무도 부담스러워하지 않은 시간이에요
            </div>
          )}
        </div>
      </div>
      <SBottomCTA gradient={false} style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <SB variant="weak" size="lg" onClick={() => go("meetings")} style={{ flex: 1 }}>회의 목록</SB>
        <SB variant="primary" size="lg" onClick={addCal} style={{ flex: 2 }}>{calAdded ? "추가했어요 ✓" : "캘린더에 추가"}</SB>
      </SBottomCTA>
      <window.Toast show={calAdded}>캘린더에 추가했어요</window.Toast>
    </div>
  );
}

Object.assign(window, { VetoScreen, ResultScreen, ConfirmScreen, computeSlots });
