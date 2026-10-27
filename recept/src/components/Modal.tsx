import { useEffect, useRef } from 'react';

type Props = {
  open: boolean;
  titleId?: string;
  label: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ open, titleId = 'modh', label, onClose, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const btn = ref.current?.querySelector('button');
    btn?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="mod on"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className="mbox"
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
