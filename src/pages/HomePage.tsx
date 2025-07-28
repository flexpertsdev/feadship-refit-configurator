// ==================================================
// AI EXPLANATION: HomePage.tsx
// ==================================================
// WHAT: Landing page component with hero section for starting new yacht designs and grid display of saved yacht configurations, handles authentication flow
// WHY: Without this, users have no entry point to start designing yachts or view their saved configurations - it's the main dashboard after splash
// USED BY: App.tsx (route /home), navigated to from SplashPage and auth flows
// CRITICAL: YES - Primary entry point for yacht configuration flow, breaking this prevents users from starting or continuing designs
// ==================================================

/**
 * TODO: HomePage V2 Migration
 * 
 * 1. Replace YachtConfig with YachtConfigV2 import from @/types/yacht-v2
 * 2. Update savedYachts state type to YachtConfigV2[]
 * 3. Update handleContinueYacht to use V2 navigation:
 *    - Check yacht.active_level_1 and active_level_2
 *    - Navigate to appropriate page based on saved state
 *    - Use navigationStore to set the correct navigation state
 * 4. Remove resetDesignLevels() call in handleCreateYacht (V1 pattern)
 * 5. Update YachtCard props to accept YachtConfigV2
 * 6. Add proper error UI instead of console.error:
 *    - Use toast notifications or inline error states
 *    - Show user-friendly error messages
 * 7. Show yacht.model_id in saved configurations
 * 8. Calculate progress from configs/preferences arrays length
 * 9. Add model selection to StartDialog
 * 10. Clean up authentication flow - consolidate user checks
 */

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { YachtCard } from "@/components/cards/YachtCard";
import { StartDialog } from "@/components/dialogs/StartDialog";
import { createNewYacht, fetchUserYachts, deleteYacht } from "@/services/yachtService";
import { useYachtStore } from "@/stores/yachtStore";
// Removed toast import
import { YachtConfigV2 as YachtConfig } from "@/types/yacht-v2";
import { useAuth } from "@/context/AuthContext";
const HERO_IMAGE = '/assets/yacht.jpg';

const HomePage = () => {
  const [showStartDialog, setShowStartDialog] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [savedYachts, setSavedYachts] = useState<YachtConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Removed toast hook
  const navigate = useNavigate();
  const { setCurrentYacht, setNavigationState } = useYachtStore();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadSavedYachts();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const loadSavedYachts = async () => {
    setIsLoading(true);
    const yachtData = await fetchUserYachts();
    setSavedYachts(yachtData);
    setIsLoading(false);
  };

  const handleStartDesigning = () => {
    if (!user) {
      console.error("Authentication Required: Please sign in to create a yacht configuration");
      navigate("/auth");
      return;
    }
    
    setShowStartDialog(true);
  };

  const handleCreateYacht = async () => {
    setIsCreating(true);
    
    const newYacht = await createNewYacht();
    setIsCreating(false);
    
    if (newYacht) {
      setCurrentYacht(newYacht);
      setShowStartDialog(false);
      // Set navigation state for new yacht to start at design preferences
      setNavigationState('DESIGN', 'clean', null);
      navigate("/design/1");
    } else {
      console.error("Creation Failed: There was a problem creating your configuration.");
    }
  };

  const handleContinueYacht = (yacht: YachtConfig) => {
    setCurrentYacht(yacht);
    
    // Navigate based on yacht's current navigation state
    if (yacht.active_level_1 && yacht.active_level_2) {
      // Restore navigation state
      setNavigationState(yacht.active_level_1, yacht.active_level_2, yacht.active_level_3 || null);
      
      // Navigate to appropriate page based on saved state
      switch (yacht.active_level_1) {
        case 'DESIGN':
          if (yacht.active_level_2 === 'clean') navigate('/design/1');
          else if (yacht.active_level_2 === 'vintage') navigate('/design/2');
          else if (yacht.active_level_2 === 'traditional') navigate('/design/3');
          break;
        case 'OPERATION':
          if (yacht.active_level_2 === 'where') navigate('/operations1');
          else if (yacht.active_level_2 === 'who') navigate('/operations2');
          else if (yacht.active_level_2 === 'what') navigate('/operations3');
          break;
        case 'PAINT':
        case 'EXTENSIONS':
          navigate('/configurator');
          break;
        case 'FEATURES':
          navigate('/features');
          break;
        case 'SUSTAINABILITY':
          navigate('/sustainability');
          break;
        case 'SERVICES':
          navigate('/services');
          break;
        case 'SUMMARY':
          navigate('/summary');
          break;
        default:
          navigate('/configurator');
      }
    } else {
      // Default to configurator if no navigation state
      navigate('/configurator');
    }
  };

  const handleDeleteYacht = async (id: string) => {
    const success = await deleteYacht(id);
    
    if (success) {
      console.log("Configuration Deleted: Your yacht configuration has been deleted.");
      loadSavedYachts();
    } else {
      console.error("Deletion Failed: There was a problem deleting your configuration.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div 
        className="w-full h-[80vh] bg-cover bg-center flex flex-col justify-center items-center text-white relative"
        style={{ 
          backgroundImage: `url('${HERO_IMAGE}')`,
          backgroundSize: "cover"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Custom Yacht Design</h1>
          <p className="text-xl md:text-2xl mb-8">Begin your journey to create the perfect yacht tailored to your needs</p>
          <Button 
            className="text-lg px-6 py-6 bg-primary hover:bg-primary/90 flex items-center gap-2"
            onClick={handleStartDesigning}
          >
            Start Designing <ArrowRight className="ml-1" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col min-h-screen bg-[#0a003e] py-16 px-4 md:px-8 overflow-auto">
        <div className="container mx-auto max-w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Saved Configurations</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-[#29ABE2] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : user && savedYachts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 ipad:grid-cols-4 gap-6">
              {savedYachts.map((yacht) => (
                <YachtCard
                  key={yacht.id}
                  yacht={yacht}
                  onContinue={handleContinueYacht}
                  onDelete={handleDeleteYacht}
                />
              ))}
            </div>
          ) : user ? (
            <div className="text-center py-12 px-4 bg-[#151540]/50 rounded-lg border border-white/10">
              <h3 className="text-xl font-medium text-white mb-3">No Configurations Yet</h3>
              <p className="text-white/70 mb-6">Create your first yacht configuration to get started.</p>
              <Button 
                onClick={handleStartDesigning} 
                className="bg-[#29ABE2] hover:bg-[#2499cc] text-white"
              >
                Create Configuration
              </Button>
            </div>
          ) : (
            <div className="text-center py-12 px-4 bg-[#151540]/50 rounded-lg border border-white/10">
              <h3 className="text-xl font-medium text-white mb-3">Sign In to View Your Configurations</h3>
              <p className="text-white/70 mb-6">Please sign in to view and manage your saved yacht configurations.</p>
              <Button 
                asChild 
                className="bg-[#29ABE2] hover:bg-[#2499cc] text-white"
              >
                <Link to="/auth">Sign In</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      <StartDialog
        isOpen={showStartDialog}
        onClose={() => setShowStartDialog(false)}
        onConfirm={handleCreateYacht}
        isLoading={isCreating}
      />
    </div>
  );
};

export default HomePage;
