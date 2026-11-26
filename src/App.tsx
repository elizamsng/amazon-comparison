import {useState} from 'react';
import {
  ArrowUpRight,
  Columns3,
  Columns2,
  Monitor,
  RotateCw,
  Smartphone,
  StretchHorizontal,
  X,
} from 'lucide-react';
import {ViewportFrame, type ViewportMode} from './components/ViewportFrame';
import {
  COMPARISON_DIMENSIONS,
  NIELSEN_HEURISTICS,
  PROTOTYPE_VERSIONS,
  type PrototypeVersion,
} from './data/versions';

type CompareFilter = 'all' | 'orig-v1' | 'orig-v2';

export default function App() {
  const [compareFilter, setCompareFilter] = useState<CompareFilter>('all');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [frameHeight, setFrameHeight] = useState<number>(640);
  const [expandedId, setExpandedId] = useState<PrototypeVersion['id'] | null>(null);
  const [reloadToken, setReloadToken] = useState<number>(0);

  const handleToggleExpand = (id: PrototypeVersion['id']) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  const handleReloadAll = () => {
    setReloadToken((prev) => prev + 1);
  };

  const visibleVersions = PROTOTYPE_VERSIONS.filter((v) => {
    if (expandedId) return v.id === expandedId;
    if (compareFilter === 'orig-v1') return v.id === 'original' || v.id === 'v1';
    if (compareFilter === 'orig-v2') return v.id === 'original' || v.id === 'v2';
    return true;
  });

  const gridClass = expandedId
    ? 'grid-cols-1'
    : compareFilter === 'all'
      ? 'grid-cols-1 lg:grid-cols-3'
      : 'grid-cols-1 md:grid-cols-2';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          <a
            href="#top"
            className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            Amazon UX Study
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
          >
            <a
              href="#comparison"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Side-by-Side
            </a>
            <a
              href="#breakdown"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Comparison Matrix
            </a>
            <a
              href="#heuristics"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              10 Heuristics
            </a>
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleReloadAll}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Reload All</span>
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Top Banner */}
        <section
          aria-label="Study overview banner"
          className="bg-slate-900 text-white border-b border-slate-800"
        >
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="max-w-3xl space-y-3">
                <p className="text-xs font-medium tracking-wide text-amber-400">
                  UI/UX Improvement Showcase · Three-Way Live Evaluation
                </p>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
                  Amazon Storefront Redesign: Original Replica vs. Intuition Accounts &amp; Nielsen&apos;s 10 Heuristics
                </h1>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  Inspect all three live deployments side by side below. Compare the baseline
                  replica against Version 1 (Intuition Accounts) and Version 2 (Nielsen&apos;s 10
                  Usability Heuristics) across desktop and mobile viewports.
                </p>
              </div>

              {/* Direct Links inside Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0">
                {PROTOTYPE_VERSIONS.map((version) => (
                  <a
                    key={version.id}
                    href={version.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col justify-between gap-2 px-4 py-3 rounded-lg bg-slate-800/80 border border-slate-700 hover:border-amber-400/70 hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-xs tabular-nums text-amber-400">
                        {version.index}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-colors" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white whitespace-nowrap">
                        {version.title}
                      </div>
                      <div className="text-xs text-slate-300 whitespace-nowrap">
                        {version.methodology}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Side-by-Side Workspace Controls + Live Iframes */}
        <section
          id="comparison"
          className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-5"
        >
          {/* Workspace Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-3">
              {/* Layout Comparison Filter */}
              <div
                role="group"
                aria-label="Comparison layout"
                className="inline-flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg"
              >
                <button
                  type="button"
                  onClick={() => {
                    setExpandedId(null);
                    setCompareFilter('all');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    !expandedId && compareFilter === 'all'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Columns3 className="w-3.5 h-3.5" />
                  <span>All 3 Versions</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setExpandedId(null);
                    setCompareFilter('orig-v1');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    !expandedId && compareFilter === 'orig-v1'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Columns2 className="w-3.5 h-3.5" />
                  <span>Original vs. V1</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setExpandedId(null);
                    setCompareFilter('orig-v2');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    !expandedId && compareFilter === 'orig-v2'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Columns2 className="w-3.5 h-3.5" />
                  <span>Original vs. V2</span>
                </button>
              </div>

              {expandedId && (
                <button
                  type="button"
                  onClick={() => setExpandedId(null)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-800 bg-amber-100 hover:bg-amber-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Show All Columns</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Viewport Mode Control */}
              <div
                role="group"
                aria-label="Viewport scale"
                className="inline-flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg"
              >
                <button
                  type="button"
                  onClick={() => setViewportMode('desktop')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    viewportMode === 'desktop'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop (1280px)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewportMode('mobile')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    viewportMode === 'mobile'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile (390px)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewportMode('fluid')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    viewportMode === 'fluid'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <StretchHorizontal className="w-3.5 h-3.5" />
                  <span>Fluid Fit</span>
                </button>
              </div>

              {/* Frame Height Control */}
              <div
                role="group"
                aria-label="Preview height"
                className="inline-flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg"
              >
                <button
                  type="button"
                  onClick={() => setFrameHeight(640)}
                  className={`px-2.5 py-1.5 font-mono text-xs tabular-nums font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    frameHeight === 640
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  640px
                </button>
                <button
                  type="button"
                  onClick={() => setFrameHeight(820)}
                  className={`px-2.5 py-1.5 font-mono text-xs tabular-nums font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    frameHeight === 820
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  820px
                </button>
              </div>
            </div>
          </div>

          {/* Side-by-Side Prototype Frames */}
          <div className={`grid gap-6 ${gridClass}`}>
            {visibleVersions.map((version) => (
              <ViewportFrame
                key={version.id}
                version={version}
                viewportMode={viewportMode}
                frameHeight={frameHeight}
                isExpanded={expandedId === version.id}
                reloadToken={reloadToken}
                onToggleExpand={handleToggleExpand}
              />
            ))}
          </div>
        </section>

        {/* Side-by-Side Breakdown Matrix */}
        <section
          id="breakdown"
          className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-200"
        >
          <div className="max-w-2xl mb-6 space-y-1.5">
            <p className="text-xs font-medium text-amber-700">Structural Comparison</p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              How Each Iteration Evolves the Experience
            </h2>
            <p className="text-sm text-slate-600">
              Key differences across information architecture, account workflows, feedback clarity,
              and error prevention.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto">
            <table className="w-full min-w-[720px] text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="py-3.5 px-4 text-xs font-semibold text-slate-700 w-1/5">
                    UX Dimension
                  </th>
                  <th className="py-3.5 px-4 text-xs font-semibold text-slate-900 w-1/4">
                    00 · Original Replica
                  </th>
                  <th className="py-3.5 px-4 text-xs font-semibold text-slate-900 w-1/4">
                    01 · Version 1 (Intuition Accounts)
                  </th>
                  <th className="py-3.5 px-4 text-xs font-semibold text-slate-900 w-1/4">
                    02 · Version 2 (Nielsen&apos;s 10 Heuristics)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm text-slate-600">
                {COMPARISON_DIMENSIONS.map((row) => (
                  <tr key={row.dimension} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 font-semibold text-slate-900 align-top">
                      {row.dimension}
                    </td>
                    <td className="py-4 px-4 align-top leading-relaxed">{row.original}</td>
                    <td className="py-4 px-4 align-top leading-relaxed">{row.v1}</td>
                    <td className="py-4 px-4 align-top leading-relaxed">{row.v2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Nielsen's 10 Usability Heuristics Reference */}
        <section
          id="heuristics"
          className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-200"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div className="max-w-2xl space-y-1.5">
              <p className="text-xs font-medium text-amber-700">Version 2 Framework</p>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Nielsen&apos;s 10 Usability Heuristics Applied
              </h2>
              <p className="text-sm text-slate-600">
                Evaluation principles guiding the second iteration at{' '}
                <a
                  href="https://amazon-enhancedv2.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-slate-800 underline underline-offset-4 hover:text-amber-700"
                >
                  amazon-enhancedv2.vercel.app
                </a>
                .
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 bg-white border border-slate-200 rounded-xl p-6">
            {NIELSEN_HEURISTICS.map((item) => (
              <div
                key={item.number}
                className="flex items-start gap-4 py-3 border-b border-slate-100 last:border-b-0 md:nth-last-[-n+2]:border-b-0"
              >
                <span className="font-mono text-sm font-medium tabular-nums text-amber-700 shrink-0 pt-0.5">
                  {item.number}.
                </span>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-slate-900">{item.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.application}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">Amazon UX Study</span>
            <span aria-hidden="true">·</span>
            <span>Three-way UI/UX prototype hosting page</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {PROTOTYPE_VERSIONS.map((version) => (
              <a
                key={version.id}
                href={version.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 transition-colors whitespace-nowrap"
              >
                {version.title} ({version.methodology})
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
