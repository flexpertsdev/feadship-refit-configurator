// ==================================================
// AI EXPLANATION: YachtNameEditor.tsx
// ==================================================
// WHAT: Inline editable text component allowing users to name their yacht configuration with edit/save functionality
// WHY: Without this, users can't personalize their yacht with a custom name - provides the UI for yacht naming
// USED BY: HeroSection component in SummaryPage for editing yacht name
// CRITICAL: NO - Enhancement feature, yacht can function without custom naming
// ==================================================


import React, { useState } from 'react';
import { Pencil } from 'lucide-react';

interface YachtNameEditorProps {
  initialName: string;
  onSave: (name: string) => Promise<void>;
}

const YachtNameEditor: React.FC<YachtNameEditorProps> = ({ initialName, onSave }) => {
  const [yachtName, setYachtName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(yachtName);
    } catch (error) {
      console.error('Error saving yacht name:', error);
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto w-full">
      <p className="text-center text-primary text-sm mb-3">
        Give your yacht and refit wishlist a name
      </p>
      <div className="flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-full border border-primary p-1">
        <div className="flex-1 flex items-center px-4">
          {isEditing ? (
            <input
              type="text"
              value={yachtName}
              onChange={(e) => setYachtName(e.target.value)}
              className="w-full py-2 bg-transparent text-primary text-lg font-medium focus:outline-none"
              autoFocus
            />
          ) : (
            <div className="py-2 text-primary text-lg font-medium">{yachtName}</div>
          )}
        </div>
        <button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors flex items-center gap-2"
          disabled={isSaving}
        >
          <Pencil className="w-4 h-4" />
          <span>{isEditing ? (isSaving ? 'Saving...' : 'Save') : 'Edit'}</span>
        </button>
      </div>
    </div>
  );
};

export default YachtNameEditor;
