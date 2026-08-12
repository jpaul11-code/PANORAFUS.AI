import { Modal } from './components/Modal.jsx'
import { useModal } from './components/useModal.jsx'

const actionButtonClass =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400'

function App() {
  const { closeModal, isOpen, openModal } = useModal()

  return (
    <>
      <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-cyan-950/30">
            <div className="grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1.3fr_0.9fr] lg:px-12 lg:py-14">
              <div className="space-y-6">
                <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
                  React + Vite + Tailwind
                </span>
                <div className="space-y-4">
                  <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    Reusable modal windows that can be opened from anywhere.
                  </h1>
                  <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                    PANORAFUS.AI now ships with a production-ready modal system that supports
                    smooth animations, overlay close behavior, custom content regions, and
                    independent control for multiple dialogs.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    className={`${actionButtonClass} bg-cyan-400 text-slate-950 hover:bg-cyan-300`}
                    onClick={() => openModal('product-tour')}
                  >
                    Open primary modal
                  </button>
                  <button
                    type="button"
                    className={`${actionButtonClass} border border-white/15 bg-white/5 text-white hover:bg-white/10`}
                    onClick={() => openModal('launch-checklist')}
                  >
                    Open checklist modal
                  </button>
                  <button
                    type="button"
                    className={`${actionButtonClass} border border-rose-400/30 bg-rose-400/10 text-rose-100 hover:bg-rose-400/20 disabled:cursor-not-allowed disabled:opacity-50`}
                    disabled={!isOpen('launch-checklist')}
                    onClick={() => closeModal('launch-checklist')}
                  >
                    Close checklist programmatically
                  </button>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6">
                <h2 className="text-lg font-semibold text-white">What this demo covers</h2>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
                  <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    Backdrop click closes the active modal.
                  </li>
                  <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    The X button and Escape key both dismiss it cleanly.
                  </li>
                  <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    Header, body, and footer areas accept custom React content.
                  </li>
                  <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    Multiple modals are registered independently through shared context.
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Modal
        name="product-tour"
        title="Welcome to the modal system"
        footer={
          <>
            <button
              type="button"
              className={`${actionButtonClass} border border-white/10 bg-white/5 text-white hover:bg-white/10`}
              onClick={() => closeModal('product-tour')}
            >
              Maybe later
            </button>
            <button
              type="button"
              className={`${actionButtonClass} bg-cyan-400 text-slate-950 hover:bg-cyan-300`}
              onClick={() => {
                closeModal('product-tour')
                openModal('launch-checklist')
              }}
            >
              Continue to next modal
            </button>
          </>
        }
      >
        <div className="space-y-4 text-sm leading-6 text-slate-300 sm:text-base">
          <p>
            This modal uses the shared provider so any component can call{' '}
            <code className="rounded bg-white/10 px-2 py-1 text-cyan-200">openModal()</code> or{' '}
            <code className="rounded bg-white/10 px-2 py-1 text-cyan-200">closeModal()</code>.
          </p>
          <p>
            It fades in with a slide-up motion and remains responsive on smaller screens by
            anchoring near the bottom on mobile and centering on larger displays.
          </p>
        </div>
      </Modal>

      <Modal
        name="launch-checklist"
        header={
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
              Custom header
            </p>
            <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">Launch checklist</h2>
          </div>
        }
        footer={
          <>
            <button
              type="button"
              className={`${actionButtonClass} border border-white/10 bg-white/5 text-white hover:bg-white/10`}
              onClick={() => closeModal('launch-checklist')}
            >
              Close modal
            </button>
            <button
              type="button"
              className={`${actionButtonClass} bg-emerald-400 text-slate-950 hover:bg-emerald-300`}
              onClick={() => closeModal('launch-checklist')}
            >
              Mark as complete
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm leading-6 text-slate-300 sm:text-base">
            This second modal is controlled independently from the first one and can also be
            closed by the standalone button on the page.
          </p>
          <div className="space-y-3">
            {[
              'Open from any component through context.',
              'Close with the X button, backdrop click, Escape, or external button.',
              'Provide custom header, body, and footer content per modal instance.',
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
              >
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default App
