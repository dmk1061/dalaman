export const FALLBACK_2D_LABELS = {
  ru: { badge: '2D-карта (без WebGL)', retry3d: 'Включить 3D' },
  en: { badge: '2D map (no WebGL)', retry3d: 'Retry 3D' },
  de: { badge: '2D-Karte (ohne WebGL)', retry3d: '3D neu laden' },
  tr: { badge: '2D harita (WebGL yok)', retry3d: '3D’yi dene' },
} as const;

/**
 * Safely checks whether WebGL2 or WebGL1 can be created without leaking GPU contexts.
 * Supports `?map=2d` query parameter to force 2D Leaflet fallback for QA or low-GPU devices.
 */
export function detectWebGLSupport(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('map') === '2d') {
      return false;
    }
  } catch {
    // ignore URL parsing errors
  }

  let canvas: HTMLCanvasElement | null = null;
  let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;

  try {
    canvas = document.createElement('canvas');
    const attrs: WebGLContextAttributes = { failIfMajorPerformanceCaveat: false };
    gl = (canvas.getContext('webgl2', attrs) ||
      canvas.getContext('webgl', attrs) ||
      canvas.getContext('experimental-webgl', attrs)) as
      | WebGLRenderingContext
      | WebGL2RenderingContext
      | null;

    return Boolean(gl);
  } catch {
    return false;
  } finally {
    if (gl) {
      try {
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      } catch {
        // ignore context cleanup errors
      }
    }
    if (canvas) {
      canvas.width = 0;
      canvas.height = 0;
    }
  }
}

/**
 * Attaches listeners for MapLibre WebGL context loss and triggers `onPermanentLoss`
 * if the context is not restored within `restoreTimeoutMs`.
 */
export function attachWebGLLossHandler(
  mapInstance: any,
  onPermanentLoss: () => void,
  restoreTimeoutMs = 2500
): () => void {
  if (!mapInstance || typeof mapInstance.on !== 'function') {
    return () => {};
  }

  let timer: ReturnType<typeof setTimeout> | null = null;
  let disposed = false;

  const clearPendingTimer = () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  };

  const handleLost = () => {
    if (disposed) return;
    clearPendingTimer();
    timer = setTimeout(() => {
      if (!disposed) {
        onPermanentLoss();
      }
    }, restoreTimeoutMs);
  };

  const handleRestored = () => {
    clearPendingTimer();
  };

  mapInstance.on('webglcontextlost', handleLost);
  mapInstance.on('webglcontextrestored', handleRestored);

  return () => {
    disposed = true;
    clearPendingTimer();
    if (typeof mapInstance.off === 'function') {
      try {
        mapInstance.off('webglcontextlost', handleLost);
        mapInstance.off('webglcontextrestored', handleRestored);
      } catch {
        // ignore listener detachment errors during map teardown
      }
    }
  };
}
