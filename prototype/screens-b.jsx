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
          <span style={{ font: "var(--font-caption-1)", color: "var(--text-sub)", letterSpacing: "var(--tracking-normal)", flex: 1 }}>익명으로 집계돼요. 지금까지 {responded}명이 지웠어요.</span>
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
      const tally = {};
      reasons.forEach((r) => { tally[r] = (tally[r] || 0) + 1; });
      out.push({ key, day: d, time: t, vetoCount, reasons: Object.entries(tally).map(([label, count]) => ({ label, count })) });
    });
  });
  return out.sort((a, b) => a.vetoCount - b.vetoCount);
}

function ResultScreen({ go, back, state, choose }) {
  const [view, setView] = React.useState("picks"); // picks | grid
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
            <STop title="좋은 시간을 찾았어요" description={best.vetoCount === 0 ? "아무도 부담스러워하지 않는 시간이 있어요." : "가장 적게 걸리는 시간부터 보여드려요."} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 20px 12px" }}>
              <SAvatarStack people={window.SAI_MEETINGS.live.people} max={6} anonymous size={26} />
              <span style={{ font: "var(--font-caption-1)", color: "var(--text-weak)" }}>
                {responded === total ? `${total}명 모두 응답했어요` : `${total}명 중 ${responded}명 응답 · 중간 집계예요`}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "0 20px" }}>
              {picks.map((s, i) => (
                <SProposalCard key={s.key} recommended={i === 0}
                  date={`${s.day.label}`} time={s.time.label}
                  vetoCount={s.vetoCount} reasons={s.reasons}
                  confirmLabel={i === 0 ? "이 시간으로 정하기" : "이 시간으로 정하기"}
                  onConfirm={() => { choose(s); go("confirm"); }} />
              ))}
            </div>
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
      <SBottomCTA gradient={false}>
        <SB variant="weak" size="lg" onClick={() => go("meetings")} style={{ flex: 1 }}>회의 목록</SB>
        <SB variant="primary" size="lg" onClick={addCal} style={{ flex: 2 }}>{calAdded ? "추가했어요 ✓" : "캘린더에 추가"}</SB>
      </SBottomCTA>
      <window.Toast show={calAdded}>캘린더에 추가했어요</window.Toast>
    </div>
  );
}

Object.assign(window, { VetoScreen, ResultScreen, ConfirmScreen, computeSlots });
