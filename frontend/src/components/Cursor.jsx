import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "motion/react";

const TRAIL_CONFIG = { pointsNumber: 12, widthFactor: 0.5, spring: 0.4, friction: 0.5 };
const CURSOR_HIDE_ID = "cursor-hide";

function removeHideStyle() {
  const el = document.getElementById(CURSOR_HIDE_ID);
  if (el) el.remove();
}
function injectHideStyle() {
  if (document.getElementById(CURSOR_HIDE_ID)) return;
  const style = document.createElement("style");
  style.id = CURSOR_HIDE_ID;
  style.textContent = `* { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3C/svg%3E"), none !important; }`;
  document.head.appendChild(style);
}
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(hover: none) and (pointer: coarse)");
    setIsTouch(m.matches);
    const l = (e) => setIsTouch(e.matches);
    m.addEventListener("change", l);
    return () => m.removeEventListener("change", l);
  }, []);
  return isTouch;
}
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(max-width: 767px)");
    setIsMobile(m.matches);
    const l = (e) => setIsMobile(e.matches);
    m.addEventListener("change", l);
    return () => m.removeEventListener("change", l);
  }, []);
  return isMobile;
}

export default function Cursor() {
  const isTouchDevice = useIsTouchDevice();
  const isMobile = useIsMobile();
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const targetRef = useRef({ x: 0, y: 0 });
  const mouseActive = useRef(false);
  const interactiveRef = useRef(false);
  const projectRef = useRef(false);
  const rafId = useRef(0);
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
    if (isTouchDevice || isMobile) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (customVisible) injectHideStyle();
    else removeHideStyle();
    return removeHideStyle;
  }, [isTouchDevice, isMobile, customVisible]);

  useEffect(() => {
    if (isTouchDevice || isMobile || !customVisible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (pointsRef.current.length === 0) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetRef.current = { x: cx, y: cy };
      ringX.set(cx);
      ringY.set(cy);
      pointsRef.current = new Array(TRAIL_CONFIG.pointsNumber).fill(null).map(() => ({ x: cx, y: cy, dx: 0, dy: 0 }));
    }
    const setupCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setupCanvas();
    const onMove = (e) => {
      mouseActive.current = true;
      targetRef.current = { x: e.clientX, y: e.clientY };
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };
    const onTouch = (e) => {
      const t = e.targetTouches[0];
      if (!t) return;
      mouseActive.current = true;
      targetRef.current = { x: t.clientX, y: t.clientY };
      ringX.set(t.clientX);
      ringY.set(t.clientY);
    };
    const onOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;
      const interactive = Boolean(target.closest("a") || target.closest("button") || target.closest('[role="button"]') || target.closest(".cursor-pointer"));
      const project = Boolean(target.closest('[data-cursor="project"]'));
      interactiveRef.current = interactive;
      projectRef.current = project;
      setLinkActive(interactive);
      setProjectActive(project);
    };
    const onClick = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };
    const draw = () => {
      const { widthFactor, spring, friction } = TRAIL_CONFIG;
      const points = pointsRef.current;
      if (points.length) {
        points.forEach((p, i) => {
          const prev = i === 0 ? targetRef.current : points[i - 1];
          const ease = i === 0 ? 0.4 * spring : spring;
          p.dx += (prev.x - p.x) * ease;
          p.dy += (prev.y - p.y) * ease;
          p.dx *= friction;
          p.dy *= friction;
          p.x += p.dx;
          p.y += p.dy;
        });
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (mouseActive.current && points.length) {
        ctx.lineCap = "round";
        ctx.strokeStyle = "#1f1f1f";
        const boost = interactiveRef.current || projectRef.current ? 2.5 : 1;
        for (let i = 0; i < points.length - 1; i++) {
          const a = points[i], b = points[i + 1];
          const midX = (a.x + b.x) / 2, midY = (a.y + b.y) / 2;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.quadraticCurveTo(a.x, a.y, midX, midY);
          ctx.lineWidth = widthFactor * (points.length - i) * boost;
          ctx.stroke();
        }
      }
      rafId.current = requestAnimationFrame(draw);
    };
    rafId.current = requestAnimationFrame(draw);
    window.addEventListener("resize", setupCanvas);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", setupCanvas);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("click", onClick);
    };
  }, [isTouchDevice, isMobile, customVisible, ringX, ringY]);

  if (isTouchDevice || isMobile || !customVisible) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[10000]"
        style={{ filter: "drop-shadow(0 0 4px rgba(0,0,0,0.15))" }}
        aria-hidden="true"
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10001]"
        style={{ x: ringX, y: ringY }}
        aria-hidden="true"
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <motion.div
            animate={{ scale: projectActive ? 0 : linkActive ? 1.35 : 1, rotate: linkActive ? -12 : 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center"
          >
            <img
              src="/pointer.svg"
              alt=""
              draggable={false}
              style={{
                width: linkActive ? 34 : 28,
                height: linkActive ? 28 : 23,
                transform: "rotate(-14deg) translate(6px, 6px)",
                filter: linkActive ? "drop-shadow(0 2px 8px rgba(243,158,182,0.9)) drop-shadow(0 0 2px rgba(0,0,0,0.35))" : "drop-shadow(0 1px 3px rgba(0,0,0,0.3))",
                transition: "filter 0.18s ease",
              }}
            />
          </motion.div>
          <AnimatePresence>
            {projectActive && (
              <motion.div
                initial={{ scale: 0, opacity: 0, rotate: -180 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="absolute w-[110px] h-[110px] flex items-center justify-center"
              >
                <span className="absolute text-white text-[18px] font-bold z-10" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>↗</span>
                <motion.svg animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} viewBox="0 0 100 100" className="w-full h-full p-2">
                  <path id="scribbles-cursor-circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none" />
                  <text className="text-[7.5px] font-black fill-[#1f1f1f] tracking-[2.5px] uppercase">
                    <textPath href="#scribbles-cursor-circle">Scribbles • Scribbles • Scribbles •</textPath>
                  </text>
                </motion.svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
