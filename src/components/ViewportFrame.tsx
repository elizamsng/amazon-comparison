import {useEffect, useRef, useState} from 'react';
import {Check, Copy, ExternalLink, Maximize2, Minimize2, RotateCw} from 'lucide-react';
import type {PrototypeVersion} from '../data/versions';

export type ViewportMode = 'desktop' | 'mobile' | 'fluid';

interface ViewportFrameProps {
  version: PrototypeVersion;
  viewportMode: ViewportMode;
  frameHeight: number;
  isExpanded: boolean;
  reloadToken: number;
  onToggleExpand: (id: PrototypeVersion['id']) => void;
}

const DESKTOP_TARGET_WIDTH = 1280;
const MOBILE_TARGET_WIDTH = 390;

export function ViewportFrame({
  version,
  viewportMode,
  frameHeight,
  isExpanded,
  reloadToken,
  onToggleExpand,
}: ViewportFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(440);
  const [localReloadKey, setLocalReloadKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => {
      const nextWidth = el.clientWidth;
      if (nextWidth > 0) {
        setContainerWidth(nextWidth);
      }
    };

    updateWidth();

    const observer = new ResizeObserver(() => {
      updateWidth();
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIsLoading(true);
  }, [reloadToken, localReloadKey, version.url]);

  const handleManualReload = () => {
    setLocalReloadKey((prev) => prev + 1);
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(version.url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback ignored if clipboard permissions are restricted
    }
  };

  // Calculate iframe dimensions and scale factor so 1280px desktop or 390px mobile fits cleanly
  let targetWidth = containerWidth;
  let scale = 1;

  if (viewportMode === 'desktop') {
    targetWidth = DESKTOP_TARGET_WIDTH;
    scale = Math.min(1, containerWidth / DESKTOP_TARGET_WIDTH);
  } else if (viewportMode === 'mobile') {
    targetWidth = MOBILE_TARGET_WIDTH;
    scale = Math.min(1, containerWidth / MOBILE_TARGET_WIDTH);
  }

  const scaledHeight = frameHeight / scale;
  const renderedWidth = targetWidth * scale;
  const horizontalOffset = Math.max(0, (containerWidth - renderedWidth) / 2);

  return (
    <article className="flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden transition-colors duration-200">
      {/* Card Header */}
      <div className="px-4 py-3.5 border-b border-slate-200 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="font-mono tabular-nums text-slate-700">{version.index}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{version.methodology}</span>
          </div>
          <h2 className="mt-0.5 text-lg font-semibold tracking-tight text-slate-900 truncate">
            {version.title}
          </h2>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleManualReload}
            title={`Reload ${version.title}`}
            aria-label={`Reload ${version.title}`}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 cursor-pointer"
          >
            <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => onToggleExpand(version.id)}
            title={isExpanded ? 'Exit focus view' : `Focus ${version.title}`}
            aria-label={isExpanded ? 'Exit focus view' : `Focus ${version.title}`}
            className={`inline-flex items-center justify-center w-8 h-8 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 cursor-pointer ${
              isExpanded
                ? 'bg-slate-900 text-white hover:bg-slate-800'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <a
            href={version.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Open ${version.title} in new tab`}
            aria-label={`Open ${version.title} in new tab`}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Browser Address Readout */}
      <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2">
        <a
          href={version.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-slate-600 hover:text-slate-900 truncate transition-colors"
        >
          {version.shortHost}
        </a>
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-[11px] tabular-nums text-slate-400 whitespace-nowrap">
            {viewportMode === 'fluid'
              ? `${Math.round(containerWidth)}px`
              : `${targetWidth}px · ${Math.round(scale * 100)}%`}
          </span>
          <button
            type="button"
            onClick={handleCopyUrl}
            aria-label={`Copy URL for ${version.title}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Live Embedded Viewport */}
      <div
        ref={containerRef}
        style={{height: `${frameHeight}px`}}
        className="relative w-full bg-slate-100 overflow-hidden"
      >
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-50/95 px-6 text-center">
            <div className="w-6 h-6 rounded-full border-2 border-slate-300 border-t-slate-900 animate-spin" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-800">
                Loading {version.title}
              </p>
              <p className="font-mono text-xs text-slate-500">{version.shortHost}</p>
            </div>
          </div>
        )}

        <div
          style={{
            width: `${targetWidth}px`,
            height: `${scaledHeight}px`,
            transform: `translateX(${horizontalOffset}px) scale(${scale})`,
            transformOrigin: 'top left',
          }}
          className="bg-white shadow-sm"
        >
          <iframe
            key={`${version.id}-${reloadToken}-${localReloadKey}`}
            src={version.url}
            title={`${version.title} — ${version.methodology}`}
            onLoad={() => setIsLoading(false)}
            className="w-full h-full border-0 bg-white"
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Summary & Key Improvements */}
      <div className="p-4 border-t border-slate-200 flex-1 flex flex-col justify-between gap-3">
        <p className="text-sm leading-relaxed text-slate-600">{version.summary}</p>
        <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
          {version.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-amber-700 font-medium shrink-0" aria-hidden="true">
                &mdash;
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
