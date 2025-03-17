
import * as React from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface EditMatchControlProps {
  onSave: (homeGoals: number, awayGoals: number) => void;
  initialHomeGoals?: number;
  initialAwayGoals?: number;
  disabled?: boolean;
}

export function EditMatchControl({ 
  onSave, 
  initialHomeGoals = 0, 
  initialAwayGoals = 0,
  disabled = false 
}: EditMatchControlProps) {
  const [homeGoals, setHomeGoals] = React.useState<number>(initialHomeGoals);
  const [awayGoals, setAwayGoals] = React.useState<number>(initialAwayGoals);
  const [open, setOpen] = React.useState(false);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleOpenChange = (newOpen: boolean) => {
    if (!isAdmin && newOpen) {
      navigate("/admin");
      return;
    }
    setOpen(newOpen);
  };

  const handleSave = () => {
    onSave(homeGoals, awayGoals);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          disabled={disabled}
        >
          {isAdmin ? "Edit Result" : "Login to Edit"}
        </Button>
      </DialogTrigger>
      {isAdmin && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Match Result</DialogTitle>
            <DialogDescription>
              Enter the final score for this match.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="homeGoals" className="text-sm font-medium">
                  Home Goals
                </label>
                <Input
                  id="homeGoals"
                  type="number"
                  min="0"
                  value={homeGoals}
                  onChange={(e) => setHomeGoals(parseInt(e.target.value, 10) || 0)}
                />
              </div>
              <div>
                <label htmlFor="awayGoals" className="text-sm font-medium">
                  Away Goals
                </label>
                <Input
                  id="awayGoals"
                  type="number"
                  min="0"
                  value={awayGoals}
                  onChange={(e) => setAwayGoals(parseInt(e.target.value, 10) || 0)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
