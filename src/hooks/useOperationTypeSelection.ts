// ==================================================
// AI EXPLANATION: useOperationTypeSelection.ts
// ==================================================
// WHAT: React hook managing operation type selection logic (Private/Charter), syncing with yacht store preferences
// WHY: Without this, operation type selection wouldn't persist - handles state management for private vs charter yacht choice
// USED BY: OperationTypeView component for handling operation type selection
// CRITICAL: YES - Core business logic for operation type selection, breaking this prevents saving operation preferences
// ==================================================

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useYachtStore } from '../stores/yachtStore';
// Import from new config system
import { getOperationTypes } from '@/config';

interface OperationType {
  id: string;
  name: string;
  description: string;
  image: string;
}

const useOperationTypeSelection = () => {
  const { currentYacht, addPreference, removePreference } = useYachtStore();
  const [isLoading, setIsLoading] = useState(false);

  // Get operation types from config system
  const operationTypes = getOperationTypes().map(op => ({
    id: op.id,
    name: op.name,
    description: op.details || '',
    image: op.image || ''
  }));

  // Get current selected operation type from yacht store - check preferences
  const isPrivate = currentYacht?.preferences.includes('operation_private');
  const selectedType = isPrivate ? 'private' : 'charter';

  // Handle confirming the operation type selection
  const handleSelectOperationType = async (typeId: string) => {
    if (!currentYacht) return;

    // In V2, operation type is stored as preferences
    // Remove existing operation preference
    if (isPrivate && typeId !== 'private') {
      await removePreference('operation_private');
    } else if (!isPrivate && typeId === 'private') {
      await addPreference('operation_private');
    }
    // Charter is the default (no preference needed)
  };

  return {
    operationTypes,
    selectedType,
    isLoading,
    handleSelectOperationType
  };
};

export default useOperationTypeSelection;
