"use client";

import { useCallback, useState } from "react";

interface UseModalReturn {
  open: boolean;
  setOpen: (open: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
}

export function useModal(initialOpen = false): UseModalReturn {
  const [open, setOpen] = useState(initialOpen);

  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  return { open, setOpen, onOpen, onClose, toggle };
}
