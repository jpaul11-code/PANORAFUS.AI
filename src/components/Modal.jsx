import { useCallback, useEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import { useModal } from './useModal.jsx'

export function Modal({ children, footer, header, name, onClose, title }) {
  const { closeModal, isOpen, isTopmost } = useModal()
  const headingId = useId()
  const open = isOpen(name)
  const topmost = isTopmost(name)
  const accessibleLabel = header ? title : undefined
  const accessibleLabelledBy = !header && title ? headingId : undefined

  const handleClose = useCallback(
    (reason) => {
      closeModal(name)
      onClose?.(reason)
    },
    [closeModal, name, onClose],
  )

  useEffect(() => {
    if (!open) {
      return undefined
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape' && topmost) {
        handleClose('escapeKeyDown')
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [handleClose, open, topmost])

  if (!open) {
    return null
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 p-4 backdrop-blur-sm sm:items-center sm:p-6 animate-[modal-backdrop_220ms_ease-out]"
      onClick={(event) => {
        if (topmost && event.target === event.currentTarget) {
          handleClose('backdropClick')
        }
      }}
    >
      <div
      aria-label={accessibleLabel}
      aria-labelledby={accessibleLabelledBy}
      aria-modal="true"
      className="w-full max-w-xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900 shadow-2xl shadow-slate-950/60 animate-[modal-panel_220ms_ease-out]"
      role="dialog"
    >
      <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1" id={accessibleLabelledBy}>
          {header ?? <h2 className="text-lg font-semibold text-white sm:text-xl">{title}</h2>}
        </div>
          <button
            aria-label="Close modal"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            onClick={() => handleClose('closeButton')}
            type="button"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              ×
            </span>
          </button>
        </div>

        <div className="px-5 py-5 sm:px-6">{children}</div>

        {footer ? (
          <div className="flex flex-col-reverse gap-3 border-t border-white/10 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            {footer}
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}
