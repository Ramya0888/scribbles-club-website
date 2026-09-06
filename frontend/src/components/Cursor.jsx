import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "motion/react";

const TRAIL_CONFIG = { pointsNumber: 12, widthFactor: 0.5, spring: 0.4, friction: 0.5 };
const CURSOR_HIDE_ID = "cursor-hide";
const REDUCED = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function injectHideStyle() {
  if (document.getElementById(CURSOR_HIDE_ID)) return;
  const s = document.createElement("style");
  s.id = CURSOR_HIDE_ID;
  s.textContent = `
    html.custom-cursor * { cursor: none !important; }
    html.custom-cursor input[type='text'],
    html.custom-cursor input[type='email'],
    html.custom-cursor input[type='password'],
    html.custom-cursor input[type='search'],
    html.custom-cursor textarea { cursor: text !important; }
    html.custom-cursor input[type='checkbox'],
    html.custom-cursor select { cursor: pointer !important; }
  `;
  document.head.appendChild(s);
}
function removeHideStyle() {
  document.getElementById(CURSOR_HIDE_ID)?.remove();
  document.documentElement.classList.remove("custom-cursor");
}
function useCursorEnabled() {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return false;
    if (REDUCED()) return false;
    return !window.matchMedia("(hover: none) and (pointer: coarse)").matches && !window.matchMedia("(max-width: 767px)").matches;
  });
  useEffect(() => {
    const coarse = window.matchMedia("(hover: none) and (pointer: coarse)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const upd = () => setEnabled(!reduced.matches && !coarse.matches && !mobile.matches);
    coarse.addEventListener("change", upd);
    mobile.addEventListener("change", upd);
    reduced.addEventListener("change", upd);
    return () => { coarse.removeEventListener("change", upd); mobile.removeEventListener("change", upd); reduced.removeEventListener("change", upd); };
  }, []);
  return enabled;
}

export default function Cursor() {
  const enabled = useCursorEnabled();
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const targetRef = useRef({ x: 0, y: 0 });
  const mouseActive = useRef(false);
  const interactiveRef = useRef(false);
  const projectRef = useRef(false);
  const rafId = useRef(0);
  const running = useRef(false);
  const [linkActive, setLinkActive] = useState(false);
  const [projectActive, setProjectActive] = useState(false);
  const [customVisible, setCustomVisible] = useState(true);
  const ringX = useMotionValue(0);
  const ringY = useMotionValue(0);

  useEffect(() => {
    const onVis = (e) => setCustomVisible(e.detail !== false);
    window.addEventListener("cursor-visibility", onVis);
    return () => window.removeEventListener("cursor-visibility", onVis);
  }, []);

  useEffect(() => {
    if (!enabled || !customVisible) { removeHideStyle(); return; }
    if (REDUCED()) return;
    injectHideStyle();
    document.documentElement.classList.add("custom-cursor");
    return () => removeHideStyle();
  }, [enabled, customVisible]);

  useEffect(() => {
    if (!enabled || !customVisible || REDUCED()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    targetRef.current = { x: cx, y: cy };
    ringX.set(cx); ringY.set(cy);
    pointsRef.current = new Array(TRAIL_CONFIG.pointsNumber).fill(null).map(() => ({ x: cx, y: cy, dx: 0, dy: 0 }));

    const setupCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth, h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!mouseActive.current) {
        const ncx = w / 2, ncy = h / 2;
        targetRef.current = { x: ncx, y: ncy };
        ringX.set(ncx); ringY.set(ncy);
        pointsRef.current.forEach((p) => { p.x = ncx; p.y = ncy; p.dx = 0; p.dy = 0; });
      }
    };
    setupCanvas();

    let pendingOver = false;
    let lastOverTarget = null;
    const flushOver = () => {
      pendingOver = false;
      const t = lastOverTarget;
      if (!t || !(t instanceof Element)) return;
      const interactive = Boolean(t.closest("a") || t.closest("button") || t.closest('[role="button"]') || t.closest(".cursor-pointer") || t.closest("select") || t.closest("summary"));
      const project = Boolean(t.closest('[data-cursor="project"]'));
      if (interactiveRef.current !== interactive) { interactiveRef.current = interactive; setLinkActive(interactive); }
      if (projectRef.current !== project) { projectRef.current = project; setProjectActive(project); }
    };
    const onOver = (e) => {
      lastOverTarget = e.target;
      if (!pendingOver) { pendingOver = true; requestAnimationFrame(flushOver); }
    };
    const onMove = (e) => {
      mouseActive.current = true;
      targetRef.current = { x: e.clientX, y: e.clientY };
      ringX.set(e.clientX); ringY.set(e.clientY);
      if (!running.current) start();
    };
    const onClick = (e) => { targetRef.current = { x: e.clientX, y: e.clientY }; ringX.set(e.clientX); ringY.set(e.clientY); };

    const draw = () => {
      if (!mouseActive.current) { running.current = false; return; }
      const { widthFactor, spring, friction } = TRAIL_CONFIG;
      const points = pointsRef.current;
      let moving = false;
      points.forEach((p, i) => {
        const prev = i === 0 ? targetRef.current : points[i - 1];
        const ease = i === 0 ? 0.4 * spring : spring;
        p.dx += (prev.x - p.x) * ease; p.dy += (prev.y - p.y) * ease;
        p.dx *= friction; p.dy *= friction;
        p.x += p.dx; p.y += p.dy;
        if (Math.abs(p.dx) > 0.01 || Math.abs(p.dy) > 0.01) moving = true;
      });
      const dx0 = targetRef.current.x - points[0].x, dy0 = targetRef.current.y - points[0].y;
      if (Math.abs(dx0) > 0.1 || Math.abs(dy0) > 0.1) moving = true;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.strokeStyle = "#ffffff";
      const boost = interactiveRef.current || projectRef.current ? 2.5 : 1;
      for (let i = 0; i < points.length - 1; i++) {
        const a = points[i], b = points[i + 1];
        const midX = (a.x + b.x) / 2, midY = (a.y + b.y) / 2;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.quadraticCurveTo(a.x, a.y, midX, midY);
        ctx.lineWidth = widthFactor * (points.length - i) * boost;
        ctx.stroke();
      }
      if (moving) rafId.current = requestAnimationFrame(draw);
      else { running.current = false; ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); }
    };
    const start = () => {
      if (running.current) return;
      running.current = true;
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", setupCanvas);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("click", onClick);
    return () => {
      running.current = false;
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", setupCanvas);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("click", onClick);
    };
  }, [enabled, customVisible, ringX, ringY]);

  if (!enabled || !customVisible) return null;
  return (
    <>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-[10002] mix-blend-difference" style={{ contain: "strict" }} aria-hidden="true" />
      <motion.div className="fixed top-0 left-0 pointer-events-none z-[10003] mix-blend-difference" style={{ x: ringX, y: ringY }} aria-hidden="true">
        <div className="relative flex items-center justify-center" style={{ transform: "translate(-4px, -4px)" }}>
          <motion.div animate={{ scale: projectActive ? 0 : linkActive ? 1.32 : 1 }} transition={{ duration: 0.16, ease: "easeOut" }} className="flex items-center justify-center">
            <svg viewBox="0 0 122.88 102.66" width={linkActive ? 34 : 28} height={linkActive ? 28 : 23} style={{ display: "block", transform: "rotate(-14deg)", filter: linkActive ? "drop-shadow(0 2px 10px rgba(243,158,182,0.95))" : "none", transition: "filter 0.16s ease" }} aria-hidden="true">
              <path fill="white" d="M0,0c10.38,7.43,27.02-0.55,33.56,12.4c1.74,3.43,2.11,8.13,0.55,11.86c-0.63,1.5-1.56,2.84-2.82,3.86 c-0.56,0.45-1.18,0.85-1.87,1.19c-8.54,4.24-17.44-1.69-22.16-8.85C2.91,13.87,1.02,5.64,0,0L0,0z M52.65,56.81 c5.78-4.62,10.27-9.93,13.32-16.02l53.72,50.94c2.81,2.66,4.4,4.91,2.04,8.99c-1.17,1.2-2.41,1.84-3.71,1.93 c-1.3,0.09-2.66-0.38-4.09-1.41L52.65,56.81L52.65,56.81z M33.03,34.05c2.5-1.35,5.94-4.66,6.75-8.27l23.29,12.78 c-3.36,6.69-7.64,12.42-13.51,16.48C43.44,46.82,40,41.86,33.03,34.05L33.03,34.05z" />
            </svg>
          </motion.div>
          <AnimatePresence>
            {projectActive && (
              <motion.div initial={{ scale: 0, opacity: 0, rotate: -90 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} exit={{ scale: 0, opacity: 0, rotate: 90 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className="absolute w-[110px] h-[110px] flex items-center justify-center pointer-events-none">
                <span className="absolute text-white text-[16px] font-bold z-10" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>↗</span>
                <motion.svg animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} viewBox="0 0 100 100" className="w-full h-full p-2">
                  <path id="scribbles-cursor-circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none" />
                  <text className="text-[7.5px] font-black fill-white tracking-[2.5px] uppercase"><textPath href="#scribbles-cursor-circle">Scribbles • View • Scribbles • View •</textPath></text>
                </motion.svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
