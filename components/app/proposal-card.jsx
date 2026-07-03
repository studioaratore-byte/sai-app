import React from "react";
import { Button } from "../core/button.jsx";

/**
 * ProposalCard — a candidate meeting time surfaced by 사이 after tallying
 * vetoes. Shows the time, how many people found it hard (with reason
 * breakdown), and a confirm action. `recommended` gets the blue emphasis.
 */
function ProposalCard({
  date,
  time,
  vetoCount = 0,
  reasons = [],       // [{label:"외근", count:2}, ...]
  recommended = false,
  onConfirm,
  confirmLabel = "이 시간으로 정하기",
  style,
}) {
  const clear = vetoCount === 0;

  return (
    <div
      style={{
        borderRadius: "var(--radius-xl)",
        background: "var(--surface-card)",
        border: recommended ? "1.5px solid var(--primary)" : "1px solid var(--border-subtle)",
        boxShadow: recommended ? "var(--shadow-md)" : "var(--shadow-xs)",
        padding: 20,
        display: "flex", flexDirection: "column", gap: 14,
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ font: "var(--font-caption-1)", color: "var(--text-sub)", letterSpacing: "var(--tracking-normal)" }}>{date}</span>
          <span style={{ font: "var(--font-title-1)", color: "var(--text-strong)", letterSpacing: "var(--tracking-tight)" }}>{time}</span>
        </div>
        {recommended && (
          <span style={{
            display: "inline-flex", alignItems: "center", height: 26, padding: "0 10px",
            borderRadius: "var(--radius-full)", background: "var(--primary-weak-bg)",
            color: "var(--primary-weak-fg)", font: "var(--font-caption-2)",
            letterSpacing: "var(--tracking-normal)",
          }}>사이 추천</span>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8, padding: "10px 12px",
          borderRadius: "var(--radius-md)",
          background: clear ? "var(--available-bg)" : "var(--veto-bg)",
        }}>
          <span aria-hidden style={{ fontSize: 16 }}>{clear ? "🙆" : "🙅"}</span>
          <span style={{
            font: "var(--font-body-2)", letterSpacing: "var(--tracking-normal)",
            color: clear ? "var(--primary-weak-fg)" : "var(--red-600)",
          }}>
            {clear ? "아무도 부담스러워하지 않아요" : `${vetoCount}명이 부담스러워해요`}
          </span>
        </div>

        {!clear && reasons.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {reasons.map((r) => (
              <span key={r.label} style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                height: 28, padding: "0 11px", borderRadius: "var(--radius-full)",
                background: "var(--negative-bg)", color: "var(--red-600)",
                font: "var(--font-caption-2)", letterSpacing: "var(--tracking-normal)",
              }}>
                {r.label}<b style={{ fontWeight: 700 }}>{r.count}</b>
              </span>
            ))}
          </div>
        )}
      </div>

      <Button variant={recommended ? "primary" : "weak"} size="md" fullWidth onClick={onConfirm}>
        {confirmLabel}
      </Button>
    </div>
  );
}
