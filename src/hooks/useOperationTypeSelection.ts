// ==================================================
// AI EXPLANATION: useOperationTypeSelection.ts
// ==================================================
// WHAT: React hook managing operation type selection logic (Private/Charter), syncing with yacht store preferences
// WHY: Without this, operation type selection wouldn't persist - handles state management for private vs charter yacht choice
// USED BY: OperationTypeView component for handling operation type selection
// CRITICAL: YES - Core business logic for operation type selection, breaking this prevents saving operation preferences
// ==================================================

import { useState } from 'react';
import { useYachtStore } from '../stores/yachtStore';
import { getPreferencesByCategory } from '@/data/preferences-library';

interface OperationType {
  id: string;
  name: string;
  description: string;
  image: string;
}

const useOperationTypeSelection = () => {
  const { currentYacht, addPreference, removePreference } = useYachtStore();
  const [isLoading, setIsLoading] = useState(false);

  // Get operation types from preferences library
  const operationTypes = getPreferencesByCategory('operation').map(op => ({
    id: op.id,
    name: op.name,
    description: op.description || '',
    image: op.image || ''
  }));

  // Get current selected operation type from yacht store - check preferences
  const isPrivate = currentYacht?.preferences.includes('operation_private');
  // Start with no selection - user must explicitly choose
  const selectedType = currentYacht?.preferences.includes('operation_private') ? 'operation_private' : 
                      currentYacht?.preferences.includes('operation_charter') ? 'operation_charter' : 
                      null;

  // Handle confirming the operation type selection
  const handleSelectOperationType = async (typeId: string) => {
    if (!currentYacht) return;

    // Check if this type is already selected
    const isCurrentlySelected = currentYacht.preferences.includes(typeId);
    
    // If clicking on already selected card, deselect it
    if (isCurrentlySelected) {
      await removePreference(typeId);
      return;
    }

    // Otherwise, remove any existing operation preferences
    if (currentYacht.preferences.includes('operation_private')) {
      await removePreference('operation_private');
    }
    if (currentYacht.preferences.includes('operation_charter')) {
      await removePreference('operation_charter');
    }
    
    // Then add the new preference
    await addPreference(typeId);
  };

  return {
    operationTypes,
    selectedType,
    isLoading,
    handleSelectOperationType
  };
};

export default useOperationTypeSelection;
