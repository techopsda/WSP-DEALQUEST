import { ReactSVGPanZoom, Tool, TOOL_AUTO, Value } from 'react-svg-pan-zoom';
import { ReactSvgPanZoomLoader } from 'react-svg-pan-zoom-loader';
import { useWindowSize } from '@react-hook/window-size';
import { useLayoutEffect, useRef, useState } from 'react';

interface Props {
  imgSrc: string;
}

export const SVGManager: React.FC<Props> = ({ imgSrc }) => {
  const Viewer = useRef(null);
  const [tool, onChangeTool] = useState<Tool>(TOOL_AUTO);
  const [value, onChangeValue] = useState<Value | null>(null);
  const [width, height] = useWindowSize({ initialWidth: 500, initialHeight: 500 });

  useLayoutEffect(() => {
    if (Viewer.current) {
      // @ts-ignore
      Viewer.current.fitToViewer({ SVGAlignX: 'left', SVGAlignY: 'top' });
    }
  }, []);

  console.log('windowSize', width, height);

  return (
    <div className="w-full h-full bg-red-500">
      <ReactSvgPanZoomLoader
        src={imgSrc}
        render={(content) => {
          return (
            <ReactSVGPanZoom
              ref={Viewer}
              scaleFactorMin={1}
              width={width}
              height={height}
              value={value}
              onChangeValue={onChangeValue}
              tool={tool}
              onChangeTool={onChangeTool}
            >
              <svg width={width} height={height}>
                {content}
              </svg>
            </ReactSVGPanZoom>
          );
        }}
      />
    </div>
  );
};
