import { DetectionResult, wasteClasses } from '@project-megaphone/types';
import { useEffect, useRef, useState } from 'react';
import './app.scss';
import { MULL_MODEL_URL, wasteClassMap } from './constants';
import { TensorflowJsModel } from './services/tfjs.model';
import { canvasToImageCoords, capitalizeString, coordsInBox, drawDetectionIcons } from './utilities';

export function App() {
  const modelRef = useRef<TensorflowJsModel>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream>(null);
  const resultRef = useRef<DetectionResult[]>([]);

  const [message, setMessage] = useState<string>('');
  const loading = useRef<boolean>(true);

  useEffect(() => {
    setup();

    return () => {
      shutdown();
    };
  }, []);

  /**
   * Set up model, camera, listeners and other resources for the waste recognition page
   */
  const setup = async () => {
    if (canvasRef.current) {
      canvasRef.current.addEventListener('click', onCanvasClick);
    }

    modelRef.current = TensorflowJsModel.getInstance();

    try {
      await setupCamera();
    } catch (err) {
      if (err instanceof DOMException) {
        setMessage(`Error: Permission to access the camera was denied`);
      } else if (err instanceof Error) {
        setMessage(`${err.message}`);
      } else {
        setMessage(err);
      }
      return;
    }

    setMessage('Warming up the ML model');

    try {
      await modelRef.current.init(MULL_MODEL_URL);
    } catch {
      setMessage('Error loading ML model');
      return;
    }

    detectFrame(videoRef.current, modelRef.current, canvasRef.current);
  };

  const setupCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      return navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        })
        .then((stream) => {
          streamRef.current = stream;
          videoRef.current.srcObject = stream;
          videoRef.current.play();

          return new Promise<MediaStream>((resolve, reject) => {
            videoRef.current.onloadedmetadata = () => {
              // Doesn't work on all browsers. Keeping it here just in case
              // const { width, height } = stream.getTracks()[0].getSettings();

              const width = videoRef.current.videoWidth;
              const height = videoRef.current.videoHeight;

              canvasRef.current.height = height;
              canvasRef.current.width = width;

              resolve(stream);
            };
          });
        });
    } else {
      throw new Error('Either no camera exists on your device, or your browser denied access to it');
    }
  };

  /**
   * Shutdown and dispose of page resources, such as the camera, model and listeners
   */
  const shutdown = () => {
    if (canvasRef.current) {
      canvasRef.current.removeEventListener('click', onCanvasClick);
    }
    modelRef.current.dispose();
    if (streamRef.current && streamRef.current.getTracks().length > 0) {
      streamRef.current.getTracks()[0].stop();
    }
  };

  const detectFrame = async (
    video: HTMLVideoElement,
    model: TensorflowJsModel,
    canvas: HTMLCanvasElement
  ) => {
    // TODO adjust numResults/threshold to filter out bad results better. Might need to be dynamic
    resultRef.current = await model.detect(video, { numResults: 10, threshold: 0.6 });

    if (loading.current) {
      setMessage('');
      loading.current = false;
    }

    drawDetectionIcons(canvas, resultRef.current);
    requestAnimationFrame(() => {
      detectFrame(video, model, canvas);
    });
  };

  const onCanvasClick = (event: MouseEvent) => {
    const canvasCoords = {
      x: event.offsetX,
      y: event.offsetY,
    };
    const canvasSize = {
      width: canvasRef.current.clientWidth,
      height: canvasRef.current.clientHeight,
    };
    const imageSize = {
      width: canvasRef.current.width,
      height: canvasRef.current.height,
    };
    const imageCoords = canvasToImageCoords(canvasCoords, canvasSize, imageSize);

    const clickedObjects = resultRef.current.filter((result) => coordsInBox(imageCoords, result.bndBox));

    if (clickedObjects.length > 0) {
      // Since results are ordered by confidence, we should take the first result to be the one the user wanted to click
      const clickedObject = clickedObjects[0];
      const classInfo = wasteClassMap[clickedObject.class];

      setMessage(`This seems to be a ${capitalizeString(clickedObject.class)}. ${classInfo.info}`);
      setTimeout(() => {
        setMessage('');
      }, 8000);
    }
  };

  return (
    <div className="app-container">
      <header>
        <div className="app-title">Welcome to Mull Recognition!</div>
        <div className="app-description">Analyze objects and press on icons for more info!</div>
        <div className="app-description">Supported objects: {wasteClasses.join(', ')}</div>
      </header>
      <div className="mull-recognition-container">
        <video ref={videoRef} className="mull-recognition-overlap" playsInline muted />
        <canvas ref={canvasRef} className="mull-recognition-overlap" />
      </div>

      <div className="mull-recognition-overlay-text" onClick={() => setMessage('')}>
        {message}
      </div>
      <footer>&copy; Copyright 2021, Cristian Aldea</footer>
    </div>
  );
}

export default App;
