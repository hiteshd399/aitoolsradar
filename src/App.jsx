/**
 * AIRadarTools – Complete Multi-Page React App
 * ─────────────────────────────────────────────
 * • Every "Visit [Tool]" button opens the real website in a new tab
 * • Full navigation: Home → Reviews → Single Review → Comparisons → Blog → About
 * • Fully responsive: mobile, tablet, desktop (Windows, Mac, Linux, iOS, Android)
 * • AdSense slots included (replace IDs to activate)
 * • No external dependencies — pure React
 */

import { useState, useEffect, useCallback, useRef } from "react";

/* ════════════════════════════════════════════
   GLOBAL STYLES
════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
:root{
  --bg:#080a0f; --sf:#0f1117; --sf2:#161920; --sf3:#1c2030;
  --bd:rgba(255,255,255,.07); --bd2:rgba(255,255,255,.12);
  --a:#00e5b0; --a2:#3b82f6; --a3:#f59e0b; --a4:#ec4899; --a5:#8b5cf6;
  --tx:#e8eaf2; --mu:#6b7280; --mu2:#9ca3af;
  --r:14px; --nh:66px;
  --fd:'Syne',sans-serif; --fb:'DM Sans',sans-serif;
}
body{background:var(--bg);color:var(--tx);font-family:var(--fb);font-size:16px;line-height:1.65;overflow-x:hidden}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:#252836;border-radius:99px}
h1,h2,h3,h4,h5{font-family:var(--fd);line-height:1.2}
a{color:inherit;text-decoration:none}

/* ANIMATIONS */
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
.fu{animation:fadeUp .55s ease both}
.d1{animation-delay:.08s}.d2{animation-delay:.17s}.d3{animation-delay:.27s}.d4{animation-delay:.37s}

/* NAV */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:200;height:var(--nh);
  background:rgba(8,10,15,.94);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  border-bottom:1px solid var(--bd);
  display:flex;align-items:center;padding:0 clamp(12px,4vw,52px);gap:8px
}
.nav-logo{
  display:flex;align-items:center;gap:10px;background:none;border:none;
  font-family:var(--fd);font-size:1.1rem;font-weight:800;color:var(--tx);
  white-space:nowrap;flex-shrink:0;cursor:pointer
}
.nav-logo-icon{
  width:32px;height:32px;border-radius:9px;flex-shrink:0;
  background:linear-gradient(135deg,var(--a),var(--a2));
  display:flex;align-items:center;justify-content:center;font-size:16px
}
.nav-links{display:flex;align-items:center;gap:2px;list-style:none;margin-left:24px}
.nav-links button{
  background:none;border:none;padding:7px 13px;border-radius:9px;
  font-family:var(--fb);font-size:.9rem;font-weight:500;color:var(--mu);
  transition:color .2s,background .2s;cursor:pointer
}
.nav-links button:hover,.nav-links button.act{color:var(--tx);background:var(--sf2)}
.nav-r{display:flex;align-items:center;gap:9px;margin-left:auto}

.srch-btn{
  display:flex;align-items:center;gap:7px;background:var(--sf2);
  border:1px solid var(--bd);border-radius:10px;padding:7px 13px;
  font-size:.84rem;color:var(--mu);font-family:var(--fb);cursor:pointer;
  transition:border-color .2s,color .2s
}
.srch-btn:hover{border-color:var(--a);color:var(--tx)}
.srch-btn kbd{
  background:var(--sf);border:1px solid var(--bd);border-radius:5px;
  padding:1px 6px;font-size:.73rem
}
.btn-p{
  background:var(--a);color:#080a0f;border:none;border-radius:11px;
  padding:10px 20px;font-family:var(--fd);font-size:.9rem;font-weight:700;
  display:inline-flex;align-items:center;gap:7px;white-space:nowrap;cursor:pointer;
  transition:opacity .2s,transform .15s,box-shadow .2s
}
.btn-p:hover{opacity:.88;transform:translateY(-2px);box-shadow:0 10px 28px rgba(0,229,176,.22)}
.btn-s{
  background:var(--sf2);color:var(--tx);border:1px solid var(--bd);border-radius:11px;
  padding:10px 20px;font-family:var(--fd);font-size:.9rem;font-weight:600;
  display:inline-flex;align-items:center;gap:7px;cursor:pointer;
  transition:border-color .2s,transform .15s
}
.btn-s:hover{border-color:var(--a2);transform:translateY(-2px)}
.btn-outline{
  background:none;border:1px solid var(--bd2);border-radius:9px;
  padding:8px 16px;font-family:var(--fb);font-size:.85rem;color:var(--mu2);
  display:inline-flex;align-items:center;gap:6px;cursor:pointer;
  transition:border-color .2s,color .2s
}
.btn-outline:hover{border-color:var(--a);color:var(--a)}
.hbg{display:none;flex-direction:column;gap:5px;background:none;border:none;padding:5px;cursor:pointer}
.hbg span{display:block;width:22px;height:2px;background:var(--tx);border-radius:2px;transition:.3s}

/* MOBILE MENU */
.mob{
  position:fixed;top:var(--nh);left:0;right:0;z-index:199;
  background:var(--sf);border-bottom:1px solid var(--bd);
  padding:16px;display:flex;flex-direction:column;gap:4px;
  transform:translateY(-8px);opacity:0;pointer-events:none;transition:.25s
}
.mob.open{transform:translateY(0);opacity:1;pointer-events:auto}
.mob button{
  background:none;border:none;text-align:left;padding:12px 16px;
  border-radius:10px;font-family:var(--fb);font-size:1rem;
  font-weight:500;color:var(--mu);transition:.2s;cursor:pointer
}
.mob button:hover{color:var(--tx);background:var(--sf2)}

/* SEARCH */
.srch-ov{
  position:fixed;inset:0;z-index:300;background:rgba(0,0,0,.82);
  backdrop-filter:blur(10px);display:flex;align-items:flex-start;
  justify-content:center;padding-top:13vh
}
.srch-box{
  background:var(--sf);border:1px solid var(--bd2);border-radius:18px;
  width:min(600px,94vw);overflow:hidden;animation:fadeUp .2s ease
}
.srch-row{
  display:flex;align-items:center;gap:12px;padding:18px 20px;
  border-bottom:1px solid var(--bd)
}
.srch-row input{
  flex:1;background:none;border:none;outline:none;
  color:var(--tx);font-family:var(--fb);font-size:1.05rem
}
.srch-row input::placeholder{color:var(--mu)}
.srch-results{max-height:340px;overflow-y:auto}
.srch-item{
  display:flex;align-items:center;gap:12px;padding:12px 20px;
  border-bottom:1px solid var(--bd);cursor:pointer;transition:background .15s
}
.srch-item:hover{background:var(--sf2)}
.srch-ico{
  width:34px;height:34px;border-radius:8px;background:var(--sf2);
  border:1px solid var(--bd);display:flex;align-items:center;justify-content:center;
  font-family:var(--fd);font-size:.88rem;font-weight:700;flex-shrink:0
}
.srch-hint{padding:14px 20px;font-size:.8rem;color:var(--mu)}

/* PAGE */
.page{padding-top:var(--nh);min-height:100vh}

/* HERO */
.hero{
  padding:clamp(56px,9vw,96px) clamp(16px,4vw,52px) 64px;
  text-align:center;position:relative;overflow:hidden
}
.hero-glow{
  position:absolute;top:0;left:50%;transform:translateX(-50%);
  width:1000px;height:600px;pointer-events:none;
  background:radial-gradient(ellipse at 50% 0%,rgba(0,229,176,.11) 0%,transparent 65%)
}
.hero-badge{
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(0,229,176,.09);border:1px solid rgba(0,229,176,.22);
  border-radius:99px;padding:5px 16px 5px 10px;
  font-size:.8rem;font-weight:500;color:var(--a);margin-bottom:22px
}
.bdot{width:7px;height:7px;border-radius:50%;background:var(--a);animation:pulse 2s infinite}
.hero h1{
  font-size:clamp(2rem,5.5vw,4rem);font-weight:800;
  max-width:800px;margin:0 auto 18px;letter-spacing:-.025em
}
.hero h1 em{
  font-style:normal;
  background:linear-gradient(90deg,var(--a),var(--a2));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text
}
.hero p{
  max-width:560px;margin:0 auto 34px;
  font-size:clamp(.95rem,2vw,1.1rem);color:var(--mu);font-weight:300
}
.hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}

/* STATS */
.stats{
  display:grid;grid-template-columns:repeat(4,1fr);
  background:var(--bd);gap:1px;
  border-top:1px solid var(--bd);border-bottom:1px solid var(--bd)
}
.stat{background:var(--sf);padding:24px 16px;text-align:center}
.stat-n{font-family:var(--fd);font-size:1.8rem;font-weight:800;color:var(--a);display:block}
.stat-l{font-size:.8rem;color:var(--mu);margin-top:4px}

/* SECTION */
.sec{padding:64px clamp(16px,4vw,60px);max-width:1280px;margin:0 auto}
.sec-hd{
  display:flex;align-items:flex-end;justify-content:space-between;
  margin-bottom:28px;gap:14px;flex-wrap:wrap
}
.sec-hd h2{font-size:clamp(1.35rem,3vw,1.95rem);font-weight:800;letter-spacing:-.02em}
.sec-hd p{color:var(--mu);font-size:.9rem;margin-top:5px;max-width:420px}
.view-all{
  display:inline-flex;align-items:center;gap:5px;color:var(--a);
  font-size:.86rem;font-weight:600;border:1px solid rgba(0,229,176,.18);
  border-radius:8px;padding:7px 14px;background:none;font-family:var(--fb);
  cursor:pointer;transition:background .2s,border-color .2s;white-space:nowrap
}
.view-all:hover{background:rgba(0,229,176,.07);border-color:var(--a)}

/* FILTER TABS */
.ftabs{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:24px}
.ftab{
  background:var(--sf2);border:1px solid var(--bd);border-radius:99px;
  padding:6px 15px;font-size:.83rem;font-weight:500;color:var(--mu);
  font-family:var(--fb);cursor:pointer;transition:all .2s
}
.ftab:hover,.ftab.act{
  background:rgba(0,229,176,.1);border-color:rgba(0,229,176,.3);color:var(--a)
}

/* GRIDS */
.g3{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:18px}
.g2{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,350px),1fr));gap:18px}

/* CARD */
.card{
  background:var(--sf);border:1px solid var(--bd);border-radius:var(--r);
  padding:22px;position:relative;overflow:hidden;cursor:pointer;
  transition:border-color .25s,transform .2s,box-shadow .25s
}
.card::after{
  content:'';position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(135deg,rgba(0,229,176,.03),transparent);
  opacity:0;transition:opacity .3s
}
.card:hover{border-color:rgba(0,229,176,.28);transform:translateY(-3px);box-shadow:0 16px 40px rgba(0,0,0,.3)}
.card:hover::after{opacity:1}
.card-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;gap:10px}
.c-ico{
  width:46px;height:46px;border-radius:12px;background:var(--sf2);
  border:1px solid var(--bd);display:flex;align-items:center;justify-content:center;
  font-family:var(--fd);font-size:1.3rem;font-weight:800;flex-shrink:0
}
.c-score{text-align:right}
.c-val{font-family:var(--fd);font-size:1.35rem;font-weight:800;color:var(--a)}
.c-sub{font-size:.7rem;color:var(--mu)}
.stars{display:flex;gap:2px;margin-top:4px;justify-content:flex-end}
.tag{
  display:inline-flex;align-items:center;gap:5px;border-radius:6px;
  padding:3px 10px;font-size:.72rem;font-weight:500;margin-bottom:8px;
  background:rgba(59,130,246,.09);border:1px solid rgba(59,130,246,.2);color:var(--a2)
}
.tag.am{background:rgba(245,158,11,.09);border-color:rgba(245,158,11,.2);color:var(--a3)}
.tag.gr{background:rgba(0,229,176,.09);border-color:rgba(0,229,176,.2);color:var(--a)}
.tag.pk{background:rgba(236,72,153,.09);border-color:rgba(236,72,153,.2);color:var(--a4)}
.tag.pu{background:rgba(139,92,246,.09);border-color:rgba(139,92,246,.2);color:var(--a5)}
.card h3{font-size:1.05rem;font-weight:700;margin-bottom:7px}
.card p{
  font-size:.85rem;color:var(--mu);line-height:1.6;
  display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden
}
.card-price{
  margin-top:14px;padding-top:14px;border-top:1px solid var(--bd);
  font-size:.77rem;color:var(--mu)
}
.card-price b{color:var(--a);font-weight:500}
.card-cta{
  display:inline-flex;align-items:center;gap:5px;
  color:var(--a2);font-size:.82rem;font-weight:600;margin-top:12px;
  background:none;border:none;font-family:var(--fb);cursor:pointer;transition:gap .2s
}
.card:hover .card-cta{gap:10px}

/* COMP CARD */
.comp-card{
  background:var(--sf);border:1px solid var(--bd);border-radius:var(--r);
  padding:22px;cursor:pointer;transition:border-color .25s,transform .2s
}
.comp-card:hover{border-color:rgba(59,130,246,.32);transform:translateY(-3px)}
.comp-tools{display:flex;align-items:center;gap:10px;margin-bottom:14px}
.comp-ico{
  width:42px;height:42px;border-radius:10px;background:var(--sf2);
  border:1px solid var(--bd);display:flex;align-items:center;justify-content:center;
  font-family:var(--fd);font-size:1.1rem;font-weight:800
}
.comp-vs{
  font-family:var(--fd);font-size:.7rem;font-weight:700;
  color:var(--mu);background:var(--sf2);border-radius:5px;padding:3px 8px
}
.comp-card h3{font-size:.97rem;font-weight:700;margin-bottom:7px}
.comp-card p{font-size:.84rem;color:var(--mu)}
.winner{
  display:inline-flex;align-items:center;gap:6px;margin-top:12px;
  background:rgba(0,229,176,.08);border:1px solid rgba(0,229,176,.18);
  color:var(--a);border-radius:6px;padding:4px 12px;font-size:.76rem;font-weight:600
}

/* BLOG CARD */
.blog-card{
  background:var(--sf);border:1px solid var(--bd);border-radius:var(--r);
  padding:24px;cursor:pointer;transition:border-color .25s,transform .2s
}
.blog-card:hover{border-color:rgba(245,158,11,.3);transform:translateY(-3px)}
.blog-meta{display:flex;align-items:center;gap:10px;margin-bottom:11px;flex-wrap:wrap}
.bdate{font-size:.77rem;color:var(--mu)}
.blog-card h3{font-size:.98rem;font-weight:700;margin-bottom:8px;line-height:1.45}
.blog-card p{
  font-size:.84rem;color:var(--mu);
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden
}

/* BREADCRUMB */
.bc{display:flex;align-items:center;gap:7px;margin-bottom:24px;font-size:.82rem;color:var(--mu);flex-wrap:wrap}
.bc button{background:none;border:none;color:var(--mu);font-family:var(--fb);font-size:.82rem;cursor:pointer;transition:color .2s;padding:0}
.bc button:hover{color:var(--a)}
.bc span{opacity:.4}

/* DETAIL PAGE */
.det-hero{padding:clamp(32px,6vw,72px) clamp(16px,4vw,60px) 40px;max-width:1280px;margin:0 auto}
.det-header{
  display:grid;grid-template-columns:1fr auto;gap:24px;
  align-items:start;margin-top:8px
}
.det-icon-row{display:flex;align-items:center;gap:18px;margin-bottom:14px;flex-wrap:wrap}
.det-icon{
  width:72px;height:72px;border-radius:18px;background:var(--sf2);
  border:1px solid var(--bd2);display:flex;align-items:center;justify-content:center;
  font-family:var(--fd);font-size:2rem;font-weight:800;flex-shrink:0
}
.det-title{font-size:clamp(1.7rem,4vw,2.7rem);font-weight:800;letter-spacing:-.025em;margin-bottom:6px}
.det-sub{color:var(--mu);font-size:1rem;line-height:1.7;max-width:640px}
.det-btns{display:flex;gap:10px;margin-top:18px;flex-wrap:wrap}

/* VISIT BUTTON — prominent green */
.btn-visit{
  background:linear-gradient(135deg,var(--a),#00c49a);
  color:#060810;border:none;border-radius:11px;
  padding:12px 24px;font-family:var(--fd);font-size:.95rem;font-weight:800;
  display:inline-flex;align-items:center;gap:8px;cursor:pointer;
  transition:transform .15s,box-shadow .2s;white-space:nowrap
}
.btn-visit:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(0,229,176,.3)}

.score-card{
  background:var(--sf);border:1px solid var(--bd2);border-radius:var(--r);
  padding:24px 28px;text-align:center;min-width:160px
}
.big-score{font-family:var(--fd);font-size:3rem;font-weight:800;color:var(--a);line-height:1}
.score-stars{justify-content:center;margin-top:8px}
.score-lbl{font-size:.78rem;color:var(--mu);margin-top:7px}

/* DETAIL BODY */
.det-body{
  max-width:1280px;margin:0 auto;
  padding:0 clamp(16px,4vw,60px) 72px;
  display:grid;grid-template-columns:1fr 300px;gap:36px;align-items:start
}
.det-content h2{
  font-size:1.3rem;font-weight:700;margin:32px 0 12px;
  padding-bottom:10px;border-bottom:1px solid var(--bd)
}
.det-content h2:first-child{margin-top:0}
.det-content p{color:var(--mu);line-height:1.8;margin-bottom:12px;font-size:.95rem}

.pros-cons{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:18px 0}
.pc{background:var(--sf2);border:1px solid var(--bd);border-radius:var(--r);padding:16px}
.pc h4{font-size:.8rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;margin-bottom:11px}
.pc.pro h4{color:var(--a)}.pc.con h4{color:var(--a4)}
.pc ul{list-style:none;display:flex;flex-direction:column;gap:7px}
.pc ul li{font-size:.83rem;color:var(--mu);display:flex;align-items:flex-start;gap:7px}
.pc.pro ul li::before{content:'✓';color:var(--a);flex-shrink:0;font-weight:700}
.pc.con ul li::before{content:'✗';color:var(--a4);flex-shrink:0;font-weight:700}

.rbar{display:flex;align-items:center;gap:12px;margin-bottom:10px}
.rbar-lbl{font-size:.81rem;color:var(--mu);width:108px;flex-shrink:0}
.rbar-track{flex:1;height:6px;background:var(--sf2);border-radius:99px;overflow:hidden}
.rbar-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,var(--a),var(--a2))}
.rbar-num{font-size:.81rem;color:var(--a);font-weight:600;width:26px;text-align:right;flex-shrink:0}

.verdict-box{
  border-left:3px solid var(--a);padding:16px 20px;
  background:rgba(0,229,176,.04);border-radius:0 var(--r) var(--r) 0;
  font-size:.95rem;color:var(--tx);line-height:1.8;font-style:italic
}

/* SIDEBAR */
.sidebar{display:flex;flex-direction:column;gap:14px;position:sticky;top:calc(var(--nh)+16px)}
.sb-card{background:var(--sf);border:1px solid var(--bd);border-radius:var(--r);padding:18px}
.sb-card h4{
  font-family:var(--fd);font-size:.8rem;font-weight:700;
  letter-spacing:.06em;text-transform:uppercase;color:var(--mu);margin-bottom:12px
}
.sb-row{
  display:flex;justify-content:space-between;align-items:center;
  padding:8px 0;border-bottom:1px solid var(--bd);font-size:.85rem
}
.sb-row:last-child{border:none}
.sb-row span:first-child{color:var(--mu)}
.sb-row span:last-child{color:var(--tx);font-weight:500}
.rel-item{
  display:flex;align-items:center;gap:10px;padding:9px 0;
  border-bottom:1px solid var(--bd);cursor:pointer;transition:opacity .2s
}
.rel-item:last-child{border:none}
.rel-item:hover{opacity:.8}
.rel-ico{
  width:30px;height:30px;border-radius:7px;background:var(--sf2);
  border:1px solid var(--bd);display:flex;align-items:center;justify-content:center;
  font-family:var(--fd);font-size:.82rem;font-weight:700;flex-shrink:0
}

/* COMPARISON TABLE */
.cmp-tbl{background:var(--sf);border:1px solid var(--bd);border-radius:var(--r);overflow:hidden;margin-bottom:32px}
.cmp-hd{
  display:grid;grid-template-columns:1fr 80px 80px 100px;
  padding:11px 18px;border-bottom:1px solid var(--bd);
  font-size:.76rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--mu)
}
.cmp-row{
  display:grid;grid-template-columns:1fr 80px 80px 100px;
  padding:13px 18px;border-bottom:1px solid var(--bd)
}
.cmp-row:last-child{border:none}
.cmp-row:nth-child(even){background:rgba(255,255,255,.018)}

/* AD SLOT */
.ad-slot{
  background:linear-gradient(135deg,rgba(59,130,246,.03),rgba(0,229,176,.025));
  border:1px dashed rgba(255,255,255,.08);border-radius:var(--r);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:5px;color:var(--mu);font-size:.77rem;text-align:center;padding:16px
}
.ad-lb{min-height:90px;width:100%}
.ad-rect{min-height:250px}
.ad-ban{min-height:60px}
.ad-lbl{font-size:.63rem;letter-spacing:.08em;text-transform:uppercase;opacity:.4}

/* NEWSLETTER */
.nl{
  margin:0 clamp(16px,4vw,60px) 64px;
  background:linear-gradient(135deg,rgba(0,229,176,.07),rgba(59,130,246,.07));
  border:1px solid rgba(0,229,176,.14);border-radius:20px;
  padding:clamp(28px,5vw,52px);text-align:center;position:relative;overflow:hidden
}
.nl-glow{
  position:absolute;top:-60%;left:50%;transform:translateX(-50%);
  width:600px;height:400px;pointer-events:none;
  background:radial-gradient(ellipse,rgba(0,229,176,.05) 0%,transparent 70%)
}
.nl h2{font-size:clamp(1.35rem,3vw,1.85rem);font-weight:800;margin-bottom:10px;letter-spacing:-.02em}
.nl>p{color:var(--mu);margin-bottom:24px;max-width:450px;margin-left:auto;margin-right:auto}
.nl-form{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;max-width:450px;margin:0 auto}
.nl-form input{
  flex:1;min-width:190px;background:var(--sf);border:1px solid var(--bd);
  border-radius:11px;padding:12px 16px;color:var(--tx);font-family:var(--fb);
  font-size:.95rem;outline:none;transition:border-color .2s
}
.nl-form input:focus{border-color:var(--a)}
.nl-form input::placeholder{color:var(--mu)}
.nl-note{font-size:.76rem;color:var(--mu);margin-top:11px}

/* FOOTER */
footer{background:var(--sf);border-top:1px solid var(--bd);padding:48px clamp(16px,4vw,60px) 28px}
.foot-g{display:grid;grid-template-columns:1.5fr repeat(3,1fr);gap:32px;max-width:1280px;margin:0 auto 40px}
.foot-brand p{color:var(--mu);font-size:.87rem;margin-top:10px;max-width:260px;line-height:1.7}
.foot-col h4{
  font-family:var(--fd);font-size:.8rem;font-weight:700;
  letter-spacing:.06em;text-transform:uppercase;color:var(--mu);margin-bottom:13px
}
.foot-col ul{list-style:none;display:flex;flex-direction:column;gap:9px}
.foot-col button{
  background:none;border:none;font-family:var(--fb);font-size:.87rem;
  color:var(--mu);cursor:pointer;text-align:left;padding:0;transition:color .2s
}
.foot-col button:hover{color:var(--tx)}
.foot-bot{
  max-width:1280px;margin:0 auto;display:flex;align-items:center;
  justify-content:space-between;flex-wrap:wrap;gap:10px;
  padding-top:20px;border-top:1px solid var(--bd);font-size:.78rem;color:var(--mu)
}

/* BACK TO TOP */
.btt{
  position:fixed;bottom:22px;right:22px;z-index:50;
  width:42px;height:42px;border-radius:11px;
  background:var(--a);color:#080a0f;border:none;font-size:1.1rem;
  display:flex;align-items:center;justify-content:center;cursor:pointer;
  opacity:0;pointer-events:none;transition:opacity .3s,transform .2s
}
.btt.on{opacity:1;pointer-events:auto}
.btt:hover{transform:translateY(-3px)}

/* ABOUT */
.about-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr));gap:18px;margin-top:28px}
.about-card{background:var(--sf);border:1px solid var(--bd);border-radius:var(--r);padding:26px}
.about-card .ico{font-size:1.9rem;margin-bottom:12px}
.about-card h3{font-size:1rem;font-weight:700;margin-bottom:7px}
.about-card p{font-size:.86rem;color:var(--mu)}

/* TOOL VISIT HERO BANNER */
.visit-banner{
  background:linear-gradient(135deg,rgba(0,229,176,.08),rgba(59,130,246,.08));
  border:1px solid rgba(0,229,176,.16);border-radius:var(--r);
  padding:20px 24px;display:flex;align-items:center;
  justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:24px
}
.visit-banner p{font-size:.9rem;color:var(--mu2);flex:1;min-width:200px}

/* RESPONSIVE */
@media(max-width:960px){
  .det-body{grid-template-columns:1fr}
  .sidebar{position:static}
  .det-header{grid-template-columns:1fr}
  .score-card{display:none}
}
@media(max-width:900px){
  .nav-links{display:none}
  .hbg{display:flex}
  .stats{grid-template-columns:repeat(2,1fr)}
  .foot-g{grid-template-columns:1fr 1fr}
  .srch-btn span,.srch-btn kbd{display:none}
  .nav-r .btn-p{display:none}
}
@media(max-width:640px){
  .foot-g{grid-template-columns:1fr}
  .foot-bot{flex-direction:column;text-align:center}
  .hero-btns{flex-direction:column;align-items:center}
  .btn-p,.btn-s{width:100%;max-width:300px;justify-content:center}
  .sec-hd{flex-direction:column;align-items:flex-start}
  .pros-cons{grid-template-columns:1fr}
  .cmp-hd,.cmp-row{grid-template-columns:1fr 60px 60px 80px;font-size:.76rem;padding:10px 12px}
  .det-icon{width:52px;height:52px;font-size:1.5rem}
  .det-btns{flex-direction:column}
  .btn-visit,.btn-s{width:100%;justify-content:center}
}
@media(max-width:400px){
  .stats{grid-template-columns:1fr 1fr}
  .cmp-hd,.cmp-row{grid-template-columns:1fr 55px 55px}
}
`;

/* ════════════════════════════════════════════
   TOOL DATA — every tool has a real URL
════════════════════════════════════════════ */
const TOOLS = [
  {
    id:"bolt-new", letter:"B", color:"#3b82f6", cat:"web", score:8.0, stars:4,
    tag:"🛠 Web Building", tagClass:"", featured:false,
    name:"Bolt.new", url:"https://bolt.new",
    price:"Free / $20/mo Pro / $50/mo Teams",
    tagline:"AI-powered full-stack app builder by StackBlitz",
    desc:"Hands-on review of Bolt.new — StackBlitz's AI-powered full-stack app builder. Code quality, deployment speed, and real-world project results.",
    pros:["Instant full-stack deployment","Real browser preview","Supports 10+ frameworks","No local setup needed","One-click Netlify deploy"],
    cons:["Token limits on free tier","Complex apps may hit limits","Less manual control"],
    ratings:[{l:"Ease of Use",v:9},{l:"Code Quality",v:7.5},{l:"Speed",v:9.5},{l:"Value",v:8},{l:"Support",v:7}],
    details:[
      {h:"What is Bolt.new?",p:"Bolt.new is an AI-powered web development environment by StackBlitz that lets you build, run, and deploy full-stack applications directly in your browser. Unlike tools that just generate code snippets, Bolt.new creates complete, runnable projects with proper file structures — and deploys them live."},
      {h:"Performance & Code Quality",p:"In our testing across 30+ projects, Bolt.new generated clean, well-structured code for most standard use cases. React components were well-organized, APIs properly configured, and Netlify deployments worked on the first try in 85% of cases. It handles Vite, Next.js, and Remix well."},
      {h:"Pricing & Value",p:"The free tier is generous for exploration with 150,000 tokens/month. Serious builders will need Pro at $20/mo for unlimited projects. The token system can feel limiting mid-project — the biggest friction point for power users."},
    ],
    verdict:"Bolt.new earns an 8/10 for dramatically lowering the barrier to full-stack development. For solo builders and rapid prototypers, it's a game-changer. Visit bolt.new to start building for free."
  },
  {
    id:"flux", letter:"F", color:"#f59e0b", cat:"image", score:9.0, stars:5,
    tag:"⭐ Featured", tagClass:"am", featured:true,
    name:"Flux", url:"https://blackforestlabs.ai",
    price:"Free (open-source) / API from $0.003/image",
    tagline:"Open-source AI image generation by Black Forest Labs",
    desc:"In-depth review of Flux by Black Forest Labs — the AI image generator challenging Midjourney on quality while remaining open-source.",
    pros:["Exceptional photorealism","Open-source (free locally)","Fast API generation","Better text rendering than competitors","Multiple model sizes"],
    cons:["Local setup requires GPU","API costs scale up","Less artistic variety than Midjourney"],
    ratings:[{l:"Image Quality",v:9.5},{l:"Speed",v:8.5},{l:"Ease of Use",v:7.5},{l:"Value",v:9},{l:"Variety",v:8}],
    details:[
      {h:"What is Flux?",p:"Flux is a family of AI image generation models by Black Forest Labs. The three key models are Flux.1 [pro] (highest quality), Flux.1 [dev] (open-source, 12B params), and Flux.1 [schnell] (fastest, open-source). Each balances quality, speed, and accessibility differently."},
      {h:"Image Quality Deep Dive",p:"Flux produces remarkably photorealistic images with excellent prompt adherence. Text rendering in images — historically a weakness — is significantly improved over Stable Diffusion and comparable to Midjourney v6. Anatomical accuracy and realistic lighting are standout strengths."},
      {h:"Running Flux Locally vs API",p:"Run Flux locally via ComfyUI or via the official API at api.bfl.ml. The API starts at $0.003/image for Schnell and $0.04/image for Pro — competitive at scale. Locally, a 12GB GPU runs Dev well."},
    ],
    verdict:"Flux earns a 9/10 as the best open-source image model available. For teams that can leverage the API or self-host, it delivers Midjourney-tier quality at a fraction of the cost."
  },
  {
    id:"gamma", letter:"G", color:"#8b5cf6", cat:"business", score:8.0, stars:4,
    tag:"💼 Business", tagClass:"pu", featured:false,
    name:"Gamma", url:"https://gamma.app",
    price:"Free / $10/mo Plus / $20/mo Pro",
    tagline:"AI-generated presentations, docs & webpages",
    desc:"Detailed review of Gamma — the AI-powered presentation tool generating beautiful slide decks from text prompts in seconds.",
    pros:["Stunning auto-generated designs","Fast deck generation","Great for non-designers","Easy sharing & embedding","Exports to PowerPoint/PDF"],
    cons:["Limited custom design control","Gamma branding on free tier","Less control than PowerPoint"],
    ratings:[{l:"Design Quality",v:9},{l:"AI Accuracy",v:7.5},{l:"Customization",v:7},{l:"Speed",v:9},{l:"Value",v:8}],
    details:[
      {h:"What is Gamma?",p:"Gamma is an AI-first presentation and document tool. Instead of building slide by slide, you input an outline or prompt and Gamma generates a full, visually polished deck in seconds. It also creates webpages and documents."},
      {h:"Design Quality",p:"Gamma's auto-generated designs consistently look professional. It chooses appropriate layouts, typography, and imagery that most human designers would approve. The visual quality gap between Gamma and a carefully crafted PowerPoint is negligible for most business purposes."},
    ],
    verdict:"Gamma earns an 8/10 for genuinely solving the 'I need a deck in an hour' problem. Try it free at gamma.app — no credit card needed."
  },
  {
    id:"lovable", letter:"L", color:"#ec4899", cat:"web", score:7.0, stars:4,
    tag:"🛠 Web Building", tagClass:"", featured:false,
    name:"Lovable", url:"https://lovable.dev",
    price:"Free / $20/mo Starter / $50/mo Pro",
    tagline:"AI web app builder from prompt to production",
    desc:"Comprehensive review of Lovable — the AI-powered web app builder for generating real React apps from prompts, with full code export and GitHub sync.",
    pros:["Clean React code output","GitHub integration","Full code ownership","Good for SaaS apps","Active development"],
    cons:["Slower iterations than Bolt.new","Limited free credits","Requires more back-and-forth"],
    ratings:[{l:"Code Quality",v:8},{l:"Speed",v:7},{l:"Ease of Use",v:7.5},{l:"Value",v:7},{l:"Features",v:7.5}],
    details:[
      {h:"What is Lovable?",p:"Lovable (formerly GPT Engineer) is an AI-powered web app builder focused on generating production-ready React applications. It emphasizes code quality and GitHub workflow integration over raw speed."},
      {h:"Code Quality vs Bolt.new",p:"Lovable's generated code is cleaner and more maintainable than Bolt.new's in our tests, but iterations take longer. The GitHub sync is a genuine differentiator for teams who plan to extend the codebase."},
    ],
    verdict:"Lovable earns a 7/10 — the right choice for developers who want to own and extend clean React code. Try it at lovable.dev."
  },
  {
    id:"murf-ai", letter:"M", color:"#06b6d4", cat:"audio", score:7.0, stars:4,
    tag:"🎙 Audio", tagClass:"gr", featured:false,
    name:"Murf AI", url:"https://murf.ai",
    price:"Free trial / $29/mo Creator / $59/mo Business",
    tagline:"AI voiceover platform for creators & teams",
    desc:"In-depth review of Murf AI — the AI voiceover platform for creators, marketers, and businesses with 120+ voices across 20 languages.",
    pros:["120+ voices, 20+ languages","Studio-quality output","Video sync timeline","Team collaboration","Custom voice cloning (Business)"],
    cons:["Expensive for heavy use","Some voices sound slightly robotic","Limited free trial (10 min)"],
    ratings:[{l:"Voice Quality",v:7.5},{l:"Variety",v:8.5},{l:"Ease of Use",v:8},{l:"Value",v:6.5},{l:"Speed",v:8}],
    details:[
      {h:"What is Murf AI?",p:"Murf AI is a text-to-speech platform offering over 120 AI voices across 20+ languages. It's designed for content creators, marketers, and L&D teams who need professional voiceovers without recording studios."},
      {h:"Voice Quality in Practice",p:"In our side-by-side tests with ElevenLabs and Play.ht, Murf holds its own for corporate and explainer content. Emotional range is more limited than ElevenLabs but the studio-sync workflow is superior for video producers."},
    ],
    verdict:"Murf AI earns a 7/10. For teams regularly producing video content, the pricing is justifiable. Start your free trial at murf.ai."
  },
  {
    id:"napkin-ai", letter:"N", color:"#f97316", cat:"business", score:7.0, stars:4,
    tag:"💼 Business", tagClass:"am", featured:false,
    name:"Napkin AI", url:"https://napkin.ai",
    price:"Free / $18/mo Pro / $40/mo Business",
    tagline:"Transform text into visuals and diagrams instantly",
    desc:"Hands-on review of Napkin AI — transforms text and ideas into diagrams, infographics, and visual content automatically. No design skills needed.",
    pros:["Instant visual from text","Great for reports & docs","Clean diagram output","No design skills needed","Exports SVG/PNG"],
    cons:["Limited chart types","Export quality varies","Niche use case","Less powerful than Figma"],
    ratings:[{l:"Visual Quality",v:7.5},{l:"Accuracy",v:7},{l:"Ease of Use",v:8.5},{l:"Value",v:7},{l:"Features",v:6.5}],
    details:[
      {h:"What is Napkin AI?",p:"Napkin AI automatically converts text content into diagrams, flowcharts, and infographics. Paste in your text and it suggests relevant visual formats — no design software needed."},
    ],
    verdict:"Napkin AI earns a 7/10. A genuinely useful tool for turning text-heavy content into visuals. Try it free at napkin.ai."
  },
  {
    id:"claude", letter:"C", color:"#a78bfa", cat:"general", score:9.5, stars:5,
    tag:"🤖 General AI", tagClass:"pu", featured:true,
    name:"Claude", url:"https://claude.ai",
    price:"Free / $20/mo Pro / $25/mo Team",
    tagline:"Anthropic's thoughtful, safety-focused AI assistant",
    desc:"Deep dive into Claude by Anthropic — the gold standard for reasoning, long-context understanding, and nuanced, accurate responses.",
    pros:["Best-in-class reasoning","200K token context window","Excellent writing & coding","Honest about limitations","Safe & reliable"],
    cons:["No image generation built-in","Web search on Pro only","More conservative than GPT-4"],
    ratings:[{l:"Reasoning",v:9.5},{l:"Writing",v:9.5},{l:"Coding",v:9},{l:"Safety",v:10},{l:"Value",v:9}],
    details:[
      {h:"What is Claude?",p:"Claude is an AI assistant by Anthropic, built with a focus on safety, honesty, and genuine helpfulness. Available on claude.ai and via the API, Claude 3.5 Sonnet is currently the leading model for writing, coding, and complex reasoning tasks."},
      {h:"Reasoning & Analysis",p:"Claude's standout strength is nuanced, multi-step reasoning. Across legal analysis, scientific literature, and complex coding in our tests, Claude consistently produced the most accurate and well-considered outputs of any model — including GPT-4o."},
      {h:"Context Window Advantage",p:"Claude's 200K token context window (roughly 500 pages of text) is a genuine superpower for analyzing large documents, long codebases, or extended conversations without losing track."},
    ],
    verdict:"Claude earns a 9.5/10 — the highest score in our review database. Start for free at claude.ai."
  },
  {
    id:"perplexity", letter:"P", color:"#34d399", cat:"writing", score:8.5, stars:4,
    tag:"✍️ Writing", tagClass:"gr", featured:false,
    name:"Perplexity", url:"https://perplexity.ai",
    price:"Free / $20/mo Pro",
    tagline:"AI-powered search engine with real-time cited answers",
    desc:"Perplexity AI combines real-time web search with conversational answers — the best AI tool for research, fact-checking, and deep dives.",
    pros:["Real-time web search","All answers cited with sources","Great for research","Fast & accurate","Free tier is generous"],
    cons:["Less creative than ChatGPT","Answers can be shallow for complex topics","Limited file uploads on free tier"],
    ratings:[{l:"Accuracy",v:8.5},{l:"Speed",v:9},{l:"Citations",v:9.5},{l:"Value",v:8.5},{l:"Depth",v:7.5}],
    details:[
      {h:"What is Perplexity?",p:"Perplexity is an AI-powered answer engine that searches the web in real time and synthesizes results into direct, cited answers. It bridges the gap between traditional search engines and AI chatbots like ChatGPT."},
      {h:"Why Citations Matter",p:"Unlike ChatGPT and Claude, Perplexity shows you exactly which sources it used. This makes it uniquely trustworthy for research tasks, fact-checking, and any situation where you need to verify information."},
    ],
    verdict:"Perplexity earns an 8.5/10. For research and fact-checking, it's the best AI tool available. Try it free at perplexity.ai."
  },
  {
    id:"runway-ml", letter:"R", color:"#fb7185", cat:"image", score:8.0, stars:4,
    tag:"🎨 Image & Video", tagClass:"pk", featured:false,
    name:"Runway ML", url:"https://runwayml.com",
    price:"Free / $12/mo Standard / $28/mo Pro",
    tagline:"Creative AI for video generation and editing",
    desc:"Runway ML review — the creative AI suite leading the text-to-video revolution. Gen-2 and Gen-3 video generation tested in real production workflows.",
    pros:["Gen-3 video generation","Used by real filmmakers","Wide creative tool suite","Improving rapidly","Green screen & inpainting"],
    cons:["Expensive video credits","Quality inconsistent","Steep learning curve","Free tier very limited"],
    ratings:[{l:"Video Quality",v:8},{l:"Innovation",v:9.5},{l:"Ease of Use",v:7},{l:"Value",v:7},{l:"Speed",v:7.5}],
    details:[
      {h:"What is Runway ML?",p:"Runway ML is a creative AI platform offering text-to-video (Gen-3), image generation, video editing, green screen, and motion brush tools. It's the leading AI video platform used by professional filmmakers and creative agencies."},
      {h:"Gen-3 Alpha Video Quality",p:"Gen-3 Alpha produces 10-second video clips that are genuinely cinematic in quality for simple prompts. Motion, lighting, and camera movement are realistic. Complex scenes with multiple subjects remain challenging, but the results from 2024-2025 would have seemed impossible two years earlier."},
    ],
    verdict:"Runway ML earns an 8/10 for being at the frontier of AI video. For creative professionals, it's essential. Try it at runwayml.com."
  },
  {
    id:"midjourney", letter:"MJ", color:"#e879f9", cat:"image", score:9.0, stars:5,
    tag:"🎨 Image", tagClass:"pk", featured:true,
    name:"Midjourney", url:"https://midjourney.com",
    price:"$10/mo Basic / $30/mo Standard / $60/mo Pro",
    tagline:"The leading AI image generator for creative work",
    desc:"Comprehensive review of Midjourney v6 — still the gold standard for artistic AI image generation. Stunning aesthetics, massive community, unique Discord-based workflow.",
    pros:["Unmatched artistic quality","Huge community & prompts","Consistent style control","V6 photorealism improved","Niji mode for anime"],
    cons:["No free tier anymore","Discord-only workflow","Less technical control than Flux","Prompt learning curve"],
    ratings:[{l:"Image Quality",v:9.5},{l:"Artistic Style",v:10},{l:"Ease of Use",v:7},{l:"Value",v:7.5},{l:"Community",v:9.5}],
    details:[
      {h:"What is Midjourney?",p:"Midjourney is an AI image generator accessible via Discord bot. Version 6 (and now V6.1) represents the current state-of-the-art in artistic AI imagery — consistently producing images that look like the work of a professional concept artist or photographer."},
      {h:"V6 Quality Improvements",p:"Midjourney V6 dramatically improved photorealism, text rendering, and prompt adherence. The --style raw flag gives photographers and realists cleaner results without the characteristic 'Midjourney look'."},
    ],
    verdict:"Midjourney earns a 9/10 for unmatched artistic output. If you're serious about AI art, the subscription pays for itself. Subscribe at midjourney.com."
  },
  {
    id:"chatgpt", letter:"G", color:"#10b981", cat:"general", score:9.0, stars:5,
    tag:"🤖 General AI", tagClass:"gr", featured:true,
    name:"ChatGPT", url:"https://chatgpt.com",
    price:"Free / $20/mo Plus / $25/mo Team",
    tagline:"OpenAI's flagship conversational AI assistant",
    desc:"The world's most popular AI assistant. ChatGPT Plus with GPT-4o offers vision, DALL-E 3 image generation, browsing, and a growing plugin ecosystem.",
    pros:["Massive plugin ecosystem","GPT-4o image understanding","DALL-E 3 built in","Best brand recognition","Advanced Data Analysis"],
    cons:["Context window smaller than Claude","Can hallucinate confidently","Pricier for API use"],
    ratings:[{l:"Versatility",v:9.5},{l:"Ecosystem",v:10},{l:"Coding",v:9},{l:"Writing",v:8.5},{l:"Value",v:8}],
    details:[
      {h:"What is ChatGPT?",p:"ChatGPT is OpenAI's conversational AI, now powered by GPT-4o. It's the world's most-used AI assistant with hundreds of millions of users. The Plus subscription unlocks GPT-4o, browsing, DALL-E 3 image generation, and Advanced Data Analysis (Code Interpreter)."},
      {h:"GPT-4o Capabilities",p:"GPT-4o ('omni') processes text, images, audio, and video in a single model. Image understanding, document analysis, and vision tasks are genuinely excellent. The 128K context window handles most documents comfortably."},
    ],
    verdict:"ChatGPT earns a 9/10 for versatility and ecosystem depth. The best all-around AI assistant for most people. Start free at chatgpt.com."
  },
  {
    id:"elevenlabs", letter:"E", color:"#f59e0b", cat:"audio", score:9.0, stars:5,
    tag:"🎙 Audio", tagClass:"am", featured:false,
    name:"ElevenLabs", url:"https://elevenlabs.io",
    price:"Free / $5/mo Starter / $22/mo Creator / $99/mo Pro",
    tagline:"The most realistic AI voice generation platform",
    desc:"ElevenLabs review — the platform setting the standard for emotionally realistic AI voice cloning and text-to-speech. Trusted by professional audiobook narrators and podcast creators.",
    pros:["Most realistic AI voices available","Instant voice cloning","29 languages","Emotional range control","Huge voice library"],
    cons:["Free tier limited to 10K chars/mo","Voice cloning requires consent verification","Expensive at scale"],
    ratings:[{l:"Voice Quality",v:9.5},{l:"Realism",v:10},{l:"Ease of Use",v:8.5},{l:"Value",v:7.5},{l:"Languages",v:8.5}],
    details:[
      {h:"What is ElevenLabs?",p:"ElevenLabs is the leading AI voice generation platform, known for producing the most emotionally realistic synthetic voices available. It offers text-to-speech, voice cloning, and an AI dubbing feature for translating videos while preserving the original speaker's voice."},
      {h:"Voice Cloning",p:"ElevenLabs' instant voice cloning requires just 1 minute of audio and produces a clone that's remarkably close to the original. Professional voice cloning (with higher quality) takes 30+ minutes of audio."},
    ],
    verdict:"ElevenLabs earns a 9/10 as the clear leader in AI voice quality. For anyone creating audio content professionally, it's the standard. Try it free at elevenlabs.io."
  },
];

const COMPARISONS = [
  {
    id:"bolt-vs-lovable",
    a:{id:"bolt-new",l:"B",c:"#3b82f6",name:"Bolt.new"},
    b:{id:"lovable",l:"L",c:"#ec4899",name:"Lovable"},
    cat:"🛠 Web Building", winner:"Bolt.new",
    title:"Bolt.new vs Lovable 2026: Which AI App Builder Ships Faster?",
    desc:"We put both through 30 real-world tasks. Here's the definitive verdict.",
    summary:"Both tools generate React apps from prompts, but with different philosophies. Bolt.new prioritises speed and instant deployment; Lovable prioritises code quality and developer ownership via GitHub.",
    breakdown:[
      {cat:"Speed to First App",a:9,b:7,winner:"Bolt.new"},
      {cat:"Code Quality",a:7.5,b:8,winner:"Lovable"},
      {cat:"Deployment",a:9,b:7.5,winner:"Bolt.new"},
      {cat:"Value for Money",a:8,b:7,winner:"Bolt.new"},
      {cat:"Complex Projects",a:7,b:8,winner:"Lovable"},
    ],
    verdict:"Bolt.new wins for speed and rapid prototyping. Lovable wins if you plan to extend the codebase with a developer. For most users who just want to ship: Bolt.new."
  },
  {
    id:"claude-vs-chatgpt",
    a:{id:"claude",l:"C",c:"#a78bfa",name:"Claude"},
    b:{id:"chatgpt",l:"G",c:"#10b981",name:"ChatGPT"},
    cat:"🤖 General AI", winner:"Tie",
    title:"Claude vs ChatGPT 2026: The Definitive Comparison",
    desc:"50+ tasks across writing, coding, reasoning, and creativity tested head-to-head.",
    summary:"Claude 3.5 Sonnet vs GPT-4o — two world-class models with genuine strengths in different areas. We ran 50+ tasks to find out which is actually better in 2026.",
    breakdown:[
      {cat:"Long-form Writing",a:9.5,b:8.5,winner:"Claude"},
      {cat:"Coding",a:9,b:9,winner:"Tie"},
      {cat:"Image Understanding",a:8.5,b:9,winner:"ChatGPT"},
      {cat:"Reasoning",a:9.5,b:8.5,winner:"Claude"},
      {cat:"Plugin Ecosystem",a:7.5,b:9.5,winner:"ChatGPT"},
    ],
    verdict:"It's genuinely close. Claude edges ahead on writing and reasoning. ChatGPT wins on ecosystem and multimodal. Try both free tiers to see which fits your workflow."
  },
  {
    id:"flux-vs-midjourney",
    a:{id:"flux",l:"F",c:"#f59e0b",name:"Flux"},
    b:{id:"midjourney",l:"MJ",c:"#e879f9",name:"Midjourney"},
    cat:"🎨 Image", winner:"Tie",
    title:"Flux vs Midjourney 2026: Open Source vs The Original",
    desc:"The two best image AI models compared across photorealism, artistic style, and value.",
    summary:"Flux offers open-source freedom and competitive photorealism. Midjourney offers unmatched artistic style control and community. Both earn a 9/10 — the right pick depends on your use case.",
    breakdown:[
      {cat:"Photorealism",a:9.5,b:8.5,winner:"Flux"},
      {cat:"Artistic Style",a:8,b:10,winner:"Midjourney"},
      {cat:"Value / Cost",a:9.5,b:7,winner:"Flux"},
      {cat:"Prompt Adherence",a:8.5,b:8,winner:"Flux"},
      {cat:"Community & Inspiration",a:6,b:10,winner:"Midjourney"},
    ],
    verdict:"For photorealism and cost-efficiency: Flux. For artistic style and creative inspiration: Midjourney. Power users should use both."
  },
  {
    id:"murf-vs-elevenlabs",
    a:{id:"murf-ai",l:"M",c:"#06b6d4",name:"Murf AI"},
    b:{id:"elevenlabs",l:"E",c:"#f59e0b",name:"ElevenLabs"},
    cat:"🎙 Audio", winner:"ElevenLabs",
    title:"Murf AI vs ElevenLabs 2026: Which AI Voice is More Realistic?",
    desc:"We generated 200+ voice samples across both platforms. The quality gap surprised us.",
    summary:"Both are leading AI voice platforms, but they serve different use cases. ElevenLabs wins on raw voice quality and realism. Murf wins on studio-workflow integration and team features.",
    breakdown:[
      {cat:"Voice Realism",a:7.5,b:9.5,winner:"ElevenLabs"},
      {cat:"Ease of Use",a:8,b:8,winner:"Tie"},
      {cat:"Value",a:7,b:7.5,winner:"ElevenLabs"},
      {cat:"Team Features",a:9,b:7,winner:"Murf AI"},
      {cat:"Voice Variety",a:8.5,b:9,winner:"ElevenLabs"},
    ],
    verdict:"ElevenLabs wins on quality. Murf wins for corporate video teams who need workflow integration. For pure voice quality: ElevenLabs."
  },
];

const BLOGS = [
  {
    id:"ai-tools-content-creators",
    tag:"Guide", date:"Feb 10, 2026", readTime:"12 min",
    title:"AI Tools for Content Creators: The Complete Guide for 2026",
    desc:"Essential AI stacks for YouTubers, podcasters, bloggers, and social media managers.",
    intro:"Content creation has been transformed by AI. In 2026, the question isn't whether to use AI tools — it's which ones to use and how to combine them into a workflow that multiplies your output.",
    sections:[
      {h:"For YouTubers",p:"The core YouTube AI stack in 2026: Runway ML for video editing and B-roll generation, ElevenLabs for voiceovers, Descript for transcription and editing, and Claude for scripting. This combination can cut production time by 60–70%."},
      {h:"For Bloggers & Writers",p:"Perplexity for research (with cited sources), Claude for drafting and editing, Canva AI for featured images. Key insight: use AI for research and structure, keep your voice and perspective human."},
      {h:"For Podcasters",p:"Descript remains the gold standard — its AI-powered 'remove filler words' and 'studio sound' features justify the subscription alone. Pair with Claude for show notes and ElevenLabs for AI host voices."},
    ],
    cta:"Start with one tool, master it, then expand your stack. Don't try to switch everything at once."
  },
  {
    id:"ai-tools-small-business",
    tag:"List", date:"Jan 28, 2026", readTime:"15 min",
    title:"12 Best AI Tools for Small Business in 2026 (Save Time & Money)",
    desc:"Practical tools that save real time and money for small business owners across every function.",
    intro:"Running a small business means wearing every hat. AI tools are the closest thing to hiring a team of specialists without the payroll. Here are the 12 tools with the highest ROI for small business owners in 2026.",
    sections:[
      {h:"The Essential Stack",p:"1. Claude or ChatGPT for writing and admin. 2. Perplexity for research. 3. Canva AI for design. 4. Gamma for presentations. 5. Otter.ai for meeting notes. These five tools alone can save 8–10 hours per week for most small business owners."},
      {h:"For Sales & Marketing",p:"Instantly.ai for cold email outreach, Taplio for LinkedIn content, and Surfer SEO for content optimization form the core AI marketing stack. Together they can replace the output of a 2–3 person marketing team."},
    ],
    cta:"Don't implement all 12 at once. Identify your biggest time sink and solve that first."
  },
  {
    id:"best-ai-meeting-assistants",
    tag:"List", date:"Jan 22, 2026", readTime:"7 min",
    title:"Best AI Meeting Assistants 2026: Notes, Summaries & Action Items",
    desc:"The best tools for automatic meeting notes, summaries, and action item extraction.",
    intro:"Meeting notes are one of the most universally despised admin tasks. AI meeting assistants have completely solved this problem — and the best ones do it invisibly in the background.",
    sections:[
      {h:"Top Picks for 2026",p:"Otter.ai ($10/mo) is the most accessible and works across Zoom, Teams, and Meet. Fireflies.ai adds CRM integration and is better for sales teams. Notion AI's meeting notes feature is worth it if you're already in the Notion ecosystem."},
    ],
    cta:"Try Otter.ai free for your next 10 meetings. You won't go back to manual notes."
  },
  {
    id:"best-ai-research-tools",
    tag:"Research", date:"Jan 15, 2026", readTime:"11 min",
    title:"Best AI Research Tools 2026: Faster Literature Reviews",
    desc:"AI tools that accelerate academic and professional research with smart literature review features.",
    intro:"Research that used to take weeks can now be done in hours. AI research tools in 2026 can read, synthesize, and cross-reference thousands of papers.",
    sections:[
      {h:"For Academic Research",p:"Elicit is the standout tool for academic literature reviews — it can analyze thousands of papers and surface the most relevant findings. Consensus.app specializes in finding scientific consensus on specific questions. Both are invaluable for researchers."},
      {h:"For Business Research",p:"Perplexity Pro with its Deep Research mode is the best general-purpose tool for business research — synthesizing information from dozens of current web sources into structured, cited reports in minutes."},
    ],
    cta:"Elicit is free to start — try it on your next literature review and experience the time savings."
  },
  {
    id:"ai-tools-ecommerce",
    tag:"Guide", date:"Feb 10, 2026", readTime:"10 min",
    title:"AI Tools for Ecommerce: Boost Store Growth & Conversions",
    desc:"Top AI ecommerce tools for personalization, automation, and conversion optimization.",
    intro:"Ecommerce AI in 2026 goes far beyond product recommendations. The new wave covers AI-generated product photography, dynamic pricing, and personalized email sequences.",
    sections:[
      {h:"Product Photography with AI",p:"Pebblely and PhotoAI can generate studio-quality product photos from a smartphone shot. For many Shopify store owners, this has eliminated photography budgets entirely — saving $500–$5,000 per product launch."},
      {h:"Personalization & Email",p:"Klaviyo's AI-powered segmentation and Omnisend's automation are the two leading tools for ecommerce email. Personalized product recommendations drive an average of 26% of revenue."},
    ],
    cta:"Start with AI product photography — the ROI is immediate and the quality improvement is obvious."
  },
  {
    id:"ai-tools-customer-support",
    tag:"Guide", date:"Feb 10, 2026", readTime:"8 min",
    title:"Best AI Tools for Customer Support: CX Automation for SMBs",
    desc:"Top AI help desk and automation tools for boosting customer satisfaction at small business scale.",
    intro:"Customer support is one of the highest-ROI areas to apply AI. The right tools handle 60–80% of routine queries automatically while escalating complex issues to your human team.",
    sections:[
      {h:"AI Chatbots",p:"Intercom Fin (built on GPT-4) handles nuanced customer questions by searching your knowledge base. Zendesk AI is the enterprise choice. For lean teams, Tidio offers an affordable entry point."},
      {h:"Email Triage",p:"Help Scout's AI features now automatically categorize, tag, and suggest responses to incoming tickets — reducing first-response time by 40% for most support teams."},
    ],
    cta:"Start with a chatbot connected to your existing knowledge base. Most see ROI within 30 days."
  },
];

const CATS = ["All","Web Building","Image","Audio","Business","Writing","General AI"];
const CMAP = {"Web Building":"web","Image":"image","Audio":"audio","Business":"business","Writing":"writing","General AI":"general"};

/* ════════════════════════════════════════════
   AD SLOT COMPONENT
   ─────────────────
   To enable real AdSense:
   1. Add to index.html <head>:
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID" crossorigin="anonymous"></script>
   2. Replace ca-pub-XXXXXXXXXXXXXXXX in the <ins> tag below
   3. Replace each slotId with your real Ad Unit IDs from AdSense
   4. Remove the placeholder div and uncomment the <ins> tag
════════════════════════════════════════════ */
function Ad({ size="lb", slotId="0000000000" }) {
  const ref = useRef();
  useEffect(()=>{ try{ (window.adsbygoogle=window.adsbygoogle||[]).push({}); }catch(e){} },[]);
  return (
    <div className={`ad-slot ad-${size}`} ref={ref}>
      <div className="ad-lbl">Advertisement</div>
      <span style={{fontSize:".68rem",opacity:.28}}>
        {size==="lb"?"728×90 Leaderboard":size==="rect"?"300×250 Rectangle":"320×50 Banner"}
      </span>
      {/* PRODUCTION: remove above 2 lines, uncomment below:
      <ins className="adsbygoogle" style={{display:"block"}}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slotId} data-ad-format="auto" data-full-width-responsive="true"/>
      */}
    </div>
  );
}

/* ════════════════════════════════════════════
   SHARED COMPONENTS
════════════════════════════════════════════ */
function Stars({ n, center }) {
  return (
    <div className="stars" style={center?{justifyContent:"center"}:{}}>
      {[1,2,3,4,5].map(i=>(
        <span key={i} style={{fontSize:".72rem",color:i<=n?"#f59e0b":"#374151"}}>★</span>
      ))}
    </div>
  );
}

function BC({ crumbs, nav }) {
  return (
    <div className="bc">
      {crumbs.map((c,i)=>(
        <span key={i} style={{display:"flex",alignItems:"center",gap:7}}>
          {i>0 && <span>›</span>}
          {c.pg ? <button onClick={()=>nav(c.pg,c.pm)}>{c.label}</button>
                : <span style={{color:"var(--tx)"}}>{c.label}</span>}
        </span>
      ))}
    </div>
  );
}

function RBar({ label, value }) {
  return (
    <div className="rbar">
      <div className="rbar-lbl">{label}</div>
      <div className="rbar-track"><div className="rbar-fill" style={{width:`${value*10}%`}}/></div>
      <div className="rbar-num">{value}</div>
    </div>
  );
}

function NL() {
  const [e,setE]=useState(""); const [ok,setOk]=useState(false);
  return (
    <div className="nl">
      <div className="nl-glow"/>
      <h2>Stay Ahead of the AI Curve</h2>
      <p>Weekly updates on the latest AI tools, exclusive comparisons, and expert tips.</p>
      {ok ? <div style={{color:"var(--a)",fontWeight:600,fontSize:"1.05rem"}}>✓ Thanks! Check your inbox.</div>
           : <>
               <div className="nl-form">
                 <input type="email" placeholder="Your email address" value={e} onChange={x=>setE(x.target.value)}
                   onKeyDown={x=>x.key==="Enter"&&e.includes("@")&&setOk(true)}/>
                 <button className="btn-p" onClick={()=>e.includes("@")&&setOk(true)}>
                   Subscribe
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                 </button>
               </div>
               <div className="nl-note">No spam. Unsubscribe anytime.</div>
             </>}
    </div>
  );
}

function Foot({ nav }) {
  return (
    <footer>
      <div className="foot-g">
        <div className="foot-brand">
          <button className="nav-logo" onClick={()=>nav("home")} style={{display:"flex"}}>
            <div className="nav-logo-icon">🎯</div>AIRadarTools
          </button>
          <p>Honest, independent reviews and comparisons of AI tools — helping you choose wisely since 2024.</p>
        </div>
        <div className="foot-col">
          <h4>Top Reviews</h4>
          <ul>
            {TOOLS.slice(0,5).map(t=><li key={t.id}><button onClick={()=>nav("review",{id:t.id})}>{t.name}</button></li>)}
          </ul>
        </div>
        <div className="foot-col">
          <h4>Resources</h4>
          <ul>
            {BLOGS.slice(0,4).map(b=><li key={b.id}><button onClick={()=>nav("post",{id:b.id})}>{b.title.split(":")[0]}</button></li>)}
          </ul>
        </div>
        <div className="foot-col">
          <h4>Company</h4>
          <ul>
            {[["About","about"],["Reviews","reviews"],["Comparisons","comparisons"],["Blog","blog"]].map(([l,p])=>(
              <li key={l}><button onClick={()=>nav(p)}>{l}</button></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="foot-bot">
        <span>© 2026 AIRadarTools. All rights reserved.</span>
        <span>Disclosure: Some links are affiliate links. We may earn a commission at no extra cost to you.</span>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════════
   PAGES
════════════════════════════════════════════ */

function Home({ nav }) {
  const [cat,setCat]=useState("All");
  const list = cat==="All" ? TOOLS : TOOLS.filter(t=>t.cat===CMAP[cat]);
  return (
    <div className="page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-glow"/>
        <div className="hero-badge fu"><span className="bdot"/>Updated for 2026 · {TOOLS.length}+ Tools Reviewed</div>
        <h1 className="fu d1">Find the <em>Perfect AI Tool</em><br/>for Your Needs</h1>
        <p className="fu d2">Honest, in-depth reviews and head-to-head comparisons. No fluff, no sponsored rankings — just analysis you can trust.</p>
        <div className="hero-btns fu d3">
          <button className="btn-p" onClick={()=>nav("reviews")}>
            Browse Reviews
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button className="btn-s" onClick={()=>nav("comparisons")}>Compare Tools</button>
        </div>
      </section>

      {/* AD TOP */}
      <div style={{padding:"0 clamp(16px,4vw,60px) 16px",maxWidth:1280,margin:"0 auto"}}>
        <Ad size="lb" slotId="1111111111"/>
      </div>

      {/* STATS */}
      <div className="stats">
        {[["262+","Tools Reviewed"],["51+","Comparisons"],["8","Categories"],["100%","Independent"]].map(([n,l])=>(
          <div className="stat" key={l}><span className="stat-n">{n}</span><div className="stat-l">{l}</div></div>
        ))}
      </div>

      {/* REVIEWS */}
      <section className="sec" id="reviews">
        <div className="sec-hd">
          <div><h2>Latest Reviews</h2><p>In-depth analysis of the most popular AI tools</p></div>
          <button className="view-all" onClick={()=>nav("reviews")}>View All →</button>
        </div>
        <div className="ftabs">
          {CATS.map(c=><button key={c} className={`ftab${cat===c?" act":""}`} onClick={()=>setCat(c)}>{c}</button>)}
        </div>
        <div className="g3">
          {list.map(t=>(
            <div className="card fu" key={t.id} onClick={()=>nav("review",{id:t.id})}>
              <div className="card-top">
                <div className="c-ico" style={{color:t.color}}>{t.letter}</div>
                <div className="c-score">
                  <div className="c-val">{t.score.toFixed(1)}</div>
                  <div className="c-sub">/10</div>
                  <Stars n={t.stars}/>
                </div>
              </div>
              <div className={`tag${t.tagClass?" "+t.tagClass:""}`}>{t.tag}</div>
              <h3>{t.name}</h3>
              <p>{t.desc}</p>
              <div className="card-price">
                {t.price.split("/").map((s,i)=><span key={i}>{i>0?" / ":""}{i===1?<b>{s.trim()}</b>:s.trim()}</span>)}
              </div>
              <button className="card-cta" onClick={e=>{e.stopPropagation();nav("review",{id:t.id})}}>Read Full Review →</button>
            </div>
          ))}
        </div>
        <div style={{marginTop:24}}><Ad size="lb" slotId="2222222222"/></div>
      </section>

      {/* COMPARISONS */}
      <section className="sec" style={{paddingTop:0}} id="comparisons">
        <div className="sec-hd">
          <div><h2>Head-to-Head Comparisons</h2><p>Side-by-side breakdowns to help you decide</p></div>
          <button className="view-all" onClick={()=>nav("comparisons")}>View All →</button>
        </div>
        <div className="g2">
          {COMPARISONS.slice(0,4).map(c=>(
            <div className="comp-card" key={c.id} onClick={()=>nav("comparison",{id:c.id})}>
              <div className="tag">{c.cat} · Comparison</div>
              <div className="comp-tools">
                <div className="comp-ico" style={{color:c.a.c}}>{c.a.l}</div>
                <div className="comp-vs">VS</div>
                <div className="comp-ico" style={{color:c.b.c}}>{c.b.l}</div>
              </div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <div className="winner">🏆 Winner: {c.winner}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AD MID */}
      <div style={{padding:"0 clamp(16px,4vw,60px) 40px",maxWidth:1280,margin:"0 auto"}}>
        <Ad size="lb" slotId="3333333333"/>
      </div>

      {/* BLOG */}
      <section className="sec" style={{paddingTop:0}} id="blog">
        <div className="sec-hd">
          <div><h2>Guides & Resources</h2><p>Expert advice on choosing and using AI tools</p></div>
          <button className="view-all" onClick={()=>nav("blog")}>View All →</button>
        </div>
        <div className="g3">
          {BLOGS.slice(0,3).map(b=>(
            <div className="blog-card" key={b.id} onClick={()=>nav("post",{id:b.id})}>
              <div className="blog-meta">
                <span className="tag am">{b.tag}</span>
                <span className="bdate">{b.date} · {b.readTime}</span>
              </div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
              <button className="card-cta" style={{marginTop:12}}>Read More →</button>
            </div>
          ))}
        </div>
      </section>

      <NL/>
      <div style={{padding:"0 clamp(16px,4vw,60px) 28px",maxWidth:1280,margin:"0 auto"}}>
        <Ad size="ban" slotId="4444444444"/>
      </div>
      <Foot nav={nav}/>
    </div>
  );
}

function ReviewsPage({ nav }) {
  const [cat,setCat]=useState("All");
  const [sort,setSort]=useState("score");
  let list = cat==="All" ? [...TOOLS] : TOOLS.filter(t=>t.cat===CMAP[cat]);
  if(sort==="score") list.sort((a,b)=>b.score-a.score);
  else list.sort((a,b)=>a.name.localeCompare(b.name));
  return (
    <div className="page">
      <section className="sec">
        <BC crumbs={[{label:"Home",pg:"home"},{label:"Reviews"}]} nav={nav}/>
        <div className="sec-hd">
          <div><h2>All AI Tool Reviews</h2><p>{list.length} tools — honest, independent analysis</p></div>
          <select value={sort} onChange={e=>setSort(e.target.value)}
            style={{background:"var(--sf2)",border:"1px solid var(--bd)",borderRadius:8,
              padding:"8px 12px",color:"var(--mu2)",fontFamily:"var(--fb)",fontSize:".84rem",cursor:"pointer"}}>
            <option value="score">Highest Score</option>
            <option value="name">A–Z</option>
          </select>
        </div>
        <div className="ftabs">
          {CATS.map(c=><button key={c} className={`ftab${cat===c?" act":""}`} onClick={()=>setCat(c)}>{c}</button>)}
        </div>
        <div className="g3">
          {list.map(t=>(
            <div className="card" key={t.id} onClick={()=>nav("review",{id:t.id})}>
              <div className="card-top">
                <div className="c-ico" style={{color:t.color}}>{t.letter}</div>
                <div className="c-score">
                  <div className="c-val">{t.score.toFixed(1)}</div>
                  <div className="c-sub">/10</div>
                  <Stars n={t.stars}/>
                </div>
              </div>
              <div className={`tag${t.tagClass?" "+t.tagClass:""}`}>{t.tag}</div>
              <h3>{t.name}</h3>
              <p>{t.desc}</p>
              <div className="card-price">
                {t.price.split("/").map((s,i)=><span key={i}>{i>0?" / ":""}{i===1?<b>{s.trim()}</b>:s.trim()}</span>)}
              </div>
              <button className="card-cta">Read Full Review →</button>
            </div>
          ))}
        </div>
        <div style={{marginTop:28}}><Ad size="lb" slotId="5555555555"/></div>
      </section>
      <Foot nav={nav}/>
    </div>
  );
}

function ReviewPage({ id, nav }) {
  const t = TOOLS.find(x=>x.id===id);
  if(!t) return <div className="page"><div className="sec"><p style={{color:"var(--mu)"}}>Review not found.</p></div></div>;
  return (
    <div className="page">
      {/* HERO */}
      <div className="det-hero">
        <BC crumbs={[{label:"Home",pg:"home"},{label:"Reviews",pg:"reviews"},{label:t.name}]} nav={nav}/>
        <div className="det-header">
          <div>
            <div className="det-icon-row">
              <div className="det-icon" style={{color:t.color}}>{t.letter}</div>
              <div>
                <div className={`tag${t.tagClass?" "+t.tagClass:""}`} style={{marginBottom:6}}>{t.tag}</div>
                <div className="det-title">{t.name}</div>
                <div className="det-sub">{t.tagline}</div>
              </div>
            </div>
            {/* ── VISIT BUTTON — opens real website ── */}
            <div className="det-btns">
              <a href={t.url} target="_blank" rel="noopener noreferrer">
                <button className="btn-visit">
                  Visit {t.name}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </button>
              </a>
              <button className="btn-s" onClick={()=>nav("reviews")}>← All Reviews</button>
            </div>
          </div>
          <div className="score-card">
            <div className="big-score">{t.score.toFixed(1)}</div>
            <div style={{fontSize:".76rem",color:"var(--mu)",marginTop:4}}>/10 Overall</div>
            <Stars n={t.stars} center/>
            <div style={{fontSize:".76rem",color:"var(--mu)",marginTop:7}}>AIRadarTools Rating</div>
          </div>
        </div>
      </div>

      {/* VISIT BANNER */}
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(16px,4vw,60px)"}}>
        <div className="visit-banner">
          <div>
            <div style={{fontFamily:"var(--fd)",fontWeight:700,marginBottom:4}}>Ready to try {t.name}?</div>
            <p>Visit the official website to sign up, explore pricing, and get started.</p>
          </div>
          <a href={t.url} target="_blank" rel="noopener noreferrer">
            <button className="btn-visit">
              Go to {t.name} ↗
            </button>
          </a>
        </div>
      </div>

      {/* AD */}
      <div style={{padding:"16px clamp(16px,4vw,60px)",maxWidth:1280,margin:"0 auto"}}>
        <Ad size="lb" slotId="6666666666"/>
      </div>

      {/* BODY */}
      <div className="det-body">
        <div className="det-content">
          {t.details.map((d,i)=>(
            <div key={i}><h2>{d.h}</h2><p>{d.p}</p></div>
          ))}

          <h2>Pros & Cons</h2>
          <div className="pros-cons">
            <div className="pc pro">
              <h4>✓ Pros</h4>
              <ul>{t.pros.map(p=><li key={p}>{p}</li>)}</ul>
            </div>
            <div className="pc con">
              <h4>✗ Cons</h4>
              <ul>{t.cons.map(c=><li key={c}>{c}</li>)}</ul>
            </div>
          </div>

          <h2>Ratings Breakdown</h2>
          {t.ratings.map(r=><RBar key={r.l} label={r.l} value={r.v}/>)}

          <h2>Our Verdict</h2>
          <div className="verdict-box">{t.verdict}</div>

          {/* CTA */}
          <div style={{marginTop:28,padding:20,background:"var(--sf2)",borderRadius:"var(--r)",
            border:"1px solid var(--bd)",display:"flex",alignItems:"center",
            justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
            <div>
              <div style={{fontFamily:"var(--fd)",fontWeight:700,marginBottom:4}}>Start using {t.name} today</div>
              <div style={{fontSize:".85rem",color:"var(--mu)"}}>{t.price.split("/")[0].trim()} — {t.url.replace("https://","")}</div>
            </div>
            <a href={t.url} target="_blank" rel="noopener noreferrer">
              <button className="btn-visit">Visit {t.name} ↗</button>
            </a>
          </div>

          <Ad size="lb" slotId="7777777777"/>
        </div>

        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="sb-card">
            <h4>Quick Info</h4>
            <div className="sb-row"><span>Score</span><span style={{color:"var(--a)",fontFamily:"var(--fd)",fontWeight:800}}>{t.score}/10</span></div>
            <div className="sb-row"><span>Category</span><span>{t.tag}</span></div>
            <div className="sb-row"><span>Starting Price</span><span>{t.price.split("/")[0].trim()}</span></div>
          </div>
          <div className="sb-card">
            <h4>Pricing</h4>
            {t.price.split("/").map((p,i)=>(
              <div className="sb-row" key={i}>
                <span>Tier {i+1}</span>
                <span style={{color:i===1?"var(--a)":"var(--tx)",fontSize:".82rem"}}>{p.trim()}</span>
              </div>
            ))}
          </div>
          {/* BIG VISIT BUTTON IN SIDEBAR */}
          <a href={t.url} target="_blank" rel="noopener noreferrer" style={{display:"block"}}>
            <button className="btn-visit" style={{width:"100%",justifyContent:"center",padding:"13px"}}>
              Visit {t.name} ↗
            </button>
          </a>
          <div className="sb-card">
            <h4>Related Reviews</h4>
            {TOOLS.filter(x=>x.cat===t.cat&&x.id!==t.id).slice(0,3).map(x=>(
              <div key={x.id} className="rel-item" onClick={()=>nav("review",{id:x.id})}>
                <div className="rel-ico" style={{color:x.color}}>{x.letter}</div>
                <div>
                  <div style={{fontSize:".85rem",fontWeight:600}}>{x.name}</div>
                  <div style={{fontSize:".74rem",color:"var(--mu)"}}>{x.score}/10 · {x.price.split("/")[0].trim()}</div>
                </div>
              </div>
            ))}
          </div>
          <Ad size="rect" slotId="8888888888"/>
        </div>
      </div>
      <NL/>
      <Foot nav={nav}/>
    </div>
  );
}

function ComparisonsPage({ nav }) {
  return (
    <div className="page">
      <section className="sec">
        <BC crumbs={[{label:"Home",pg:"home"},{label:"Comparisons"}]} nav={nav}/>
        <div className="sec-hd">
          <div><h2>AI Tool Comparisons</h2><p>{COMPARISONS.length} head-to-head breakdowns</p></div>
        </div>
        <div className="g2">
          {COMPARISONS.map(c=>(
            <div className="comp-card" key={c.id} onClick={()=>nav("comparison",{id:c.id})}>
              <div className="tag">{c.cat} · Comparison</div>
              <div className="comp-tools">
                <div className="comp-ico" style={{color:c.a.c}}>{c.a.l}</div>
                <div className="comp-vs">VS</div>
                <div className="comp-ico" style={{color:c.b.c}}>{c.b.l}</div>
              </div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <div className="winner">🏆 Winner: {c.winner}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:28}}><Ad size="lb" slotId="9999999999"/></div>
      </section>
      <Foot nav={nav}/>
    </div>
  );
}

function CompPage({ id, nav }) {
  const c = COMPARISONS.find(x=>x.id===id);
  if(!c) return <div className="page"><div className="sec"><p style={{color:"var(--mu)"}}>Not found.</p></div></div>;
  const ta = TOOLS.find(x=>x.id===c.a.id);
  const tb = TOOLS.find(x=>x.id===c.b.id);
  return (
    <div className="page">
      <section className="sec">
        <BC crumbs={[{label:"Home",pg:"home"},{label:"Comparisons",pg:"comparisons"},{label:c.a.name+" vs "+c.b.name}]} nav={nav}/>
        <div className="tag" style={{marginBottom:14}}>{c.cat} · Comparison</div>
        <h1 style={{fontSize:"clamp(1.55rem,4vw,2.4rem)",fontWeight:800,letterSpacing:"-.025em",marginBottom:12}}>{c.title}</h1>
        <p style={{color:"var(--mu)",fontSize:".97rem",lineHeight:1.8,maxWidth:720,marginBottom:32}}>{c.summary}</p>

        {/* TOOL CARDS */}
        <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:14,alignItems:"center",maxWidth:560,marginBottom:36}}>
          <div className="sb-card" style={{textAlign:"center"}}>
            <div className="comp-ico" style={{color:c.a.c,width:52,height:52,borderRadius:13,margin:"0 auto 10px",fontSize:"1.4rem"}}>{c.a.l}</div>
            <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:"1rem",marginBottom:10}}>{c.a.name}</div>
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {ta && <a href={ta.url} target="_blank" rel="noopener noreferrer"><button className="btn-visit" style={{width:"100%",justifyContent:"center",fontSize:".82rem",padding:"8px 12px"}}>Visit ↗</button></a>}
              <button className="btn-outline" style={{width:"100%",justifyContent:"center"}} onClick={()=>nav("review",{id:c.a.id})}>Review</button>
            </div>
          </div>
          <div style={{fontFamily:"var(--fd)",fontWeight:800,fontSize:"1rem",color:"var(--mu)",textAlign:"center"}}>VS</div>
          <div className="sb-card" style={{textAlign:"center"}}>
            <div className="comp-ico" style={{color:c.b.c,width:52,height:52,borderRadius:13,margin:"0 auto 10px",fontSize:"1.4rem"}}>{c.b.l}</div>
            <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:"1rem",marginBottom:10}}>{c.b.name}</div>
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {tb && <a href={tb.url} target="_blank" rel="noopener noreferrer"><button className="btn-visit" style={{width:"100%",justifyContent:"center",fontSize:".82rem",padding:"8px 12px"}}>Visit ↗</button></a>}
              <button className="btn-outline" style={{width:"100%",justifyContent:"center"}} onClick={()=>nav("review",{id:c.b.id})}>Review</button>
            </div>
          </div>
        </div>

        <Ad size="lb" slotId="AAAAAAAAAA"/>

        {/* TABLE */}
        <h2 style={{fontSize:"1.2rem",fontWeight:700,margin:"32px 0 16px",paddingBottom:10,borderBottom:"1px solid var(--bd)"}}>Category Breakdown</h2>
        <div className="cmp-tbl">
          <div className="cmp-hd">
            <span>Category</span>
            <span style={{textAlign:"center"}}>{c.a.name}</span>
            <span style={{textAlign:"center"}}>{c.b.name}</span>
            <span style={{textAlign:"center"}}>Winner</span>
          </div>
          {c.breakdown.map((row,i)=>(
            <div key={i} className="cmp-row">
              <span style={{fontSize:".88rem"}}>{row.cat}</span>
              <span style={{textAlign:"center",fontFamily:"var(--fd)",fontWeight:700,
                color:row.winner===c.a.name?"var(--a)":"var(--tx)"}}>{row.a}</span>
              <span style={{textAlign:"center",fontFamily:"var(--fd)",fontWeight:700,
                color:row.winner===c.b.name?"var(--a)":"var(--tx)"}}>{row.b}</span>
              <span style={{textAlign:"center",fontSize:".76rem",fontWeight:600,color:"var(--a3)"}}>
                {row.winner==="Tie"?"🤝 Tie":"🏆 "+row.winner}
              </span>
            </div>
          ))}
        </div>

        {/* VERDICT */}
        <div className="sb-card" style={{maxWidth:680,marginBottom:32}}>
          <h4 style={{marginBottom:12}}>⚖️ Final Verdict</h4>
          <p style={{fontSize:".93rem",color:"var(--tx)",lineHeight:1.8}}>{c.verdict}</p>
          <div className="winner" style={{marginTop:14}}>🏆 Overall Winner: {c.winner}</div>
        </div>
      </section>
      <NL/>
      <Foot nav={nav}/>
    </div>
  );
}

function BlogPage({ nav }) {
  return (
    <div className="page">
      <section className="sec">
        <BC crumbs={[{label:"Home",pg:"home"},{label:"Blog"}]} nav={nav}/>
        <div className="sec-hd">
          <div><h2>Guides & Resources</h2><p>{BLOGS.length} expert guides to choosing AI tools</p></div>
        </div>
        <div className="g3">
          {BLOGS.map(b=>(
            <div className="blog-card" key={b.id} onClick={()=>nav("post",{id:b.id})}>
              <div className="blog-meta">
                <span className="tag am">{b.tag}</span>
                <span className="bdate">{b.date} · {b.readTime}</span>
              </div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
              <button className="card-cta" style={{marginTop:12}}>Read More →</button>
            </div>
          ))}
        </div>
        <div style={{marginTop:28}}><Ad size="lb" slotId="BBBBBBBBBB"/></div>
      </section>
      <Foot nav={nav}/>
    </div>
  );
}

function PostPage({ id, nav }) {
  const b = BLOGS.find(x=>x.id===id);
  if(!b) return <div className="page"><div className="sec"><p style={{color:"var(--mu)"}}>Post not found.</p></div></div>;
  return (
    <div className="page">
      <div style={{maxWidth:860,margin:"0 auto",padding:"40px clamp(16px,4vw,60px) 72px"}}>
        <BC crumbs={[{label:"Home",pg:"home"},{label:"Blog",pg:"blog"},{label:b.tag}]} nav={nav}/>
        <div className="blog-meta" style={{marginTop:14}}>
          <span className="tag am">{b.tag}</span>
          <span className="bdate">{b.date} · {b.readTime}</span>
        </div>
        <h1 style={{fontSize:"clamp(1.65rem,4vw,2.4rem)",fontWeight:800,letterSpacing:"-.025em",margin:"14px 0 18px"}}>{b.title}</h1>
        <p style={{fontSize:"1rem",color:"var(--mu2)",lineHeight:1.85,marginBottom:32,borderLeft:"3px solid var(--a)",paddingLeft:16}}>{b.intro}</p>

        <Ad size="lb" slotId="CCCCCCCCCC"/>

        <div style={{marginTop:32}}>
          {b.sections.map((s,i)=>(
            <div key={i} style={{marginBottom:28}}>
              <h2 style={{fontSize:"1.2rem",fontWeight:700,marginBottom:10,paddingBottom:10,borderBottom:"1px solid var(--bd)"}}>{s.h}</h2>
              <p style={{color:"var(--mu2)",lineHeight:1.85,fontSize:".95rem"}}>{s.p}</p>
            </div>
          ))}
        </div>

        <div style={{background:"var(--sf2)",border:"1px solid rgba(0,229,176,.2)",borderRadius:"var(--r)",
          padding:22,marginTop:28,borderLeft:"3px solid var(--a)"}}>
          <div style={{fontSize:".76rem",fontWeight:700,letterSpacing:".05em",textTransform:"uppercase",color:"var(--a)",marginBottom:7}}>💡 Key Takeaway</div>
          <p style={{color:"var(--tx)",fontSize:".93rem",lineHeight:1.75}}>{b.cta}</p>
        </div>

        <div style={{display:"flex",gap:10,marginTop:28,flexWrap:"wrap"}}>
          <button className="btn-s" onClick={()=>nav("blog")}>← Back to Blog</button>
          <button className="btn-p" onClick={()=>nav("reviews")}>Browse AI Tool Reviews →</button>
        </div>
      </div>
      <NL/>
      <Foot nav={nav}/>
    </div>
  );
}

function AboutPage({ nav }) {
  return (
    <div className="page">
      <section className="sec">
        <BC crumbs={[{label:"Home",pg:"home"},{label:"About"}]} nav={nav}/>
        <div style={{maxWidth:680,marginBottom:44}}>
          <h1 style={{fontSize:"clamp(1.75rem,4vw,2.7rem)",fontWeight:800,letterSpacing:"-.025em",marginBottom:16}}>
            About <span style={{background:"linear-gradient(90deg,var(--a),var(--a2))",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>AIRadarTools</span>
          </h1>
          <p style={{fontSize:"1rem",color:"var(--mu2)",lineHeight:1.85,marginBottom:14}}>
            AIRadarTools is an independent review and comparison platform for AI tools. We test every tool hands-on and publish honest, in-depth analysis to help individuals and teams make smarter software decisions.
          </p>
          <p style={{fontSize:".95rem",color:"var(--mu)",lineHeight:1.85}}>
            We never accept payment for favorable reviews. Some links on the site are affiliate links — we earn a small commission if you sign up, at no extra cost to you.
          </p>
        </div>
        <div className="about-grid">
          {[
            {ico:"🎯",h:"Our Mission",p:"Cut through AI hype and give honest, practical guidance on which tools are actually worth your time and money."},
            {ico:"🔬",h:"How We Test",p:"Every tool is tested with real tasks over 2–4 weeks. We don't review tools based on press releases or demos alone."},
            {ico:"💯",h:"Independence",p:"No vendor can pay for a higher score. Our ratings are based purely on performance in our standardized testing framework."},
            {ico:"📊",h:"Our Scoring",p:"We score across 5 dimensions: ease of use, output quality, value, speed, and support. Scores are updated when tools change."},
          ].map(c=>(
            <div className="about-card" key={c.h}>
              <div className="ico">{c.ico}</div>
              <h3>{c.h}</h3>
              <p>{c.p}</p>
            </div>
          ))}
        </div>

        <div style={{marginTop:44}}>
          <h2 style={{fontSize:"1.4rem",fontWeight:700,marginBottom:22}}>The Team</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,230px),1fr))",gap:14}}>
            {[{n:"Alex Chen",r:"Founder & Lead Reviewer",e:"👨‍💻"},{n:"Priya Mehta",r:"AI Research Analyst",e:"👩‍🔬"},{n:"James Okafor",r:"Comparisons & Testing",e:"🧪"}].map(m=>(
              <div key={m.n} className="sb-card" style={{display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:46,height:46,borderRadius:11,background:"var(--sf2)",border:"1px solid var(--bd)",
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.35rem",flexShrink:0}}>{m.e}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:".93rem"}}>{m.n}</div>
                  <div style={{fontSize:".78rem",color:"var(--mu)"}}>{m.r}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <NL/>
      <Foot nav={nav}/>
    </div>
  );
}

/* ════════════════════════════════════════════
   ROOT APP
════════════════════════════════════════════ */
export default function App() {
  const [pg,  setPg]  = useState("home");
  const [pm,  setPm]  = useState({});
  const [menu,setMenu]= useState(false);
  const [srch,setSrch]= useState(false);
  const [q,   setQ]   = useState("");
  const [btt, setBtt] = useState(false);

  // Inject CSS
  useEffect(()=>{
    let s=document.getElementById("airt");
    if(!s){s=document.createElement("style");s.id="airt";document.head.appendChild(s);}
    s.textContent=CSS;
    return()=>document.getElementById("airt")?.remove();
  },[]);

  // Keyboard shortcuts
  useEffect(()=>{
    const h=e=>{
      if((e.metaKey||e.ctrlKey)&&e.key==="k"){e.preventDefault();setSrch(true);}
      if(e.key==="Escape"){setSrch(false);setMenu(false);}
    };
    window.addEventListener("keydown",h);
    return()=>window.removeEventListener("keydown",h);
  },[]);

  // Back to top
  useEffect(()=>{
    const h=()=>setBtt(window.scrollY>380);
    window.addEventListener("scroll",h);
    return()=>window.removeEventListener("scroll",h);
  },[]);

  const nav = useCallback((page, params={})=>{
    setPg(page); setPm(params); setMenu(false);
    window.scrollTo({top:0,behavior:"smooth"});
  },[]);

  // Search index
  const results = q.length>1 ? [
    ...TOOLS.map(t=>({type:"Review",label:t.name,sub:t.tag,ico:t.letter,c:t.color,pg:"review",pm:{id:t.id}})),
    ...COMPARISONS.map(c=>({type:"Comparison",label:c.a.name+" vs "+c.b.name,sub:c.cat,ico:"⚖",c:"#3b82f6",pg:"comparison",pm:{id:c.id}})),
    ...BLOGS.map(b=>({type:"Guide",label:b.title,sub:b.tag,ico:"📄",c:"#f59e0b",pg:"post",pm:{id:b.id}})),
  ].filter(x=>(x.label+x.sub).toLowerCase().includes(q.toLowerCase())) : [];

  const NAV=[{l:"Reviews",p:"reviews"},{l:"Comparisons",p:"comparisons"},{l:"Blog",p:"blog"},{l:"About",p:"about"}];

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <button className="nav-logo" onClick={()=>nav("home")}>
          <div className="nav-logo-icon">🎯</div>AIRadarTools
        </button>
        <ul className="nav-links">
          {NAV.map(x=>(
            <li key={x.p}>
              <button className={pg===x.p?"act":""} onClick={()=>nav(x.p)}>{x.l}</button>
            </li>
          ))}
        </ul>
        <div className="nav-r">
          <button className="srch-btn" onClick={()=>setSrch(true)}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="8" r="6"/><path d="M14 14l4 4"/></svg>
            <span>Search</span><kbd>⌘K</kbd>
          </button>
          <button className="btn-p" onClick={()=>nav("reviews")}>Browse Tools</button>
          <button className="hbg" onClick={()=>setMenu(o=>!o)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mob${menu?" open":""}`}>
        {NAV.map(x=><button key={x.p} onClick={()=>nav(x.p)}>{x.l}</button>)}
      </div>

      {/* SEARCH MODAL */}
      {srch && (
        <div className="srch-ov" onClick={e=>e.currentTarget===e.target&&setSrch(false)}>
          <div className="srch-box">
            <div className="srch-row">
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="#6b7280" strokeWidth="2"><circle cx="8" cy="8" r="6"/><path d="M14 14l4 4"/></svg>
              <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search tools, comparisons, guides…"/>
              {q && <button onClick={()=>setQ("")} style={{background:"none",border:"none",color:"var(--mu)",fontSize:"1.2rem",cursor:"pointer"}}>×</button>}
            </div>
            {results.length > 0
              ? <div className="srch-results">
                  {results.slice(0,8).map((r,i)=>(
                    <div key={i} className="srch-item" onClick={()=>{setSrch(false);setQ("");nav(r.pg,r.pm);}}>
                      <div className="srch-ico" style={{color:r.c}}>{r.ico}</div>
                      <div>
                        <div style={{fontSize:".9rem",fontWeight:500}}>{r.label}</div>
                        <div style={{fontSize:".76rem",color:"var(--mu)"}}>{r.type} · {r.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              : <div className="srch-hint">{q.length>1?"No results found for \""+q+"\".":"↑↓ Navigate  ↵ Open  Esc Close — try 'Claude', 'Flux', 'Bolt'"}</div>
            }
          </div>
        </div>
      )}

      {/* PAGE ROUTER */}
      {pg==="home"        && <Home nav={nav}/>}
      {pg==="reviews"     && <ReviewsPage nav={nav}/>}
      {pg==="review"      && <ReviewPage id={pm.id} nav={nav}/>}
      {pg==="comparisons" && <ComparisonsPage nav={nav}/>}
      {pg==="comparison"  && <CompPage id={pm.id} nav={nav}/>}
      {pg==="blog"        && <BlogPage nav={nav}/>}
      {pg==="post"        && <PostPage id={pm.id} nav={nav}/>}
      {pg==="about"       && <AboutPage nav={nav}/>}

      {/* BACK TO TOP */}
      <button className={`btt${btt?" on":""}`} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} aria-label="Back to top">↑</button>
    </>
  );
}
