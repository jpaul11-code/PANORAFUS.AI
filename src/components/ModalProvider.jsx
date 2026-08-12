import { useCallback, useEffect, useMemo, useState } from 'react'
import { ModalContext } from './useModal.jsx'

export function ModalProvider({ children }) {
  const [openModals, setOpenModals] = useState([])

  const openModal = useCallback((name) => {
    setOpenModals((current) => [...current.filter((item) => item !== name), name])
  }, [])

  const closeModal = useCallback((name) => {
    setOpenModals((current) => current.filter((item) => item !== name))
  }, [])

  const isOpen = useCallback((name) => openModals.includes(name), [openModals])
  const isTopmost = useCallback((name) => openModals[openModals.length - 1] === name, [openModals])

  useEffect(() => {
    document.body.style.overflow = openModals.length > 0 ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [openModals])

  const value = useMemo(
    () => ({
      closeModal,
      isOpen,
      isTopmost,
      openModal,
    }),
    [closeModal, isOpen, isTopmost, openModal],
  )

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
