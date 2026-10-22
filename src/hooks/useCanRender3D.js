import { useEffect, useState } from 'react';

// Decides whether the 3D hero should be mounted:
// needs WebGL, and a reasonably capable device (skips very small screens and "save-data" mode).
function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
  } catch {
    return false;
  }
}

export default function useCanRender3D() {
  const [can, setCan] = useState(false);

  useEffect(() => {
    const saveData = navigator.connection && navigator.connection.saveData;
    const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    const tiny = window.matchMedia && window.matchMedia('(max-width: 599px)').matches;
    setCan(hasWebGL() && !saveData && !lowCores && !tiny);
  }, []);

  return can;
}
