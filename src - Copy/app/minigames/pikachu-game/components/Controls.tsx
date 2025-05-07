'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type Difficulty = 'dễ' | 'trung bình' | 'khó';

interface ControlsProps {
  isGameStarted: boolean;
  onStart: () => void;
  onReset: () => void;
  onShuffle: () => void;
  onHint: () => void;
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  hintCount: number;
  maxHints: number;
}

const Controls: React.FC<ControlsProps> = ({
  isGameStarted,
  onStart,
  onReset,
  onShuffle,
  onHint,
  difficulty,
  setDifficulty,
  hintCount,
  maxHints
}) => {
  // Mapping từ độ khó đến kích thước bảng
  const difficultyToLabel: Record<Difficulty, string> = {
    'dễ': '4x4',
    'trung bình': '6x6',
    'khó': '8x8'
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="difficulty" className="text-sm font-medium">
          Độ khó:
        </label>
        <Select
          value={difficulty}
          onValueChange={(value) => setDifficulty(value as Difficulty)}
          disabled={isGameStarted}
        >
          <SelectTrigger id="difficulty" className="w-full">
            <SelectValue placeholder="Chọn độ khó" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dễ">Dễ ({difficultyToLabel['dễ']})</SelectItem>
            <SelectItem value="trung bình">Trung bình ({difficultyToLabel['trung bình']})</SelectItem>
            <SelectItem value="khó">Khó ({difficultyToLabel['khó']})</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {!isGameStarted ? (
          <Button onClick={onStart} className="col-span-2 bg-green-500 hover:bg-green-600">
            Bắt đầu
          </Button>
        ) : (
          <>
            <Button onClick={onReset} variant="destructive">
              Chơi lại
            </Button>
            <Button onClick={onShuffle} variant="outline">
              Xáo trộn
            </Button>
            <Button 
              onClick={onHint} 
              disabled={hintCount >= maxHints}
              className="col-span-2"
              variant="outline"
            >
              Gợi ý ({maxHints - hintCount}/{maxHints})
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Controls; 