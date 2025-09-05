// src/pages/Org/OrgChart.jsx
import React, { useCallback, useMemo, useRef, useState, useLayoutEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

/* ---------- Custom Person Node (with handles for edges) ---------- */
const PersonNode = ({ data }) => {
  const { name, title, avatar, chip } = data || {};
  return (
    <div className="relative rounded-xl border border-gray-300 bg-white shadow-sm min-w-[180px] max-w-[220px]">
      {/* Edge handles */}
      <Handle type="target" position={Position.Top}
        style={{ width: 10, height: 10, background: '#9CA3AF', borderRadius: 999 }} id="in" />
      <Handle type="source" position={Position.Bottom}
        style={{ width: 10, height: 10, background: '#9CA3AF', borderRadius: 999 }} id="out" />

      <div className="flex flex-col items-center p-3">
        <img
          src={avatar || '/images/img_avatar_image_39.png'}
          alt={name}
          className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow"
        />
        <div className="mt-2 text-[14px] font-semibold text-gray-900 text-center leading-tight">
          {name}
        </div>
        <div className="mt-0.5 text-[12px] text-gray-500 text-center leading-tight">
          {title}
        </div>
        {chip && (
          <div className="mt-2 inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600">
            {chip}
          </div>
        )}
      </div>
    </div>
  );
};

const OrgChart = ({ orgId }) => {
  const [scope, setScope] = useState('Workplace');
  const [q, setQ] = useState('');

  // Demo data (swap with API later)
  const people = useMemo(
    () => ({
      ceo: { id: 'ceo', name: 'Manal Battache', title: 'Directeur des Ressources Humaines', avatar: '/images/img_avatar_image_39.png', chip: '7y' },
      a1:  { id: 'a1',  name: 'Alia Simmons',   title: 'Chef département Admin',            avatar: '/images/img_avatar_image_39_1.png', chip: '3y' },
      a2:  { id: 'a2',  name: 'Campbell Atkins', title: 'Chef département Development',      avatar: '/images/img_avatar_image_39_38x38.png', chip: '4y' },
      b1:  { id: 'b1',  name: 'Anthony Knapp',   title: 'Responsable recruitment' },
      b2:  { id: 'b2',  name: 'Ivan Padilla',    title: 'Responsable communication' },
      b3:  { id: 'b3',  name: 'Legend Norton',   title: 'Responsable Pôle' },
      b4:  { id: 'b4',  name: 'Briseli Bauer',   title: 'Responsable movement' },
      b5:  { id: 'b5',  name: 'Zackary Hunt',    title: 'Responsable communication' },
      b6:  { id: 'b6',  name: 'Julian Rosa',     title: 'Responsable recruitment' },
      c1:  { id: 'c1',  name: 'Madelyn Rodriguez', title: '—' },
      c2:  { id: 'c2',  name: 'Zackary Hunt',      title: '—' },
    }),
    []
  );

  // Manual layout
  const nodeW = 220;
  const gapX = 60;
  const baseY = 0;
  const col = (i) => i * (nodeW + gapX);

  const initialNodes = [
    { id: 'ceo', position: { x: col(3), y: baseY },         data: people.ceo, type: 'person' },
    { id: 'a1',  position: { x: col(2), y: baseY + 180 },   data: people.a1,  type: 'person' },
    { id: 'a2',  position: { x: col(4), y: baseY + 180 },   data: people.a2,  type: 'person' },

    { id: 'b1',  position: { x: col(0), y: baseY + 360 },   data: people.b1,  type: 'person' },
    { id: 'b2',  position: { x: col(1), y: baseY + 360 },   data: people.b2,  type: 'person' },
    { id: 'b3',  position: { x: col(2), y: baseY + 360 },   data: people.b3,  type: 'person' },
    { id: 'b4',  position: { x: col(3), y: baseY + 360 },   data: people.b4,  type: 'person' },
    { id: 'b5',  position: { x: col(4), y: baseY + 360 },   data: people.b5,  type: 'person' },
    { id: 'b6',  position: { x: col(5), y: baseY + 360 },   data: people.b6,  type: 'person' },

    { id: 'c1',  position: { x: col(2), y: baseY + 540 },   data: people.c1,  type: 'person' },
    { id: 'c2',  position: { x: col(3), y: baseY + 540 },   data: people.c2,  type: 'person' },
  ];

  const initialEdges = [
    { id: 'e-ceo-a1', source: 'ceo', target: 'a1', type: 'smoothstep' },
    { id: 'e-ceo-a2', source: 'ceo', target: 'a2', type: 'smoothstep' },

    { id: 'e-a1-b1', source: 'a1', target: 'b1', type: 'smoothstep' },
    { id: 'e-a1-b2', source: 'a1', target: 'b2', type: 'smoothstep' },
    { id: 'e-a1-b3', source: 'a1', target: 'b3', type: 'smoothstep' },

    { id: 'e-a2-b4', source: 'a2', target: 'b4', type: 'smoothstep' },
    { id: 'e-a2-b5', source: 'a2', target: 'b5', type: 'smoothstep' },
    { id: 'e-a2-b6', source: 'a2', target: 'b6', type: 'smoothstep' },

    { id: 'e-b3-c1', source: 'b3', target: 'c1', type: 'smoothstep' },
    { id: 'e-b4-c2', source: 'b4', target: 'c2', type: 'smoothstep' },
  ];

  const nodeTypes = useMemo(() => ({ person: PersonNode }), []);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  // Center helpers
  const goTop = useCallback(() => {
    document.querySelector('.react-flow__renderer')?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  }, []);
  const goMe = useCallback(() => {
    document.querySelector('.react-flow__renderer')?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  }, []);

  // Search dim
  const visibleNodes = useMemo(() => {
    const ql = q.trim().toLowerCase();
    if (!ql) return nodes;
    return nodes.map((n) => {
      const hit = `${n.data?.name || ''} ${n.data?.title || ''}`.toLowerCase().includes(ql);
      return { ...n, style: { opacity: hit ? 1 : 0.25 } };
    });
  }, [nodes, q]);

  // Measure header (tabs + filters) to make the canvas fill the rest of the viewport
  const headerRef = useRef(null);
  const [canvasHeight, setCanvasHeight] = useState('60vh');

  useLayoutEffect(() => {
    const calc = () => {
      const h = headerRef.current?.offsetHeight || 0;
      setCanvasHeight(`calc(100vh - ${h + 16}px)`); // +16 for bottom margin
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* ===== Tabs (kept) ===== */}
      <div ref={headerRef}>
        <div className="mx-auto w-full max-w-[1180px] px-2 pt-4">
          <ul className="flex gap-2 border-b border-gray-200">
            <li><button className="px-3 py-2 text-sm rounded-t-md bg-white border-x border-t border-gray-200 -mb-px font-medium">Org Chart</button></li>
            <li><button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900">Departments</button></li>
            <li><button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900">Teams</button></li>
            {/* If you already have your own Tabs wrapper, keep that and remove this UL */}
          </ul>
        </div>

        {/* ===== Filters / Search (kept) ===== */}
        <div className="mx-auto w-full max-w-[1180px] px-2">
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <select
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2b6171]"
              >
                <option>Workplace</option>
                <option>My Department</option>
                <option>My Team</option>
              </select>

              <div className="relative w-[240px] sm:w-[320px]">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search"
                  className="w-full rounded-md border border-gray-200 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2b6171]"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setScope('My Department')} className="rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50">
                My Department
              </button>
              <button onClick={goTop} className="rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50">
                Top of the Org
              </button>
              <button onClick={goMe} className="rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50">
                Me
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Canvas fills the remaining viewport ===== */}
      <div className="mx-auto mt-4 mb-4 w-full max-w-[1180px] rounded-xl border border-gray-200 overflow-hidden" style={{ height: canvasHeight }}>
        <ReactFlow
          nodes={visibleNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={{ person: PersonNode }}
          panOnScroll
          zoomOnScroll
          fitView
          fitViewOptions={{ padding: 0.2 }}
          nodesConnectable={false}
          elementsSelectable={false}
          defaultEdgeOptions={{
            style: { stroke: '#9CA3AF' },
            markerEnd: { type: 'arrowclosed', color: '#9CA3AF' },
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <Background gap={24} size={1} color="#f3f4f6" />
          <Controls position="bottom-right" />
        </ReactFlow>
      </div>
    </div>
  );
};

export default OrgChart;
