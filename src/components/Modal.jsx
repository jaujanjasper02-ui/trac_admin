import React, { useEffect, useId, useRef } from 'react';

const Modal = ({ isOpen, onClose, title, children, size = 'md', footer }) => {
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return undefined;

    previousFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-3 sm:p-4">
        <div
          ref={dialogRef}
          tabIndex="-1"
          className={`relative flex max-h-[calc(100vh-1.25rem)] w-full flex-col overflow-hidden rounded-xl bg-white shadow-xl ${sizes[size]} sm:max-h-[calc(100vh-2rem)]`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 sm:px-6">
            <h3 id={titleId} className="min-w-0 pr-2 text-lg font-semibold text-gray-900">{title}</h3>
            <button onClick={onClose} aria-label="Close dialog" className="trac-button-outline flex min-h-11 min-w-11 items-center justify-center rounded-lg p-1 text-gray-400 transition">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="min-h-0 overflow-y-auto px-4 py-4 sm:px-6">{children}</div>
          {footer && <div className="border-t border-gray-200 bg-[#F9FBE7] px-4 py-4 sm:px-6"><div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">{footer}</div></div>}
        </div>
      </div>
    </div>
  );
};

export const ConfirmationModal = ({ isOpen, onClose, onConfirm, title = 'Confirm', message = 'Are you sure?', confirmText = 'Confirm', cancelText = 'Cancel', loading = false }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    size="sm"
    footer={
      <>
        <button onClick={onClose} className="trac-button-outline min-h-11 rounded-md px-4 py-2 text-sm font-medium">
          {cancelText}
        </button>
        <button onClick={onConfirm} className="trac-button min-h-11 rounded-xl px-4 py-2 text-sm font-medium disabled:opacity-50" disabled={loading}>
          {loading ? 'Processing...' : confirmText}
        </button>
      </>
    }
  >
    <p className="text-gray-600">{message}</p>
  </Modal>
);

export default Modal;