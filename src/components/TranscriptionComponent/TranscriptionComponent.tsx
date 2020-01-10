import * as React from 'react';
import './TranscriptionComponent.scss';

interface Dependencies {
  partial: string;
  noPartial: string;
}

export const TranscriptionComponent: React.FC<Dependencies> = ({ partial, noPartial}) => {
  return (
    <div className="StudentPages">
      <div>
        {noPartial}
        {partial}
      </div>
    </div>
  );
};

TranscriptionComponent.displayName = 'TranscriptionComponent';
