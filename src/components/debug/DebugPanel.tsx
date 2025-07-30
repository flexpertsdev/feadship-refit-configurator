import React, { useState, useEffect } from 'react';
import { useYachtStore } from '@/stores/yachtStore';
import { ChevronDown, ChevronUp, X, Move } from 'lucide-react';

const DebugPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(() => {
    return localStorage.getItem('debugPanelOpen') === 'true';
  });
  const [isExpanded, setIsExpanded] = useState(true);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const { currentYacht } = useYachtStore();

  // Toggle with Ctrl+D or Cmd+D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        setIsOpen(prev => {
          const newState = !prev;
          localStorage.setItem('debugPanelOpen', String(newState));
          return newState;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed z-50 bg-gray-900/95 text-white rounded-lg shadow-2xl border border-gray-700 backdrop-blur-sm"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        minWidth: '400px',
        maxWidth: '500px'
      }}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between p-3 border-b border-gray-700 cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <Move size={16} className="text-gray-400" />
          <h3 className="font-semibold">Yacht Debug Panel</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-800 rounded"
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              localStorage.setItem('debugPanelOpen', 'false');
            }}
            className="p-1 hover:bg-gray-800 rounded"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
          {!currentYacht ? (
            <p className="text-gray-400">No yacht selected</p>
          ) : (
            <>
              {/* Basic Info */}
              <div>
                <h4 className="font-semibold mb-2 text-blue-400">Basic Info</h4>
                <div className="space-y-1 text-sm">
                  <div>ID: <span className="text-gray-300">{currentYacht.id}</span></div>
                  <div>Name: <span className="text-gray-300">{currentYacht.name}</span></div>
                  <div>Model: <span className="text-gray-300">{currentYacht.model_id}</span></div>
                  <div>Extension: <span className="text-gray-300">{currentYacht.extension}</span></div>
                </div>
              </div>

              {/* Navigation State */}
              <div>
                <h4 className="font-semibold mb-2 text-green-400">Navigation State</h4>
                <div className="space-y-1 text-sm">
                  <div>Level 1: <span className="text-yellow-300">{currentYacht.active_level_1 || 'null'}</span></div>
                  <div>Level 2: <span className="text-yellow-300">{currentYacht.active_level_2 || 'null'}</span></div>
                  <div>Level 3: <span className="text-yellow-300">{currentYacht.active_level_3 || 'null'}</span></div>
                </div>
              </div>

              {/* Paint Configuration */}
              <div>
                <h4 className="font-semibold mb-2 text-purple-400">Paint Configuration</h4>
                <div className="space-y-2 text-sm">
                  {Object.entries(currentYacht.paint).map(([part, config]) => (
                    <div key={part} className="border-l-2 border-gray-700 pl-2">
                      <div className="font-medium capitalize">{part}:</div>
                      <div className="pl-2 text-gray-300">
                        <div>Color: <span className="inline-block w-4 h-4 rounded" style={{ backgroundColor: config.color }}></span> {config.color}</div>
                        <div>Type: {config.type}</div>
                        <div>Name: {config.name}</div>
                        <div>Group: {config.group}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrays */}
              <div>
                <h4 className="font-semibold mb-2 text-orange-400">Arrays</h4>
                <div className="space-y-1 text-sm">
                  <div>Configs: <span className="text-gray-300">[{currentYacht.configs.length}] {currentYacht.configs.join(', ')}</span></div>
                  <div>Preferences: <span className="text-gray-300">[{currentYacht.preferences.length}] {currentYacht.preferences.join(', ')}</span></div>
                  <div>Custom Colors: <span className="text-gray-300">[{currentYacht.custom_colors?.length || 0}]</span></div>
                </div>
              </div>

              {/* Timestamps */}
              <div>
                <h4 className="font-semibold mb-2 text-gray-400">Timestamps</h4>
                <div className="space-y-1 text-sm">
                  <div>Created: <span className="text-gray-300">{new Date(currentYacht.created_at).toLocaleString()}</span></div>
                  <div>Updated: <span className="text-gray-300">{new Date(currentYacht.updated_at).toLocaleString()}</span></div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="px-4 py-2 border-t border-gray-700 text-xs text-gray-400">
        Press Ctrl+D (or Cmd+D) to toggle
      </div>
    </div>
  );
};

export default DebugPanel;