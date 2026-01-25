"use client";

import { Button, type ButtonVariant } from "./Button";
import Popup from "./Popup";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description: string;
  action: () => void;
  actionLabel: string;
  actionVariant?: ButtonVariant;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  title = "Are you absolutely sure?",
  description,
  action,
  actionLabel,
  actionVariant = "primary",
}: ConfirmationModalProps) => {
  const handleConfirm = () => {
    action();
    onClose();
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} width="md">
      <div role="alertdialog" className="flex flex-col">
        <h2 className="text-xl font-bold text-base">{title}</h2>

        <p className="mt-3 text-sm text-zinc-400">{description}</p>

        <div className="mt-6 flex justify-end gap-3">
          <Button label="Cancel" onClick={onClose} variant="neutral" />
          <Button
            label={actionLabel}
            onClick={handleConfirm}
            variant={actionVariant}
          />
        </div>
      </div>
    </Popup>
  );
};

export default ConfirmationModal;
